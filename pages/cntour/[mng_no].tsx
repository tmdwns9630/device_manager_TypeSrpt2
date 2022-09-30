//import { Device } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [mng_no, setMng_no] = useState("");
  const router = useRouter();

  useEffect(() => {
    setMng_no(router.query.mng_no?.toString() || "");
    //타입스크립트가 ㅈㄹ하니 아니면 빈문자열.
  }, [router.query]);
  return <div>{mng_no}- 상세보기 페이지</div>;
};

export default Home;
