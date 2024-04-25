import { useState, useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
// import { imagefrombuffer } from "imagefrombuffer";
export default function PuppiesGallery() {
  const [isAdmin, setIsAdmin] = useState();
  const [puppyData, setPuppyData] = useState([]);
  const [username, setUsername] = useState("");
  const [puppyname, setPuppyname] = useState("");
  const [userId, setUserId] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  async function deletePuppy(id) {
    let res = await fetch(`http://localhost:3000/newdetails/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      console.log("Puppy successfully deleted");
      setUploading(!uploading);
    } else {
      console.log("error deleting puppy");
    }
  }

  useEffect(() => {
    async function getPuppyData() {
      let res = await fetch("http://localhost:3000/details", {
        credentials: "include",
      });
      let json = await res.json();
      if (res.status === 200) {
        setUserId(json.userId);
        setUsername(json.username);
        setPuppyname(json.puppyname);
        setPuppyData(json.data);
        if (json.admin) {
          setIsAdmin(true);
        }
      } else if (res.status === 404 || res.status === 500) {
        navigate("/Home");
        console.log("entra nel secondo UseE else riga 58");
      } else {
        navigate("/");
      }
    }
    // }
    getPuppyData();
  }, [uploading]);

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
        <div className="header-firstrow">
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
              {/* <li>
                <Link className="home-link" to="/PuppiesGallery">
                  Find Your Furry Soulmate
                </Link>
              </li> */}
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
        {isAdmin && (
          <div className="form-admin">
            <button>Create</button>
            <button>Read</button>
            <button>Delete</button>
            <button>Edit</button>
          </div>
        )}
        <section className="form-puppy puppies ">
          <div className="intro-form-puppy">
            <p>Discover our special and wonderful puppies.</p>
            <p>
              Dear {username && username.toUpperCase()} and{" "}
              {puppyname && puppyname.toUpperCase()} here you can meet and
              discover our special and wonderful puppies!
            </p>
          </div>

          <div className="tab-puppy multi-section">
            {puppyData.map((puppy, i) => {
              return (
                <>
                  <section className="tab-puppy ">
                    <div className="title-name-schedule">
                      <h4>
                        {puppy.puppyname && puppy.puppyname.toUpperCase()}
                      </h4>
                    </div>
                    <div className="tab-info-puppy">
                      <img
                        id="puppy-photo"
                        src={`data:image/png;base64, ${puppy.file}`}
                        // src={`data:image/jpeg;charset=utf-8;base64,${puppy.image}`}
                        // src={`data:image/jpeg;base64,${puppy.image}`}
                        alt="dog"
                      />
                      <div className="tab-details-puppy">
                        <p>
                          Breed: {puppy.breed} <br></br>Age: {puppy.age}
                          <br></br>Gender: {puppy.gender}
                          <br></br>Weight: {puppy.weight}
                          <br></br>Description: {puppy.description}
                        </p>
                        {puppy.userId === userId && (
                          <div>
                            <button
                              id="delete-puppy"
                              type="button"
                              onClick={() => {
                                deletePuppy(puppy._id);
                              }}
                            >
                              Click here to delete your Puppy
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                </>
              );
            })}
          </div>
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
