import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Hero.scss';

const SALE_IMG_1 = 'https://files.willkennedy.dev/mern_store/sale-image-1.jpeg';
const SALE_IMG_2 = 'https://files.willkennedy.dev/mern_store/sale-image-2.jpeg';
const SALE_IMG_3 = 'https://files.willkennedy.dev/mern_store/sale-image-3.jpeg';
const SALE_IMG_4 = 'https://files.willkennedy.dev/mern_store/sale-image-4.jpeg';
const SALE_IMG_5 = 'https://files.willkennedy.dev/mern_store/sale-image-5.jpeg';

const Hero = () => {
  const images = [SALE_IMG_1, SALE_IMG_2, SALE_IMG_3, SALE_IMG_4, SALE_IMG_5];
  return (
    <Carousel indicators={false} controls={false}>
      {images.map((image, i) => (
        <Carousel.Item key={i}>
          <img
            className="d-block w-100 carousel-image"
            src={image}
            alt={`sale-${i}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Hero;
