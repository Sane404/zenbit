import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState([]);
  const [success, setSuccess] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ ...user }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data.success);
        if (data.errors) {
          let inputs = data.errors.map((el) => {
            return el.param;
          });
          console.log(inputs);
          setFormErrors(inputs);
          setSuccess(false);
        } else if (data.success) {
          setSuccess(true);
          setTimeout(() => {
            window.location = "/";
          }, 5000);
        }
      });
  };
  return (
    <div className="App">
      {success && (
        <div
          className="modal"
          style={{
            background: "green",
          }}
        >
          Message saved in Database
        </div>
      )}
      {!success && success !== null && (
        <div
          className="modal"
          style={{
            background: "red",
          }}
        >
          Error has occured check if form is valid
        </div>
      )}
      <img
        src="/yellow_up.png"
        alt="yellow_slime_image"
        className="slime y_s_header"
      />
      <main>
        <div className="form_wrap">
          <h2>Reach out to us!</h2>
          <form>
            <input
              type="text"
              placeholder="Your name here*"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            {formErrors.includes("name") && (
              <div className="error" style={{ color: "red" }}>
                Name is too short (3 symbols minimum)
              </div>
            )}

            <input
              type="email"
              placeholder="Your e-mail*"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            {formErrors.includes("email") && (
              <div className="error" style={{ color: "red" }}>
                Invalid e-mail format
              </div>
            )}
            <textarea
              placeholder="Your message*"
              value={user.message}
              onChange={(e) => setUser({ ...user, message: e.target.value })}
            />
            {formErrors.includes("message") && (
              <div className="error" style={{ color: "red" }}>
                Message is too short (5 symbols minimum)
              </div>
            )}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!user.name || !user.email || !user.message || success}
            >
              Send message
            </button>
          </form>
          <img
            src="/pink.png"
            alt="pink_slime_image"
            className="slime p_s_form"
          />
          <img
            src="/yellow_down.png"
            alt="yellow_slime_image"
            className="slime y_s_form"
          />
        </div>
        <div className="map">
          <img src="/map.svg" alt="map"></img>
        </div>
      </main>
      <footer>
        <div className="socials">
          <img src="/In.svg" alt="?" />
          <img src="/F.svg" alt="?" />
          <img src="/T.svg" alt="?" />
          <img src="/P.svg" alt="?" />
        </div>
        <img
          src="/yellow_up.png"
          alt="yellow_slime_image"
          className="slime y_s_footer"
        />
        <img
          src="/green-slime.png"
          alt="gree_slime_image"
          className="slime g_s_footer"
        />
        <img
          src="/pink.png"
          alt="pink_slime_image"
          className="slime p_s_footer"
        />
      </footer>
    </div>
  );
}

export default App;
