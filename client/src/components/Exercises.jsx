import assets from "@/assets";
import React from "react";
import "animate.css";

const Exercises = () => {
  return (
    <section className="animate__animated animate__fadeIn flex flex-col items-center justify-center font-sub_heading pt-10 gap-10 p-10 md:p-10 dark:bg-slate-800 dark:text-darkModeTextClr">
      <div className="flex flex-col gap-6 md:w-1/2">
        <h1 className="text-4xl font-bold">Exercises</h1>
        <Path />
        <div className="flex flex-col items-start gap-2">
          <div className="border rounded-md border-gray-400 p-4 flex w-full items-start gap-3">
            <img
              className="dark:filter dark:invert dark:brightness-0 w-8"
              src={assets.info}
              alt="info"
            />
            <h2>
              <span className="font-bold">Tutors:</span> please ask your local
              Prentice Hall/Pearson rep or mail feedback@hcibook.com for access
              to tutor-only solutions. Please provide your name, institution and
              formal email address. Asdditional solutions are only available to
              tutors. To help verify that you are a tutor, please also provide
              the URL of a formal web page where you are listed, or
              alternatively someone who can be contacted at your institution who
              can verify your status.
            </h2>
          </div>
          <div className="border rounded-md border-gray-400 p-4 flex flex-row w-full items-start justify-between">
            <h3 className="flex-1 text-gray-400">Tutors</h3>
            <h3 className="flex-1">Answers Availabe</h3>
            <h3 className="flex-1 text-emerald-600">Open Ended Question</h3>
          </div>
        </div>
        <ExercisesAccordion />
      </div>
    </section>
  );
};
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { exercises } from "@/data";
import { Link } from "react-router-dom";
import Path from "./Path";
const ExercisesAccordion = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {exercises.map((chap) => {
        return (
          <AccordionItem value={chap.chapNo}>
            <AccordionTrigger className="s text-lg font-bold text-left">
              {chap.chapNo}. {chap.chapTitle}
            </AccordionTrigger>
            <AccordionContent className="text-base grid grid-cols-2 md:grid-cols-3">
              <Link
                to={`/exercises/id?id=${chap.chapNo}`}
                className="text-gray-400"
              >
                All Exercises
              </Link>
              {chap.exercises.map((exercise) => (
                <Link
                  to={`/exercises/id?id=${exercise.name}`}
                  className={
                    exercise.key === "ans"
                      ? ""
                      : exercise.key === "open"
                      ? "text-emerald-600"
                      : "text-gray-400"
                  }
                >
                  Exercise {exercise.name}
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default Exercises;
