import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { email, password, name } = req.body;

    try {
      const user = await User.create({ email, password, name });
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
