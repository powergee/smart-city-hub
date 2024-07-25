## DB 초기화

```
docker create -v /workspaces/smart-city-hub/.devcontainer/db:/data/db --name smart-city-hub-db -p 27017:27017 -e MONGO_INITDB_DATABASE=smarthub mongo:4.4.1
docker start smart-city-hub-db
```
