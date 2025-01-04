import {Link} from 'react-router-dom';
import {Path} from '../../enums/path.ts';

export function SignInButton() {
  return (
    <Link to={Path.LoginPage} className="header__nav-link header__nav-link--profile">
      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
      <span className="header__login">Sign in</span>
    </Link>
  );
}
