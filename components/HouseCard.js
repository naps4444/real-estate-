import Image from 'next/image';

export default function HouseCard({ house }) {
  return (
    <div className="house-card border p-4 rounded-lg shadow-lg">
      
      <div className="relative w-11/12 h-full">
        <Image 
          src={house.image} 
          alt={house.title} 
          layout="fill" // Automatically fills the parent container (Next.js 12 or below)
          objectFit="contain" // Adjusts image to fill the container
          className="rounded-md"
          priority // Optimizes the image load
        //   sizes="100vw" // Responsible sizes
        />
      </div>
      
      {/* House details */}
      <h3 className="text-xl font-semibold mt-3">{house.title}</h3>
      <p className="text-gray-600">{house.location}</p>
      <p className="text-gray-800 font-semibold mt-1">
        ${house.price.toLocaleString()}
      </p>
      <p className="text-gray-700 mt-1">
        {house.bedrooms} Bedrooms, {house.bathrooms} Bathrooms
      </p>
      <p className={`text-sm font-medium mt-2 ${house.status === 'for sale' ? 'text-green-600' : 'text-blue-600'}`}>
        Status: {house.status.charAt(0).toUpperCase() + house.status.slice(1)}
      </p>
    </div>
  );
}
