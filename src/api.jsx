const baseUrl = "https://frontend-take-home-service.fetch.com";

export const get = async (url, qParams = {}) => {
  const queryParams = new URLSearchParams();
  Object.keys(qParams).forEach((key) => {
    if (qParams[key] instanceof Array) {
      qParams[key].forEach((value) => queryParams.append(key, value));
    } else {
      queryParams.append(key, qParams[key]);
    }
  });
  try {
    const response = await fetch(`${baseUrl}/${url}?${queryParams}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
};

export const post = async (url, bodyData = {}) => {
  try {
    const response = await fetch(`${baseUrl}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(bodyData),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
