import React from "react";
import Link from "next/link";
import Image from "next/image";

const SortingTutorialComponent = ({ description, videoSrc, practiceLink }) => {
  return (
    
      <div className="flex justify-center py-10">
        {/* Left Side - Tutorial Text */}
        <div className="flex flex-col items-center bg-green-700 border-dashed border-[#66FF00] border-4 text-white p-6 rounded-lg w-1/3 mx-4">
          <div className="flex justify-between w-full">
            {/* Back Button */}
            <Link href="/algorithm">
              <button className="border-solid border-2 border-yellow-400 text-yellow-400 rounded-full p-2 px-3 text-2xl font-bold mb-4 hover:bg-yellow-400 hover:text-green-700">
                &#x2190;
              </button>
            </Link>
          </div>

          {/* Tutorial Description */}
          <p className="text-center font-semibold text-lg leading-relaxed">
            {description}
          </p>
        </div>

        {/* Right Side - Visualization */}
        <div className="flex flex-col items-center bg-green-700 border-dashed border-[#66FF00] border-4 text-white p-6 rounded-lg w-1/3 mx-4">
          {/* Video Element */}
          <div className="w-full h-48 bg-black flex items-center justify-center rounded-md relative">
            <video
              className="absolute inset-0 w-full h-full object-cover rounded-md"
              src={videoSrc}
              type="video/mp4"
              controls
              autoPlay
            />
          </div>

          {/* Practice Button */}
          <Link href={practiceLink}>
            <Image src="/next.png" width={150} height={150} alt="Next" />
          </Link>
        </div>
      </div>
    
  );
};

export default SortingTutorialComponent;
