import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Instagram } from 'react-content-loader';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { HiOutlineArrowSmLeft } from "react-icons/hi";

export default function PopularHouses() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leftArrowColor, setLeftArrowColor] = useState('white');
  const [rightArrowColor, setRightArrowColor] = useState('white');

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/houses/popular`);
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

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1280 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="popular-houses container w-10/12 mx-auto">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        showDots={false}
        arrows={true}
        transitionDuration={500}
        customTransition="all 0.5s"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        containerClass="carousel-container"
        rtl={false ? true : undefined}
        customLeftArrow={
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#F4F4F4] hover:bg-[#3D9970] bg-opacity-50 p-2 rounded-full"
            onClick={() => {
              setLeftArrowColor('red');
              setTimeout(() => setLeftArrowColor('white'), 300);
            }}
          >
            <HiOutlineArrowSmLeft color="black" size={24} />
          </button>
        }
        customRightArrow={
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#F4F4F4] hover:bg-[#3D9970] bg-opacity-50 p-2 rounded-full"
            onClick={() => {
              setRightArrowColor('red');
              setTimeout(() => setRightArrowColor('white'), 300);
            }}
          >
            <HiOutlineArrowSmRight color="black" size={24} />
          </button>
        }
      >
        {houses.map((house) => (
          <div key={house._id} className="house-card p-4">
            <div className="relative text-white rounded-t-lg">
              <Image
                src={house.image}
                alt={house.title}
                width={400}
                height={300}
                className="w-[300px] rounded-t-lg"
              />
              <div className="px-4 w-full pb-5 pt-2 absolute bg-opacity-[0.01] backdrop-blur-sm bottom-0">
                <h3 className="text-xl font-semibold">{house.title}</h3>
                <div className="mt-3">
                  <p className="text-white font-semibold">
                    {`₦${house.price.toLocaleString()}`}
                  </p>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex">
                    <p>{house.bedrooms} Bed</p>
                  </div>
                  <div className="flex py-1 px-3 border-x-[1px] border-white">
                    <p>{house.bathrooms} Bath</p>
                  </div>
                  <div className="flex">
                    <p>{house.sqft} sq ft</p>
                  </div>
                </div>
                <div className="flex text-white items-center gap-2 mt-1">
                  <Image
                    src="/phloc.svg"
                    width={10}
                    height={10}
                    alt="location icon"
                  />
                  <p className="text-white">{house.location}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
