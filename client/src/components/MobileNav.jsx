import assets from "@/assets";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const MobileNav = ({ isDark, toggleTheme }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();
  const name = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const completedChapters =
    JSON.parse(localStorage.getItem("completedChapters")) || [];
  const completedExercises =
    JSON.parse(localStorage.getItem("completedExercises")) || [];

  const handleScrollToOrderNow = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 500);
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <img
            className={`${
              isDark || theme === "dark" ? "filter invert brightness-0" : ""
            } w-10`}
            src={assets.hamburger}
            alt="hamburger"
          />
        </SheetTrigger>
        <SheetContent
          className={`${
            isDark || theme === "dark"
              ? "bg-slate-800 text-darkModeTextClr"
              : ""
          }`}
        >
          <nav className="mt-20 flex flex-col items-start gap-20">
            <div className="flex flex-col items-start gap-10">
              <SheetClose asChild>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "navlinks border-b-2 border-black"
                      : "navlinks group"
                  }
                  to="/exercises"
                >
                  Exrecises
                  <span className="nav_animations"></span>
                </NavLink>
              </SheetClose>

              <SheetClose asChild>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "navlinks border-b-2 border-black"
                      : "navlinks group"
                  }
                  to="/chapters"
                >
                  Chapter Links
                  <span className="nav_animations"></span>
                </NavLink>
              </SheetClose>

              <SheetClose asChild>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "navlinks border-b-2 border-black"
                      : "navlinks group"
                  }
                  to="/"
                  onClick={handleScrollToOrderNow}
                >
                  Order Now
                  <span className="nav_animations"></span>
                </NavLink>
              </SheetClose>
              <SheetClose asChild>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "navlinks border-b-2 border-black"
                      : "navlinks group"
                  }
                  to="/faqs"
                >
                  FAQ's
                  <span className="nav_animations"></span>
                </NavLink>
              </SheetClose>

              <SheetClose asChild>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "navlinks border-b-2 border-black"
                      : "navlinks group"
                  }
                  to="/online-resources"
                >
                  Online Resources
                  <span className="nav_animations"></span>
                </NavLink>
              </SheetClose>
            </div>

            <div className="flex gap-6 self-center">
              <SheetClose asChild>
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
                  className="w-4 cursor-pointer"
                  src={
                    localStorage.getItem("theme") === "dark"
                      ? assets.light_mode
                      : assets.nightmode
                  }
                  alt="light-mode"
                />
              </SheetClose>
              {/* <img className="w-6" src={assets.light_mode} alt="light-mode" /> */}
              {token ? (
                <Dialog>
                  <DialogTrigger>
                    <div
                      className={`${
                        isDark || theme === "dark"
                          ? ""
                          : "bg-gray-100 border-white"
                      } flex-center size-12 rounded-full  border-2  p-2 shadow-profile`}
                    >
                      <span className="text-xl font-bold text-blue-500">
                        {name[0].toUpperCase()}
                      </span>
                    </div>
                  </DialogTrigger>
                  <DialogContent
                    className={`${
                      isDark || theme === "dark"
                        ? "bg-slate-800 text-white"
                        : ""
                    } flex flex-col gap-2 p-0 w-[350px]`}
                  >
                    <div className=" h-[120px] w-full bg-gradient-mesh bg-cover bg-no-repeat" />
                    <div className="flex-center absolute top-[20%] left-3 size-24 rounded-full bg-gray-100 border-8 border-white p-2 shadow-profile">
                      <span className="flex justify-center  items-center text-5xl font-bold text-blue-500">
                        {name[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="p-6 mt-10 flex flex-col gap-4">
                      <h2 className="text-xl font-bold">{name}</h2>
                      <p className="text-lg">
                        <span>Chapters Completed: </span>
                        {completedExercises.length}/137
                      </p>
                      <p className="text-lg">
                        <span>Exercises Completed: </span>
                        {completedChapters.length}/21
                      </p>
                      <button
                        className={`${
                          isDark || theme === "dark"
                            ? "border-white hover:bg-white hover:border-white hover:text-black"
                            : ""
                        } flex self-start border border-black py-3 px-3 gap-6`}
                      >
                        <img
                          className={`${
                            isDark || theme === "dark"
                              ? "invert  filter hover:filter-none"
                              : ""
                          } w-6`}
                          src={assets.logout}
                        />
                        <p>Logout</p>
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="main_btn mt-0"
                >
                  Login
                </button>
              )}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
