import React from 'react';
import NavigationLink from '../reusable/UIKit/NavigationLink/NavigationLink';
import { logout } from '../../redux/actions/api';
import { actions as preferencesAPI } from '../../redux/PreferencesSlice';
import './Navbar.scss';
// import {
//   faHouseUser, faCommentDots, faSignOutAlt, faCog, faDoorOpen, faFeatherAlt,
// } from '@fortawesome/free-solid-svg-icons';

import { faHouseUser } from '@fortawesome/free-solid-svg-icons/faHouseUser';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons/faCommentDots';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons/faDoorOpen';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons/faFeatherAlt';

import withTranslation from '../reusable/withTranslation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

function Navbar({ user, logout, queryParams }) {
  const onLogout = () => logout();
  return (
    <nav>
      <p id="mainMenuLabel" className="srOnly">Main menu</p>
      <ul
        aria-labelledby="mainMenuLabel"
        className={classNames(
          'NavbarItems',
          { 'NavbarItems--mobile-invisible': queryParams.id || window.location.pathname === '/auth' },
        )}
      >
        {
                    user && user.isLoggedIn
                      ? (
                        <>
                          <li data-testid="profileBtn">
                            <NavigationLink to={`/profile/${user.id}`}>
                              <FontAwesomeIcon icon={faHouseUser} />
                            </NavigationLink>
                          </li>
                          <li>
                            <NavigationLink to="/story/create">
                              <FontAwesomeIcon icon={faFeatherAlt} />
                            </NavigationLink>
                          </li>
                          <li>
                            <NavigationLink to="/chat">
                              <FontAwesomeIcon icon={faCommentDots} />
                            </NavigationLink>
                          </li>
                          <li>
                            <NavigationLink to="/settings">
                              <FontAwesomeIcon icon={faCog} />
                            </NavigationLink>
                          </li>
                          <li data-testid="logoutBtn" onClick={onLogout} className="NavbarLogout">
                            <FontAwesomeIcon icon={faSignOutAlt} />
                          </li>
                        </>
                      )
                      : (
                        <li data-testid="registerBtn">
                          <NavigationLink to="/auth">
                            <FontAwesomeIcon icon={faDoorOpen} />
                          </NavigationLink>
                        </li>
                      )
}
      </ul>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  user: state.global.user,
  queryParams: state.global.queryParams,
});
const mapDispatchToProps = { logout, setNavbarVisibility: preferencesAPI.setNavbarVisibility };
export default withTranslation(Navbar, 'navbar', mapStateToProps, mapDispatchToProps);
