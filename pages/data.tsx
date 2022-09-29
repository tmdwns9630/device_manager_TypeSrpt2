import { Device } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const [deviceReadData, setDeviceReadData] = useState<Device[]>([]);
  const [selectId, setSelectId] = useState("");

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

  function 등록버튼() {
    console.log("등록버튼");
  }

  return (
    <Layout title="data">
      <div className="h-full overflow-y-scroll p-6 space-y-7">
        <h2 className="text-3xl font-bold">장비 선택</h2>
        {/* select Box */}
        <div>
          <select
            onChange={셀렉트박스변경이벤트}
            className="w-full h-12 ring-2 ring-black text-gray-800 px-2"
          >
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
              <input className="setting_input w-full"></input>
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
