import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import Main from "./pages/Main";
import { ToastContainer } from "react-toastify";

function App() {
  // const isAuthenticated = () => {
  //   return localStorage.getItem("access_token") !== null;
  // };
  return (
    <Router>
      <div className="page" style={{ height: "100vh" }}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/*" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
