import { useEffect } from "react";
import "./App.css";
import Places, { MapComponent } from "./components/Map";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/pages/Home";
import { Events } from "./components/Events";
const App = () => {
  // useEffect(() => {
  //   login();
  // }, []);

  // async function login() {
  //   fetch("http://izicoin-users.herokuapp.com/user/")
  //     .then((resp) => resp.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Places />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
