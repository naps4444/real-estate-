import React from 'react';
import Image from 'next/image';

const Find = ({ location, setLocation, title, setTitle, bedrooms, setBedrooms, handleSearch }) => {
  return (
    <>
      <div className="w-10/12 container mx-auto ">
        <div className='flex flex-col justify-center items-center text-white md:py-8 lg:py-14'>
          <h1 className='tracking-wide text-[45px] text-center font-bold md:mt-8'>Browse Our Properties</h1>
          <p className='text-[18px] text-center py-3 md:py-8 md:w-6/12'>Find your perfect home among our curated properties. Start browsing now!</p>
        </div>

        <div className='p-4 bg-[#FFFFFF33] flex flex-col md:flex-row mt-10 z-20'>
          <div className='py-4 bg-white md:w-9/12'>
            <div className='grid grid-cols-1 lg:grid-cols-3 bg-white z-20'>
              <div className='px-8 py-4 md:py-0 flex flex-col justify-center items-center lg:block'>
                <h1 className='text-center lg:text-left font-semibold'>LOCATION</h1>
                <input 
                  type='text' 
                  placeholder='eg. Gbagada' 
                  className='lg:w-full px-3 md:px-0 border-white lg:mx-0'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className='px-4 flex flex-col justify-center items-center border-x border-[#CAD4DE]'>
                <h1 className='font-semibold'>TITLE</h1> {/* Changed from PROPERTY TYPE to TITLE */}
                <input 
                  type='text' 
                  placeholder='eg. Apartment, House' // Update placeholder for title
                  className='px-3 border-white md:px-0'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className='px-4 py-4 md:py-0 flex flex-col justify-center items-center'>
                <h1 className='font-semibold'>BEDROOM</h1>
                <div className='counter flex justify-center items-center gap-6'>
                  <button onClick={() => setBedrooms(bedrooms > 1 ? bedrooms - 1 : 1)}>
                    <Image src="/nege.svg" alt='negative icon' width={20} height={20} />
                  </button>
                  {bedrooms}
                  <button onClick={() => setBedrooms(bedrooms + 1)}>
                    <Image src="/posi.svg" alt='positive icon' width={20} height={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='px-4 py-4 md:py-0 flex flex-col justify-center items-center md:w-3/12 bg-[#3D9970]'>
            <button onClick={handleSearch} className='text-white'>Find Property</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Find;
