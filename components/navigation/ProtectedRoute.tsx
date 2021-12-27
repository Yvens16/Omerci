import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthUserContext';

interface IProtectedRoutes {
  protectedRoutes: string[],
  children: React.ReactElement<any>,
}

function ProtectedRoute({protectedRoutes, children}: IProtectedRoutes) {
  const { authUser, loading } = useAuth();
  const router = useRouter();
  const isPathProtected = protectedRoutes.indexOf(router.pathname) !== -1;
  useEffect(() => {
    if (!loading && !authUser && isPathProtected) router.push('/');
  }, [authUser, loading, router, isPathProtected])

  if (loading && !authUser && isPathProtected) {
    return <> <h1>This path is protected</h1> </>
  }

  return children;
  
}


export default ProtectedRoute;