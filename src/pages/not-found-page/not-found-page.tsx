import HeaderWithNav from '../layouts/header/header-with-nav.tsx';
import {Link} from 'react-router-dom';
import {Path} from '../../enums/path.ts';

export default function NotFoundPage() {
  return (
    <>
      <HeaderWithNav/>
      <p>404 not found</p>
      <Link to={Path.MainPage}>Return to main</Link>
    </>
  );
}
