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

  // async function update() {
  //   const res = await fetch("http://localhost:3000/update", {
  //     method: "PUT",
  //     credentials: "include",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   });
  // }

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
              {/* <li>
                <Link className="home-link" to="/home">
                  Home Sweet Home
                </Link>
              </li> */}
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
                <Link className="home-link" to="/EventsAndActivities">
                  Events and Activities
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
      <main className="home-body">
        <h1>Wonder Woof</h1>
        <h3>
          The Top Dog Connection: Unleashing the Best Paws-sibilities Ever!
        </h3>
        {isAdmin && (
          <div className="form-admin">
            <button>Delete</button>
            <button>Edit</button>
          </div>
        )}
        <p>
          Dear {username && username.toUpperCase()} and{" "}
          {puppyname && puppyname.toUpperCase()}, welcome in our Paws-itivity
          world!<br></br>
          <img id="img-home" src="imgs/bassotto.jpg" alt="dogs" />
          Discover our special and wonderful puppies and introduce yours.
          <br></br>It's so easy to use, even your dog could do it.
        </p>
        {/* <img src="/imgs/best-comp.jpg"></img> */}

        <p>
          Our platform makes it effortless to browse through profiles, learn
          about each puppy's background and temperament, and connect with
          reputable breeders or shelters. With just a few clicks, you can
          discover your perfect match and begin the journey of creating
          unforgettable memories together. Don't wait any longer – start your
          search for the perfect puppy today!
        </p>
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
