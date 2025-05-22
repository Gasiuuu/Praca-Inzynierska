import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserService from "./services/UserService.js";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";
import Register from "./pages/Register.jsx";
import FlashcardsPage from "./pages/FlashcardsPage.jsx";
import FlashcardSetPage from "./pages/FlashcardSetPage.jsx";
import TranslatePage from "./pages/TranslatePage.jsx";

function AppRoutes() {
    const renderLayout = (Component) => (
        <div className="relative w-full flex flex-col min-h-screen">
            <header className="sticky top-0 w-full h-[var(--header-height)] z-[11]">
                <Navbar />
            </header>

            <div className="flex flex-1">
                <Sidebar />
                <div className="flex-1 p-8 overflow-y-auto mb-15">
                    {Component}
                </div>
            </div>

            <Footer />
        </div>
    );

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/strona-glowna" />} />
                <Route path="/strona-glowna" element={renderLayout(<Home />)} />
                <Route path="/logowanie" element={<Login />} />
                <Route path="/fiszki" element={renderLayout(<FlashcardsPage />)}/>
                <Route path="/fiszki/:categoryId" element={renderLayout(<FlashcardSetPage />)} />
                <Route path="/rejestracja" element={<Register />} />
                <Route path="/tlumaczenia" element={renderLayout(<TranslatePage />)} />

                {UserService.adminOnly() && (
                    <>
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default AppRoutes;
