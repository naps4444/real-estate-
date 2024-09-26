import React, { useState } from 'react';
import AvailableHouses from './AvailableHouses';
import NavBar from './NavBar';
import Find from './Find';

const FindHero = () => {
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState(''); // Changed propertyType to title
  const [bedrooms, setBedrooms] = useState(0);
  const [searchParams, setSearchParams] = useState({});

  const handleSearch = () => {
    // Set search parameters when the user clicks "Find Property"
    setSearchParams({ location, title, bedrooms }); // Include title in search params
  };

  return (
    <>
      <div className='h-[740px]'>
        <div className="bg-[url('/hediv.svg')] bg-cover bg-center h-full md:h-[700px] ">
          <NavBar />
          <Find 
            location={location} 
            setLocation={setLocation} 
            title={title} 
            setTitle={setTitle} 
            bedrooms={bedrooms} 
            setBedrooms={setBedrooms} 
            handleSearch={handleSearch} 
          />
        </div>
      </div>

      <div className='mt-5 lg:mt-20'>
        {/* Pass the search parameters to AvailableHouses */}
        <AvailableHouses 
          location={searchParams.location} 
          title={searchParams.title} // Pass title as search param
          bedrooms={searchParams.bedrooms}
        />
      </div>
    </>
  );
};

export default FindHero;
