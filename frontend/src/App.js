import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Header from './Components/Header';
import ImageCardList from './Components/ImageCardList';
import Search from './Components/Search';
import Welcome from './Components/Welcome';

const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault(e);

    const API_URL = 'http://127.0.0.1:5050';
    const url =
      process.env.REACT_APP_API_URL || `${API_URL}/new_image?query=${word}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        setImages([{ ...data, title: word }, ...images]);
      })
      .catch((err) => {
        console.log('err to fetch', err);
      });
    setWord('');
  };

  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div>
      <Header title="Images gallery header" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      {images.length ? (
        <ImageCardList images={images} handleDeleteImage={handleDeleteImage} />
      ) : (
        <Welcome />
      )}
    </div>
  );
};

export default App;
