import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import header1 from "../../assets/hero-section/airport.gif";
import header2 from "../../assets/hero-section/city-bus.gif";
import header3 from "../../assets/hero-section/train.gif";
import header4 from "../../assets/hero-section/sailboat.gif";
import { IoMdArrowRoundForward } from "react-icons/io";

const HeroSection = () => {
  return (
    <div>
       <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      interval={2000}
      dynamicHeight={true}
    >

      {/* SLIDE TEMPLATE */}
      {/* Each slide is responsive */}
      {[
        {
          img: header1,
          title: "Fly Smart. Book Your E-Ticket in Minutes.",
          sub1: "No queues. No stress. Just travel.",
          sub2: "All airlines. Best fares. 24/7 support.",
        },
        {
          img: header2,
          title: "Your City, Your Route. Book Instantly.",
          sub1: "Find buses, compare seats, and reserve online.",
          sub2: "No phone calls. No waiting. Just tap, book, go.",
        },
        {
          img: header3,
          title: "Comfort on Rails. Online Booking.",
          sub1: "No queues. No stress. Just travel.",
          sub2: "Travel far, travel fast — your journey starts here.",
        },
        {
          img: header4,
          title: "Comfort on Boat. Online Booking.",
          sub1: "No queues. No stress. Just travel.",
          sub2: "Travel far, travel fast — your journey starts here.",
        },
      ].map((slide, i) => (
        <div
          key={i}
          className="h-[70vh] grid grid-cols-1 md:grid-cols-6 items-center"
        >
          {/* Content */}
          <div className="col-span-3 flex flex-col gap-1 md:gap-4 px-6 md:px-10 text-center md:text-left">
            <h2 className="text-2xl text-primary md:text-5xl font-bold leading-tight">
              {slide.title}
            </h2>

            <p className="text-md md:text-3xl font-semibold">
              {slide.sub1}
            </p>

           <button className="btn bg-secondary text-black w-fit mt-4 px-6 py-3 text-lg font-semibold">
            Book Now <IoMdArrowRoundForward className="inline-block ml-2 text-xl"></IoMdArrowRoundForward>
           </button>

    
          </div>

          {/* Image */}
          <div className="col-span-3 md:col-span-2 h-full w-full">
            <img src={slide.img} className=" md:h-full md:w-full  md:object-cover" />
          </div>
        </div>
      ))}

    </Carousel>
 
    </div>
   
  );
};

export default HeroSection;
