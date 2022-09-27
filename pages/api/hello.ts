//1
//여기서부터 복붙해서 카운트됨.

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}

//이전까지 req, res는 내부 함수나 변수의 자동 완성 리스트가 안 떴다.
// 이제는 함수 포맷 정보까지 편하게 나온다.
