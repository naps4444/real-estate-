import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from local storage

    if (!token) {
      // If no token, redirect to login
      router.push('/login');
      return;
    }

    const fetchProfileData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to Authorization header
          },
        };

        const response = await axios.get('/api/profile', config);
        setProfileData(response.data); // Set fetched profile data
      } catch (err) {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          // If token is invalid or expired, clear it and redirect to login
          localStorage.removeItem('token');
          router.push('/login');
        } else {
          setError('Failed to fetch profile. Please try again later.');
        }
      } finally {
        setLoading(false); // Stop loading when request is done
      }
    };

    fetchProfileData(); // Fetch profile data on component mount
  }, [router]); // Ensure router dependency is added

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Display error if present
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
