const dateFormat = (date, pos) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return [year, month, day].join(pos);
};

export { dateFormat };
