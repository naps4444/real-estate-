import House from '@/models/House';
import dbConnect from '@/utils/dbConnect';

export default async function handler(req, res) {
  // Connect to the database
  await dbConnect();

  if (req.method === 'POST') {
    try {
      // Extract house data from the request body
      const { title, price, location, image, popular, bedrooms, bathrooms, status } = req.body;

      // Validate the required fields
      if (!title || !price || !location || !image || !bedrooms || !bathrooms || !status) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Create a new house object
      const newHouse = new House({
        title,
        price,
        location,
        image,
        popular: popular || false, // Set to false if not provided
        bedrooms,
        bathrooms,
        status,
      });

      // Save the house to the database
      await newHouse.save();

      // Respond with the newly created house
      return res.status(201).json({ message: 'House created successfully', house: newHouse });
    } catch (error) {
      console.error('Error creating house:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } 
  
  // Handle GET request (existing code)
  else if (req.method === 'GET') {
    try {
      // Extract query parameters from the request
      const { page = 1, sort, status } = req.query;
      const pageSize = 9; // Number of houses per page
      const skip = (page - 1) * pageSize; // Calculate how many documents to skip

      // Build the query based on the status filter
      let query = {};
      if (status) {
        query.status = status; // e.g., 'for sale' or 'for rent'
      }

      // Define sorting options based on the query parameter
      const sortOptions = {};
      if (sort === 'price-asc') sortOptions.price = 1; // Ascending order by price
      if (sort === 'price-desc') sortOptions.price = -1; // Descending order by price

      // Fetch houses from the database with pagination, filtering, and sorting
      const houses = await House.find(query)
        .skip(skip) // Skip documents for pagination
        .limit(pageSize) // Limit the number of documents per page
        .sort(sortOptions); // Sort houses by price

      // Get the total count of houses for pagination
      const totalHouses = await House.countDocuments(query);
      const totalPages = Math.ceil(totalHouses / pageSize);

      // Respond with the fetched houses and pagination info
      return res.status(200).json({
        houses,
        currentPage: page,
        totalPages,
        totalHouses,
      });
    } catch (error) {
      console.error('Error fetching houses:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } 
  
  // Handle unsupported HTTP methods
  else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
