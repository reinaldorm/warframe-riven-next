export function startsWith(str: string, sub: string) {
  return str.substring(0, sub.length).toLowerCase() === sub.toLowerCase();
}
