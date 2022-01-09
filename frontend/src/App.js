import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Search from './Components/Search';
import { useState } from 'react';



const App = () => {
  const [word, setWord] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault(e);
    console.log("handleSearchSubmit", word);
  }

  return (
    <div >
      <Header title="Images gallery header" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />

    </div>
  );
}

export default App;
