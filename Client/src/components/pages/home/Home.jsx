import React from "react";
import "./home.css";
import SearchBar from "./SearchBar";

function Home() {
  const search = () => {};
  const submit = () => {};
  return (
    <div className="homeContainer">
      <SearchBar search={() => search} Submit={submit} />
    </div>
  );
}

export default Home;
