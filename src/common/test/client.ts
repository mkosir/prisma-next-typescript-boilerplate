const clientBase = async <T>(path: string, config: RequestInit): Promise<Response & { data: T }> => {
  const baseUrl = 'http://localhost:3000'; //process.env.NEXT_PUBLIC_BASE_URL

  const request = new Request(`${baseUrl}${path}`, config);
  const response = await fetch(request);
  const data: T = await response.json();

  //@ts-ignore - destructing native fetch response
  return { ...response[Object.getOwnPropertySymbols(response)[1]], data };
};

const get = async <T>(path: string, config?: RequestInit) => {
  const initConfig = { ...config, method: 'GET' };
  return await clientBase<T>(path, initConfig);
};

const post = async <T, U>(path: string, body: T, config?: RequestInit) => {
  const initConfig = {
    ...config,
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await clientBase<U>(path, initConfig);
};

const _delete = async <T>(path: string, config?: RequestInit) => {
  const initConfig = { ...config, method: 'DELETE' };
  return await clientBase<T>(path, initConfig);
};

export const client = {
  get,
  post,
  delete: _delete,
};
