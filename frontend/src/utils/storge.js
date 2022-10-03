const storge = {
  getData: (key) => {
    return JSON.parse(sessionStorage.getItem(key));
  },
  setData: (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
};

export { storge };
