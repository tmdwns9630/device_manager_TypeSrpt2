import { useState } from "react";

//Counter 함수의 인자인 props에 "any 형식이 암시적으로 포함됩니다." 오류가 뜬다.
//interface 키워드를 통해 title의 타입을 제한해준다.
//만약 타입이 다를 경우, "'string' 형식은 'number' 형식에 할당할 수 없습니다."라고 에러가 뜬다.
//함수가 정의된 컴포넌트에서 타입을 확인할 것.

// 인터페이스로 카운터프롭스라는걸 정의해줬는데 속성의 타이틀은 스트링 타입으로 지정한다. 함수는 아니라서 ( )는 없다.
// 두번째 타입을 정의해두고, 호출할 때 인자를 넣지 않으면 오류가 뜬다. "'subtitle' 속성이 '{ title: string; }' 형식에 없지만 'CounterProps' 형식에서 필수입니다."
// 이 때 두번째 타입명에 ?를 붙이면 선택사항이 된다.
// 지정하지 않은 프롭스를 넣어도 오류난다.
// 만들 땐 귀찮지만 엄격한 관리로 인해 쓰기 쉬워진다.
// 새로운 문법이니 연습해서 꼭 기억하자.

// title: String | number; : 타입을 두가지를 지정한다.
// Number로 첫대문자 쓰면 오류난다. ->  'Number' 형식은 'ReactNode' 형식에 할당할 수 없습니다.

//타입 스크립트는 하나라도 오류 나면 안 돌아간다. 오타 조심하자.

//변수 선언할 때 값을 넣었으면 자료형 지정이 생략되어서 나온다..
//하지만 선언 시 값을 안 넣었다면 반드시 자료형을 지정해야 한다.
interface CounterProps {
  title: String | number | number[];
  subtitle: String;
  idNum?: number;
}

export default function Counter(props: CounterProps) {
  const [count, setCount] = useState(0);
  const data = 10;
  const data2: Number = 10; //동일함.
  return (
    <div>
      <div className="bg-blue-300">{props.title}</div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  );
}
