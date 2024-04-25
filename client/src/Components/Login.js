import { useState, useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
export default function Login(/*setAdmin*/) {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [puppyname, setPuppyname] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const [msgErrorLogin, setMsgErrorLogin] = useState("");
  const [createNewAccount, setCreateNewAccount] = useState(false);
  const [userCreateError, setUserCreateError] = useState(false);
  const [userCreateErrorMsg, setUserCreateErrorMsg] = useState("");
  // const [register, setRegister] = useState(false);
  const navigate = useNavigate();

  async function login() {
    if (emailLogin && passwordLogin) {
      let res = await fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailLogin, password: passwordLogin }),
      });
      let json = await res.json();

      if (res.status === 401) {
        setMsgErrorLogin(json.msg);
        setErrorLogin(true);
      } else {
        setEmailLogin("");
        setPasswordLogin("");
        setErrorLogin(false);
        navigate("/Home");
        // if (json.admin) {
        //   setAdmin(json.admin);
        // }
      }
    } else {
      setMsgErrorLogin("Please enter your email and password");
      setErrorLogin(true);
    }
  }

  function showModule() {
    setCreateNewAccount(true);
    setEmailLogin("");
    setPasswordLogin("");
  }
  // async function createUser() {
  async function signup() {
    //TODO VERIFICARE SE BASTA INPUT TYPE=EMAIL PER VALIDARE

    if (
      password.length > 11 &&
      password === confPassword &&
      name.length > 1 &&
      email /*qui potrei fare un'emailIsValid*/ &&
      username.length > 1 &&
      puppyname.length > 1
    ) {
      let res = await fetch("http://localhost:3000/create", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, puppyname, email, password }),
      });
      // let json = await res.json();
      if (res.status === 401) {
        setUserCreateErrorMsg("registration failed");
        setUserCreateError(true);
      } else {
        setUserCreateError(false);
        setName("");
        setUsername("");
        setPuppyname("");
        setEmail("");
        setPassword("");
        setCreateNewAccount(false);
        navigate("/");
      }
    } else {
      setUserCreateErrorMsg(
        "Something went wrong. Please complete registration-form and make your password strong using a combination of more than 11 letters, numbers or symbols"
      );
      setUserCreateError(true);
    }
  }
  function back() {
    setCreateNewAccount(false);
    setEmailLogin("");
    setPasswordLogin("");
  }
  return (
    <div className="body-container">
      <header className="logoAndTitle">
        <div id="img-title">
          <img src="images/logo1.PNG" alt="puppies"></img>
        </div>

        <div className="title-description">
          <h1>Wonder Woof</h1>
          <p>
            The Top Dog Connection: Unleashing the best Paws-sibilities ever!
          </p>
        </div>
      </header>

      <main
        className={createNewAccount ? "register-container" : "login-container"}
      >
        <div className="main-left">
          <p className="paragraph">
            Sign up for the Paws-itivity Club, create a free online account and
            enjoy many benefits, including access to an online dashboard where
            you can view the registration details of all club Paws' members , as
            well as access to our meeting center and join the Paws-itivity
            member Parties!
          </p>
        </div>
        <div className="main-right">
          <p className="signupbutton">
            Sign in or{" "}
            <button className="signupbutton" onClick={showModule}>
              click here to create an account
            </button>
          </p>

          <div
            className={
              createNewAccount ? "form-reg-container" : "form-log-container"
            }
          >
            {!createNewAccount && (
              <section className="form-login" /*action="/Home" method="POST"*/>
                <div className="login-email">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                    name="email"
                    value={emailLogin}
                    onChange={(e) => setEmailLogin(e.target.value)}
                    required
                  />
                </div>
                <div className="login-pw">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={passwordLogin}
                    onChange={(e) => setPasswordLogin(e.target.value)}
                    required
                  />
                </div>

                <div className="button-login">
                  <button onClick={login}>Login</button>
                  {errorLogin && (
                    <p className="error-login-msg">{msgErrorLogin}</p>
                  )}
                </div>
              </section>
            )}
            {createNewAccount && (
              <section
                // style={{ height: "100vh" }}
                className="form-register" /*action="/" method="POST"*/
              >
                <div>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="username">Username:</label>
                  <input
                    type="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="puppyName">Puppy Name:</label>
                  <input
                    type="puppyName"
                    name="puppyName"
                    value={puppyname}
                    onChange={(e) => setPuppyname(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                    name="email"
                    autoComplete="on"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="login-pw">
                  <label htmlFor="conf-password">Confirm Password:</label>
                  <input
                    type="password"
                    name="conf-password"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    required
                  />
                </div>
                <p id="terms-conditions">
                  By continuing, you agree to our {"  "}
                  <Link to="/userAgreement"> User Agreement </Link> and{" "}
                  <Link to="/privacyPolicy">Privacy Policy</Link>.
                </p>
                <div className="button-reg">
                  <div>
                    <button className="reg-button" onClick={signup}>
                      Sign up
                    </button>
                    <button className="reg-button" onClick={back}>
                      Back to login
                    </button>
                  </div>
                  {userCreateError && (
                    <p className="error-registration-msg">
                      {userCreateErrorMsg}
                    </p>
                  )}{" "}
                </div>

                {/* <input id="buttonSubmitLogin" type="button" value="Login" />

          <input id="buttonSubmitLogin" type="button" value="Register" /> */}
              </section>
            )}
            {/* <input id="buttonSubmitLogin" type="button" value="Login" />

          <input id="buttonSubmitLogin" type="button" value="Register" /> */}
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
