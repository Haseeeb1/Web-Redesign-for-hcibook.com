import assets from "@/assets";
import React from "react";

const OrderNow = () => {
  return (
    <section
      className="flex flex-col p-10 items-center justify-center w-full gap-10 dark:bg-slate-800 dark:text-darkModeTextClr"
      id="order-now"
    >
      <h1 className="main_heading">Order Now</h1>
      <div className="flex flex-col lg:flex-row md:gap-10 items-start justify-around w-full">
        <div>
          <h2 className="main_subheading">Full ordering information</h2>
          <p className="main_text">
            Human Computer Interaction, 3rd Edition
            <br />
            Alan Dix, Janet Finlay, Gregory Abowd, Russell Beale
            <br />
            Prentice Hall, 2004. ISBN 0-13-046109-1
          </p>
          <p className="main_text">
            <span className="italic">Human-Computer Interaction</span> is found
            in most University Bookshops.
          </p>
        </div>

        <div className="flex flex-col items-start">
          <h2 className="main_subheading">Ordering Online</h2>
          <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center gap-10 ">
            <img
              className="dark:filter dark:invert dark:brightness-0 h-auto w-40"
              // src="https://www.vectorlogo.zone/logos/amazon/amazon-ar21.svg"
              src={assets.amazon}
            />
            <img
              className="dark:filter dark:invert dark:brightness-0 h-auto w-40"
              src={assets.WHSmith}
            />
            <img
              className="dark:filter dark:invert dark:brightness-0 h-auto w-40"
              src={assets.BandS}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderNow;
