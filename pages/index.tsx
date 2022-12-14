import { Device } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeviceCard from "../components/DeviceCard";
import Layout from "../components/Layout";
import {
  PacmanLoader,
  HashLoader,
  GridLoader,
  CircleLoader,
  RingLoader,
  SquareLoader,
  BounceLoader,
} from "react-spinners";
import Toggle from "react-toggle";

const Home: NextPage = () => {
  const [deviceReadData, setDeviceReadData] = useState<Device[]>([]); //api에서 받은 서버의 디바이스 데이터
  const [bToggle, setBToggle] = useState(false);

  useEffect(() => {
    fetch("/api/device/all")
      .then((res) => res.json())
      .then((json) => {
        console.log(json.alldevice);
        setDeviceReadData(json.alldevice);
        //console.log(deviceReadData[0]);
      });
  }, []);

  function 토글변경() {
    setBToggle(!bToggle);
    // console.log(`토글변경됨 - ${!bToggle}`);

    if (!bToggle) {
      console.log("실시간 ON");
    } else {
      console.log("실시간 OFF");
    }
  }

  return (
    <Layout title="HOME">
      <div className="h-full overflow-y-scroll p-6 space-y-7">
        <div className="flex justify-between">
          <PacmanLoader color="#36d7b7" />
          <HashLoader color="#36d7b7" />
          <CircleLoader color="#36d7b7" />
          <RingLoader color="#36d7b7" />
          <SquareLoader color="#36d7b7" />
        </div>
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
          <div className="flex items-center select-none space-x-2">
            {bToggle && <GridLoader color="#36d7b7" className="inline-block" />}
            <Toggle
              id={"cheese-status"}
              onChange={토글변경}
              defaultChecked={bToggle}
            />
            <label htmlFor="cheese-status">
              실시간 <span>{bToggle ? "ON" : "OFF"}</span>
            </label>
          </div>
        </div>
        {/* -------링크드2유 엔드--------------------------- */}
        {/*장비 카드 전체를 컴포넌트로 분리한다.  */}
        <div className="flex flex-wrap">
          {0 < deviceReadData.length ? null : <div>등록 장비가 몰?루</div>}
          {deviceReadData.map((device, idx) => (
            <DeviceCard key={idx} device={device}></DeviceCard>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
