import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserService from "./services/UserService.js";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";


function AppRoutes() {


    const renderLayout = (Component) => (
        <div className='App'>
            {/*<div className='navbar'>*/}
            {/*    <Navbar/>*/}
            {/*</div>*/}
            <div className='content-wrapper'>
                {Component}
            </div>
            {/*<div className='footer'>*/}
            {/*    <Footer/>*/}
            {/*</div>*/}
        </div>
    );

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/strona-glowna" />} />
                <Route path="/strona-glowna" element={renderLayout(<Home />)}/>
                <Route path="logowanie" element={<Login />} />
                {UserService.adminOnly() && (
                    <>

                    </>
                )}
            </Routes>
        </Router>
    );
}

export default AppRoutes;
