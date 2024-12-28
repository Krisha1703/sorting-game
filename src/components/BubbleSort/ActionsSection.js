import Image from "next/image";

const ActionsSection = ({
  swapButtonOpacity,
  dontSwapButtonOpacity,
  handleSwapDontSwapClick,
}) => {
  return (
    <div className="flex space-x-10 mt-6">
      <Image
        src="/swap.png"
        alt="Swap"
        width={200}
        height={200}
        className="cursor-pointer"
        style={{ opacity: swapButtonOpacity }}
        onClick={() => handleSwapDontSwapClick(true)}
      />
      <Image
        src="/dont swap.png"
        alt="Don't Swap"
        width={200}
        height={200}
        className="cursor-pointer"
        style={{ opacity: dontSwapButtonOpacity }}
        onClick={() => handleSwapDontSwapClick(false)}
      />
    </div>
  );
};

export default ActionsSection;
