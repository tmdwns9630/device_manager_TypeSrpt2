import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { parseString } from "xml2js";

// interface Item {
//   mng_no: string;
//   local_nm: string;
//   type: string;
//   nm: string;
//   nm_sub: string;
//   addr: string;
//   lat: string;
//   lng: string;
//   tel: string;
//   h_url: string;
//   desc: string;
//   list_img: string;
// }

// interface Item_info {
//   item: Item[];
// }

// interface Result {
//   item_info: Item_info;
// }

interface CntourListRespons {
  name: string;
  result?: Result;
}

export interface Root {
  name: string;
  result: Result;
}

export interface Result {
  item_info: ItemInfo;
}

export interface ItemInfo {
  item: Item[];
}

export interface Item {
  mng_no: string;
  local_nm: string;
  type: string;
  nm: string;
  nm_sub: string;
  addr: string;
  lat: string;
  lng: string;
  tel: string;
  h_url: string;
  desc: string;
  list_img: string;
}

const CNTour: NextPage = () => {
  const [totalCnt, setTotalCnt] = useState(0);
  const [tours, setTours] = useState<Item[] | undefined>([]);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    console.log("=======관광명소 총 아이템개수 로딩중=======");
    fetch("/api/tour/cntour")
      .then((res) => res.json())
      .then((json) => {
        console.log(json.totalCnt);
        setTotalCnt(json.totalCnt);
      });
  }, []);

  function 관광명소가져오기() {
    console.log("=======관광명소 리스트 로딩중=======");
    fetch(`../api/tour/cntourlist?start=${pageNo}&end=${pageNo + 2}`)
      .then((res) => res.json())
      .then((json: CntourListRespons) => {
        const 기존배열 = tours || []; //[1,2,3], undefine이면 공백 배열 만들ㅇ저ㅜㄴ다.
        const 신규배열 = json.result?.item_info.item || []; //[4,5,6]

        //setTours(json.result?.item_info.item);

        setTours([...기존배열, ...신규배열]); // 기존배열과 신규배열을 괄호 빼서 적용/
        setPageNo(pageNo + 3);
        //console.log(tours);
      });
  }

  useEffect(() => {
    관광명소가져오기();
  }, []);

  return (
    <Layout title="충남">
      <div className="h-full overflow-y-scroll p-6 space-y-7">
        충남 관광 명소
        <div className="text-3xl font-bold">{totalCnt}개의 관광 명소</div>
        {/*tours.map()이 안나올때는
        tours?.map() 혹은 밑에 처럼 하자.  */}
        {tours &&
          tours.map((ele, idx) => (
            <div key={idx} className="border-b-4 py-5 flex justify-between">
              <div>번호 : </div>
              <div className="font-bold text-red-700">지역명 : {ele.nm}</div>
              <div>종류 : </div>
              <div>장소명 : </div>
              <div>간단설명 : </div>
              <div>주소 : </div>
              <div>lat : </div>
              <div>lng : </div>
              <div>문의 : </div>
              <div>h_url :</div>
              <div>상세설명 :</div>
              <div>이미지 : </div>
            </div>
          ))}
        <button
          className="bg-red-300 p-5 rounded-lg space-x-4"
          onClick={관광명소가져오기}
        >
          더보기( {tours?.length} / {totalCnt}) -{pageNo}
        </button>
      </div>
    </Layout>
  );
};

export default CNTour;
