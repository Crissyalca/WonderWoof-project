import { useState, useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";

export default function AddPuppy() {
  const [username, setUsername] = useState("");
  const [puppyname, setPuppyname] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [puppyId, setPuppyId] = useState("");
  const [breedMsg, setBreedMsg] = useState("");
  const [breedErr, setBreedErr] = useState(false);
  const [ageMsg, setAgeMsg] = useState("");
  const [ageErr, setAgeErr] = useState(false);
  const [genderMsg, setGenderMsg] = useState("");
  const [genderErr, setGenderErr] = useState(false);
  const [weightMsg, setWeightMsg] = useState("");
  const [weightErr, setWeightErr] = useState(false);
  const [image, setImage] = useState({ preview: "", raw: "" });
  const navigate = useNavigate();

  useEffect(() => {
    async function call() {
      let res = await fetch("http://localhost:3000/logged", {
        credentials: "include",
      });
      let json = await res.json();

      if (res.status === 200) {
        if (json.puppyId) {
          setPuppyId(json.puppyId);
          navigate("/PuppiesGallery");
        }
        setUsername(json.username);
        setPuppyname(json.puppyname);
        setUserId(json.userId);
      } else {
        navigate("/");
      }
    }
    call();
  }, []);

  function handlePhotoPath(event) {
    // setSelectedFile(event.target.files[0]);
    setImage({
      // preview: URL.createObjectURL(event.target.files[0]),
      raw: event.target.files[0],
    });
  }

  async function submit() {
    let isValid = true;
    if (!/^[a-zA-Z ]+$/.test(breed) || breed.length < 3) {
      setBreedErr(true);
      setBreedMsg("Are you sure this is a breed?");
      isValid = false;
    }
    const ageNum = parseInt(age);
    if (typeof ageNum != "number" || ageNum > 35 || !age) {
      setAgeErr(true);
      setAgeMsg("Please insert a valid whole number");
      isValid = false;
    }
    if ((gender !== "male" && gender !== "female") || !gender) {
      setGenderErr(true);
      setGenderMsg(`Please insert "male" or "female"`);
      isValid = false;
    }
    const weightNum = parseInt(weight);
    if (typeof weightNum != "number" || !weight) {
      setWeightErr(true);
      setWeightMsg("Please insert whole number");
      isValid = false;
    }
    if (isValid) {
      const puppyData = JSON.stringify({
        userId,
        puppyname,
        breed,
        age,
        gender,
        weight,
        description,
      });
      const formData = new FormData();
      formData.append("puppy", puppyData);
      formData.append("file", image.raw);
      if (!image.raw) {
        console.log("no image selected");
        return;
      }
      try {
        const res = await fetch("http://localhost:3000/addPuppy", {
          method: "POST",
          // headers: {
          //   "Content-Type": "multipart/form-data",
          //   //   // "Content-Type": "application/json",
          // },
          // data: formData,
          body: formData,
        });
        if (res.status === 201) {
          navigate("/PuppiesGallery");
        } else {
          console.log("error while saving puppy data", image.raw);
        }
      } catch (err) {
        console.log("error");
      }
    }
  }
  async function logout() {
    await fetch("http://localhost:3000/logout", {
      method: "PUT",
      credentials: "include",
    });
    navigate("/");
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
                <Link className="home-link" to="/PuppiesGallery">
                  Find Your Furry Soulmate
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
      <main className="home-body" id="insert-puppy">
        <div className="form-register" id="add-puppy">
          <h2> ABOUT {puppyname && puppyname.toUpperCase()} </h2>

          <p>
            Tell us something more about {puppyname && puppyname.toUpperCase()}.
            <br></br>We'd love to hear all about your beloved companion!
          </p>

          <div>
            <label htmlFor="breed">Breed:</label>
            <input
              type="text"
              name="breed"
              autoComplete="on"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              required
            />
            {breedErr && <p className="err-mess">{breedMsg}</p>}
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <input
              type="text"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            {ageErr && <p className="err-mess">{ageMsg}</p>}
          </div>
          <div>
            <label htmlFor="gender">Gender:</label>
            <input
              type="text"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            {genderErr && <p className="err-mess">{genderMsg}</p>}
          </div>
          <div>
            <label htmlFor="weight">Weight:</label>
            <input
              type="text"
              name="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
            {weightErr && <p className="err-mess">{weightMsg}</p>}
          </div>

          <div className="form-add-puppy-textarea">
            <label htmlFor="description">
              Share what makes {puppyname && puppyname.toUpperCase()} unique:
            </label>

            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="uploadImg">
            <label htmlFor="image">
              {image.preview ? (
                <img className="photo-uploaded" src={image.preview} alt="dog" />
              ) : (
                <>
                  <p>Upload Image</p>
                </>
              )}
            </label>
            <input
              type="file"
              name="image"
              id="upload-button"
              onChange={handlePhotoPath}
            />
          </div>
          <button type="submit" onClick={submit}>
            submit
          </button>
          {/* {userCreateError && <p>{userCreateErrorMsg}</p>} */}
        </div>
        {/* </section> */}
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
// const formData = new FormData();
// formData.append("userId", userId);
// formData.append("puppyname", puppyname);
// formData.append("breed", breed);
// formData.append("age", age);
// formData.append("gender", gender);
// formData.append("weight", weight);
// formData.append("description", description);
// formData.append("file", image.raw);
