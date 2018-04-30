export default function getFalmerEndpoint() {
  const serverSide = typeof localStorage === 'undefined';

  const clientEndpoint = serverSide
    ? null
    : window.localStorage.getItem('falmerEndpoint');

  return clientEndpoint === null
    ? 'https://falmer.su.280canvas.com'
    : clientEndpoint;
}
