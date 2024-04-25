import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { useState } from "react";
import Home from "./Components/Home.js";
import AddPuppy from "./Components/AddPuppy.js";
import PuppiesGallery from "./Components/PuppiesGallery.js";
import EventsAndActivities from "./Components/EventsAndActivities.js";
import Contacts from "./Components/Contacts.js";
import AgilityAndHeelwork from "./Components/AgilityAndHeelwork.js";
import DogShowing from "./Components/DogShowing.js";
import Trials from "./Components/Trials.js";
import Obedience from "./Components/Obedience.js";

function App() {
  // const [admin, setAdmin] = useState(false);
  // const [logged, setLogged] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<Login /*setAdmin={setAdmin} setLogged={setLogged}*/ />}
        ></Route>
        <Route
          path="Home"
          element={
            <Home /*admin={admin} setAdmin={setAdmin} logged={logged}*/ />
          }
        />
        <Route
          path="AddPuppy"
          element={<AddPuppy /*admin={admin}logged={logged}*/ />}
        />
        <Route
          path="PuppiesGallery"
          element={<PuppiesGallery /* admin={admin} logged={logged}*/ />}
        />
        <Route
          path="EventsAndActivities"
          element={<EventsAndActivities /* admin={admin} logged={logged}*/ />}
        />
        <Route
          path="AgilityAndHeelwork"
          element={<AgilityAndHeelwork /* admin={admin} logged={logged}*/ />}
        />
        <Route
          path="DogShowing"
          element={<DogShowing /* admin={admin} logged={logged}*/ />}
        />
        <Route path="Trials" element={<Trials />} />
        <Route
          path="Obedience"
          element={<Obedience /* admin={admin} logged={logged}*/ />}
        />
        <Route
          path="Contacts"
          element={<Contacts /*admin={admin}logged={logged}*/ />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
