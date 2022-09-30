//CORS 문제로 fetch를 클라이언트단이 아닌, 서버(api)단에서 하여 DB 호출한다.

import type { NextApiRequest, NextApiResponse } from "next";
import { parseString } from "xml2js";
type Data = {
  name: string;
  totalCnt?: number;
  result?: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { start, end } = req.query;

  if (!start) {
    start = "1";
    end = "5";
  } else {
    if (!end) {
      end = (Number(start) + 4).toString();
    }
  }
  //end값이 너무 클 경우도 5페이지만 보여주게 한다.
  if (Number(start) + 4 < Number(end)) {
    end = (Number(start) + 4).toString();
  }

  if (Number(start) >= Number(end)) {
    end = (Number(start) + 4).toString();
  }

  console.log(`start:${start} / end:${end}`);
  try {
    fetch(
      `http://tour.chungnam.go.kr/_prog/openapi/?func=tour&start=${start}&end=${end}`
    )
      .then((res) => res.text())
      .then((xmlStr) =>
        parseString(xmlStr, { explicitArray: false }, function (err, obj) {
          console.log(obj);
          //const totalCnt = obj.item_info.item.totalCnt;

          res.status(200).json({ name: "Sucyexss", result: obj });
        })
      );
    // res.status(200).json({ name: "John Wick1" });
  } catch (err) {
    res.status(500).json({ name: "John na Wick3" });
  }
}

//이전까지 req, res는 내부 함수나 변수의 자동 완성 리스트가 안 떴다.
// 이제는 함수 포맷 정보까지 편하게 나온다.
