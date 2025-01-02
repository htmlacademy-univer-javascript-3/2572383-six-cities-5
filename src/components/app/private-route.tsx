import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { Path } from '../../enums/path.ts';
import {useAppSelector} from '../../store';
import {AuthorizationStatus} from '../../enums/authorization-status.ts';

export default function PrivateRoute(props: PropsWithChildren) {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return authorizationStatus === AuthorizationStatus.Auth ? props.children : <Navigate to={Path.LoginPage} replace />;
}
