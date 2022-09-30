// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { parseString } from "xml2js";
type Data = {
  name: string;
  totalCnt?: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    fetch("	http://tour.chungnam.go.kr/_prog/openapi/?func=tour&mode=getCnt")
      .then((res) => res.text())
      .then((xmlStr) =>
        parseString(xmlStr, { explicitArray: false }, function (err, obj) {
          console.log(obj.item_info.item.totalCnt);
          const totalCnt = obj.item_info.item.totalCnt;

          res.status(200).json({ name: "jp2", totalCnt });
        })
      );
    // res.status(200).json({ name: "John Wick1" });
  } catch (err) {
    res.status(500).json({ name: "John na Wick3" });
  }
}

//이전까지 req, res는 내부 함수나 변수의 자동 완성 리스트가 안 떴다.
// 이제는 함수 포맷 정보까지 편하게 나온다.
