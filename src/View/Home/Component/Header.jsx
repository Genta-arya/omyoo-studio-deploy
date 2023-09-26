import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Header() {
  const imageUrls = [
    "https://picsum.photos/id/1/2000/650",
    "https://picsum.photos/id/2/2000/650",
    "https://picsum.photos/id/3/2000/650",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current, next) => {
      setCurrentSlide(next);
    },
  };

  let slider;

  return (
    <div className="relative w-screen overflow-hidden">
      <Slider ref={(c) => (slider = c)} {...sliderSettings}>
        {imageUrls.map((imageUrl, index) => (
          <div key={index}>
            <img
              src={imageUrl}
              alt={`Slider ${index + 1}`}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "500px",
                filter: "brightness(35%)",
              }}
            />
          </div>
        ))}
      </Slider>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold mb-2 md:mb-4 lg:mb-6 m-5">
          OmYoo Photography Studio
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4 md:mb-6 lg:mb-8">
          Capturing Memories, One Click at a Time.
        </p>
      </div>
    </div>
  );
}

export default Header;
