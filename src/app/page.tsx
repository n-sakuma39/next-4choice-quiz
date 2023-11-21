import Link from "next/link";

const Home = () => {
  return (
    <div className="container mx-auto flex justify-center flex-col md:w-3/4 my-12 bg-white p-10">
      <h1 className="font-bold text-3xl mb-10 text-center">
        CODING 4-CHOICE QUIZ
      </h1>

      <p className="mb-5">
        問題はテスト形式になります。
        <span className="font-bold">最適な回答</span>を選択してください。
      </p>
      <p className="mb-10">
        全問正解で「<span className="font-bold text-green-500">合格</span>
        」、1問でも間違えると「
        <span className="font-bold text-red-700">不合格</span>」となります。
      </p>

      {/* <ul className="mb-20">
        <li className="border-b border-gray-300 pb-3 mb-3">
          <dl className="flex">
            <dt className="w-44 font-bold">合格ライン</dt>
            <dd>スコア100点以上</dd>
          </dl>
        </li>
        <li className="border-b border-gray-300 pb-3 mb-3">
          <dl className="flex">
            <dt className="w-44 font-bold">表示形式</dt>
            <dd>単問出題形式（4択1選）</dd>
          </dl>
        </li>
        <li className="">
          <dl className="flex">
            <dt className="w-44 font-bold">出題内容</dt>
            <dd>
              HTML、CSS、JavaScript、React、TypeScript、その他よりランダムに出題
            </dd>
          </dl>
        </li>
      </ul> */}

      <ul className="mb-20">
        <li className="border-b border-gray-300 pb-3 mb-3">
          <dl className="flex flex-col md:flex-row md:items-center">
            <dt className="w-44 font-bold mb-2 md:mb-0 md:mr-4">合格ライン</dt>
            <dd>スコア100点以上</dd>
          </dl>
        </li>
        <li className="border-b border-gray-300 pb-3 mb-3">
          <dl className="flex flex-col md:flex-row md:items-center">
            <dt className="w-44 font-bold mb-2 md:mb-0 md:mr-4">表示形式</dt>
            <dd>単問出題形式（4択1選）</dd>
          </dl>
        </li>
        <li>
          <dl className="flex flex-col md:flex-row md:items-center">
            <dt className="w-44 font-bold mb-2 md:mb-0 md:mr-4">出題内容</dt>
            <dd>
              HTML、CSS、JavaScript、React、TypeScript、その他よりランダムに出題
            </dd>
          </dl>
        </li>
      </ul>

      <div className="flex justify-center flex-col">
        <Link
          href="/quiz"
          className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-4 font-bold inline-block w-full md:w-96 mx-auto text-center cursor-pointer"
        >
          スタートする
        </Link>
      </div>
    </div>
  );
};

export default Home;
