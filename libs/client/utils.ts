//client 사이드에서 쓸 유틸리티를 정의한다.

//문자열을 공백으로 구분하여 합침.
export function cls(...str: string[]) {
  return str.join(" ");
}

cls("abc" + "def" + "qwer");
//결과 = "abc def qwer"
