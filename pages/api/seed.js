import House from '@/models/House';
import dbConnect from '@/utils/dbConnect';

export default async function handler(req, res) {
  await dbConnect();

  const houses = [
    {
      title: 'Real House Luxury Villa',
      price: 3340000000,
      location: 'Victoria Island, Lagos',
      image: 'https://res.cloudinary.com/dpm3yp0xs/image/upload/v1726691636/div.project-inner_i443os.svg', 
      popular: true,
      bedrooms: 6,
      bathrooms: 3,
      status: 'for sale',
    },
    {
      title: 'Exquisite Haven Villa',
      price: 4000000,
      location: 'Festac, Lagos',
      image: 'https://res.cloudinary.com/dpm3yp0xs/image/upload/v1726691602/div.project-inner_1_cwnnbp.svg', 
      popular: true,
      bedrooms: 5,
      bathrooms: 3,
      status: 'for rent',
    },
    {
      title: 'Luxe Palatial Villa',
      price: 5350000000,
      location: 'Gbagada, Lagos',
      image: 'https://res.cloudinary.com/dpm3yp0xs/image/upload/v1726691731/div.project-inner_anvpuo.png', 
      popular: false,
      bedrooms: 7,
      bathrooms: 3,
      status: 'for sale',
    },
    {
      title: 'Harmony Luxury Villa',
      price: 4000000,
      location: 'Mushin, Lagos',
      image: 'https://res.cloudinary.com/dpm3yp0xs/image/upload/v1726691685/div.project-inner_3_yb4svb.svg', 
      popular: false,
      bedrooms: 4,
      bathrooms: 3,
      status: 'for rent',
    },
    {
      title: 'Real House Luxury Villa',
      price: 350000000,
      location: 'Victoria Island, Lagos',
      image: 'https://res.cloudinary.com/dpm3yp0xs/image/upload/v1726691649/div.project-inner_4_akt8px.svg', 
      popular: true,
      bedrooms: 6,
      bathrooms: 4,
      status: 'for rent',
    },
    {
      title: 'Real House Luxury Villa',
      price: 4200000,
      location: 'Lekki-Ajah, Lagos',
      image: 'https://res.cloudinary.com/dpm3yp0xs/image/upload/v1726691687/div.project-inner_5_usoxyx.svg', 
      popular: true,
      bedrooms: 5,
      bathrooms: 3,
      status: 'for sale',
    },
    {
      title: 'Infinite Bliss Villa',
      price: 2350000000,
      location: 'Ishiagu, Enugu',
      image: 'https://res.cloudinary.com/dpm3yp0xs/image/upload/v1726691546/div.project-inner_6_brl4tc.svg', 
      popular: true,
      bedrooms: 5,
      bathrooms: 3,
      status: 'for sale',
    },
    {
      title: 'Real House Luxury Villa',
      price: 3350000,
      location: 'Works Layout, Owerri',
      image: 'https://res.cloudinary.com/dpm3yp0xs/image/upload/v1726691574/div.project-inner_7_gtti8h.svg', 
      popular: false,
      bedrooms: 8,
      bathrooms: 6,
      status: 'for rent',
    },
    {
      title: 'Real House Luxury Villa',
      price: 600000000,
      location: 'Ikeja, Lagos',
      image: 'https://res.cloudinary.com/dpm3yp0xs/image/upload/v1726691539/div.project-inner_8_zvlrxd.svg',
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
