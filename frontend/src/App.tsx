import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './AccountPage/LoginPage';
import RegisterPage from "./AccountPage/RegisterPage";

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
