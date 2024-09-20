import Image from 'next/image';
import { useEffect, useState } from 'react';


export default function AvailableHouses({ location, status, bedrooms }) {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState({});
  const [likes, setLikes] = useState({});
  const [liked, setLiked] = useState({});
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    const fetchHouses = async (page) => {
      try {
        setLoading(true); // Start loading state

        // Prepare query parameters
        const query = new URLSearchParams({
          page: page,
          location: location || '', // Send empty string if no value
          status: status || '',
          bedrooms: bedrooms || 1,
        });

        const res = await fetch(`/api/houses?${query.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch houses');

        const data = await res.json();
        setHouses(data.houses);
        setTotalPages(data.totalPages); // Update total pages from response

        // Initialize likes, currency, and liked state for each house
        const initialLikes = {};
        const initialCurrency = {};
        const initialLiked = {};
        data.houses.forEach((house) => {
          initialLikes[house._id] = 0;
          initialCurrency[house._id] = 'naira';
          initialLiked[house._id] = false;
        });
        setLikes(initialLikes);
        setCurrency(initialCurrency);
        setLiked(initialLiked);

        setLoading(false); // End loading state
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHouses(currentPage); // Fetch houses on page load and whenever the page changes
  }, [currentPage, location, status, bedrooms]); // Trigger on search parameters

  // Handle currency toggle for individual house
  const toggleCurrency = (houseId) => {
    setCurrency((prevCurrency) => ({
      ...prevCurrency,
      [houseId]: prevCurrency[houseId] === 'naira' ? 'dollar' : 'naira',
    }));
  };

  // Handle liking a house and toggling the like button's state
  const likeHouse = (houseId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [houseId]: prevLikes[houseId] + 1,
    }));

    setLiked((prevLiked) => ({
      ...prevLiked,
      [houseId]: !prevLiked[houseId],
    }));
  };

  if (loading) return <p>Loading houses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="available-houses">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-10/12 mx-auto">
        {houses.map((house) => (
          <div key={house._id} className="house-card border">
            <img src={house.image} alt={house.title} className="w-full object-cover rounded-t-lg" />
            <div className="px-4">
              <div className="py-4">
                <h3 className="text-xl font-semibold">{house.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Image src="/loc.svg" width={10} height={10} alt="location icon" />
                  <p className="text-gray-600">{house.location}</p>
                </div>
                <div className="flex items-center gap-8 mt-4">
                  <div className="flex items-center gap-2">
                    <Image src="/bed.svg" width={20} height={10} alt="bedroom icon" />
                    <p>{house.bedrooms} Bedrooms</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image src="/bath.svg" width={20} height={10} alt="bathroom icon" />
                    <p>{house.bathrooms} Bathrooms</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t-[1px] border-[#E8E8E8] py-4 mt-1">
                <p className="text-gray-800 font-semibold">
                  {currency[house._id] === 'naira' ? `₦${house.price.toLocaleString()}` : `$${(house.price / 700).toFixed(2)}`}
                </p>

                <div className="flex gap-3 items-center">
                  <button onClick={() => toggleCurrency(house._id)} className="text-sm text-blue-500 underline">
                    <Image src="/curr.svg" width={20} height={10} alt="currency icon" />
                  </button>
                  <button onClick={() => shareCard(house)} className="text-sm text-blue-500 underline">
                    <Image src="/share.svg" width={20} height={10} alt="share icon" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => likeHouse(house._id)}
                      className={`text-sm text-white ${liked[house._id] ? 'bg-red-500' : 'bg-white'} p-1 rounded-full`}
                    >
                      <Image src="/like.svg" width={20} height={10} alt="like icon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div>
      
      </div>
      
    </div>
  );
}
