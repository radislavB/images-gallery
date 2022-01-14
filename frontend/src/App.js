import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Spinner from './components/Spinner';
import { ToastContainer, toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
      console.log('loaded images', res.data);
      toast.success('Saved images downloaded');
    } catch (error) {
      console.log('Failed to fetch images', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => getSavedImages(), []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`${API_URL}/new_image?query=${word}`);
      setImages([{ ...res.data, title: word }, ...images]);
      toast.info(`New image ${word.toUpperCase()} was found`);
    } catch (error) {
      console.log('Failed to fetch image', error);
    }

    setWord('');
  };

  const handleDeleteImage = async (id) => {
    const imageToDelete = images.find((image) => image.id === id);
    try {
      if (imageToDelete.saved) {
        const deleted = await axios.delete(`${API_URL}/images/${id}`);
        console.log('image deleted from db ', deleted);
      }
      setImages(images.filter((image) => image.id !== id));
      toast.info(`Image ${imageToDelete.title} was deleted`);
    } catch (error) {
      console.log('Failed to delete image', error);
      toast.error(`Failed to delete image ${imageToDelete.title} : ${error}`);
    }
  };

  const handleSaveImage = async (id) => {
    const imageToSave = images.find((image) => image.id === id);
    imageToSave.saved = true;
    try {
      const saved = await axios.post(`${API_URL}/images`, imageToSave);
      console.log('image saved', saved);
      if (saved.data?.inserted_id) {
        const newImages = images.map((image) =>
          image.id === id ? { ...image, saved: true } : image
        );
        setImages(newImages);
        toast.info(`Image ${imageToSave.title} was saved`);
      }
    } catch (error) {
      console.log('Failed to save image', error);
    }
  };

  const seach_and_container = (
    <>
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      <Container className="mt-4">
        {images.length ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((image, i) => (
              <Col key={i} className="pb-3">
                <ImageCard
                  image={image}
                  deleteImage={handleDeleteImage}
                  saveImage={handleSaveImage}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
    </>
  );

  return (
    <div>
      <Header title="Images Gallery" />
      {loading ? <Spinner /> : seach_and_container}
      <ToastContainer position="bottom-right"></ToastContainer>
    </div>
  );
};

export default App;
