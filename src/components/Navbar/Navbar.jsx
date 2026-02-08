import React, { useState } from "react";
import { Link } from "react-router-dom";
import navbarstyles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";
import { Squash as Hamburger } from 'hamburger-react';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className={navbarstyles.navbar}>
            <div className={navbarstyles.logoContainer}>
                <img
                    className={navbarstyles.logo}
                    src={getImageUrl("nav/logo.png")}
                    alt="Library Logo"
                />
                <Link className={navbarstyles.title} to="/">
                    Baguio City Public Library
                </Link>
            </div>

            {/* Menu Section */}
            <div className={navbarstyles.menu}>
                <div className={navbarstyles.menuBtn}>
                    <Hamburger toggled={menuOpen} toggle={setMenuOpen} />
                </div>
                <div
                    className={`${navbarstyles.menuItems} ${menuOpen ? navbarstyles.menuOpen : ''}`}
                    onClick={() => setMenuOpen(false)}
                >
                    <div>
                        <Link to="/">Home</Link>
                    </div>
                    <div>
                        <Link to="/bookPage">Book</Link>
                    </div>
                    <div>
                        <Link to="/activityPage">Activity</Link>
                    </div>
                    <div>
                        <Link to="/donatePage">Donate</Link>
                    </div>
                    <div>
                        <Link to="/contactPage">Contact</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
