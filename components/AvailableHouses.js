import { useEffect, useState } from 'react';

export default function AvailableHouses() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const res = await fetch('/api/houses');
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

  if (loading) return <p>Loading houses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="available-houses grid grid-cols-1 md:grid-cols-3 gap-4">
      {houses.map((house) => (
        <div key={house._id} className="house-card border p-4">
          <img src={house.image} alt={house.title} className="w-full h-48 object-cover" />
          <h3 className="text-xl font-semibold mt-2">{house.title}</h3>
          <p className="text-gray-600">{house.location}</p>
          <p className="text-gray-800 font-semibold">₦{house.price.toLocaleString()}</p>
          <p>{house.bedrooms} Bedrooms, {house.bathrooms} Bathrooms</p>
          <p>Status: {house.status}</p>
        </div>
      ))}
    </div>
  );
}
