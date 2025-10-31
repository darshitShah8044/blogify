import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../reducers/authSlice";

const Header = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                {/* Logo / Home */}
                <div className="text-2xl font-semibold text-blue-600">
                    <Link to="/">Blogify</Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex items-center gap-6">
                    <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
                        Home
                    </Link>

                    {isAuthenticated && (
                        <>
                            <Link to="/blogs" className="text-gray-700 hover:text-blue-600 font-medium transition">
                                Blogs
                            </Link>
                            <Link to="/explore" className="text-gray-700 hover:text-blue-600 font-medium transition">
                                Explore
                            </Link>
                            <Link to="/create" className="text-gray-700 hover:text-blue-600 font-medium transition">
                                Create Blog
                            </Link>
                            <Link to="/album" className="text-gray-700 hover:text-blue-600 font-medium transition">
                                Gallery
                            </Link>
                        </>
                    )}
                </nav>

                {/* Right Side (Login / User Info) */}
                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <span className="text-gray-700 font-medium">
                                👋 Welcome, <span className="text-blue-600">Admin</span>
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
