import React from 'react';
import Image from './Imagen';
import PropTypes from 'prop-types';

const Listado = ({images}) => {
  return (
    <div className="col-12 p-5 row">
      {images.map(image => (
        <Image key={image.id} image={image} />
      ))}
    </div>
  );
};

Listado.propTypes = {
  images: PropTypes.array.isRequired,
};

export default Listado;
