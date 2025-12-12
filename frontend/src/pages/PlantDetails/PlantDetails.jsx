import Container from '../../components/Shared/Container'
import Heading from '../../components/Shared/Heading'
import Button from '../../components/Shared/Button/Button'
import PurchaseModal from '../../components/Modal/PurchaseModal'
import { useState } from 'react'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const PlantDetails = () => {
  let [isOpen, setIsOpen] = useState(false)
const {id} = useParams()

const {data:ticket={}, isLoading} = useQuery({
  queryKey:['ticket', id],
  queryFn: async() => {
      const result =await axios(`${import.meta.env.VITE_API_URL}/tickets/${id}`)
      return result.data
    },
})
  const closeModal = () => {
    setIsOpen(false)
  }
  console.log(ticket)
  if (isLoading) return <div>Loading...</div>;
if (!ticket || !ticket._id) return <div>Ticket not found</div>;

 const {
    image,
    title,
    category,
    date,
    time,
    from,
    to,
    price,
    quantity,
    seller
  } = ticket
  return (
     <Container>
      <div
        className="
          w-full mx-auto 
          flex flex-col lg:flex-row 
          gap-10 lg:gap-16 
          py-6
        "
      >
        {/* LEFT: Main Image */}
        <div
          className="
            flex-1 
            bg-white/40 backdrop-blur-xl 
            rounded-2xl shadow-xl 
            overflow-hidden border border-gray-200
          "
        >
          <img
            className="w-full h-full object-cover"
            src={image}
            alt={title}
          />
        </div>

        {/* RIGHT: Info Section */}
        <div className="flex-1 space-y-8">
          {/* Heading */}
          <Heading
            title={title}
            subtitle={`Category: ${category}`}
          />

          {/* Trip Info */}
          <div
            className="
              bg-white/60 backdrop-blur-xl 
              p-5 md:p-6 
              rounded-2xl shadow border border-gray-200
              space-y-3 text-gray-700
            "
          >
            <div className="text-lg font-semibold">Trip Information</div>

            <div className="grid grid-cols-2 gap-4 text-sm md:text-base">
              <p><span className="font-semibold">From:</span> {from}</p>
              <p><span className="font-semibold">To:</span> {to}</p>
              <p><span className="font-semibold">Date:</span> {date}</p>
              <p><span className="font-semibold">Time:</span> {time}</p>
            </div>
          </div>

          {/* Seller Info */}
          <div
            className="
              flex items-center justify-between 
              bg-white/60 backdrop-blur-xl 
              p-5 rounded-2xl shadow border border-gray-200
            "
          >
            <div>
              <p className="text-lg font-semibold">{seller.name}</p>
              <p className="text-gray-500 text-sm">{seller.email}</p>
            </div>

            <img
              className="rounded-full w-12 h-12"
              alt="seller"
              src={seller.image}
            />
          </div>

          {/* Quantity */}
          <div
            className="
              bg-white/60 backdrop-blur-xl 
              p-5 rounded-2xl shadow border border-gray-200
              text-gray-700 font-medium
            "
          >
            Available Tickets: {quantity}
          </div>

          {/* Price + Purchase */}
          <div
            className="
              bg-white/60 backdrop-blur-xl 
              p-5 rounded-2xl shadow border border-gray-200
              flex flex-col sm:flex-row 
              justify-between items-center
              gap-4
            "
          >
            <p className="font-bold text-2xl md:text-3xl text-gray-700">
              Price: ৳{price}
            </p>
            <Button onClick={() => setIsOpen(true)} label="Purchase" />
          </div>

          <PurchaseModal ticket={ticket} closeModal={closeModal} isOpen={isOpen} />
        </div>
      </div>
    </Container>
  )
}

export default PlantDetails
