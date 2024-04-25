import { useState, useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Home(/*{ admin, setAdmin }*/) {
  const [isAdmin, setIsAdmin] = useState();
  const [username, setUsername] = useState("");
  const [puppyname, setPuppyname] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function call() {
      let res = await fetch("http://localhost:3000/logged", {
        credentials: "include",
      });
      let json = await res.json();
      if (json.admin) {
        setIsAdmin(true);
      }
      if (res.status === 200) {
        setUsername(json.username);
        setPuppyname(json.puppyname);
      } else {
        console.log("deve tornare a login");
        navigate("/");
      }
    }
    call();
  }, []);

  async function logout() {
    await fetch("http://localhost:3000/logout", {
      method: "PUT",
      credentials: "include",
    });
    navigate("/");
    setIsAdmin(false);
    // setAdmin(false);
  }

  return (
    <div className="body-container">
      <header className="header-log-nav">
        <div id="img-title-home">
          <img
            className="header-logo "
            src="images/logo2.PNG"
            alt="puppies"
          ></img>
        </div>
        <div className="header-nav-logout">
          <div className="header-logout">
            <span>
              {username && username.toUpperCase()} and{" "}
              {puppyname && puppyname.toUpperCase()}
            </span>
            <button onClick={logout}>Logout</button>
          </div>
          <nav className="header-nav">
            <ul className="header-ul">
              <li>
                <Link className="home-link" to="/home">
                  Home Sweet Home
                </Link>
              </li>
              <li>
                <Link className="home-link" to="/AddPuppy">
                  Introduce your Pooch
                </Link>
              </li>
              <li>
                <Link className="home-link" to="/PuppiesGallery">
                  Find Your Furry Soulmate
                  {/*Seek Your Pup's Perfect Match*/}
                </Link>
              </li>
              <li>
                <Link className="home-link" to="/Contacts">
                  Contacts
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="home-body" id="body-activity">
        <h1>Events And Activities Wonder Woof </h1>
        <p>
          WonderWoof collects information about various dog activities and
          shares the best opportunities for you and your furry friend, providing
          great chances to meet fellow dog lovers, celebrate your dog's skills,
          and have lots of fun together.
        </p>{" "}
        <div id="body-activity">
          <h3>
            Dear {username && username.toUpperCase()} and{" "}
            {puppyname && puppyname.toUpperCase()},
          </h3>
          <p>
            click on the image below to explore the events on offer for you.
          </p>
          {isAdmin && (
            <div className="form-admin">
              <button>Create</button>
              <button>Read</button>
              <button>Delete</button>
              <button>Edit</button>
            </div>
          )}
          <div className="multi-section">
            <section>
              <Link to="/AgilityAndHeelwork">
                <img
                  className="img-activity"
                  src="/imgs/agility-heelwork.jpeg"
                  alt="agility"
                />
              </Link>
              <p>Agility Activities and Heelwork to Music.</p>
            </section>
            <section>
              <p>Dog Showing</p>
              <Link to="/DogShowing">
                <img
                  className="img-activity"
                  src="/imgs/dogshow.jpeg"
                  alt="dog show"
                />
              </Link>
            </section>
            <section>
              <Link to="/Trials">
                <img
                  className="img-activity"
                  src="/imgs/dogTrials.jpeg"
                  alt="trials"
                />
              </Link>
              <p>Working Trials</p>
            </section>
            <section>
              <p>Working Classes in Obedience</p>
              <Link to="/Obedience">
                <img
                  className="img-activity"
                  src="/imgs/obedience.webp"
                  alt="trials"
                />
              </Link>
            </section>
          </div>
        </div>
      </main>
      <footer className="footer-container">
        <div className="footer-main">
          <div className="footer-contact">
            <h4>CONTACTS</h4>
            <span className="footer-title">Wonder Woof &reg;</span>
            <p>info@pawsitivity.com</p>
          </div>
          <div id="footer-img-ctn">
            <img
              className="footer-img"
              src="images/NalaTondo.PNG"
              alt="puppies"
            />
          </div>
        </div>
        <div className="footer-disclaimer">
          {/* <span className="footer-title">Wonder Woof &reg;</span> */}
          <span className="footer-p">
            &copy; 2024 Paws-itivity. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
