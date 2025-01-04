import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { Path } from '../../enums/path.ts';
import {useAppSelector} from '../../store';
import {selectIsAuthorized} from '../../store/user/user-selectors.ts';

export default function PrivateRoute(props: PropsWithChildren) {
  const isAuthorized = useAppSelector(selectIsAuthorized);
  return isAuthorized ? props.children : <Navigate to={Path.LoginPage} replace />;
}
