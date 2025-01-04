import {useAppDispatch} from '../../store';
import React from 'react';
import {logoutAction} from '../../store/api-actions.ts';

export function SignOutButton() {
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <li className="header__nav-item">
      <a href="#" className="header__nav-link" onClick={handleClick}>
        <span className="header__signout">Sign Out</span>
      </a>
    </li>
  );
}
