// HOC/withAuth.js
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      // Check if user is authenticated
      if (status === 'unauthenticated' && router.pathname !== '/') {
        router.push('/login'); // Redirect to login page if not authenticated and trying to access a protected route
      }
    }, [status, router]);

    // Allow access to homepage or if authenticated
    if (status === 'loading' || status === 'unauthenticated' && router.pathname === '/') {
      return <WrappedComponent {...props} />;
    }

    if (status === 'authenticated') {
      return <WrappedComponent {...props} />;
    }

    // Optionally, you can show a loading spinner or some placeholder while checking authentication
    return <div>Loading...</div>;
  };
};

export default withAuth;
