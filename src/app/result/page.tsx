import Link from "next/link";

const Result = () => {
  return (
    <div className="container mx-auto flex justify-center flex-col md:w-3/4 my-12 bg-white p-10">
      <h1 className="font-bold text-3xl mb-10 text-center">
        コーディング4択問題
      </h1>

      <div id="result-box">
        <p className="text-center font-bold text-2xl mb-10 mb:mt-0">実施結果</p>

        <ul className="mb-5">
          <li className="border-b border-gray-300 pb-3 mb-3">
            <dl className="flex flex-col md:flex-row md:items-center">
              <dt className="w-44 font-bold mb-2 md:mb-0 md:mr-4">合否</dt>
              <dd>
                <span className="bg-green-600 px-6 py-1 text-white text-bold rounded-full inline-block">
                  合格
                </span>
                <span className="bg-red-600 px-6 py-1 text-white text-bold rounded-full inline-block">
                  不合格
                </span>
                <span className="text-sm block mt-2">
                  合格ライン：スコア100%以上
                </span>
              </dd>
            </dl>
          </li>
          <li className="border-b border-gray-300 pb-3 mb-3">
            <dl className="flex flex-col md:flex-row md:items-center">
              <dt className="w-44 font-bold mb-2 md:mb-0 md:mr-4">スコア</dt>
              <dd>
                <div>
                  <span className="font-bold text-red-500">100%</span> / 100%
                </div>
                <div>
                  <div className="progressbar bg-gray-300 h-3 w-full">
                    <div className="bg-orange-500 h-3"></div>
                  </div>
                </div>
              </dd>
            </dl>
          </li>
          <li>
            <dl className="flex flex-col md:flex-row md:items-center">
              <dt className="w-44 font-bold mb-2 md:mb-0 md:mr-4">
                各設問の詳細
              </dt>
              <dd></dd>
            </dl>
          </li>
        </ul>

        <div className="mb-20">
          <div className="answer-card mb-10">
            <div className="mb-4 font-bold">
              Q.1:
              <span className="bg-green-600 px-6 py-1 text-white text-bold rounded-full inline-block ml-2">
                合格
              </span>
              or
              <span className="bg-red-600 px-6 py-1 text-white text-bold rounded-full inline-block ml-2">
                不合格
              </span>
            </div>
            <ul className="flex flex-col text-sm">
              <li className="bottom-1 border-black">
                <dl className="table w-full border border-gray-300">
                  <dt className="table-cell w-1/6 bg-gray-100 font-bold p-4 border-r border-gray-300">
                    設問
                  </dt>
                  <dd className="table-cell p-4">
                    JavaScriptのPromiseオブジェクトは何を行うために使用されるでしょう？
                  </dd>
                  <dt></dt>
                </dl>
              </li>
              <li className="bottom-1 border-black">
                <dl className="table w-full border border-gray-300">
                  <dt className="table-cell w-1/6 bg-gray-100 font-bold p-4 border-r border-gray-300">
                    あなたの回答
                  </dt>
                  <dd className="table-cell p-4">
                    あなたの回答あなたの回答あなたの回答あなたの回答あなたの回答あなたの回答あなたの回答あなたの回答
                  </dd>
                  <dt></dt>
                </dl>
              </li>
              <li className="bottom-1 border-black">
                <dl className="table w-full border border-gray-300">
                  <dt className="table-cell w-1/6 bg-gray-100 font-bold p-4 border-r border-gray-300">
                    正答
                  </dt>
                  <dd className="table-cell p-4">
                    正答正答正答正答正答正答正答正答正答正答正答正答正答正答正答正答正答
                  </dd>
                  <dt></dt>
                </dl>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center flex-col">
          <Link
            href="/quiz"
            className="bg-orange-400 hover:bg-orange-300 text-white rounded px-4 py-4 font-bold inline-block w-full md:w-96 mx-auto text-center cursor-pointer"
          >
            もう一度挑戦する
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Result;
