import Carousel from 'react-bootstrap/Carousel';
import { CarouselCaption, CarouselItem, Ratio } from 'react-bootstrap'

const CinemaCarousel = () => {
  return (
    <Carousel data-bs-theme="dark" className='mt-3 ps-3 pe-3' style={{zIndex: '0'}}>
      <CarouselItem>
        <Ratio aspectRatio={24}>
        <img 
          src="https://media.licdn.com/dms/image/C5612AQFcY918oTYRtw/article-cover_image-shrink_720_1280/0/1588005031218?e=2147483647&v=beta&t=tpnX4hoLAHG6N_LYH7EAzmuWc9OUUFe9gh-bvBf6Pjw"
          alt="First slide"
        />
        </Ratio>
        <CarouselCaption className='text-white'>
          <h5>POP CORN</h5>
          <p>POP CORN supply Your Happiness with enjoyable and sweet snacks</p>
        </CarouselCaption>
      </CarouselItem>
      <CarouselItem>
        <Ratio aspectRatio={24}>
        <img
          src="https://res.cloudinary.com/spothero/image/upload/w_2048,h_1365,q_50,x_1024,y_682,c_fill,g_xy_center,f_auto/c_scale,fl_relative,g_south_east,l_logos:spothero,o_27,w_0.25,x_0.05,y_0.05/v1472070784/whoffto1n2ssnbplevbu.jpg"
          alt="Second slide"
        />
        </Ratio>
        <CarouselCaption className='text-primary'>
          <h5>Parking</h5>
          <p>We provide an onsite car park with ample parking, available for use by our guests,enough parking places</p>
        </CarouselCaption>
      </CarouselItem>
      <CarouselItem>
        <Ratio aspectRatio={24}>
        <img
          src="https://www.theaterseatstore.com/media/wysiwyg/Images/category-images/movie-1.jpg"
          alt="Third slide"
        />
        </Ratio>
        <CarouselCaption className='text-white'>
          <h5>Comfortable Seats</h5>
          <p>We offer a massive selection of luxury, commercial-grade fixed movie theater chairs. Our movie theater seating options are great for projects both small in scale and very large. </p>
        </CarouselCaption>
      </CarouselItem>
    </Carousel>
  )
}

export default CinemaCarousel