import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Start() {
  const router = useRouter();

  const handleStartClick = () => {
    router.push("/algorithm");
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/sorting-game-bg.png')" }}
    >
      {/* Text and Button Layer */}
      <div className="absolute top-[12vh] left-[22vw] w-full h-full flex flex-col justify-center items-center text-white">
        
        <Image src="/start.png" width={250} height={250} alt="start" onClick={handleStartClick} className="cursor-pointer pointer-xl"/>
       
      </div>
    </div>
  );
}
