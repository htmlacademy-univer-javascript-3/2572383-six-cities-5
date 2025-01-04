import {useAppSelector} from '../../store';
import {SignInButton} from '../sign-in-button/sign-in-button.tsx';
import {SignOutButton} from '../sign-out-button/sign-out-button.tsx';
import {selectIsAuthorized} from '../../store/user/user-selectors.ts';
import {LoggedUser} from '../logged-user/logged-user.tsx';


export function HeaderNav() {
  const isAuthorized = useAppSelector(selectIsAuthorized);

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
