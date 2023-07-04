export function updateCategoryTag(value) {
  const key = "categoryTag";

  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, JSON.stringify([]));
  }

  if (Array.isArray(value)) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  return JSON.parse(localStorage.getItem(key));
}
