import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />}></Route>
        <Route path="Home" element={<Home />} />
        <Route path="AddPuppy" element={<AddPuppy />} />
        <Route path="PuppiesGallery" element={<PuppiesGallery />} />
        <Route path="EventsAndActivities" element={<EventsAndActivities />} />
        <Route path="AgilityAndHeelwork" element={<AgilityAndHeelwork />} />
        <Route path="DogShowing" element={<DogShowing />} />
        <Route path="Trials" element={<Trials />} />
        <Route path="Obedience" element={<Obedience />} />
        <Route path="Contacts" element={<Contacts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
