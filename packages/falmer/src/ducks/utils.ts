export function apiQuery(query: Object, variables = {}) {
  const token = localStorage.getItem('token');
  return fetch('/graphql/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Falmer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then((res) => res.json());
}
