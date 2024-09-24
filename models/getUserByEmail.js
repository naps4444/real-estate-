// Import your User model
import User from './UserModel'; // Adjust the path to your actual model

// Function to get user by email
const getUserByEmail = async (email) => {
  try {
    // Find the user using an object with the email key
    const user = await User.findOne({ email }); // Ensure `User` is your Mongoose model
    return user;
  } catch (error) {
    throw new Error('Error fetching user by email');
  }
};

export default getUserByEmail;
