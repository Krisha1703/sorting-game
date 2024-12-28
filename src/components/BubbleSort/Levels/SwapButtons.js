import Image from "next/image";

const SwapButtons = ({ handleAction }) => {
  return (
    <div className="flex absolute bottom-0">
      <Image
        src="/swap.png"
        alt="Swap"
        width={200}
        height={200}
        className="cursor-pointer"
        onClick={() => handleAction("swap")}
      />
      <Image
        src="/dont swap.png"
        alt="Don't Swap"
        width={200}
        height={200}
        className="cursor-pointer z-20"
        onClick={() => handleAction("noSwap")}
      />
    </div>
  );
};

export default SwapButtons;
