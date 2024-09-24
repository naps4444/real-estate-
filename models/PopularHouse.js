import mongoose from 'mongoose';

const popularHouseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  sqft: { type: Number, required: true }, // Make sure to include this if it's required
}, {
  timestamps: true,
});

export default mongoose.models.PopularHouse || mongoose.model('PopularHouse', popularHouseSchema);
