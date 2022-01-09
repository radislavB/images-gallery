import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Header from "./Components/Header";
import Search from "./Components/Search";

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;
const App = () => {
  const [word, setWord] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault(e);

    //console.log("handleSearchSubmit", word);
    const url = `https://api.unsplash.com/photos/random?query=${word}&client_id=${UNSPLASH_KEY}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setWord("");
      })
      .catch((err) => {
        console.log("err to fetch", err);
      });
  };

  //console.log("unsplash key", UNSPLASH_KEY);
  return (
    <div>
      <Header title="Images gallery header" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
    </div>
  );
};

export default App;
