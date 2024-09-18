import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import HouseCard from './HouseCard';

export default function PopularHousesCarousel() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetchPopularHouses();
  }, []);

  const fetchPopularHouses = async () => {
    const { data } = await axios.get('/api/popular');
    setHouses(data.houses);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <Slider {...settings}>
      {houses.map((house) => (
        <HouseCard key={house._id} house={house} />
      ))}
    </Slider>
  );
}
