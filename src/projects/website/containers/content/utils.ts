export function normaliseContentLink(link: string) {
  return link
    .replace('https://www.sussexstudent.com/', '/')
    .replace('https://sussexstudent.com/', '/');
}
