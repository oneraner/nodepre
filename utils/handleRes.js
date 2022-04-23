export const handleSuccess = (res, data) => {
  res.status(200).json(data);
};

export const handleError = (res, data) => {
  res.status(500).json(data);
};
