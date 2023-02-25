import { FC } from 'react';

export const AuthRouteGuard: FC<{ children: any }> = ({ children }) => {
  return <>{children}</>;
};
