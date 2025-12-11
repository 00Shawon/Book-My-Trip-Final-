import { useForm } from "react-hook-form";
import { imageUpload } from "../../utilis";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";

const AddTicketForm = () => {
  const { user } = useAuth();

//use mutation from react query to post data

const {isPending, isError,mutateAsync ,reset: mutationReset} = useMutation({
  mutationFn: async(payload)=> await axios.post(`${import.meta.env.VITE_API_URL}/tickets`,payload),
  onSuccess: data => {
    console.log(data)
    toast.success('Ticket Added Successfully')
    mutationReset()
  },
  onError: error => {
    console.log(error)
  },
  onMutate: payload => {
    console.log('posting this Data:',payload)
  },
  retry: 3

})


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    const {
      title,
      from,
      to,
      category,
      price,
      quantity,
      date,
      time,
      perk,
      image,
    } = data;
    const imageFile = image[0];

    try {
      const imageUrl = await imageUpload(imageFile);
      const ticketData = {
        image: imageUrl,
        title,
        from,
        to,
        category,
        price: Number(price),
        quantity: Number(quantity),
        date,
        time,
        perk,
        seller: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };
      await mutateAsync(ticketData)
      reset()
    } catch (error) {
      console.log("Error while adding ticket :", error);
    }

    if(isPending) return <LoadingSpinner/>
if(isError) return <ErrorPage/>


    // 1. Upload image to imgbb
    // const image = data.image[0];
    // const imgData = new FormData();
    // imgData.append("image", image);
    //
    // const res = await fetch(`https://api.imgbb.com/1/upload?key=YOUR_IMGBB_KEY`, {
    //   method: "POST",
    //   body: imgData,
    // });
    // const imgResult = await res.json();

    // 2. Save ticket with uploaded image URL
    // data.image = imgResult.data.url
    // await addTicket(data)
  };

  const perksList = ["AC", "WiFi", "Breakfast", "Water", "TV"];

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl p-8 rounded-lg bg-white shadow"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Add New Ticket
        </h2>

        {/* Ticket title */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Ticket title</label>
          <input
            className="w-full border p-3 rounded"
            {...register("title", { required: "Title is required" })}
            placeholder="Dhaka to Cox’s Bazar"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* From & To */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* From */}
          <div>
            <label className="block mb-1 text-gray-700">From</label>
            <input
              className="w-full border p-3 rounded"
              {...register("from", { required: "From location is required" })}
              placeholder="Dhaka"
            />
            {errors.from && (
              <p className="text-sm text-red-500">{errors.from.message}</p>
            )}
          </div>

          {/* To */}
          <div>
            <label className="block mb-1 text-gray-700">To</label>
            <input
              className="w-full border p-3 rounded"
              {...register("to", { required: "Destination is required" })}
              placeholder="Cox’s Bazar"
            />
            {errors.to && (
              <p className="text-sm text-red-500">{errors.to.message}</p>
            )}
          </div>
        </div>

        {/* Transport Type */}
        <div className="mt-4">
          <label className="block mb-1 text-gray-700">Transport type</label>
          <select
            className="w-full border p-3 rounded"
            {...register("category", {
              required: "Transport type is required",
            })}
          >
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Ship">Ship</option>
            <option value="Air">Air</option>
          </select>
        </div>

        {/* Price & Quantity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block mb-1 text-gray-700">Price (per unit)</label>
            <input
              type="number"
              className="w-full border p-3 rounded"
              {...register("price", { required: "Price is required" })}
              placeholder="1500"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Ticket quantity</label>
            <input
              type="number"
              className="w-full border p-3 rounded"
              {...register("quantity", { required: "Quantity is required" })}
              placeholder="1"
            />
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block mb-1 text-gray-700">Departure date</label>
            <input
              type="date"
              className="w-full border p-3 rounded"
              {...register("date", { required: "Date is required" })}
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Departure time</label>
            <input
              type="time"
              className="w-full border p-3 rounded"
              {...register("time", { required: "Time is required" })}
            />
          </div>
        </div>

        {/* Perks (Checkboxes) */}
        <div className="mt-4">
          <p className="mb-2 text-gray-700 font-medium">Perks</p>
          <div className="flex gap-4 flex-wrap">
            {perksList.map((perk) => (
              <label key={perk} className="flex gap-2 items-center">
                <input type="checkbox" value={perk} {...register("perks")} />
                {perk}
              </label>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="mt-4">
          <label className="block mb-1 text-gray-700">Upload image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border p-3 rounded"
            {...register("image", { required: "Image is required" })}
          />
        </div>

        {/* Vendor name & email (readonly) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block mb-1 text-gray-700">Vendor name</label>
            <input
              className="w-full border p-3 rounded bg-gray-200 cursor-not-allowed"
              readOnly
              {...register("vendorName")}
              value="Shawon Hasan"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Vendor email</label>
            <input
              className="w-full border p-3 rounded bg-gray-200 cursor-not-allowed"
              readOnly
              {...register("vendorEmail")}
              value="shawon@example.com"
            />
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full mt-6 py-3 bg-primary text-white font-medium rounded shadow"
        >
         
          {isPending ? (
             <TbFidgetSpinner className='animate-spin m-auto '/>):(' Add Ticket') }
        </button>
      </form>
    </div>
  );
};

export default AddTicketForm;
