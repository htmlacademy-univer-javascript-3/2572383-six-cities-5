import {useAppDispatch, useAppSelector} from '../../store';
import {AuthorizationStatus} from '../../enums/authorization-status.ts';
import {Link, useNavigate} from 'react-router-dom';
import {Path} from '../../enums/path.ts';
import {logoutAction} from '../../store/api-actions.ts';
import React from 'react';

function LoggedUser() {
  const userData = useAppSelector((state) => state.userData);
  const favorites = useAppSelector((state) => state.favorites.length);

  return (
    <Link to={Path.FavoritePage} className="header__nav-link header__nav-link--profile">
      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
      <span className="header__user-name user__name">
        {userData?.email}
      </span>
      <span className="header__favorite-count">{favorites}</span>
    </Link>
  );
}

function SignOutButton() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logoutAction()).then(() => navigate(Path.MainPage));
  };

  return (
    <li className="header__nav-item">
      <a href="#" className="header__nav-link" onClick={handleClick}>
        <span className="header__signout">Sign out</span>
      </a>
    </li>
  );
}


function SignInButton() {
  return (
    <Link to={Path.LoginPage} className="header__nav-link header__nav-link--profile">
      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
      <span className="header__login">Sign in</span>
    </Link>
  );
}


export function HeaderNav() {
  const isAuthorized = useAppSelector((state) => state.authorizationStatus) === AuthorizationStatus.Auth;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          {isAuthorized ? <LoggedUser/> : <SignInButton/>}
        </li>
        {isAuthorized ? <SignOutButton/> : null}
      </ul>
    </nav>
  );
}
