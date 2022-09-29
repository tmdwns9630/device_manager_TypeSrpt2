//인데 여긴 이제 뭐하는 곳이냐

//서버에 삭제 요청하는 곳

//모든 장비들, READ, 데이터를 읽어서 api 구성해서 화면에 뿌려준다.
//add에서 가져와서 필요없는거 삭제.
//all.ts 기본 모양
import type { NextApiRequest, NextApiResponse } from "next";
import { Device } from "@prisma/client";
import client from "../../../libs/server/client";

interface Data {
  ok: boolean;
  value?: Number;
  error?: string;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  //Method 체크 : 받는 요청의 메서드가 get 아니면 405 오류 처리.
  if (request.method !== "GET") {
    response.status(405).json({
      ok: false,
      error: `지원하지 않는 메서드입니다! : ${request.method}`,
    });
    return;
  }
  const { deviceid } = request.query;
  if (!deviceid) {
    return response.status(200).json({
      ok: false,
      error: `장치 ID(deviceid)를 입력 해주세요`,
    });
  }

  try {
    //이 밑으로 17시54분 작성함.
    console.log("호오 여기까지 올 줄이야..");

    const result = await client.sencing.findFirst({
      where: {
        //필터링
        deviceId: deviceid.toString(),
      },
      select: {
        //select는 필드를 선택하여 api 키값 중 원하는 값만 받을 수 있다.
        value: true, //true인 필드만 받는다.
        id: false,
        updateAt: false,
      },
      orderBy: {
        //정렬 : 오름차순(decs), 내림차순(ase)으로 데이터를 받는다.
        createAt: "desc",
      },
    });

    response.status(200).json({ ok: true, value: result?.value });
  } catch (err) {
    response.status(200).json({ ok: false, error: `${err}` });
  }
}
