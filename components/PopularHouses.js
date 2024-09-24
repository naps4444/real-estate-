import { useEffect, useState } from 'react';
import { Instagram } from 'react-content-loader';
import PopularHousesCarousel from './PopularHousesCarousel';

export default function PopularHouses() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/houses/popular');
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
  }, []);

  if (loading) return <div className="mx-auto w-10/12"><Instagram /></div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="popular-houses">

      <div className='w-10/12 mx-auto mt-20'>
        <h1 className='text-[26px] lg:text-[32px] text-center mx-auto font-semibold'>Discover Our Popular Properties</h1>
      </div>


      <div className='py-12'>      
      <PopularHousesCarousel houses={houses} />
      </div>
    </div>
  );
}
