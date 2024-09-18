import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the token from local storage

    if (!token) {
      // If no token is found, redirect to login
      router.push('/login');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };

    axios.get('/api/profile', config)
      .then((response) => {
        setProfileData(response.data); // Store the fetched profile data
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          // Token is expired or invalid, redirect to login
          localStorage.removeItem('token');
          router.push('/login');
        } else {
          setError('Error fetching profile');
        }
      });
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Email:</span> {profileData.email}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Name:</span> {profileData.name}
        </p>
      </div>
    </div>
  );
};

export default Profile;
