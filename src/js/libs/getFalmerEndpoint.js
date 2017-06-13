// TODO: refactor to make more sense
export default function getFalmerEndpoint(forceProd = false) {
  if (typeof window === 'undefined') {
    return process.env.FALMER_ENDPOINT;
  }

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
