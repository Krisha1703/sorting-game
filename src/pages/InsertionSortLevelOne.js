import React, { useState, useEffect } from "react";
import "../app/globals.css";
import Image from "next/image";

const InsertionSortLevelOne = () => {
  const [bars, setBars] = useState([]);
  const [currentCompare, setCurrentCompare] = useState(0); // Index of the current bar being compared
  const [elapsedTime, setElapsedTime] = useState(0); // Timer in seconds
  const [timerInterval, setTimerInterval] = useState(null); // Store interval for clearing it
  const [lives, setLives] = useState(3); // Tracking lives
  const [errorState, setErrorState] = useState(false); // To trigger screen flicker effect

  // Generate initial bars on mount
  useEffect(() => {
    setBars(generateBars(6));
    startTimer(); // Start the timer when the component loads
    return stopTimer; // Clear timer when the component unmounts
  }, []);

  const generateBars = (count) =>
    Array.from({ length: count }, (_, index) => ({
      value: Math.floor(Math.random() * 100) + 10,
      grayscale: index === 0 ? 0 : 1, // Initially only the first bar has grayscale-0
      sorted: false, // New property to track whether the bar is sorted
    }));

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

  const triggerError = () => {
    setErrorState(true);
    setLives((prev) => prev - 1);

    // Remove the flicker effect after a short delay
    setTimeout(() => {
      setErrorState(false);
    }, 300);
  };

  const handleFix = () => {
    // Check if the current bar is in the correct position
    if (
      currentCompare > 0 &&
      bars[currentCompare].value < bars[currentCompare - 1].value
    ) {
      triggerError(); // Error: Trying to fix a bar that isn't in the correct position
      return;
    }

    const newBars = [...bars];
    newBars[currentCompare].sorted = true; // Mark the current bar as sorted
    newBars[currentCompare].grayscale = 1; // Remove grayscale for the sorted bar

    // Set the next image to grayscale-0 (if there is a next image)
    if (currentCompare < bars.length - 1) {
      newBars[currentCompare + 1].grayscale = 0;
    }

    setBars(newBars);
    setCurrentCompare((prev) => prev + 1); // Move to the next image
  };

  const handleLeft = () => {
    if (currentCompare === 0) {
      triggerError(); // Error: Trying to shift beyond the leftmost position
      return;
    }

    if (bars[currentCompare].value >= bars[currentCompare - 1].value) {
      triggerError(); // Error: No need to shift left
      return;
    }

    const newBars = [...bars];
    [newBars[currentCompare], newBars[currentCompare - 1]] = [
      newBars[currentCompare - 1],
      newBars[currentCompare],
    ];

    newBars[currentCompare - 1].grayscale = 0;
    newBars[currentCompare].grayscale = 1;

    setBars(newBars);
    setCurrentCompare((prev) => prev - 1);
  };

  const checkSorted = (bars) => {
    for (let i = 0; i < bars.length - 1; i++) {
      if (bars[i].value > bars[i + 1].value) return false;
    }
    return true;
  };

  return (
    <div
      className={`relative w-full h-screen bg-cover bg-center overflow-hidden ${
        errorState ? "animate-flicker border-4 border-red-600" : ""
      }`}
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
            className={`w-[20%] ${
              bar.sorted || index === currentCompare ? "" : "grayscale-[50]"
            }`}
            style={{
              height: `${bar.value}%`,
              backgroundImage: bar.sorted
                ? "url('/brick-sorted.png')"
                : "url('/brick1.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
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

      {/* Left and Fix buttons */}
      <div className="flex absolute bottom-0">
        <Image
          src="/left.png"
          alt="Left"
          width={200}
          height={200}
          className="cursor-pointer"
          onClick={handleLeft}
        />
        <Image
          src="/fix.png"
          alt="Fix"
          width={200}
          height={200}
          className="cursor-pointer"
          onClick={handleFix}
        />
      </div>

      {bars.every((bar) => bar.sorted) && checkSorted(bars) && (
  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div
      className="w-full h-full flex flex-col items-center justify-center p-12 bg-cover bg-no-repeat rounded-md"
      style={{
        backgroundImage: "url('/level-complete.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-6xl mt-4 text-gray-900 font-bold">
        LEVEL COMPLETE!
      </h1>

      {/* Conditional star display */}
      <div className="flex mt-4">
        {lives === 1 || elapsedTime > 45 ? (
          <Image src="/star.png" width={250} height={100} alt="1 star" />
        ) : lives === 2 || (elapsedTime > 30 && elapsedTime <= 45) ? (
          <div className="flex justify-between">
            <Image src="/star.png" width={250} height={100} alt="2 stars" />
            <Image src="/star.png" width={250} height={100} alt="2 stars" />
          </div>
        ) : lives === 3 && elapsedTime < 30 ? (
          <div className="flex justify-between">
            <Image src="/star.png" width={250} height={100} alt="3 stars" />
            <Image src="/star.png" width={250} height={100} alt="3 stars" />
            <Image src="/star.png" width={250} height={100} alt="3 stars" />
          </div>
        ) : null}
      </div>

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
            setLives(3);
            setBars(generateBars(6));
            setElapsedTime(0);
            startTimer(); // Restart timer
          }}
        />
        <Image
          src="/home.png"
          width={200}
          height={200}
          alt="home"
          onClick={() => {
            // Handle home button logic
          }}
        />
      </div>
    </div>
  </div>
)}

{/* Failure modal */}
{lives === 0 && (
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
              setBars(generateBars(6));  // Generate new bars
              setElapsedTime(0);
              startTimer();  // Restart timer
            }}
          />
        </div>
      </div>
    </div>
)}

    </div>
  );
};

export default InsertionSortLevelOne;
