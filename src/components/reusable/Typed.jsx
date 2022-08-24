import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TypedJs from 'typed.js';

function Typed({
  strings, typeSpeed = 70, backSpeed = 70, loop, loopCount = Infinity, showCursor = true,
}) {
  const typedContainerRef = useRef(null);
  useEffect(
    () => {
      const typed = new TypedJs(typedContainerRef.current, {
        strings: Array.isArray(strings) ? strings : [strings],
        typeSpeed,
        backSpeed,
        loop,
        loopCount,
        showCursor,
      });
      return () => typed.destroy();
    },
    [strings, typeSpeed, backSpeed, loop, loopCount, showCursor],
  );
  return <span ref={typedContainerRef} className="TypedContainer" />;
}

Typed.propTypes = {
  strings: PropTypes.arrayOf(PropTypes.string).isRequired,
  typeSpeed: PropTypes.number,
  backSpeed: PropTypes.number,
  loop: PropTypes.bool,
  loopCount: PropTypes.number,
  showCursor: PropTypes.bool,
};

Typed.defaultProps = {
  typeSpeed: 70,
  backSpeed: 70,
  loop: false,
  loopCount: Infinity,
  showCursor: true,
};
export default React.memo(Typed);
