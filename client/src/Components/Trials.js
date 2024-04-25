import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Trials() {
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
        <h1>The Wonder Woof Guide to the Ultimate Dog Sports </h1>
        <p>
          We're inspired by the different world of dog sports, from classic
          agility to lesser-known sled dog rallies. Nothing brings us more joy
          than witnessing dogs and their owners bond and have fun together.
        </p>
        {isAdmin && (
          <div className="form-container">
            <button>Create</button>
            <button>Read</button>
            <button>Delete</button>
            <button>Edit</button>
          </div>
        )}
        <section id="event">
          <div className="events">
            <img
              className="img-activity"
              src="dogsImages/trial.webp"
              alt="agility"
            />
            <div>
              <h2>on May 25th and 26th </h2>
              <h2>at Riverside Park</h2>
            </div>
          </div>
          <p>
            Experience the excitement of Scentwork training—an engaging activity
            that unlocks your dog's extraordinary sense of smell! Join us for a
            exciting weekend at the beautiful park, where your canine companion
            can discover the joy of scent detection in various environments.
          </p>
        </section>
        <section id="event">
          <div className="events">
            <img
              className="img-activity"
              src="dogsImages/parkour.jpeg"
              alt="agility"
            />
            <div>
              <h2>On July 2nd </h2>
              <h2>at Hyde Park</h2>
            </div>
          </div>
          <p>
            Join us for an exciting Dog Parkour event! It's a low-impact sport
            suitable for all dogs, no matter the age or breed. Bring your furry
            friend and let's have fun building confidence together!
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
          <span className="footer-p">
            &copy; 2024 Paws-itivity. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
