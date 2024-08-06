"use client";

import { useEffect, useState } from 'react';
import QuizComponent from '../components/QuizComponent';
import { ClipLoader } from 'react-spinners';

interface Quiz {
  ID: number;
  category: string;
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<Quiz[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuizData() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        setError('API URL is not defined');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(apiUrl, { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();

        const formattedData = data.map((item: any, index: number) => ({
          ID: index + 1,
          category: item[1],
          question: item[2],
          choices: [item[3], item[4], item[5], item[6]],
          answer: item[7],
          explanation: item[8],
        }));

        setData(formattedData.sort(() => Math.random() - 0.5).slice(0, 10));
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchQuizData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto flex justify-center flex-col md:w-3/4 my-12 bg-white p-10">
      <h1 className="font-bold text-3xl mb-10 text-center">
        コーディング4択問題
      </h1>
      <QuizComponent initialData={data} />
    </div>
  );
};

export default Home;