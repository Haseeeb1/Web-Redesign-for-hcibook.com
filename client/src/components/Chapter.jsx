import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "./ui/checkbox";
import DOMPurify from "dompurify";
import { chaptersData, solutions } from "@/data";
import Path from "./Path";
import "./CheckBox.css";
import axios from "axios";
import { API_USER_BASE_URL } from "@/utils";
import toast from "react-hot-toast";
import assets from "@/assets";

const Chapter = () => {
  const { chapNo } = useParams();
  const [isCompleted, setIsCompleted] = useState(false);
  const [outline, setOutline] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const currentChapter = findChapterByNumber(chaptersData, Number(chapNo));

  const msg = new SpeechSynthesisUtterance();
  const location = useLocation();
  msg.onend = () => {
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const toggleSpeech = () => {
    const outlineText = currentChapter?.outline.join("\n");
    const text = stripHtml(outlineText || "");

    if (!isSpeaking) {
      window.speechSynthesis.cancel();
      msg.text = text;
      window.speechSynthesis.speak(msg);
      setIsSpeaking(true);
      setIsPaused(false);
    } else if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
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

  useEffect(() => {
    // Check if the chapter is marked as completed in localStorage
    const completedChapters =
      JSON.parse(localStorage.getItem("completedChapters")) || [];
    setIsCompleted(completedChapters.includes(chapNo));
  }, [chapNo]);

  const toggleChapterCompletion = async () => {
    const userId = localStorage.getItem("userid");
    if (!userId) {
      toast.dismiss();
      toast.error("Please login or create an account first.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_USER_BASE_URL}/${userId}/completedChapters`,
        {
          chapterName: chapNo,
        }
      );
      const updatedChapters = response.data;
      localStorage.setItem(
        "completedChapters",
        JSON.stringify(updatedChapters)
      );
      setIsCompleted(updatedChapters.includes(chapNo));
      if (isCompleted) {
        toast.dismiss();
        toast("Chapter marked as incomplete", {
          icon: "⚠️",
        });
      } else {
        toast.dismiss();
        toast.success("Chapter marked as complete!");
      }
    } catch (error) {
      console.error("Error updating chapter completion:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center font-sub_heading my-16 gap-10 dark:text-darkModeTextClr">
      <div className="flex flex-col gap-6">
        <div className="flex items-start sm:items-center justify-between">
          <div className=" flex flex-col md:flex-row gap-4 items-start md:items-center">
            <h1 className="text-4xl font-bold">Chapter {chapNo}</h1>

            {outline && (
              <div className="flex flex-row ">
                <span
                  onClick={toggleSpeech}
                  data-tooltip={
                    isPaused
                      ? "Resume the chapter"
                      : isSpeaking
                      ? "Pause the chapter"
                      : "Read the chapter aloud."
                  }
                >
                  <img
                    src={
                      isSpeaking
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
            )}
          </div>
          <div className="pt-2 pl-2 sm:p-0 flex items-center space-x-2">
            <div class="checkbox-wrapper-19">
              <input
                id={`chapter-${chapNo}`}
                type="checkbox"
                checked={isCompleted}
                onChange={toggleChapterCompletion}
              />
              <label class="check-box" for={`chapter-${chapNo}`}></label>
            </div>
            <label
              htmlFor="read"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Mark as Read
            </label>
          </div>
        </div>
        <Path />
        <Tabs
          defaultValue="outline"
          className="w-[300px] sm:w-[500px] md:w-[700px] lg:w-[900px] xl:w-[1100px] text-lg"
        >
          <TabsList className=" grid w-full grid-cols-4">
            <TabsTrigger
              onClick={() => {
                setOutline(true);
              }}
              value="outline"
            >
              Outline
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                setOutline(false);
              }}
              value="links"
            >
              Links
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                setOutline(false);
              }}
              value="resources"
            >
              Resources
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                setOutline(false);
              }}
              value="exercises"
            >
              Exercises
            </TabsTrigger>
          </TabsList>
          <TabsContent value="outline">
            <Outline chapterNo={chapNo} />
          </TabsContent>
          <TabsContent value="links">
            <Links chapterNo={chapNo} />
          </TabsContent>
          <TabsContent value="resources">
            <Resources chapterNo={chapNo} />
          </TabsContent>
          <TabsContent value="exercises">
            <ExerciseTab chapterNo={chapNo} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const findChapterByNumber = (chapters, chapNo) => {
  return chapters.find((chapter) => chapter.chapNo === chapNo);
};

const Outline = ({ chapterNo }) => {
  const currentChapter = findChapterByNumber(chaptersData, Number(chapterNo));
  return (
    <div className="w-full">
      <ul className="list-disc space-y-2">
        {currentChapter?.outline.map((outline) => {
          const sanitizedHtmlString = DOMPurify.sanitize(outline);
          return (
            <li key={outline}>
              <div
                className=""
                dangerouslySetInnerHTML={{ __html: sanitizedHtmlString }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Links = ({ chapterNo }) => {
  const currentChapter = findChapterByNumber(chaptersData, Number(chapterNo));
  return (
    <div>
      <ul className="list-disc space-y-2">
        {currentChapter?.links.map((link) => {
          // Sanitize the HTML content to avoid XSS attacks
          const sanitizedHtmlContent = DOMPurify.sanitize(link);

          // Function to add underline style to <a> tags
          const addUnderlineToLinks = (html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            const links = doc.querySelectorAll("a");
            links.forEach((link) => {
              link.style.textDecoration = "underline";
            });

            return doc.documentElement.innerHTML;
          };

          const htmlWithUnderlinedLinks =
            addUnderlineToLinks(sanitizedHtmlContent);
          return (
            <li key={link}>
              <div
                className=""
                dangerouslySetInnerHTML={{ __html: htmlWithUnderlinedLinks }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Resources = ({ chapterNo }) => {
  const currentChapter = findChapterByNumber(chaptersData, Number(chapterNo));
  const resource = currentChapter.resources;
  console.log(currentChapter);
  const sanitizedHtmlString = DOMPurify.sanitize(resource);
  const addUnderlineToLinks = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const links = doc.querySelectorAll("a");
    links.forEach((link) => {
      link.style.textDecoration = "underline";
    });

    return doc.documentElement.innerHTML;
  };

  const htmlWithUnderlinedLinks = addUnderlineToLinks(sanitizedHtmlString);

  return <div dangerouslySetInnerHTML={{ __html: htmlWithUnderlinedLinks }} />;
};

const ExerciseTab = ({ chapterNo }) => {
  return (
    <div>
      <Exercise chapterNo={chapterNo} />
    </div>
  );
};

const Exercise = ({ chapterNo }) => {
  const findObjectByName = (nameToFind) => {
    return solutions.find((obj) => obj.name === nameToFind);
  };
  const hasDecimalPoint = (str) => {
    return str.includes(".");
  };
  function filterByChapter(data, chapterToFilter) {
    return data.filter((obj) => obj.chapter === chapterToFilter);
  }

  const exercise = findObjectByName(chapterNo);
  const isChapter = !hasDecimalPoint(chapterNo);
  let allQuestions;

  if (isChapter) {
    allQuestions = filterByChapter(solutions, Number(chapterNo));
  }

  return (
    <section className="flex flex-col justify-center items-start gap-10 p-6">
      <h1 className="text-4xl font-bold">Exercises {isChapter}</h1>
      {isChapter ? (
        allQuestions.map((q) => (
          <OneExercise
            allMapped={true}
            key={q.name}
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
    </section>
  );
};

const OneExercise = ({ number, question, answer, allMapped }) => {
  const sanitizedHtmlString = DOMPurify.sanitize(answer);
  const sanitizedHtmlStringQuestion = DOMPurify.sanitize(question);
  const [isExCompleted, setIsExCompleted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const msg = new SpeechSynthesisUtterance();
  const location = useLocation();
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
  // const exerciseQuestionSpeech = (question) => {
  //   msg.text = question;
  //   window.speechSynthesis.cancel();
  //   window.speechSynthesis.speak(msg);
  // };

  // const exerciseAnswerSpeech = (answer) => {
  //   msg.text = answer;
  //   window.speechSynthesis.cancel();
  //   window.speechSynthesis.speak(msg);
  // };

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
    <div className="text-lg font-sub_heading flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4 p-6 rounded-lg bg-white dark:bg-slate-900">
        <div className="flex  items-center justify-between">
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
                  className="dark:invert"
                  alt="question-mark"
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
                id={`Chapter-exercise-${number}`}
                type="checkbox"
              />
              <label
                class="check-box"
                for={`Chapter-exercise-${number}`}
              ></label>
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
            className="word-break-all"
            dangerouslySetInnerHTML={{ __html: sanitizedHtmlString }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chapter;
