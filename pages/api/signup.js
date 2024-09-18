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

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const user = new User({ email, password, name });
    await user.save();

    return res.status(201).json({ message: 'User created successfully' });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
