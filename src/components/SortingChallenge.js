import { useRouter } from "next/navigation";
import BackButton from "./BackButton";
import NavigationButton from "./NavigationButton";
import "../app/globals.css";

const SortingChallenge = ({ algoName, backgroundImage, levelLink, tutorialLink }) => {
  const router = useRouter();

  const handleStartClick = () => {
    router.push(levelLink); // Navigate to the specified level link
  };

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <BackButton href={tutorialLink}/>
      <div className="flex justify-center items-center mt-0">
        <NavigationButton
          src="/start.png"
          alt={`${algoName} Start`}
          width={250}
          height={250}
          onClick={handleStartClick}
          customClass="my-[20vh]"
        />
        <NavigationButton
          src="/home.png"
          alt="home"
          width={150}
          height={150}
          onClick={handleHomeClick}
          customClass="absolute top-20 right-[5vw]"
        />
      </div>
    </div>
  );
};

export default SortingChallenge;
