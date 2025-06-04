import React, { useState } from "react";
import { NavLink } from "react-router-dom";

interface NavbarProps {
    loggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ loggedIn }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { name: "Home", to: "/" },
        { name: "Projects", to: "/projects" },
        { name: "Assignments", to: "/assignments" },
        { name: "Profile", to: "/profile" },
        { name: "Members", to: "/members" },
    ];

    const linkClass = "text-gray-700 hover:text-blue-600 transition-colors";
    const activeClass = "text-blue-600 font-semibold";

    const mobileLinkClass =
        "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-100";
    const mobileActiveClass = "bg-blue-100 text-blue-600 font-semibold";

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0">
                        <NavLink
                            to="/"
                            className="text-xl font-bold text-blue-600"
                        >
                            ResourceManager
                        </NavLink>
                    </div>
                    <div className="hidden md:flex space-x-6 items-center">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.to}
                                className={({ isActive }) =>
                                    isActive
                                        ? `${linkClass} ${activeClass}`
                                        : linkClass
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        {!loggedIn && (
                            <>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        isActive
                                            ? `${linkClass} ${activeClass}`
                                            : linkClass
                                    }
                                >
                                    Login
                                </NavLink>
                            </>
                        )}
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {menuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.to}
                                className={({ isActive }) =>
                                    isActive
                                        ? `${mobileLinkClass} ${mobileActiveClass}`
                                        : mobileLinkClass
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        {!loggedIn && (
                            <>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        isActive
                                            ? `${mobileLinkClass} ${mobileActiveClass}`
                                            : mobileLinkClass
                                    }
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className={({ isActive }) =>
                                        isActive
                                            ? `${mobileLinkClass} ${mobileActiveClass}`
                                            : mobileLinkClass
                                    }
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
