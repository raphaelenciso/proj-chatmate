import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  return (
    <div>
      <Router>
        <div className="bg-dark-bg-main h-screen flex justify-center items-center">
          <Routes>
            <Route
              path="/"
              element={currentUser ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!currentUser ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!currentUser ? <Register /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
