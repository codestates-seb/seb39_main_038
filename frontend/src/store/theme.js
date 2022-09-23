const size = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
};

const theme = {
  navColor: '182061',
  mainColor: '#16267D',
  fontColor: 'F4B504',
  mobile: `screen and (min-width: ${size.mobile})`,
  tablet: `screen and (min-width: ${size.tablet})`,
  desktop: `screen and (min-width: ${size.desktop})`,
};

export { theme };
