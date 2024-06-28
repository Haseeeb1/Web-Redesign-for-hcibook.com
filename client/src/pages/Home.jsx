import Hero from "@/components/Hero";
import OrderNow from "@/components/OrderNow";
import { API_USER_BASE_URL } from "@/utils";
import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  useEffect(() => {
    // Check if the URL hash is '#order-now'
    if (location.hash === "#order-now") {
      // Scroll to the element with id 'order-now' smoothly
      const element = document.getElementById("order-now");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userid");
      if (userId) {
        try {
          const response = await axios.get(
            `${API_USER_BASE_URL}/${userId}/completed`
          );
          localStorage.setItem(
            "completedChapters",
            JSON.stringify(response.data.completedChapters)
          );
          localStorage.setItem(
            "completedExercises",
            JSON.stringify(response.data.completedExercises)
          );
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Hero />
      <OrderNow />
    </div>
  );
};

export default Home;
