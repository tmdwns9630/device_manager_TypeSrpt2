import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const [product, setProduct] = useState(""); //제품명
  const [location, setLocation] = useState(""); //설치장소
  const [unit, setUnit] = useState(""); //단위
  const [memo, setMemo] = useState(""); //메모
  const [addDevice, setAddDevice] = useState(false);
  //addDevice는 뭐더라?
  const [errorMessage, setErrorMessage] = useState(""); // 에러메시지
  const [type, setType] = useState(""); //장치종류, select

  //1 입력 폼에 데이터 유무 확인

  //2 서버로 데이터 전송

  //3 전송 완료 시 입력창 초기화

  //4 오류가 있으면 표시해줘야 함.

  function 장비추가버튼클릭() {
    console.log("장비추가버튼");
    document.querySelector("#container_add_device")?.classList.toggle("hidden");
    //css의 hidden 속성(display : none) : 본인과 자식을 전부 감춘다.
    setProduct("");
    setLocation("");
    setUnit("");
    setMemo("");
    //--------------------------
  }

  function 장비등록버튼클릭() {
    console.log("등록 버튼");
    // if (!product || !location || !unit) {
    //   alert("제품명/설치위치/단위를 입력해주세요.");
    //   return;
    // }
    if (!product) {
      setErrorMessage("제품명을(를) 입력하세요.");
      return;
    }
    if (!location) {
      setErrorMessage("설치 위치을(를) 입력하세요.");
      return;
    }
    if (!unit) {
      setErrorMessage("단위을(를) 입력하세요.");
      return;
    }
    if (!type) {
      setErrorMessage("장치 종류을(를) 입력하세요.");
      return;
    }
    setErrorMessage("");

    // todo - 서버에 body로 싣어서 보낼 데이터
    const data = { product, location, unit, memo };
    console.log(data);
  }

  //<select> change
  function 장치종류변경(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log("장치종류 변경됨");
    setType(event.currentTarget.value);
  }
  return (
    <Layout title="SETTING">
      <div className=" h-full overflow-y-scroll p-6 space-y-6">
        <div
          data-comment={"장비 추가 버튼"}
          className="flex justify-end"
          onClick={장비추가버튼클릭}
        >
          <div>
            <button className="flex space-x-2 font-bold sunmoon_btn">
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
          </div>
        </div>
        <hr />
        <div
          id="container_add_device"
          data-comment={"New Device"}
          className="space-y-5"
        >
          <div className="text-3xl font-bold">New Device</div>
          {/* 입력란 */}
          <div data-comment={"입력1"} className="flex flex-col">
            <span>제품명 *</span>
            <input
              type={"text"}
              placeholder="제품명을 입력하세요."
              value={product}
              onChange={(event) => setProduct(event.currentTarget.value)}
              className="setting_input"
            ></input>
          </div>
          {/* ----입력1 끝--- */}

          <div data-comment={"입력2"} className="flex flex-col">
            <span>설치 장소 *</span>
            <input
              type={"text"}
              placeholder="ex)거실, 안방, ..."
              value={location}
              onChange={(event) => setLocation(event.currentTarget.value)}
              className="setting_input"
            ></input>
          </div>
          {/* ----입력2 끝--- */}

          <div data-comment={"입력5"} className="flex flex-col">
            <span>장치 종류 *</span>
            <select
              name="choice"
              className="setting_input"
              onChange={장치종류변경}
            >
              <option hidden>장치 종류를 선택하세요.</option>
              <option value="TEMP">온도 센서</option>
              <option value="HUMI">습도 센서</option>
              <option value="CO2">CO2 센서</option>
            </select>
          </div>
          {/* ----입력5 끝--- */}

          <div data-comment={"입력3"} className="flex flex-col">
            <span>단위 *</span>
            <input
              type={"text"}
              placeholder="측정 단위 ex) ℃, ％"
              value={unit}
              onChange={(event) => setUnit(event.currentTarget.value)}
              className="setting_input"
            ></input>
          </div>
          {/* ----입력3 끝--- */}
          <div data-comment={"입력4"} className="flex flex-col">
            <span>메모</span>
            <input
              type={"text"}
              placeholder="메모"
              value={memo}
              onChange={(event) => setMemo(event.currentTarget.value)}
              className="setting_input"
            ></input>
          </div>
          {/* ----입력4 끝--- */}
          <button
            className="w-full py-5 text-2xl font-bold sunmoon_btn"
            onClick={장비등록버튼클릭}
          >
            등록
          </button>
        </div>
        <hr />
      </div>
    </Layout>
  );
};
//에러 띄울 div 안 만들었음. 나중에 추가하자.

export default Home;
