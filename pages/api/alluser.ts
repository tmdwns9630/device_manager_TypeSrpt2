//3
//Read : DB의 데이터를 조회하여 읽는다.
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";
import { User } from "@prisma/client";

// type Data = {
//   name: string;
// };
// ㄴ 위를 타입스크립트로 바꾼게 아래다.

interface ResponseDataType {
  name: string;
  users: User[];
}
//res < > 안에 들어가는 데이터의 지정을 해준다.
//ㄴ 잘못 쓰는걸 방지하기 위해서 작성하여 오류를 줄일 수 있다.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataType> // 데이터타입 지정.
) {
  try {
    const users = await client.user.findMany();
    console.log(users);
    //res.status(200).json({ name: "AllUser-okokok", users: users });
    //↑↓ 는 동일한 코드다.
    res.status(200).json({ name: "AllUser-okokok", users });
  } catch (err) {}
}
//ex6 문법 : model Users와 const users의 이름이 같다.
// 이 경우, users 이름으로 변수 하나를 그대로쓸 수 있다.
