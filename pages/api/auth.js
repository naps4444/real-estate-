import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      // Log the login attempt for debugging
      console.log('Login attempt:', { email });

      // Find the user in the database
      const user = await User.findOne({ email });
      console.log('User found:', user);

      // Check if user exists
      if (!user) {
        console.error(`Login attempt with non-existent user: ${email}`);
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password from input:', password);
      console.log('Password stored in DB:', user.password); // This should be hashed

      if (!isMatch) {
        console.error(`Invalid password for user: ${email}`);
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Return the token
      return res.status(200).json({ token });
    } catch (error) {
      console.error('Error during login:', error); // Log the error
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
