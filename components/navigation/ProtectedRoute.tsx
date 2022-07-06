import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthUserContext';

interface IProtectedRoutes {
  protectedRoutes: string[],
  routesAnonymousCanAcess: string[],
  children: React.ReactElement<any>,
}

function ProtectedRoute({protectedRoutes, children, routesAnonymousCanAcess}: IProtectedRoutes) {
  const { authUser, loading, anonymousSignIn } = useAuth();
  const router = useRouter();
  const isAnonymousUserNeeded = routesAnonymousCanAcess.indexOf(router.pathname)  !== -1;
  const isPathProtected = protectedRoutes.indexOf(router.pathname) !== -1;
  useEffect(() => {
    if (!loading && !authUser && isAnonymousUserNeeded) {
      anonymousSignIn();
    } else if (!loading && !authUser && isPathProtected) router.push('/');
  }, [authUser, loading, router, isPathProtected, isAnonymousUserNeeded, anonymousSignIn])
  if (loading && !authUser && isPathProtected) {
    return <> <h1>This path is protected</h1> </>
  }

  return children;
  
}


export default ProtectedRoute;