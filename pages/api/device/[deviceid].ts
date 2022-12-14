//서버에 삭제 요청하는 곳

//모든 장비들, READ, 데이터를 읽어서 api 구성해서 화면에 뿌려준다.
//add에서 가져와서 필요없는거 삭제.
//all.ts 기본 모양
import type { NextApiRequest, NextApiResponse } from "next";
import { Device } from "@prisma/client";
import client from "../../../libs/server/client";

interface Data {
  ok: boolean;
  id?: String;
  error?: string;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  //Method 체크 : 받는 요청의 메서드가 post가 아니면 405 오류 처리.
  if (request.method !== "DELETE") {
    response.status(405).json({
      ok: false,
      error: `지원하지 않는 메서드입니다! : ${request.method}`,
    });
    return;
  }
  //ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
  try {
    console.log("호오 여기까지 올 줄이야..");
    const { deviceid } = request.query;
    //console.log(deviceid);
    const deleteDevice = await client.device.delete({
      where: {
        id: deviceid?.toString(),
      },
    });

    response.status(200).json({ ok: true, id: deleteDevice.id });
  } catch (err) {
    response.status(200).json({ ok: false, error: `${err}` });
  } finally {
    //예외 유무 상관 없이 마지막에 실행되는 블록.
    await client.$disconnect(); //DB 연결 해제.
  }
}
