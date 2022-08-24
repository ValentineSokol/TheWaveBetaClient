import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faVk } from '@fortawesome/free-brands-svg-icons';

function SocialLogin({ classNames }) {
  return (
    <div className={`SocialLoginWrapper ${classNames}`}>
      <a href="/auth/google" className="SocialLogin m-1" id="GoogleLoginButton">
        {' '}
        <FontAwesomeIcon icon={faGoogle} />
      </a>
      <a aria-label="Login with Facebook" href="/auth/facebook" className="SocialLogin m-1" id="FacebookLoginButton"><FontAwesomeIcon icon={faFacebook} /></a>
      <a aria-label="Login with VK" href="/auth/vk" className="SocialLogin m-1" id="VKLoginButton"><FontAwesomeIcon icon={faVk} /></a>
    </div>
  );
}

SocialLogin.propTypes = {
  classNames: PropTypes.string,
};

SocialLogin.defaultProps = {
  classNames: '',
};
export default SocialLogin;
