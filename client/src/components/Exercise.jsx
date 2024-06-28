import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { solutions } from "../data";
import toast from "react-hot-toast";

const Exercise = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  const findObjectByName = (nameToFind) => {
    return solutions.find((obj) => obj.name === nameToFind);
  };
  const hasDecimalPoint = (str) => {
    return str.includes(".");
  };
  function filterByChapter(data, chapterToFilter) {
    return data.filter((obj) => obj.chapter === chapterToFilter);
  }

  const exercise = findObjectByName(id);
  const isChapter = !hasDecimalPoint(id);
  let allQuestions;

  if (isChapter) {
    allQuestions = filterByChapter(solutions, Number(id));
  }

  return (
    <section className="flex overflow-x-hidden flex-col justify-center items-center gap-10 p-6 dark:text-darkModeTextClr">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold">Exercises</h1>
        <Path />
        {isChapter ? (
          allQuestions.map((q) => (
            <OneExercise
              allMapped={true}
              number={q.name}
              question={q.question}
              answer={q.answer}
            />
          ))
        ) : (
          <OneExercise
            allMapped={false}
            number={exercise.name}
            question={exercise.question}
            answer={exercise.answer}
          />
        )}
      </div>
    </section>
  );
};

import DOMPurify from "dompurify";
import Path from "./Path";
import { Checkbox } from "@/components/ui/checkbox";
import "./CheckBox.css";
import axios from "axios";
import { API_USER_BASE_URL } from "@/utils";
import assets from "@/assets";
import "./CheckBox.css";

const OneExercise = ({ number, question, answer, isCompleted, allMapped }) => {
  const sanitizedHtmlString = DOMPurify.sanitize(answer);
  const sanitizedHtmlStringQuestion = DOMPurify.sanitize(question);
  const [isExCompleted, setIsExCompleted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();
  const msg = new SpeechSynthesisUtterance();
  const [isQuestionPaused, setIsQuestionPaused] = useState(false);
  const [isAnswerPaused, setIsAnswerPaused] = useState(false);

  useEffect(() => {
    // Check if the chapter is marked as completed in localStorage
    const completedExercises =
      JSON.parse(localStorage.getItem("completedExercises")) || [];
    setIsExCompleted(completedExercises.includes(number));
  }, [number]);

  const toggleExerciseCompletion = async () => {
    const userId = localStorage.getItem("userid");
    if (!userId) {
      toast.dismiss();
      toast.error("Please login or create an account first.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_USER_BASE_URL}/${userId}/completedExercises`,
        {
          exerciseName: number,
        }
      );
      const updatedExercises = response.data;
      localStorage.setItem(
        "completedExercises",
        JSON.stringify(updatedExercises)
      );
      setIsExCompleted(updatedExercises.includes(number));
      if (isExCompleted) {
        toast.dismiss();
        toast("Exercise marked as incomplete", {
          icon: "⚠️",
        });
      } else {
        toast.dismiss();
        toast.success("Exercise marked as complete!");
      }
    } catch (error) {
      console.error("Error updating chapter completion:", error);
    }
  };
  msg.onend = () => {
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentIndex(0);
    setIsQuestionPaused(false);
    setIsAnswerPaused(false);
  };

  const toggleSpeech = (text, isQuestion) => {
    if (currentText !== text) {
      window.speechSynthesis.cancel();
      msg.text = text;
      msg.onboundary = (event) => setCurrentIndex(event.charIndex);
      window.speechSynthesis.speak(msg);
      setIsSpeaking(true);
      setIsPaused(false);
      setCurrentText(text);
      setCurrentIndex(0);
      setIsQuestionPaused(isQuestion);
      setIsAnswerPaused(!isQuestion);
    } else if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      if (isQuestion) {
        setIsQuestionPaused(true);
        setIsAnswerPaused(false);
      } else {
        setIsAnswerPaused(true);
        setIsQuestionPaused(false);
      }
    } else if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      if (isQuestion) {
        setIsQuestionPaused(false);
      } else {
        setIsAnswerPaused(false);
      }
    } else {
      msg.text = text.slice(currentIndex);
      window.speechSynthesis.speak(msg);
      setIsSpeaking(true);
      setIsPaused(false);
      setIsQuestionPaused(isQuestion);
      setIsAnswerPaused(!isQuestion);
    }
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    toast.dismiss();
    if (isSpeaking) {
      toast.success("Reading Stopped");
    } else {
      toast("No reading in progress", {
        icon: "⚠️",
      });
    }
    setIsSpeaking(false);
    setIsPaused(false);
    setIsQuestionPaused(false);
    setIsAnswerPaused(false);
    setCurrentIndex(0);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      window.speechSynthesis.cancel(); // Stop any ongoing speech when the route changes
    };

    handleRouteChange(); // Call it initially in case there is an ongoing speech

    return () => {
      handleRouteChange(); // Clean up on unmount
    };
  }, [location]);
  const navigate = useNavigate();

  return (
    <div className=" text-lg font-sub_heading flex flex-col gap-6 max-w-[1000px]">
      <div className="flex flex-col gap-4 p-6 rounded-lg bg-white dark:bg-slate-900">
        <div className="flex items-center justify-between">
          {allMapped ? (
            <div className="flex flex-row gap-2 items-center">
              <h1
                onClick={() => {
                  navigate(`/exercises/id?id=${number}`);
                }}
                data-tooltip={"Go to Individual Exercise"}
                className="font-bold cursor-pointer"
              >
                {number}
              </h1>
              <span
                // onClick={() => exerciseQuestionSpeech(question)}

                data-tooltip={"Takes to the individual mentioned exercise"}
              >
                <img
                  src={assets.questionmark}
                  alt="question-mark"
                  className="dark:invert"
                />
              </span>
            </div>
          ) : (
            <h1 className="font-bold">{number}</h1>
          )}
          <div className="flex items-center space-x-2">
            <div class="checkbox-wrapper-19">
              <input
                checked={isExCompleted}
                onChange={toggleExerciseCompletion}
                id={`exercise-${number}`}
                type="checkbox"
              />
              <label class="check-box" for={`exercise-${number}`}></label>
            </div>
            <label
              htmlFor="read"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Mark as Read
            </label>
          </div>
        </div>
        <div>
          <div className="flex items-center bg-gray-100 dark:bg-transparent justify-between">
            <h1 className="font-bold mb-2 ">Question:</h1>
            <div className="flex flex-row ">
              <span
                // onClick={() => exerciseQuestionSpeech(question)}
                onClick={() => toggleSpeech(question, true)}
                data-tooltip={
                  isSpeaking && currentText === question
                    ? isPaused
                      ? "Resume the question"
                      : "Pause the question"
                    : "Read the question aloud."
                }
              >
                <img
                  src={
                    isSpeaking && currentText === question
                      ? isPaused
                        ? assets.pausebutton
                        : assets.playicon
                      : assets.speaker
                  }
                  alt="speaker"
                  style={{ cursor: "pointer" }}
                  className="mr-4 dark:invert"
                />
              </span>
              <span onClick={() => stopSpeech()} data-tooltip={"Stop reading"}>
                <img
                  src={assets.stopaudio}
                  alt="speaker"
                  style={{ cursor: "pointer" }}
                  className="mr-2 dark:invert"
                />
              </span>
            </div>
          </div>
          <div
            className="font-bold word-break-all"
            dangerouslySetInnerHTML={{ __html: sanitizedHtmlStringQuestion }}
          />
        </div>
        <hr className="my-4 border-gray-300" />
        <div>
          <div className="flex items-center bg-green-50 dark:bg-transparent justify-between">
            <h1 className="font-bold mb-2 ">Answer:</h1>
            <div className="flex flex-row ">
              <span
                // onClick={() => exerciseAnswerSpeech(answer)}
                onClick={() => toggleSpeech(answer, false)}
                data-tooltip={
                  isSpeaking && currentText === answer
                    ? isPaused
                      ? "Resume the answer"
                      : "Pause the answer"
                    : "Read the answer aloud."
                }
              >
                <img
                  src={
                    isSpeaking && currentText === answer
                      ? isPaused
                        ? assets.pausebutton
                        : assets.playicon
                      : assets.speaker
                  }
                  alt="speaker"
                  style={{ cursor: "pointer" }}
                  className="mr-3 dark:invert"
                />
              </span>
              <span
                // onClick={() => exerciseAnswerSpeech(answer)}
                onClick={() => stopSpeech()}
                data-tooltip={"Stop reading"}
              >
                <img
                  src={assets.stopaudio}
                  alt="speaker"
                  style={{ cursor: "pointer" }}
                  className="mr-2 dark:invert"
                />
              </span>
            </div>
          </div>

          <div
            className="word-break-all"
            dangerouslySetInnerHTML={{ __html: sanitizedHtmlString }}
          />
        </div>
      </div>
    </div>
  );
};

export default Exercise;
