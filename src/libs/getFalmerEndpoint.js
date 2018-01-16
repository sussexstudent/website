// TODO: refactor to make more sense
export default function getFalmerEndpoint(forceProd = false) {
  if (typeof window === 'undefined') {
    return process.env.FALMER_ENDPOINT;
  }

  if (forceProd) {
    return 'https://falmer.sussexstudent.com';
  }

  return process.env.FALMER_ENDPOINT;
}
