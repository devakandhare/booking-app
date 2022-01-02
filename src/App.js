import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// import different app components for application routing
import BookablesPage from "./bookables/BookablesPage";
import BookingsPage from "./bookables/BookingsPage";
import UsersPage from "./users/UsersPage";
import UsersPicker from "./users/UsersPicker";

// import icons to show with navigation menu
import { FaCalendarAlt, FaDoorOpen, FaUsers } from "react-icons/fa";

function App() {
  return (
    <Router>
      <div className="App">
        {/** define navigation here.. */}
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/bookings" className="btn btn-header">
                  <FaCalendarAlt />
                  <span>Booking</span>
                </Link>
              </li>
              <li>
                <Link to="/bookables" className="btn btn-header">
                  <FaDoorOpen />
                  <span>Bookables</span>
                </Link>
              </li>
              <li>
                <Link to="/users" className="btn btn-header">
                  <FaUsers />
                  <span>Users</span>
                </Link>
              </li>
            </ul>
          </nav>
          <UsersPicker />
        </header>
        {/** define routes here */}
        <Routes>
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/bookables" element={<BookablesPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
