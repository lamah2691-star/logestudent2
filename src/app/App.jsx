import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Home from '../pages/Home/Home';
import CitesListing from '../pages/CitesListing/CitesListing';
import CiteDetails from '../pages/CiteDetails/CiteDetails';
import Reservation from '../pages/Reservation/Reservation';
import Rooms from '../pages/Rooms/Rooms';
import RoomDetails from '../pages/RoomDetails/RoomDetails';
import StudentDashboard from '../pages/Dashboard/StudentDashboard';
import OwnerDashboard from '../pages/Dashboard/OwnerDashboard';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import StudentLanding from '../pages/StudentLanding/StudentLanding';
import styles from './App.module.css';

// Separate component to handle layout logic based on route
const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isAuth = location.pathname === '/login' || location.pathname === '/register';
  const isLanding = location.pathname === '/';
  const hideLayout = isDashboard || isAuth || isLanding;

  return (
    <div className={styles.appContainer}>
      {!hideLayout && <Navbar />}
      <main className={isDashboard ? styles.dashboardContent : styles.mainContent}>
        <Routes>
          <Route path="/" element={<StudentLanding />} />
          <Route path="/v1" element={<Home />} />
          <Route path="/cites" element={<CitesListing />} />
          <Route path="/cites/:id" element={<CiteDetails />} />
          <Route path="/buildings/:buildingId/rooms" element={<Rooms />} />
          <Route path="/rooms/:roomId" element={<RoomDetails />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/owner" element={<OwnerDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
