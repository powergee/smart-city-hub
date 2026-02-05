#!/bin/bash
# scripts/solution/seed-solution.sh

# Default MongoDB URL
DEFAULT_MONGO_URL="mongodb://localhost:27017/smarthub"
MONGO_URL="${1:-$DEFAULT_MONGO_URL}"

# Resolve absolute path of the script directory to find JSONs
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
JSON_COMPANY="$SCRIPT_DIR/solution_company_db_v2.json"
JSON_SOLUTION="$SCRIPT_DIR/solution_db_v2.json"

echo "Seeding database at $MONGO_URL"

# Function to run mongoimport
run_import() {
    local COLL=$1
    local FILE=$2
    local CMD_PREFIX=$3 # Prefix command (empty, or docker ...)
    local URI=$4

    echo "Importing $COLL..."
    
    if [ -z "$CMD_PREFIX" ]; then
        # Local run
        mongoimport --uri "$URI" --collection "$COLL" --file "$FILE" --jsonArray --drop
    else
        # Docker run (streaming file content)
        # Note: We use cat to pipe the file content effectively handling paths
        cat "$FILE" | $CMD_PREFIX mongoimport --uri "$URI" --collection "$COLL" --jsonArray --drop
    fi
}

# 1. Check for local mongoimport
if command -v mongoimport &> /dev/null; then
    echo "w> Found local mongoimport."
    run_import "solutioncompanies" "$JSON_COMPANY" "" "$MONGO_URL"
    run_import "solutionitems" "$JSON_SOLUTION" "" "$MONGO_URL"
    exit 0
fi

# 2. Check for Docker
if ! command -v docker &> /dev/null; then
    echo "Error: Neither 'mongoimport' nor 'docker' is installed."
    exit 1
fi

echo "w> Local mongoimport not found. Checking Docker..."

# 3. Check if smart-city-hub-db container is running (Project specific optimization)
# We check if we are in the project root or similar by looking for docker-compose.yaml in parent dirs?
# Or just check if the service container exists and is running.
PROJECT_DB_CONTAINER=$(docker compose -f "$SCRIPT_DIR/../../docker-compose.yaml" ps -q smart-city-hub-db 2>/dev/null)
if [ -n "$PROJECT_DB_CONTAINER" ]; then
    IS_RUNNING=$(docker inspect -f '{{.State.Running}}' "$PROJECT_DB_CONTAINER")
    if [ "$IS_RUNNING" == "true" ]; then
        echo "w> Found running 'smart-city-hub-db' container. Using it to run mongoimport."
        # When running inside the container, localhost refers to the container itself, which is correct for the DB.
        # However, if the user passed a remote URL, we should use it as is.
        # If the user passed localhost, we assume they mean the container's DB.
        
        # NOTE: If we use 'docker compose exec', we are INSIDE the container.
        # So 'localhost' works if the DB is in that container.
        run_import "solutioncompanies" "$JSON_COMPANY" "docker compose -f $SCRIPT_DIR/../../docker-compose.yaml exec -T smart-city-hub-db" "$MONGO_URL"
        run_import "solutionitems" "$JSON_SOLUTION" "docker compose -f $SCRIPT_DIR/../../docker-compose.yaml exec -T smart-city-hub-db" "$MONGO_URL"
        exit 0
    fi
fi

# 4. Fallback: Run ephemeral mongo container
echo "w> 'smart-city-hub-db' not running. Using ephemeral Docker container..."

# Adjust localhost for Docker Desktop (Mac/Windows)
# If MONGO_URL contains localhost/127.0.0.1, we might need to change it to host.docker.internal
# to access a DB running on the host machine (outside docker).
# But wait, if the DB was on the host, we wouldn't have found the docker container running.
# This case covers: User has a DB running somewhere (maybe another server, or host) but no local tools.

OS_NAME=$(uname -s)
if [[ "$OS_NAME" == "Darwin" ]] || [[ "$OS_NAME" =~ "MINGW" ]]; then
    if [[ "$MONGO_URL" == *"localhost"* ]] || [[ "$MONGO_URL" == *"127.0.0.1"* ]]; then
        echo "w> Detected MacOS/Windows and localhost URL."
        echo "w> Replacing 'localhost' with 'host.docker.internal' for Docker connectivity."
        MONGO_URL=${MONGO_URL/localhost/host.docker.internal}
        MONGO_URL=${MONGO_URL/127.0.0.1/host.docker.internal}
    fi
fi

# Run using a temporary mongo container
run_import "solutioncompanies" "$JSON_COMPANY" "docker run --rm -i mongo:4.4.3" "$MONGO_URL"
run_import "solutionitems" "$JSON_SOLUTION" "docker run --rm -i mongo:4.4.3" "$MONGO_URL"
