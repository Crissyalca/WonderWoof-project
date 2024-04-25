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
                <Link className="home-link" to="/EventsAndActivities">
                  Back
                </Link>
              </li>
              <li>
                <Link className="home-link" to="/contacts">
                  Contacts
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="home-body" id="secondary-activity">
        <h1> Start the Wonder Woof Obedience Program </h1>
        <p>
          Early training and socialization are essential for your dog's
          development. Start teaching basic commands like sit, stay, come,
          crate, and potty training early on, using positive reinforcement.
        </p>
        {isAdmin && (
          <div className="form-container">
            <button>Create</button>
            <button>Read</button>
            <button>Delete</button>
            <button>Edit</button>
          </div>
        )}
        {/* <p>
          Dear {username && username.toUpperCase()} and{" "}
          {puppyname && puppyname.toUpperCase()},<br></br> Explore the events on
          offer for you.
        </p> */}
        <section id="event">
          <div className="events">
            <img
              className="img-activity"
              src="dogsImages/obedience.jpeg"
              alt="agility"
            />
            <div>
              <h2>from July 15th to July 22nd </h2>
              <h2>Malibu</h2>
            </div>
          </div>

          <p>
            Join us at the sunny beachside retreat for an unforgettable weeklong
            summer program! Youth will learn to teach basic obedience, tricks,
            agility, and address common dog behavior issues like jumping. Enjoy
            live speakers, including a hands-on first aid class with a local
            vet, and interactive team-building games. Spots fill up fast, so
            reserve yours now!
          </p>
        </section>
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
