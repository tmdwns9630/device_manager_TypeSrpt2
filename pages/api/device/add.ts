import type { NextApiRequest, NextApiResponse } from "next";
import { Device } from "@prisma/client";
import client from "../../../libs/server/client";

interface Data {
  ok: boolean;
  newDevice?: Device;
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
      error: `지원하지 않는 메서드입니다! : ${request.method}`,
    });
    return;
  }

  // const {
  //   body: { product, location, type, unit, memo },
  // } = request;
  // rhldwkg laksgdl Tmsek.
  // console.log(body); //body는 변수명이 아니라, 키값이다.
  //console.log(request.body);

  const { product, location, type, unit, memo } = JSON.parse(request.body);
  console.log(product, location, type, unit, memo);

  //!입력 필드 검증
  //if true는 그냥 접기 기능 쓸려고.
  //200 : 메서드 성공하긴 했는데 값이 비어있을 때.
  if (true) {
    if (!product)
      return response
        .status(200)
        .json({ ok: false, error: "제품명(product)이(가) 없습니다." });
    if (!location)
      return response
        .status(200)
        .json({ ok: false, error: "설치위치(location)이(가) 없습니다." });
    if (!type)
      return response
        .status(200)
        .json({ ok: false, error: "장치종류(type)이(가) 없습니다." });
    if (!unit)
      return response
        .status(200)
        .json({ ok: false, error: "측정단위(unit)이(가) 없습니다." });
  }
  //여기까지 오류처리 완성---------------------------------------------------
  try {
    //Device Row Create
    // product, location, type, unit, memo

    const newDevice = await client.device.create({
      data: {
        product,
        location,
        type,
        unit,
        memo,
      },
    }); //오류 ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
    //ㄴclient.여기를 바꿔야지.create

    //------------------------------------
    response.status(200).json({ ok: true, newDevice });
    console.log(request.method);
  } catch (err) {
    response.status(200).json({ ok: false, error: `${err}` });
  } finally {
    //예외 유무 상관 없이 마지막에 실행되는 블록.
    await client.$disconnect(); //DB 연결 해제.
  }
}
