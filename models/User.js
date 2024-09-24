import mongoose from 'mongoose';
import argon2 from 'argon2';
import dbConnect from '@/utils/dbConnect';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
}, { timestamps: true });

// Pre-save hook to hash the password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    this.password = await argon2.hash(this.password); // Hash the password before saving
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method to compare password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await argon2.verify(this.password, candidatePassword); // Verify the password
  } catch (err) {
    throw new Error('Password comparison failed'); // Error handling for comparison failure
  }
};

// Static method to get user by email
UserSchema.statics.getUserByEmail = async function (email) {
  try {
    await dbConnect();  // Ensure database connection
    return await this.findOne({ email });  // Find user by email
  } catch (err) {
    throw new Error('Error finding user by email'); // Error handling for database lookup
  }
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
