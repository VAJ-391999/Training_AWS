export const responseHandler = (error: boolean, response: any) => {
  return {
    statusCode: response.statusCode,
    body: JSON.stringify({
      error: error,
      message: response.message,
      data: response.data,
    }),
  };
};
