import React from "react";

function Footer() {
    return (
        <footer
            className="
                absolute bottom-0 left-0
                w-full
                h-[var(--footer-height)]
                bg-gradient-to-br from-[#000080] to-[#800080]
                flex items-center justify-center
              "
        >
      <span className="text-white">
        Just_deutsch | Wszelkie prawa zastrzeżone © {new Date().getFullYear()}
      </span>
        </footer>
    );
}

export default Footer;
