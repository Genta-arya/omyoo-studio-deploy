import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useState, useEffect } from "react";

function ProjectContent() {

  
  const [carouselIndex, setCarouselIndex] = useState(0);
  function getRandomImageURL(width, height) {
    const imageId = Math.floor(Math.random() * 1084) + 1;
    return `https://picsum.photos/id/${imageId}/${width}/${height}`;
  }

  const imageWidth = 200;
  const imageHeight = 300;
  const imageUrls = Array.from({ length: 6 }, (_, index) => {
    return getRandomImageURL(imageWidth, imageHeight);
  });
 
  
  return (
    <section id="projectSection" className="py-12 w-screen overflow-hidden">
      <div className="container mx-auto bg-gray-500 rounded-xl p-6 w-screen overflow-hidden m-5">
        <div
          className="bg-black rounded-full p-2 text-center mb-5"
          style={{ animationDelay: "500ms" }}
        >
          <h2 className="text-3xl font-semibold text-white">Gallery</h2>
        </div>

        {/* Display a carousel on mobile devices */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {imageUrls.map((imageUrl, index) => (
              <div
                key={index}
                className="bg-gray-200 p-4 rounded-lg cursor-pointer hover:scale-110 transition-all delay-75"
              >
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt={`Photo ${index + 1}`}
                    className="w-full max-h-72 h-auto rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:hidden">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            emulateTouch={true}
            className="mobile-carousel"
            selectedItem={carouselIndex}
            onChange={setCarouselIndex}
            autoPlay={true}
            interval={3000} 
          >
            {imageUrls.map((imageUrl, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded-lg">
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export default ProjectContent;
