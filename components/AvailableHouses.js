
import Image from 'next/image';
import { PagesTopLoader } from 'nextjs-toploader/pages';
import { useEffect, useState, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Instagram } from 'react-content-loader'



export default function AvailableHouses({ location, status, bedrooms }) {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState({});
  const [likes, setLikes] = useState({});
  const [liked, setLiked] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState('default');
  const [totalHouses, setTotalHouses] = useState(0);

  
  const MyInstagramLoader = () => <Instagram />
 

  const housesPerPage = 10;
  const componentTopRef = useRef(null); // Reference for the top of the component

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams({
          page: currentPage,
          location: location || '',
          status: status || '',
          bedrooms: bedrooms || 1,
          sort: sortOption || 'default',
        });

        const res = await fetch(`/api/houses?${query.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch houses');

        const data = await res.json();
        setHouses(data.houses);
        setTotalPages(data.totalPages);
        setTotalHouses(data.totalHouses);

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

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHouses();
  }, [currentPage, sortOption, location, status, bedrooms]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const toggleCurrency = (houseId) => {
    setCurrency((prevCurrency) => ({
      ...prevCurrency,
      [houseId]: prevCurrency[houseId] === 'naira' ? 'dollar' : 'naira',
    }));
  };

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

  const scrollToTop = () => {
    componentTopRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to top of the component
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      scrollToTop(); // Scroll to top when page changes
    }
  };

  if (loading) return <div className='mx-auto w-10/12'><Instagram /></div>;
  if (error) return <p>{error}</p>;

  const start = (currentPage - 1) * housesPerPage + 1;
  const end = Math.min(currentPage * housesPerPage, totalHouses);

  return (
    <div ref={componentTopRef} className="available-houses"> {/* Reference the top */}
      
      <div className="flex items-center justify-between my-4 w-10/12 container mx-auto">
        <div className='flex gap-1 md:gap-2 font-semibold items-center'>
        <Image src="/filter.svg" width={20} height={20} alt='icon' />
          <p className='text-xs md:text-base'>More Filter</p>
          <p className='text-xs md:text-base'>Showing {start} to {end} of {totalHouses} results</p>
        </div>

        <div>
          <label htmlFor="sort" className="right-0 text-xs md:text-base">Sort by:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            className="border p-1 font-semibold w-[80px]"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="bedrooms-asc">Bedrooms: Fewest First</option>
            <option value="bedrooms-desc">Bedrooms: Most First</option>
          </select>
        </div>
      </div>

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

      <div className="flex justify-center mt-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-1 text-gray-500"
        >
          <IoIosArrowBack />
        </button>

        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => handlePageChange(page + 1)}
            className={`px-2 mx-1 ${page + 1 === currentPage ? 'bg-[#3D9970] text-white' : 'bg-white text-[#464646]'}`}
          >
            {page + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 mx-1 text-gray-500"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}
