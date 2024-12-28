import Image from "next/image";

const LeftFixButtons = ({ handleFix, handleLeft }) => {
  return (
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
          className="cursor-pointer z-20"
          onClick={handleFix}
        />
      </div>
  );
};

export default LeftFixButtons;
