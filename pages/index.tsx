import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout title="HOME">
      <div className="h-full overflow-y-scroll p-6 space-y-7">
        <div id="웰컴메시지" className="flex justify-between items-center ">
          <div>
            <div className="text-5xl font-extrabold">Hello, Peter 😎</div>
            <div className="text-gray-500 font-bold">Welcome to NoWay-Home</div>
          </div>
          <hr className="border-b-2" />
          <Link href={"/setting"}>
            <button className="flex space-x-2  py-4 px-5 rounded-lg font-bold sunmoon_btn">
              <span>Add Device</span>
              <svg
                data-comment="플러스 아이콘"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Link>
        </div>
        {/* -------웰컴메시지 엔드--------------------------- */}
        <div id="링크드2유" className="flex justify-between items-center">
          <div className="text-2xl font-bold">Linked to you</div>
          <div>[실시간 버튼 자리]</div>
        </div>
        {/* -------링크드2유 엔드--------------------------- */}
        <div id="센서목록" className="flex flex-wrap justify-center">
          {[1, 1, 1, 1, 1].map((device, idx) => (
            <div
              key={idx}
              data-comment="장비카드"
              className="bg-[#60A6FE] dark:bg-[#363345] border-2 w-52 h-52 p-4 
            flex flex-col justify-between rounded-2xl
            m-5"
            >
              <div className=" flex justify-end">
                <span className="text-5xl">25</span>
                <span className="text-2xl text-gray-500">%</span>
              </div>
              <div className=" flex flex-col">
                <span className="text-gray-500">안방 에어컨 (메모)</span>
                <span className="text-3xl">공기청정기</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
{
  [1, 2, 3].map((ele, idx) => <div>hello world</div>);
}
export default Home;
