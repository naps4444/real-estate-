import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import { verifyToken } from '@/middleware/auth';

export default async function handler(req, res) {
  // Connect to the database
  await dbConnect();

  // Check for GET request method
  if (req.method === 'GET') {
    // Verify JWT token
    verifyToken(req, res, async () => {
      try {
        // Fetch user information using the ID decoded from the token
        const user = await User.findById(req.user.id).select('-password'); // Avoid returning sensitive fields like password

        // Check if user exists
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        // Return user information
        return res.status(200).json({ user });
      } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  } else {
    // Handle unsupported methods
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
