// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postFetch = async <T>(url: string, body: any): Promise<T> => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

  return response as T;
};
