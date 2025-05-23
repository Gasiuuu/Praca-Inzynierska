import React from "react";
import logo from '../assets/logo.png'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer
            className="
                absolute bottom-0 left-0
                w-full
                h-[var(--footer-height)]
                bg-gradient-to-br from-[#000080] to-[#800080]
                flex items-center justify-between
                text-white
              "
        >

          <div className="flex items-center justify-between gap-8 lg:ml-20 ml-6 md:text-3xl text-lg">
              <FaFacebook/>
              <FaInstagram className="md:text-4xl text-xl"/>
              <FaTiktok/>
          </div>

            <div className="flex flex-col lg:flex-row lg:text-sm text-xs items-center">
                <img
                    src={logo}
                    alt="logo"
                    className="w-5 h-5 object-contain mr-1"
                />
                <span className="font-bold italic mr-1">Just_deutsch </span> | Wszelkie prawa zastrzeżone
                © {new Date().getFullYear()}
            </div>

            <div className="md:text-sm text-xs text-center lg:mr-20 mr-6 my-auto">
                <Link to="/o-nas">
                    <p>O nas</p>
                </Link>
              <Link to="kontakt">
                  <p>Kontakt</p>
              </Link>
              <Link to="polityka-prywatnosci">
                  <p>Polityka prywatności</p>
              </Link>
          </div>

        </footer>
    );
}

export default Footer;
