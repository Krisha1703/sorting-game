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
  const [lives, setLives] = useState(3); // Tracking lives

  const generateBars = (count) =>
    Array.from({ length: count }, (_, index) => ({
      value: Math.floor(Math.random() * 100) + 10,
      grayscale: index === 0 || index === 1 ? 0 : 1, // Initially 1st and 2nd bars are grayscale-0, others grayscale-1
    }));

  useEffect(() => {
    setBars(generateBars(6));
  }, []);

  const startTimer = () => {
    if (timerInterval) return; // Prevent starting multiple intervals

    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1); // Increment the time every second
    }, 1000);
    setTimerInterval(interval); // Store the interval ID to clear it later
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const checkSorted = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].value > arr[i + 1].value) return false;
    }
    return true;
  };

  const handleAction = (action) => {
    if (isSorted || bars.length === 0) return;

    const [i, j] = currentCompare;
    const newBars = [...bars];

    // Reset all bars to grayscale except the ones being compared
    newBars.forEach((bar, index) => {
      if (index === i || index === j) {
        bar.grayscale = 0; // Set grayscale-0 for the bars being compared
      } else {
        bar.grayscale = 1; // Other bars have grayscale-1
      }
    });

    if ((action === "swap" && newBars[i].value > newBars[j].value) ||
        (action === "noSwap" && newBars[i].value <= newBars[j].value)) {

      if (action === "swap") {
        // Swap values of the two bars being compared
        [newBars[i], newBars[j]] = [newBars[j], newBars[i]];
      }

      // Update the next pair of bars to be compared
      if (j === newBars.length - 1) {
        setCurrentCompare([0, 1]);
      } else {
        setCurrentCompare([i + 1, j + 1]);
      }

      // After a swap/no-swap action, move the highlight forward
      if (i === 0 && j === 1) {
        // Move 1st bar to grayscale-1 and highlight next pair (2nd and 3rd)
        newBars[0].grayscale = 1;
        newBars[1].grayscale = 0; // 2nd image stays grayscale-0
        newBars[2].grayscale = 0; // 3rd image becomes grayscale-0
      } else if (i === 1 && j === 2) {
        // Move 2nd bar to grayscale-1 and highlight next pair (3rd and 4th)
        newBars[1].grayscale = 1;
        newBars[2].grayscale = 0; // 3rd image stays grayscale-0
        newBars[3].grayscale = 0; // 4th image becomes grayscale-0
      } else if (i === 2 && j === 3) {
        // Move 3rd bar to grayscale-1 and highlight next pair (4th and 5th)
        newBars[2].grayscale = 1;
        newBars[3].grayscale = 0; // 4th image stays grayscale-0
        newBars[4].grayscale = 0; // 5th image becomes grayscale-0
      } else if (i === 3 && j === 4) {
        // Move 4th bar to grayscale-1 and highlight next pair (5th and 6th)
        newBars[3].grayscale = 1;
        newBars[4].grayscale = 0; // 5th image stays grayscale-0
        newBars[5].grayscale = 0; // 6th image becomes grayscale-0
      } else if (i === 4 && j === 5) {
        // Move 5th bar to grayscale-1 and highlight next pair (6th and 1st)
        newBars[4].grayscale = 1;
        newBars[5].grayscale = 0; // 6th image stays grayscale-0
      }

      // Check if the array is sorted after this operation
      if (checkSorted(newBars)) {
        // Highlight all bars to indicate success
        newBars.forEach((bar) => (bar.grayscale = 0));
        setIsSorted(true);
        stopTimer();
      }
      setBars(newBars);
    } else {
      // If the action was incorrect, show an error
      setError(true);
      setLives((prevLives) => {
        const newLives = prevLives - 1;
        if (newLives <= 0) {
          setIsSorted(false); // Trigger modal when no lives are left
        }
        return newLives;
      });
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div
      className={`relative w-full h-screen bg-cover bg-center overflow-hidden ${error ? "border-4 border-red-500 animate-pulse" : ""}`}
      style={{ backgroundImage: "url('/bubblesort-levels.png')" }}
    >
      {/* Timer display */}
      <div className="absolute top-0 left-0 w-full text-center text-red-600 font-bold text-2xl p-2">
        {formatTime(elapsedTime)}
      </div>

      {/* Display Lives */}
      <div className="absolute top-0 left-0 p-4 flex gap-2">
        {Array.from({ length: 3 }, (_, index) => (
          <Image
            key={index}
            src="/heart.png"
            alt="life"
            width={40}
            height={40}
            className={lives <= index ? "grayscale" : ""}
          />
        ))}
      </div>

      {/* Bar container */}
      <div className="absolute right-20 bottom-0 h-[60%] w-[57%] flex justify-between items-end gap-0 px-4">
        {bars.map((bar, index) => (
          <div
            key={index}
            className={`w-[20%] ${bar.grayscale === 1 ? "grayscale" : ""}`}
            style={{
              height: `${bar.value}%`,
              backgroundImage: isSorted ? "url('/brick-sorted.png')" : "url('/brick1.png')", // Change image after sorting
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              transition: "all 0.3s ease-in-out",
            }}
          ></div>
        ))}
      </div>

      {/* Princess Tower */}
      <Image
        src="/Princess Tower.png"
        width={800}
        height={800}
        alt="princess tower"
        className="absolute left-[63.5vw] top-20 scale-[140%]"
      />

      {/* Swap and Don't Swap buttons */}
      <div className="flex absolute bottom-0">
        <Image
          src="/swap.png"
          alt="Swap"
          width={200}
          height={200}
          className="cursor-pointer"
          onClick={() => {
            startTimer();
            handleAction("swap");
          }}
        />
        <Image
          src="/dont swap.png"
          alt="Don't Swap"
          width={200}
          height={200}
          className="cursor-pointer"
          onClick={() => {
            startTimer();
            handleAction("noSwap");
          }}
        />
      </div>

  {/* Completion screen */}
{(lives === 0 || bars.every(bar => bar.grayscale === 1)) && (
  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div
      className="w-full h-full flex flex-col items-center justify-center p-12 bg-cover bg-no-repeat rounded-md"
      style={{
        backgroundImage: "url('/level-complete.svg')", // Change to failed image background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Display 'Level Failed!' */}
      <h1 className="text-6xl mt-4 text-gray-900 font-bold">
        LEVEL FAILED!
      </h1>

      {/* Retry and Home buttons */}
      <div className="flex mt-6">
        <Image
          src="/again.png"
          width={200}
          height={200}
          alt="retry"
          onClick={() => {
            setLives(3);  // Reset lives
            setIsSorted(false);
            setBars(generateBars(6));  // Generate new bars
            setElapsedTime(0);
            startTimer();  // Restart timer
          }}
        />
        <Image
          src="/home.png"
          width={200}
          height={200}
          alt="home"
          onClick={() => {
            setLives(3);  // Reset lives
            setIsSorted(false);
            setBars(generateBars(6));  // Generate new bars
            setElapsedTime(0);
            startTimer();  // Restart timer
          }}
        />
      </div>
    </div>
  </div>
)}

{/* Completion screen for success (when sorted) */}
{isSorted && lives > 0 && (
  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div
      className="w-full h-full flex flex-col items-center justify-center p-12 bg-cover bg-no-repeat rounded-md"
      style={{
        backgroundImage: "url('/level-complete.svg')", // Keep the success image background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Image src="/star.png" width={250} height={100} alt="star" />

      <h1 className="text-6xl mt-4 text-gray-900 font-bold">
        TIME:
        <span className="text-red-700 font-semibold mx-1">{formatTime(elapsedTime)}</span>
      </h1>

      <div className="flex mt-6">
        <Image
          src="/again.png"
          width={200}
          height={200}
          alt="retry"
          onClick={() => {
            setIsSorted(false);
            setBars(generateBars(6));
            setElapsedTime(0);
            startTimer();
          }}
        />
        <Image
          src="/home.png"
          width={200}
          height={200}
          alt="home"
          onClick={() => {
            setIsSorted(false);
            setBars(generateBars(6));
            setElapsedTime(0);
            startTimer();
          }}
        />
        <Image
          src="/next.png"
          width={150}
          height={150}
          alt="Next"
          className="cursor-pointer"
          onClick={() => window.location.href = "/"}
        />
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default BubbleSortLevelOne;
