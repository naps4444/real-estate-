import House from '@/models/House';
import dbConnect from '@/utils/dbConnect';

export default async function handler(req, res) {
  await dbConnect();

  const houses = await House.find({ popular: true }).limit(4);

  return res.status(200).json({ houses });
}
