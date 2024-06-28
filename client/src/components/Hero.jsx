import assets from "@/assets";
import React from "react";
import "animate.css";

const Hero = () => {
  const handleScrollToOrderNow = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };
  return (
    <div className="animate__animated animate__fadeIn w-full flex flex-col md:flex-row items-center justify-center p-10 gap-20 dark:bg-slate-800 dark:text-darkModeTextClr">
      <div className="flex flex-col basis-4/6">
        <h1 className="main_heading">Human Computer Interaction</h1>
        <h3 className="text-xl md:text-2xl">
          By Alan Dix - Janet Finlay - Gregory Abowd - Russell Beale
        </h3>
        <p className="main_text">
          The complete guide to Human Computer Interaction university course
          with all chapters and solved exercises" is a comprehensive resource
          designed to cover the essential principles and methodologies of HCI as
          taught in academic settings. It provides detailed explanations and
          practical examples across topics like usability, interaction design,
          user research, and interface evaluation. With solved exercises and
          case studies integrated throughout, this guide aims to deepen
          understanding and application of HCI concepts, making it a valuable
          tool for students and professionals looking to master the art of
          designing user-friendly digital interfaces.
        </p>
        <button
          onClick={handleScrollToOrderNow}
          className="main_btn mt-10 transition-colors duration-300 hover:bg-customBlack hover:text-white hover:border-white dark:hover:bg-darkModeTextClr dark:hover:text-slate-800 dark:hover:border-slate-800"
        >
          Order Now
        </button>
      </div>
      <div className="basis-2/6">
        <img className="w-full" src={assets.book} alt="book" />
      </div>
    </div>
  );
};

export default Hero;
