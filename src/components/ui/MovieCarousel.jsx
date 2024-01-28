import Carousel from "react-bootstrap/Carousel";
import { CarouselCaption, CarouselItem, Col, Ratio } from "react-bootstrap";
import classes from "./MovieCarousel.module.css";

const MovieCarousel = () => {
  return (
    <Col className={classes.container}>
      <Carousel data-bs-theme="dark" style={{ zIndex: "0" }}>
        <CarouselItem>
          <Ratio aspectRatio={25}>
            <img
              src="./images/carousel1.jpg"
              alt="First slide"
            />
          </Ratio>
          <CarouselCaption>
            {/* <span className={classes.text}>
              <h5>POPCORN</h5>
              <p>
                POPCORN supply Your Happiness with enjoyable and sweet snacks
              </p>
            </span> */}
          </CarouselCaption>
        </CarouselItem>
        <CarouselItem>
          <Ratio aspectRatio={25}>
            <img
              src="./images/carousel2.jpg"
              alt="Second slide"
            />
          </Ratio>
          <CarouselCaption>
            {/* <span className={classes.text}>
              <h5>Parking</h5>
              <p>
                We provide an onsite car park with ample parking, available for
                use by our guests,enough parking places
              </p>
            </span> */}
          </CarouselCaption>
        </CarouselItem>
        <CarouselItem>
          <Ratio aspectRatio={25}>
            <img
              src="./images/carousel3.jpg"
              alt="Third slide"
            />
          </Ratio>
          <CarouselCaption>
            {/* <span className={classes.text}>
              <h5>Comfortable Seats</h5>
              <p>
                We offer a massive selection of luxury, commercial-grade fixed
                movie theater chairs. Our movie theater seating options are
                great for projects both small in scale and very large.{" "}
              </p>
            </span> */}
          </CarouselCaption>
        </CarouselItem>
      </Carousel>
    </Col>
  );
};

export default MovieCarousel;
