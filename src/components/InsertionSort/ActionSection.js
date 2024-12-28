import React from "react";
import Image from "next/image";

const ActionsSection = ({ fixEnabled, moveLeftEnabled, onFix, onMoveLeft }) => {
  return (
    <div className="flex space-x-10 mt-6">
      <button
        onClick={onMoveLeft}
        disabled={!moveLeftEnabled}
        className={` ${
          moveLeftEnabled ? "opacity-100" : "opacity-50 cursor-not-allowed"
        }`}
      >
        <Image src="/left.png" width={200} height={200} alt="Move Left" />
      </button>

      <button
        onClick={onFix}
        disabled={!fixEnabled}
        className={` ${
          fixEnabled ? "opacity-100" : "opacity-50 cursor-not-allowed"
        }`}
      >
        <Image src="/fix.png" width={200} height={200} alt="Fix" />
      </button>
    </div>
  );
};

export default ActionsSection;
