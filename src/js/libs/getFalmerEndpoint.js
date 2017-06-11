export default function getFalmerEndpoint(forceProd = false) {
  if (forceProd) {
    return 'https://falmer.sussexstudent.com';
  }

  if (process.env.NODE_ENV === 'production') {
    return process.env.FALMER_ENDPOINT;
  }

  return window.location.pathname.startsWith('/~/')
    ? process.env.FALMER_ENDPOINT
    : 'https://falmer.sussexstudent.com';
}
