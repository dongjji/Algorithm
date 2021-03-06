/**
 * 문제 출처: https://www.acmicpc.net/problem/5052
 * 
 * 문제
 * 문제
 * 전화번호 목록이 주어진다. 이때, 이 목록이 일관성이 있는지 없는지를 구하는 프로그램을 작성하시오.
 * 전화번호 목록이 일관성을 유지하려면, 한 번호가 다른 번호의 접두어인 경우가 없어야 한다.
 * 
 * 예를 들어, 전화번호 목록이 아래와 같은 경우를 생각해보자
 * 긴급전화: 911
 * 상근: 97 625 999
 * 선영: 91 12 54 26
 * 
 * 이 경우에 선영이에게 전화를 걸 수 있는 방법이 없다. 전화기를 들고 선영이 번호의 처음 세 자리를 누르는 순간 바로 긴급전화가 걸리기 때문이다. 따라서, 이 목록은 일관성이 없는 목록이다. 
 * 
 * 입력
 * 첫째 줄에 테스트 케이스의 개수 t가 주어진다. (1 ≤ t ≤ 50) 각 테스트 케이스의 첫째 줄에는 전화번호의 수 n이 주어진다. (1 ≤ n ≤ 10000) 다음 n개의 줄에는 목록에 포함되어 있는 전화번호가 하나씩 주어진다. 전화번호의 길이는 길어야 10자리이며, 목록에 있는 두 전화번호가 같은 경우는 없다.
 * 
 * 입력값 예시
    2
    3
    911
    97625999
    91125426
    5
    113
    12340
    123440
    12345
    98346
 * 
 * 출력
 * 각 테스트 케이스에 대해서, 일관성 있는 목록인 경우에는 YES, 아닌 경우에는 NO를 출력한다.
 * 
 * 출력값 예시
    NO
    YES
 * 
 * 파싱
 * T = 2
 * arr = [
    '3',        '911',
    '97625999', '91125426',
    '5',        '113',
    '12340',    '123440',
    '12345',    '98346'
  ]
 * 
 * 
 * {{초기 설정}}
 * 결과 출력용 배열
 * result = []
 */

// 파싱
const fs = require("fs");
let [T, ...arr] = fs
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((a) => a.trim());

let result = [];
for (let i = 0; i < arr.length; i += +arr[i] + 1) {
  // 각 테스트케이스에 있는 모든 전화번호를 문자열 정렬 후 복사
  let arr2 = arr.slice(i + 1, i + +arr[i] + 1).sort();
  // test함수 실행
  result.push(test(arr2));
}

console.log(result.join("\n"));

/**
 * strArr는 문자열 요소들이 문자열 정렬되어있기 때문에
 * A라는 번호가 B라는 번호의 접두어와 같을 경우
 * 배열 안에서
 * [..., A, B, ...]
 * 이런 식으로 연속으로 존재할 수 밖에 없다.
 * 따라서 인덱스 i와 i+1의 일관성을 조사하면 된다.
 *
 * 이때, A의 길이만큼 B 문자열을 앞에서부터 자른 뒤에
 * 문자열 비교를 하면 간단하다.
 */
function test(strArr) {
  for (let i = 0; i < strArr.length - 1; i++) {
    if (strArr[i] === strArr[i + 1].substring(0, strArr[i].length)) {
      return "NO";
    }
  }
  return "YES";
}
/**
 * 채점 결과
 * 메모리: 45892KB
 * 시간: 336ms
 * 언어: JS
 */
