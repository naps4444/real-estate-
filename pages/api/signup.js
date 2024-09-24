import jwt from 'jsonwebtoken'; // For generating JWT
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { email, password, name } = req.body;

    // Validate request
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Create new user
      const newUser = await User.create({
        email,
        password, // Store the raw password; it will be hashed in the pre-save hook
        name,
      });

      // Check if JWT_SECRET is defined
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email }, // Payload
        process.env.JWT_SECRET, // Secret key
        { expiresIn: '1h' } // Expiration time
      );

      // Return success message and token
      return res.status(201).json({ message: 'User created successfully', token });

    } catch (err) {
      console.error('Error during signup:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
