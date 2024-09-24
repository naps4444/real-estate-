import PopularHouse from '@/models/PopularHouse';
import dbConnect from '@/utils/dbConnect';

export default async function handler(req, res) {
  // Connect to the database
  await dbConnect();

  if (req.method === 'POST') {
    try {
      // Extract house data from the request body
      const { title, price, location, image, bedrooms, bathrooms, sqft } = req.body;

      // Validate the required fields
      if (!title || !price || !location || !image || !bedrooms || !bathrooms || !sqft) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Create a new popular house object
      const newPopularHouse = new PopularHouse({
        title,
        price,
        location,
        image,
        bedrooms,
        bathrooms,
        sqft,
      });

      // Save the popular house to the database
      await newPopularHouse.save();

      // Respond with the newly created popular house
      return res.status(201).json({ message: 'Popular house created successfully', house: newPopularHouse });
    } catch (error) {
      console.error('Error creating popular house:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } 
  
  // Handle GET request for popular houses
  else if (req.method === 'GET') {
    try {
      const { page = 1 } = req.query;
      const pageSize = 4; // Number of popular houses to fetch
      const skip = (page - 1) * pageSize; // Calculate how many documents to skip

      // Fetch popular houses from the database with pagination
      const houses = await PopularHouse.find({})
        .skip(skip) // Skip documents for pagination
        .limit(pageSize) // Limit to 4 houses
        .sort({ createdAt: -1 }); // Optionally sort by creation date or another field

      // Get the total count of popular houses for pagination
      const totalHouses = await PopularHouse.countDocuments();
      const totalPages = Math.ceil(totalHouses / pageSize);

      // Respond with the fetched houses and pagination info
      return res.status(200).json({
        houses,
        currentPage: page,
        totalPages,
        totalHouses,
      });
    } catch (error) {
      console.error('Error fetching popular houses:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } 
  
  // Handle unsupported HTTP methods
  else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
