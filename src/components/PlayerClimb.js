import React, { useEffect } from "react";
import Image from "next/image";

// PlayerClimb component to handle the climbing animation
const PlayerClimb = ({ isSorted, flagPosition, setFlagPosition, setPlayerClimbed }) => {
  useEffect(() => {
    if (isSorted) {
      const interval = setInterval(() => {
        setFlagPosition((prev) => {
          // Stop the flag movement once it reaches the 4th bar
          if (prev >= 4) { // Stop at the 4th bar (index 3)
            clearInterval(interval);
            setPlayerClimbed(true); // Set player as climbed once the flag reaches the target
            return prev; // Keep the flag at the 4th bar
          }
          return prev + 1;
        });
      }, 500);
      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [isSorted, setFlagPosition, setPlayerClimbed]);

  return (
    <Image
      src="/hero.png"
      width={400}
      height={400}
      alt="player"
      className="absolute transition-all duration-500 z-10"
      style={{
        bottom: `${5 + flagPosition * 16}%`, // Adjust vertical position based on flagPosition
        left: `${20 + flagPosition * 15}%`,  // Adjust horizontal position based on flagPosition
      }}
    />
  );
};

export default PlayerClimb;
