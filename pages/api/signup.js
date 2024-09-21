import bcrypt from 'bcryptjs'; // Use bcryptjs for hashing
import jwt from 'jsonwebtoken'; // For generating JWT
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { email, password, name, lastName } = req.body;

    // Validate request
    if (!email || !password || !name || !lastName) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = await User.create({
        email,
        password: hashedPassword,
        name,
        lastName,
      });

      // Check if JWT_SECRET is defined
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
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
