import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import userIcon from "../../assets/user-icon.png"; // Fallback image
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import {
  ArrowLeftStartOnRectangleIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

const NavBar = ({ userInfo }) => { // Correctly destructuring props
  const [activeLink, setActiveLink] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const avatarRef = useRef();

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
    toast.success("Logged out!");
  };

  // Handling click outside event for avatar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [avatarRef]);

  return (
    <nav className="z-50">
      <div className="w-full bg-black top-0 flex justify-between fixed items-center px-20 py-4">
        <div className="navbar-logo">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-16 lg:h-12 ml-10 lg:ml-0" />
          </Link>
        </div>
        <div className="flex flex-row">
          <div className="flex justify-end">
            <button
              className="text-white block lg:hidden"
              onClick={() =>
                document
                  .getElementById("basic-navbar-nav")
                  .classList.toggle("hidden")
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div
          id="basic-navbar-nav"
          className="hidden lg:flex lg:items-center lg:w-auto w-full"
        >
          <ul className="lg:flex lg:items-center lg:justify-between text-base text-gray-300 pt--1 lg:pt-0">
            <li>
              <Link
                to="/"
                className={`block px-5 lg:inline-block mt-4 lg:mt-0 mx-2 ${
                  activeLink === "home"
                    ? "text-white bg-teal-500 rounded-md"
                    : ""
                }`}
                onClick={() => handleNavLinkClick("home")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/service"
                className={`block px-5 lg:inline-block mt-4 lg:mt-0 mx-2 ${
                  activeLink === "service"
                    ? "text-white bg-teal-500 rounded-md"
                    : ""
                }`}
                onClick={() => handleNavLinkClick("service")}
              >
                Service
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className={`block px-5 lg:inline-block mt-4 lg:mt-0 mx-2 ${
                  activeLink === "blog"
                    ? "text-white bg-teal-500 rounded-md"
                    : ""
                }`}
                onClick={() => handleNavLinkClick("blog")}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`block px-5 lg:inline-block mt-4 lg:mt-0 mx-2 ${
                  activeLink === "contact"
                    ? "text-white bg-teal-500 rounded-md"
                    : ""
                }`}
                onClick={() => handleNavLinkClick("contact")}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/aboutus"
                className={`block px-5 lg:inline-block mt-4 lg:mt-0 mx-2 ${
                  activeLink === "aboutus"
                    ? "text-white bg-teal-500 rounded-md"
                    : ""
                }`}
                onClick={() => handleNavLinkClick("aboutus")}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/property-listing"
                className={`block px-5 lg:inline-block mt-4 lg:mt-0 mx-2 ${
                  activeLink === "propertyListing"
                    ? "text-white bg-teal-500 rounded-md"
                    : ""
                }`}
                onClick={() => handleNavLinkClick("propertyListing")}
              >
                Property Listing
              </Link>
            </li>
            <li>
              {/* User avatar or login button */}
              {authState.status === true && localStorage.getItem("token") ? (
                <div ref={avatarRef}>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="rounded-full relative flex justify-center items-center w-9 h-9 mx-3 text-white bg-teal-500"
                  >
                    <img
                      src={userInfo?.profilePicture || userIcon} // Use fallback image if profilePicture is undefined
                      alt="avatar"
                      className="w-full h-full rounded-full p-1"
                    />
                  </button>
                  {isMenuOpen && (
                    <div className="absolute top-20 right-14 w-fit h-fit flex flex-col justify-center items-center text-[#120404] bg-white rounded-lg">
                      <ul className="w-full flex flex-col items-start">
                        <li className="font-extrabold p-3 w-full text-center bg-gray-200 ">
                          {authState.userData?.firstName?.toUpperCase() || "User"}
                        </li>
                        <li
                          onClick={() => {
                            navigate("/landlord-dashboard");
                            setIsMenuOpen(false);
                          }}
                          className="w-full cursor-pointer flex items-center p-3 hover:bg-gray-200 rounded-lg"
                        >
                          <ComputerDesktopIcon className="w-[18px] h-[18px] mr-2" />{" "}
                          Dashboard
                        </li>
                        <li
                          className="w-full cursor-pointer flex items-center p-3 hover:bg-gray-200 rounded-lg"
                          onClick={handleLogout}
                        >
                          <ArrowLeftStartOnRectangleIcon className="w-[18px] h-[18px] mr-2" />{" "}
                          Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className={`block px-5 lg:inline-block mt-4 lg:mt-0 ${
                    activeLink === "login"
                      ? "text-white bg-teal-500 rounded-md"
                      : ""
                  }`}
                  onClick={() => handleNavLinkClick("login")}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
