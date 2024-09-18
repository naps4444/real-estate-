import House from '@/models/House';
import dbConnect from '@/utils/dbConnect';

export default async function handler(req, res) {
  await dbConnect();

  const houses = [
    {
      title: 'Real House Luxury Villa',
      price: 3340000000,
      location: 'Victoria Island, Lagos',
      image: 'https://res.cloudinary.com/dpm3yp0xs/image/upload/v1726679643/b1_drvjel.svg', // Changed to SVG
      popular: true,
      bedrooms: 6,
      bathrooms: 3,
      status: 'for sale',
    },
    {
      title: 'Exquisite Haven Villa',
      price: 4000000,
      location: 'Festac, Lagos',
      image: 'https://res.cloudinary.com/dpm3yp0xs/image/upload/v1726679789/b2_cgwjiw.svg', // Changed to SVG
      popular: true,
      bedrooms: 5,
      bathrooms: 3,
      status: 'for rent',
    },
    {
      title: 'Luxe Palatial Villa',
      price: 5350000000,
      location: 'Gbagada, Lagos',
      image: 'https://res.cloudinary.com/dpm3yp0xs/image/upload/v1726680270/b3_h2sbmj.png', // Changed to SVG
      popular: false,
      bedrooms: 7,
      bathrooms: 3,
      status: 'for sale',
    },
    {
      title: 'Harmony Luxury Villa',
      price: 4000000,
      location: 'Mushin, Lagos',
      image: 'https://res.cloudinary.com/dpm3yp0xs/image/upload/v1726680321/b4_whrq5u.svg', // Changed to SVG
      popular: false,
      bedrooms: 4,
      bathrooms: 3,
      status: 'for rent',
    },
    {
      title: 'Real House Luxury Villa',
      price: 350000000,
      location: 'Victoria Island, Lagos',
      image: 'https://res.cloudinary.com/dpm3yp0xs/image/upload/v1726680369/b5_z7gguz.svg', // Changed to SVG
      popular: true,
      bedrooms: 6,
      bathrooms: 4,
      status: 'for rent',
    },
    {
      title: 'Real House Luxury Villa',
      price: 4200000,
      location: 'Lekki-Ajah, Lagos',
      image: 'https://res.cloudinary.com/dpm3yp0xs/image/upload/v1726680391/b6_bwo4zu.svg', // Changed to SVG
      popular: true,
      bedrooms: 5,
      bathrooms: 3,
      status: 'for sale',
    },
    {
      title: 'Infinite Bliss Villa',
      price: 2350000000,
      location: 'Ishiagu, Enugu',
      image: 'https://res.cloudinary.com/dpm3yp0xs/image/upload/v1726680414/b7_y2hk70.svg', // Changed to SVG
      popular: true,
      bedrooms: 5,
      bathrooms: 3,
      status: 'for sale',
    },
    {
      title: 'Real House Luxury Villa',
      price: 3350000,
      location: 'Works Layout, Owerri',
      image: 'https://res.cloudinary.com/dpm3yp0xs/image/upload/v1726680428/b8_cqfwth.svg', // Changed to SVG
      popular: false,
      bedrooms: 8,
      bathrooms: 6,
      status: 'for rent',
    },
    {
      title: 'Real House Luxury Villa',
      price: 600000000,
      location: 'Ikeja, Lagos',
      image: 'https://res.cloudinary.com/dpm3yp0xs/image/upload/v1726680448/b9_vsrmqp.svg', // Changed to SVG
      popular: false,
      bedrooms: 6,
      bathrooms: 6,
      status: 'for sale',
    },
  ];

  // Clear existing data and insert the seed data
  await House.deleteMany();  
  await House.insertMany(houses);

  res.status(200).json({ message: 'Seeded data successfully' });
}
