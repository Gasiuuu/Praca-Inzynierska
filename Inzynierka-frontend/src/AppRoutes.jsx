import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home/Home.jsx";
import UserService from "./services/UserService.js";

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
                {UserService.adminOnly() && (
                    <>

                    </>
                )}
            </Routes>
        </Router>
    );
}

export default AppRoutes;
