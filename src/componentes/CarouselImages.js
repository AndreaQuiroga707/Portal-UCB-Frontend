import React from 'react';

function CarouselImages({ text, imageUrl }) {
  return (
    <img
      src={imageUrl}
      alt={text}
    />
  );
}

export default CarouselImages;
