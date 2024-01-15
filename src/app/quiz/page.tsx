import Image from "next/image";
import QuizComponent from "../components/QuizComponent";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto flex justify-center flex-col md:w-3/4 bg-white sm:p-8 px-5 py-10">
      <h1 className="font-bold text-3xl mb-10 text-center">
        コーディング4択問題
      </h1>
      <QuizComponent />
    </div>
  );
};

export default Home;
