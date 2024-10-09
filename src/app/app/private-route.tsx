import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  isAuthorized: boolean;
  children: React.JSX.Element;
}

export default function PrivateRoute(props: PrivateRouteProps) {
  return props.isAuthorized ? props.children : <Navigate to="/login" replace />;
}
