import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";

export default function CustomerOrderDataRow({ order }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  return (
    <tr className="group transition-all duration-300 hover:bg-gray-50/60">
      {/* Image */}
      <td className="px-5 py-5 border-b border-gray-200 text-sm">
        <div className="flex items-center">
          <div className="relative h-14 w-14 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300">
            <img
              alt={order?.title}
              src={order?.image}
              className="object-cover h-full w-full"
            />
          </div>
        </div>
      </td>

      {/* Title */}
      <td className="px-5 py-5 border-b border-gray-200 text-sm">
        <p className="font-semibold text-gray-900 group-hover:text-gray-700 transition-all">
          {order?.title}
        </p>
        <p className="text-xs text-gray-500">{order?.category}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 text-sm">
       
        <p className="">{order?.category}</p>
      </td>

      {/* Price */}
      <td className="px-5 py-5 border-b border-gray-200 text-sm">
        <p className="text-gray-900 font-medium">${order?.price}</p>
      </td>

      {/* Quantity */}
      <td className="px-5 py-5 border-b border-gray-200 text-sm">
        <p className="text-gray-900">{order?.quantity}</p>
      </td>

      {/* Status */}
      <td className="px-5 py-5 border-b border-gray-200 text-sm">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm
          ${order?.status === "pending" && "bg-yellow-100 text-yellow-700"}
          ${order?.status === "completed" && "bg-green-100 text-green-700"}
          ${order?.status === "canceled" && "bg-red-100 text-red-700"}`}
        >
          {order?.status.charAt(0).toUpperCase() + order?.status.slice(1)}
        </span>
      </td>

      {/* Cancel Button */}
      <td className="px-5 py-5 border-b border-gray-200 text-sm ">
        {order?.status === "pending" ? (
          <button
            onClick={() => setIsOpen(true)}
            className="  px-4 py-1.5 rounded-full text-sm font-semibold text-red-700 transition-all duration-300 bg-red-100 hover:bg-red-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        ) : (
          <span className="text-gray-400 text-sm italic">No action</span>
        )}

        <DeleteModal isOpen={isOpen} closeModal={closeModal} order={order} />
      </td>
    </tr>
  );
}
