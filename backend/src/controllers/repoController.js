export function createRepository(req, res) {
  res.send("Repository created!");
}
export function fetchAllRepositories(req, res) {
  res.send("Fetch all repository!");
}
export function updateRepositoryById(req, res) {
  res.send("Repository updated!");
}
export function deleteRepositoryById(req, res) {
  res.send("Repository deleted!");
}
export function fetchRepositoryByName(req, res) {
  res.send("Repository fetched by name!");
}
export function fetchRepositoryById(req, res) {
  res.send("Repository fetched by id!");
}
export function toggleVisibility(req, res) {
  res.send("Toggled visibility!");
}
export function fetchCurrentUserRepository(req, res) {
  res.send("Current user repo fetched!");
}
