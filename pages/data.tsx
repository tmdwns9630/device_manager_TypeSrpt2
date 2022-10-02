import { Device } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const [deviceReadData, setDeviceReadData] = useState<Device[]>([]);
  const [selectId, setSelectId] = useState("");
  const [sensingValue, setSensingValue] = useState("");
  const router = useRouter;
  useEffect(() => {
    console.log("DATA 페이지로딩됨");

    fetch(`/api/device/all`)
      .then((res) => res.json())
      .then((json) => {
        if (json.ok) {
          setDeviceReadData(json.alldevice);
          //console.log(json.alldevice);
        }
      });
  }, []);

  function 셀렉트박스변경이벤트(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log("셀렉트박스변경이벤트 호출됨");
    setSelectId(event.target.value);
  }

  function 센서값변경(event: React.ChangeEvent<HTMLInputElement>) {
    setSensingValue(event.currentTarget.value);
    //console.log(selectId, inputStr);// 이 둘을 서버에 전송해준다.
  }

  function 등록버튼() {
    console.log("등록버튼");

    const data = { value: sensingValue };
    fetch(`/api/sencing/${selectId}`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {});
  }

  return (
    <Layout title="data">
      <div className="h-full overflow-y-scroll p-6 space-y-7">
        <h2 className="text-3xl font-bold">장비 선택</h2>
        <div className="text-3xl font-bold text-red-600">
          교양필수 수업으로 인해 등록 버튼 쪽 함수 미구현
        </div>
        <div className="text-3xl font-bold text-blue-500 bg-amber-300">
          지급 노트북 LG그램에 환경 세팅. 집 데탑에도 세팅.
        </div>
        {/* select Box */}
        <div>
          <select
            onChange={셀렉트박스변경이벤트}
            className="w-full h-12 ring-2 ring-black text-gray-800 px-2"
          >
            <option hidden>장비를 선택해주세요.</option>
            {deviceReadData.map((device) => (
              <option key={device.id} value={device.id}>
                [{device.type}] {device.product} ({device.location})
              </option>
            ))}
            {/* <option>[CO2] 샤오미 공기청정기 (거실)</option> */}
          </select>
        </div>
        <div>
          {selectId ? (
            <div className="space-y-5">
              <h2 className="text-3xl font-bold">선택 장비 : {selectId}</h2>
              <input
                className="setting_input w-full"
                value={sensingValue}
                onChange={센서값변경}
                placeholder="입력"
                type="number"
              ></input>
              <button
                onClick={등록버튼}
                className="w-full py-5 text-2xl font-bold sunmoon_btn"
              >
                등록
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
