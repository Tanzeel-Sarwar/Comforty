const HARDCODED_USERNAME = "admin"
const HARDCODED_PASSWORD = "admin321"

export async function verifyPassword(password: string, storedPassword: string) {
  // Direct string comparison for hardcoded password
  return password === storedPassword
}

export function verifyCredentials(username: string, password: string) {
  // Check against hardcoded username and password
  return username === HARDCODED_USERNAME && password === HARDCODED_PASSWORD
}
