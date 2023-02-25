const BaseURL = "https://localhost:7257/api/Test";

const fetchOptions = (type, data) => {
  return {
    method: type,
    cache: "no-cache",
    body: data,
  };
};

export const postQuery = async (URL, data) => {
  const API_URL = `${BaseURL}${URL}`;
  const options = fetchOptions("POST", data);
  return fetch(API_URL, options).then((response) => {
    return response.json();
  });
};

export const getQuery = async (URL) => {
  const API_URL = `${BaseURL}${URL}`;
  return await fetch(API_URL).then((response) => {
    return response.json();
  });
};
