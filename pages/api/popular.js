import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Instagram } from 'react-content-loader';
import Slider from 'react-slick';

export default function PopularHouses() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams({
          page: currentPage,
        });

        const res = await fetch(`/api/houses/popular?${query.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch houses');

        const data = await res.json();
        setHouses(data.houses);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHouses();
  }, [currentPage]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Number of slides to show at a time
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) return <div className='mx-auto w-10/12'><Instagram /></div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="popular-houses w-10/12 mx-auto">
      <Slider {...settings}>
        {houses.map((house) => (
          <div key={house._id} className="house-card border relative text-white p-2">
            <Image
              src={house.image}
              alt={house.title}
              width={300}
              height={300}
              className="w-auto h-auto rounded-t-lg"
            />
            <div className="px-4 w-full pb-5 pt-2 absolute bg-opacity-5 backdrop-blur-sm bottom-1">
              <h3 className="text-xl font-semibold">{house.title}</h3>
              <p className="text-white font-semibold mt-3">
                {`₦${house.price.toLocaleString()}`}
              </p>
              <div className="flex items-center gap-4 mt-1">
                <p>{house.bedrooms} Bed</p>
                <p className="py-1 px-3 border-x-[1px] border-white">{house.bathrooms} Bath</p>
                <p>{house.sqft} sq ft</p>
              </div>
              <div className="flex text-white items-center gap-2 mt-1">
                <Image src="/phloc.svg" width={10} height={10} alt="location icon" />
                <p>{house.location}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
