import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <ul>
      <Link to="/map">Map</Link>
      <Link to="/events">Events</Link>
    </ul>
  );
};

export default Home;
