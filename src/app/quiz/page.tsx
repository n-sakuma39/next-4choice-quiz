import Image from "next/image";
import QuizComponent from "../components/QuizComponent";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto flex justify-center flex-col md:w-3/4 my-12 bg-white sm:p-8 p-5">
      <h1 className="font-bold text-3xl mb-10 text-center">
        CODING 4-CHOICE QUIZ
      </h1>
      <QuizComponent />
    </div>
  );
};

export default Home;
