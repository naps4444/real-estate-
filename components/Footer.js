import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <>
      <div className='bg-[#035A33]'>
        <div className='w-10/12 py-12 mx-auto text-white flex flex-col md:flex-row justify-between'>
          <div className='md:w-5/12 flex flex-col gap-4'>
            <div className="flex items-center gap-3">
              <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#4BA586]">
                <Image src="/bhp.png" width={25} height={25} alt="logo" />
              </div>
              <h1 className="text-[22px] font-semibold">BetaHouse</h1>
            </div>

            <div className='mt-2 lg:w-[320px]'>
              <p>
                Discover, rent, and find your ideal home hassle-free with BetaHouse. Take control of your rental journey today!
              </p>
            </div>

            <div className='flex flex-col gap-3 mt-2'>
              <div className='flex gap-4 items-center'>
                <Image src="/icon1.svg" width={10} height={10} alt='icon' />
                <p>
                  95 Tinubu Estate, Lekki, Lagos
                </p>
              </div>
              <div className='flex gap-4 items-center'>
                <Image src="/icon2.svg" width={10} height={10} className='' alt='icon' />
                <p>
                  +234 675 8935 675
                </p>
              </div>
              <div className='flex gap-4 items-center'>
                <Image src="https://res.cloudinary.com/dpm3yp0xs/image/upload/v1727194028/Vector_3_mdxsr5.png" width={10} height={10} alt='icon' className='w-3 h-3' />
                <p>
                  support@rentbetahouse.com
                </p>
              </div>
            </div>
          </div>

          <div className='md:w-7/12 grid grid-cols-3 lg:grid-cols-3 gap-4 mt-10 md:mt-0 md:gap-0'>
            <div>
              <p className='font-semibold text-[20px]'>
                Quick Links
              </p>
              <ul className='flex flex-col gap-4 mt-2'>
                <li><a href="#">Home</a></li>
                <li><a href="#">Properties</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact us</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>

            <div>
              <p className='font-semibold text-[20px]'>
                More
              </p>
              <ul className='flex flex-col gap-4 mt-2'>
                <li><a href="#">Agents</a></li>
                <li><a href="#">Affordable Houses</a></li>
                <li><a href="#">FAQ’s</a></li>
              </ul>
            </div>

            <div>
              <p className='font-semibold text-[20px]'>
                Popular Search
              </p>
              <ul className='flex flex-col gap-4 mt-2'>
                <li><a href="#">Apartment for sale</a></li>
                <li><a href="#">Apartment for rent</a></li>
                <li><a href="#">3 bedroom flat</a></li>
                <li><a href="#">Bungalow</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className='border-t-[1px] border-[#6F6F6F]'></div>

        <div className='py-8 flex justify-between w-9/12 text-white mx-auto'>
          <p>Copyright 2023 Betahouse | Designed by Michael.fig</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
