import React from "react";
import { Link } from "react-router";


const ResponsiveTicketCard = ({ ticket }) => {


  const { image, title, price, quantity, category, perks, _id } = ticket;

  return (
    <div
      className="
        w-full bg-white/70 backdrop-blur-xl border border-gray-400 
        rounded-2xl shadow-md hover:shadow-xl transition-all duration-300
        hover:-translate-y-1 
        flex flex-col md:flex-row         /* RESPONSIVE LAYOUT */
        overflow-hidden
      "
    >
      {/* Image Section */}
      <div className="w-full md:w-48 h-48 md:h-40 overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="
            w-full h-full object-cover 
            transform hover:scale-110 transition duration-500
          "
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 p-5 space-y-3">
        
        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          {title}
        </h2>

        {/* Transport + Quantity */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
            {category}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
            Qty: {quantity}
          </span>
        </div>

        {/* Price */}
        <div className="text-lg md:text-xl font-semibold text-green-600">
          ৳ {price} 
          <span className="text-sm text-gray-500"> / ticket</span>
        </div>

        {/* Perks */}
        {perks && perks.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-gray-700">Perks:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm">
              {perks.map((perk, i) => (
                <li key={i}>{perk}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Button Section */}
      <div
        className="
          p-4 md:p-5 flex items-center justify-end 
          md:justify-center
        "
      >
        <Link to={`/plant/${_id}`}
          className="
            px-6 py-3 rounded-xl
            bg-gradient-to-r from-blue-600 to-indigo-600
            text-white font-semibold shadow-md hover:shadow-lg
            hover:opacity-90 transition
            w-full md:w-auto                 /* RESPONSIVE BUTTON */
          "
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default ResponsiveTicketCard;
