import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './index.css';
import Navbar from './navBar.jsx';
import Home from './homePage.jsx';
import Brands from './brandsPage.jsx';
import Catalog from './Catalog/carCatalog.jsx';
import AppointmentsData from './Appointments/appointments.jsx';
import About from './aboutPage.jsx';
import Footer from './footer.jsx';
import ViewCar from './Catalog/viewCar.jsx';
import SignUpPage from './Login/Sign-up/signUpPage.jsx';
import AddCar from './Catalog/addCar.jsx';
import DeleteCar from './Catalog/deleteCar.jsx';
import LoginPage from "./Login/Sign-up/loginPage.jsx";
import ViewAppointments from "./Appointments/viewAllAppointments.jsx";
import UpdateAppointment from "./Appointments/updateAppointments.jsx";
import DeleteAppointment from "./Appointments/deleteAppointments.jsx";
import DeleteAccount from "./Login/Sign-up/deleteAccount.jsx";

function App() {

  const [user, setUser] = useState(null);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/catalog" element={<Catalog user={user}/>} />
        <Route path="/addCar" element={<AddCar />}/>
        <Route path="/service" element={<AppointmentsData />} />
        <Route path="/about" element={<About />} />
        <Route path="/viewCar" element={<ViewCar />} />
        <Route path="/deleteCar" element={<DeleteCar />} />
        <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
        <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
        <Route path="/viewAppointments" element={<ViewAppointments />} />
        <Route path="/updateAppointment" element={<UpdateAppointment />} />
        <Route path="/deleteAppointment" element={<DeleteAppointment />} />
        <Route path="/deleteAccount" element={<DeleteAccount />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
