import React, { useState, useEffect } from "react";
import "../app/globals.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BubbleSortLevelTwo = () => {
  const router = useRouter();

  const [bars, setBars] = useState([]);
  const [currentCompare, setCurrentCompare] = useState([0, 1]);
  const [isSorted, setIsSorted] = useState(false);
  const [error, setError] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(60); // Timer in seconds
  const [timerInterval, setTimerInterval] = useState(null); // Store interval for clearing it
  const [lives, setLives] = useState(3); // Tracking lives
  const [flagPosition, setFlagPosition] = useState(0); // Track flag position
  const [playerClimbed, setPLayerClimbed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [score, setScore] = useState(0); // Add a score state

  const generateBars = (count) => {
    const uniqueHeights = new Set();
    
    while (uniqueHeights.size < count) {
      // Generate a random height between 30 and 129 (inclusive)
      uniqueHeights.add(Math.floor(Math.random() * 100) + 30);
    }
  
    return Array.from(uniqueHeights).map((value, index) => ({
      value,
      grayscale: index === 0 || index === 1 ? 0 : 1, // Initially 1st and 2nd bars are grayscale-0, others grayscale-1
    }));
  };

  useEffect(() => {
    setBars(generateBars(7));
    setIsModalOpen(true);
    
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setElapsedTime(60); // Start with 45 seconds
    startTimer();
  };

  const startTimer = () => {
    if (timerInterval) return; // Prevent starting multiple intervals
  
    const interval = setInterval(() => {
      setElapsedTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval); // Stop timer when it reaches 0
          setTimerInterval(null);
          stopTimer();
          // Trigger failure modal
          setLives(0);
          return 0;
        }
        return prev - 1; // Decrement time
      });
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

    const [i, j] = Array.isArray(currentCompare) ? currentCompare : [0, 1];
    ;
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
        setScore((prevScore) => prevScore + 10); // Add points for correct swap
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
      setScore((prevScore) => prevScore - 5); // Deduct points for incorrect swap
      setTimeout(() => setError(false), 1000);
    }
  };

 // Flag animation
useEffect(() => {
  if (isSorted) {
    const interval = setInterval(() => {
      setFlagPosition((prev) => {
        // Stop the flag movement once it reaches the 4th bar
        if (prev >= 4) { // Stop at 4th bar (index 3)
          clearInterval(interval);
          setPLayerClimbed(true);
          return prev; // Keep the flag at the 4th bar
        }
        return prev + 1;
      });
    }, 500);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }
}, [isSorted]);


  return (
    <div
      className={`relative w-full h-screen bg-cover bg-center overflow-hidden ${error ? "border-4 border-red-500 animate-pulse" : ""}`}
      style={{ backgroundImage: "url('/sort-levels-bg.png')" }}
    >
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative">
            <Image
              src="/bubblesort-level2-modal.png"
              alt="Bubble Sort Modal"
              width={900}
              height={900}
              className="cursor-pointer rounded-2xl"
            />
            <button className="bg-green-500 text-white font-semibold p-3 absolute bottom-[11%] left-[45%] z-20 rounded-xl cursor-pointer" onClick={closeModal}>Save the princess!</button>
          </div>
        </div>
      )}
      {/* Timer display */}
      <div className="absolute top-0 left-0 w-full text-center text-red-600 font-bold text-2xl p-2">
        {formatTime(elapsedTime)}
      </div>

      {/* Display Lives */}
      <div className="absolute top-0 left-0 p-4 flex gap-2">
      <h1 className="text-2xl font-semibold mx-2">Level: 2</h1>
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

 {/* Display Score */}
 <div className="absolute top-0 right-0 p-4 flex gap-2">
        <h1 className="text-2xl font-semibold mx-2">Score: 
          <span className="text-red-600">{score}</span>
        </h1>
      </div>
     
       {/* Winning flag */}
      <Image
        src="/player.png"
        width={400}
        height={400}
        alt="player"
        className="absolute transition-all duration-500 z-10"
        style={{ bottom: `${5 + flagPosition * 16}%`, left: `${20 + flagPosition * 15}%` }}
      />

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
            handleAction("swap");
          }}
        />
        <Image
          src="/dont swap.png"
          alt="Don't Swap"
          width={200}
          height={200}
          className="cursor-pointer z-20"
          onClick={() => {
            handleAction("noSwap");
          }}
        />
      </div>

  {/* Completion screen */}
  {(lives === 0 && elapsedTime === 0 || (bars.length > 0 && bars.every(bar => bar.grayscale === 1))) && (
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

      <h3 className="text-yellow-400 text-3xl  font-semibold ml-20 my-4">
      Time is up! Please try again.
      </h3>

      {/* Retry and Home buttons */}
      <div className="flex mt-6">
        <Image
          src="/again.png"
          width={200}
          height={200}
          alt="retry"
          className="cursor-pointer"
          onClick={() => {
            setLives(3); // Reset lives
            setIsSorted(false); // Reset the sorted flag
            setCurrentCompare(0); // Reset the comparison index to the start
            setElapsedTime(60); // Reset the timer
            setPLayerClimbed(false); // Reset player climbing state
            setFlagPosition(0); // Reset flag position
            setBars(generateBars(7)); // Generate new bars with the first index grayscale-0
            setIsModalOpen(true);
            setScore(0);
          }}
        />
        <Image
          src="/home.png"
          width={200}
          height={200}
          alt="home"
          className="cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        />
      </div>
    </div>
  </div>
)}

{/* Completion screen for success (when sorted) */}
{isSorted && playerClimbed && lives > 0 && (
  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 ">
    <div
      className="w-full h-full flex flex-col items-center justify-center p-12 bg-cover bg-no-repeat rounded-md"
      style={{
        backgroundImage: "url('/level-complete.svg')", // Keep the success image background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
     {/* Conditional star display */}
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

      <h1 className="text-6xl mt-4 text-gray-900 font-bold">
        TIME:
        <span className="text-red-700 font-semibold mx-1">{formatTime(elapsedTime)}</span>
      </h1>

      <h1 className="text-4xl mt-4 text-gray-900 font-bold">
        Score:
        <span className="text-yellow-400 font-semibold mx-1">{score}</span>
      </h1>

      <div className="flex mt-6">
        <Image
          src="/again.png"
          width={200}
          height={200}
          alt="retry"
          className="cursor-pointer"
          onClick={() => {
            setLives(3); // Reset lives
            setIsSorted(false); // Reset the sorted flag
            setCurrentCompare(0); // Reset the comparison index to the start
            setElapsedTime(60); // Reset the timer
            setPLayerClimbed(false); // Reset player climbing state
            setFlagPosition(0); // Reset flag position
            setBars(generateBars(7)); // Generate new bars with the first index grayscale-0
           setIsModalOpen(true);
           setScore(0);
          }}
        />
        <Image
          src="/home.png"
          width={200}
          height={200}
          alt="home"
          className="cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        />
        <Image
          src="/next.png"
          width={150}
          height={150}
          alt="Next"
          className="cursor-pointer"
          onClick={() => router.push("/BubbleSortLevelThree")}
        />
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default BubbleSortLevelTwo;
