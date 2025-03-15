import { useState } from "react";
import "./App.css";
import { post } from "./api";
import { Main } from "./components/main";
import { Login } from "./components/login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {loggedIn ? (
        <>
          <Main />
          <div className="logout">
            <button
              onClick={() => {
                const response = post("auth/logout");
                if (response) {
                  setLoggedIn(false);
                }
              }}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
    </>
  );
}

export default App;
