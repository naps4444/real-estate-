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
    this.password = await argon2.hash(this.password);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method to compare password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await argon2.verify(this.password, candidatePassword);
  } catch (err) {
    throw new Error('Password comparison failed');
  }
};

// Static method to get user by email
UserSchema.statics.getUserByEmail = async function (email) {
  try {
    await dbConnect();
    return await this.findOne({ email });
  } catch (err) {
    throw new Error('Error finding user by email');
  }
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
