import { useState, useEffect } from "react";
import assets from "../assets";
import MobileNav from "./MobileNav";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";

import { parts, chapters, extractChapterNumber } from "@/data";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./CheckBox.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "animate.css";
import "sweetalert2/src/sweetalert2.scss";

const Navbar = ({ toggleTheme }) => {
  const name = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const [hasShadow, setHasShadow] = useState(false);
  const completedChapters =
    JSON.parse(localStorage.getItem("completedChapters")) || [];
  const completedExercises =
    JSON.parse(localStorage.getItem("completedExercises")) || [];

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setHasShadow(true);
    } else {
      setHasShadow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logoutUser = () => {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.reload();
      }
    });
  };

  const handleScrollToOrderNow = () => {
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 500);
  };
  return (
    <nav
      className={`animate__animated animate__fadeInDown bg-customBg1 dark:bg-slate-800 dark:text-darkModeTextClr sticky top-0 left-0 flex items-center justify-between h-24 px-10 md:px-20 font-sub_heading gap-5 z-10 ${
        hasShadow ? "shadow-lg" : ""
      }`}
    >
      <div className="">
        <h3 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          HCIBOOK
        </h3>
      </div>
      <div className="hidden md:flex flex-row items-center gap-10">
        <NavLink
          className={({ isActive }) =>
            isActive ? "navlinks border-b-2 border-black" : "navlinks group"
          }
          to="/exercises"
        >
          Exrecises
          <span className="nav_animations"></span>
        </NavLink>
        {/* <HoverCard openDelay={800} closeDelay={100}>
          <HoverCardTrigger> */}
        <NavLink
          className={({ isActive }) =>
            isActive ? "navlinks border-b-2 border-black" : "navlinks group"
          }
          to="/chapters"
        >
          Chapter Links
          <span className="nav_animations"></span>
        </NavLink>
        {/* </HoverCardTrigger>
          <HoverCardContent className="w-[600px] bg-customBg2">
            <ChapterLinks />
          </HoverCardContent>
        </HoverCard> */}
        <NavLink
          className={({ isActive }) =>
            isActive ? "navlinks border-b-2 border-black" : "navlinks group"
          }
          to="/online-resources"
        >
          Online Resources
          <span className="nav_animations"></span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "navlinks border-b-2 border-black" : "navlinks group"
          }
          to="/faqs"
        >
          FAQs
          <span className="nav_animations"></span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "navlinks border-b-2 border-black" : "navlinks group"
          }
          to="/"
          onClick={handleScrollToOrderNow}
        >
          Order Now
          <span className="nav_animations"></span>
        </NavLink>
      </div>

      <div className="hidden md:flex gap-6">
        <img
          onClick={() => {
            if (theme === "dark") {
              localStorage.setItem("theme", "light");
              toggleTheme("light");
              setTheme("light");
            } else {
              localStorage.setItem("theme", "dark");
              toggleTheme("dark");
              setTheme("dark");
            }
          }}
          className="w-4 cursor-pointer "
          src={
            localStorage.getItem("theme") === "dark"
              ? assets.light_mode
              : assets.nightmode
          }
          alt="light-mode"
        />

        {token ? (
          <Popover>
            <PopoverTrigger>
              <div className="flex-center size-12 rounded-full bg-gray-100 dark:bg-slate-800 border-2 border-white p-2 shadow-profile">
                <span className="text-xl font-bold text-blue-500">
                  {name[0].toUpperCase()}
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className={`${
                theme === "dark" ? "bg-slate-800 text-darkModeTextClr dark" : ""
              } flex flex-col gap-2 p-0`}
            >
              <div className=" h-[120px] w-full bg-gradient-mesh bg-cover bg-no-repeat" />
              <div
                className={`${
                  theme === "dark" ? "bg-slate-800" : ""
                } flex-center absolute top-[20%] left-3 size-24 rounded-full bg-gray-100 border-8 border-white p-2 shadow-profile`}
              >
                <span className="flex justify-center items-center text-5xl font-bold text-blue-500">
                  {name[0].toUpperCase()}
                </span>
              </div>
              <div className="p-6 mt-10 flex flex-col gap-4">
                <div>
                  <h2 className="text-xl  font-bold flex justify-center">
                    {name}
                  </h2>
                  {/* <h3 className="text-xl  mb-4 flex justify-center">
                    {email}{" "}
                  </h3> */}
                </div>
                <p className="text-lg">
                  <span>Chapters Completed: </span>
                  {completedChapters.length}/21
                  <Progress
                    className="mt-2 bg-transparent border-[0.1px] border-black dark:border-white w-full h-2"
                    value={(completedChapters.length / 21) * 100}
                  />
                </p>
                <p className="text-lg">
                  <span>Exercises Completed: </span>
                  {completedExercises.length}/137
                  <Progress
                    className="mt-2 bg-transparent border-[0.1px] border-black dark:border-white w-full h-2"
                    value={(completedExercises.length / 137) * 100}
                  />
                </p>

                <button
                  onClick={() => logoutUser()}
                  className="logout__button flex self-start gap-3 mt-5 border 
                  transition-colors duration-300 px-5 py-3 hover:bg-customBlack
                   hover:text-white hover:border-white dark:bg-text-slate-800 
                   dark:darkModeTextClr dark:border-darkModeTextClr hover:dark:bg-darkModeTextClr 
                   hover:dark:text-slate-800 hover:dark:border-slate-800"
                >
                  <img className="w-6" src={assets.logout1} />
                  Logout
                </button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <button onClick={() => navigate("/login")} className="main_btn mt-0">
            Login
          </button>
        )}
      </div>
      <div className="inline md:hidden">
        <MobileNav isDark={theme === "dark"} toggleTheme={toggleTheme} />
      </div>
    </nav>
  );
};

const ChapterLinks = () => {
  return (
    <div className="flex flex-row items-start justify-center gap-2">
      <div className="flex-1">
        <div>
          <h3 className="font-bold my-2">{parts[0]}</h3>
          {chapters.part1.map((chap) => (
            <Link
              key={chap.href}
              className="hover:underline"
              to={`chap/${chap.href}`}
            >
              <p className="text-base">
                {extractChapterNumber(chap.href)}. {`${chap.title}`}
              </p>
            </Link>
          ))}
        </div>
        <div>
          <h3 className="font-bold my-1">{parts[1]}</h3>
          {chapters.part2.map((chap) => (
            <Link
              key={chap.href}
              className="hover:underline"
              to={`chap/${chap.href}`}
            >
              <h3 className="text-base">
                {extractChapterNumber(chap.href)}. {`${chap.title}`}
              </h3>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex-1">
        <div>
          <h3 className="font-bold my-1">{parts[2]}</h3>
          {chapters.part3.map((chap) => (
            <Link
              key={chap.href}
              className="hover:underline"
              to={`chap/${chap.href}`}
            >
              <h3 className="text-base">
                {extractChapterNumber(chap.href)}. {`${chap.title}`}
              </h3>
            </Link>
          ))}
        </div>
        <div>
          <h3 className="font-bold my-1">{parts[3]}</h3>
          {chapters.part4.map((chap) => (
            <Link
              key={chap.href}
              className="hover:underline"
              to={`chap/${chap.href}`}
            >
              <h3 className="text-base">
                {extractChapterNumber(chap.href)}. {`${chap.title}`}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
