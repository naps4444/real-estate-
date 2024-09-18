import mongoose from 'mongoose';

const HouseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  popular: { type: Boolean, default: false },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  status: { type: String, enum: ['for sale', 'for rent'], required: true },
});

export default mongoose.models.House || mongoose.model('House', HouseSchema);
