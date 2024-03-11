const generateApiUri = (baseUri, endpoint, queryParams) => {
  const apiUri = new URL(endpoint, baseUri);

  if (queryParams) {
    for (const key in queryParams) {
      if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
        apiUri.searchParams.append(key, queryParams[key]);
      }
    }
  }

  return apiUri.toString();
};

export default generateApiUri;
