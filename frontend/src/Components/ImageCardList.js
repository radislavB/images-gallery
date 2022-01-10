import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import ImageCard from './ImageCard';

const ImageCardList = ({ images, handleDeleteImage }) => {
  return (
    <Container className="mt-4">
      <Row xs={1} md={2} lg={3}>
        {images.map((image, i) => (
          <Col key={image.id} className="pb-3">
            <ImageCard image={image} deleteImage={handleDeleteImage} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ImageCardList;
