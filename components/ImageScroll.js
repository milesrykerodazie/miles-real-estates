import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function ImageScroll({ data }) {
  return (
    <div className="">
      <Carousel
        showThumbs={false}
        internal={4000}
        infiniteLoop
        autoplay
        showStatus={false}
      >
        {data.map((photo) => (
          <img
            loading="lazy"
            src={photo.url}
            key={photo.id}
            className="rounded-md"
          />
        ))}
      </Carousel>
    </div>
  );
}

export default ImageScroll;
