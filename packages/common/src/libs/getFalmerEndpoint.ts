export default function getFalmerEndpoint(): string {
  const serverSide = typeof localStorage === 'undefined';

  const clientEndpoint = serverSide
    ? null
    : window.localStorage.getItem('falmerEndpoint');

  return clientEndpoint === null
    ? 'https://falmer.sussexstudent.com'
    : clientEndpoint;
}
