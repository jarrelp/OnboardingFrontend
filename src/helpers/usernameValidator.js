// export function usernameValidator(username) {
//   const re = /\S+@\S+\.\S+/;
//   if (!username) return "Username can't be empty.";
//   if (!re.test(username)) return "Ooops! We need a valid username address.";
//   return "";
// }

export function usernameValidator(username) {
  if (!username) return "Username can't be empty.";
  return "";
}
