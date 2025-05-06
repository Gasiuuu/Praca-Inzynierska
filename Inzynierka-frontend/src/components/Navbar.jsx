import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { IoNotifications } from 'react-icons/io5'
import { MdDarkMode } from 'react-icons/md'

function Navbar() {
    return (
        <nav
            className="
                flex items-center
                justify-between
                h-[var(--header-height)]
                px-5
                bg-white
                text-black
                shadow-[0_4px_8px_rgba(0,0,0,0.2),0_6px_20px_rgba(0,0,0,0.19)]
            "
        >
            <Link to="/" className="flex items-center gap-2 no-underline text-black">
                <img
                    src={logo}
                    alt="logo"
                    className="w-8 h-8 object-contain"
                />
                <h1
                    className="
                      inline-block
                      origin-left
                      transform
                      scale-x-100
                      opacity-100
                      transition-all
                      duration-300
                      ease-in-out
                      text-[1.5rem]
                      text-black
                      font-semibold
                      italic

                      [@media(max-width:700px)]:scale-x-0
                      [@media(max-width:700px)]:opacity-0
                      [@media(max-width:620px)]:hidden
                    "
                >
                    Just_deutsch
                </h1>
            </Link>



            <div className="flex items-center gap-4">
                <Link
                    to="/kup"
                    className="px-3 py-1.5 rounded text-[1.2rem] font-bold text-white no-underline bg-[linear-gradient(45deg,#000080,#800080)]"
                >
                    Kup Premium
                </Link>

                <button className="bg-transparent border-0 cursor-pointer text-2xl p-2">
                    <MdDarkMode />
                </button>

                <button className="bg-transparent border-0 cursor-pointer text-2xl p-2">
                    <IoNotifications />
                </button>

                <Link to="/logowanie" className="no-underline text-black font-medium text-[1.2rem]">
                    Zaloguj się
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;
