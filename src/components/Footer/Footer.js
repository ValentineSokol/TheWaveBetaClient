import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      © Vallion, Shenkerina 2018-
      {currentYear}
    </footer>
  );
}
export default Footer;
