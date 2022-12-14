//Sencing DB에 데이터 추가를 위해 device/add.ts를 복사해서 고쳐보자.
//하지만 이 파일이 쓰이는 일은 없었다, [deviceid].ts를 개조해서 해결했기 때문이다.
//그래도 뭐 기념 삼아 남겨둠. 코드 자체는 잘 돌아갔으니까.
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
  //Method 체크 : 받는 요청의 메서드가 post가 아니면 405 오류 처리.

  if (request.method !== "POST") {
    response.status(405).json({
      ok: false,
      error: `sencing에서 지원하지 않는 메서드입니다! : ${request.method}`,
    });
    return;
  }
  // console.log(`제이슨.바디.벨류 : ${JSON.parse(request.body.value)}`);
  console.log(request.body);
  const value = JSON.parse(request.body.value);

  console.log(value);

  //!입력 필드 검증_ 200 : 메서드 성공하긴 했는데 값이 비어있을 때.ㄴ
  // 이 부분 개조를 못했다.
  // if (true) {
  //   if (!value)
  //     return response
  //       .status(200)
  //       .json({ ok: false, error: "저런, value이(가) 없습니다." });
  // }

  //여기까지 오류처리 완성---------------------------------------------------
  //@@@@@@@@@@@@@@여기까지 함@@@@@@@@@@@@@@@@@@@@@@@@@@@ value 값은 받았는데 이걸 newDevice에 어케 넣냐
  //client.device.create ==> client.device.create로 바꿔서 해결.
  try {
    //Device Row Create

    const newDevice = await client.sencing.create({
      data: {
        value,
      },
    }); //오류 ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
    //ㄴclient.여기를 바꿔야지.create

    //------------------------------------
    response.status(200).json({ ok: true, value });
    console.log(request.method);
  } catch (err) {
    response.status(200).json({ ok: false, error: `${err}` });
  } finally {
    //예외 유무 상관 없이 마지막에 실행되는 블록.
    await client.$disconnect(); //DB 연결 해제.
  }
}
