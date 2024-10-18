import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { Path } from '../../enums/path.ts';

interface PrivateRouteProps extends PropsWithChildren {
  isAuthorized: boolean;
}

export default function PrivateRoute(props: PrivateRouteProps) {
  return props.isAuthorized ? props.children : <Navigate to={Path.LoginPage} replace />;
}
