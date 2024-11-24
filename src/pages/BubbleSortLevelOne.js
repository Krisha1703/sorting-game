import React, { useState, useEffect } from "react";
import "../app/globals.css";
import Image from "next/image";

const BubbleSortLevelOne = () => {
  const [bars, setBars] = useState([]);
  const [currentCompare, setCurrentCompare] = useState([0, 1]);
  const [isSorted, setIsSorted] = useState(false);
  const [error, setError] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // Timer in seconds
  const [timerInterval, setTimerInterval] = useState(null); // Store interval for clearing it

  // Define generateBars function outside of useEffect so it's accessible everywhere
  const generateBars = (count) => 
    Array.from({ length: count }, (_, index) => ({
      value: Math.floor(Math.random() * 100) + 10,
      color: "gray", // Initially all bars are gray
    }));

  // Generate bars on component mount
  useEffect(() => {
    setBars(generateBars(6));
  }, []);

  // Start the timer when the game starts
  const startTimer = () => {
    if (timerInterval) return; // Prevent starting multiple intervals

    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1); // Increment the time every second
    }, 1000);
    setTimerInterval(interval); // Store the interval ID to clear it later
  };

  // Stop the timer when sorting is completed
  const stopTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
  };

  // Format time as MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Check if the array is sorted
  const checkSorted = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].value > arr[i + 1].value) return false;
    }
    return true;
  };

  // Handle sorting actions
  const handleAction = (action) => {
    if (isSorted || bars.length === 0) return;

    const [i, j] = currentCompare;
    const newBars = [...bars];

    newBars.forEach((bar, index) => {
      if (index === i || index === j) {
        bar.color = "orange";
      } else {
        bar.color = "gray";
      }
    });

    if ((action === "swap" && newBars[i].value > newBars[j].value) ||
        (action === "noSwap" && newBars[i].value <= newBars[j].value)) {
      
      if (action === "swap") {
        [newBars[i], newBars[j]] = [newBars[j], newBars[i]];
      }

      if (checkSorted(newBars)) {
        newBars.forEach((bar) => (bar.color = "green"));
        setIsSorted(true);
        stopTimer(); // Stop the timer when sorted
      } else {
        if (j === newBars.length - 1) {
          setCurrentCompare([0, 1]);
        } else {
          setCurrentCompare([i + 1, j + 1]);
        }
      }
      setBars(newBars);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  const lastSortedBarIndex = bars.length - 1;
  const lastBar = bars[lastSortedBarIndex];

  return (
    <div
      className={`relative w-full h-screen bg-cover bg-center ${error ? "border-4 border-red-500 animate-pulse" : ""}`}
      style={{ backgroundImage: "url('/bubblesort-levels.png')" }}
    >
      {/* Timer display */}
      <div className="absolute top-0 left-0 w-full text-center text-red-600 font-bold text-2xl p-2">
        {formatTime(elapsedTime)} {/* Display formatted time */}
      </div>

      {/* Bar container */}
      <div className="absolute right-0 bottom-0 h-[60%] w-[57%] flex justify-between items-end gap-0 px-4">
        {bars.map((bar, index) => (
          <div
            key={index}
            className="w-[20%]"
            style={{
              height: `${bar.value}%`,
              background: bar.color,
              transition: "all 0.3s ease-in-out",
            }}
          ></div>
        ))}
      </div>

      {/* Winning flag */}
      {isSorted && (
        <div
          className="absolute"
          style={{
            top: `calc(100% - ${lastBar.value}%)`,
            left: "95%",
            transform: "translateX(-50%)",
          }}
        >
          <Image src="/winning-flag.webp" alt="Winning Flag" width={100} height={100} />
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-center gap-4 absolute bottom-5 left-20">
        <button
          onClick={() => {
            startTimer(); // Start timer when player starts swapping
            handleAction("swap");
          }}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
        >
          Swap
        </button>
        <button
          onClick={() => {
            startTimer();
            handleAction("noSwap");
          }}
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
        >
          No Swap
        </button>
      </div>

      {/* Completion screen */}
      {isSorted && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md text-2xl font-bold text-green-500">
            Sorting Complete! 🎉
            <p className="text-xl text-gray-700 mt-4">
              Time Taken: {formatTime(elapsedTime)}
            </p>
          
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => {
                setIsSorted(false);
                setBars(generateBars(6)); // Reset bars and timer for retry
                setElapsedTime(0);
                startTimer();
              }}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Retry
            </button>
            <button
              onClick={() => window.location.href = "/bubblesortLevels"} // Redirect to levels page
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
            >
              Next
            </button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BubbleSortLevelOne;
