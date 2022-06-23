/**
 * !문제 출처: 백준 온라인 져지
 * https://www.acmicpc.net/problem/2665
 * 
 * !시간제한: 1초
 * !메모리제한: 128MB
 * 
 * !문제
 * n×n 바둑판 모양으로 총 n2개의 방이 있다. 일부분은 검은 방이고 나머지는 모두 흰 방이다. 검은 방은 사면이 벽으로 싸여 있어 들어갈 수 없다. 서로 붙어 있는 두 개의 흰 방 사이에는 문이 있어서 지나다닐 수 있다. 윗줄 맨 왼쪽 방은 시작방으로서 항상 흰 방이고, 아랫줄 맨 오른쪽 방은 끝방으로서 역시 흰 방이다.
 * 시작방에서 출발하여 길을 찾아서 끝방으로 가는 것이 목적인데, 아래 그림의 경우에는 시작방에서 끝 방으로 갈 수가 없다. 부득이 검은 방 몇 개를 흰 방으로 바꾸어야 하는데 되도록 적은 수의 방의 색을 바꾸고 싶다.
 * 아래 그림은 n=8인 경우의 한 예이다.
 * 위 그림에서는 두 개의 검은 방(예를 들어 (4,4)의 방과 (7,8)의 방)을 흰 방으로 바꾸면, 시작방에서 끝방으로 갈 수 있지만, 어느 검은 방 하나만을 흰 방으로 바꾸어서는 불가능하다. 검은 방에서 흰 방으로 바꾸어야 할 최소의 수를 구하는 프로그램을 작성하시오.
 * 단, 검은 방을 하나도 흰방으로 바꾸지 않아도 되는 경우는 0이 답이다.
 * 
 * !입력 & 파싱
 * 첫 줄에는 한 줄에 들어가는 방의 수 n(1 ≤ n ≤ 50)이 주어지고, 다음 n개의 줄의 각 줄마다 0과 1이 이루어진 길이가 n인 수열이 주어진다. 0은 검은 방, 1은 흰 방을 나타낸다.
 * 
  8         -> n
  11100110  -> arr[0][0] ~ arr[0][n-1]
  11010010
  10011010
  11101100
  01000111
  00110001
  11011000
  11000111  -> arr[n-1][0] ~ arr[n-1][n-1]
 * 
 * !출력
 * 첫 줄에 흰 방으로 바꾸어야 할 최소의 검은 방의 수를 출력한다.
 * 
  2
 * 
 * !초기 설정
 * dx, dy: 상하좌우
 * visited: 방문리스트 겸 검은색방을 흰색방으로 바꾼 횟수 저장(초기값 Infinity)
 * queue, pt: BFS구현을 위한 스택과 포인터
 */
// @ 파싱
const fs = require("fs");
let [n, ...arr] = fs.readFileSync("input.txt").toString().trim().split("\n");
n = +n;
arr = arr.map((a) => a.split("").map(Number));

// @ 초기 설정
let dx = [1, -1, 0, 0];
let dy = [0, 0, 1, -1];
let visited = Array.from({ length: n }, () => new Array(n).fill(Infinity));

// @ BFS (0, 0)부터 시작
let queue = [[0, 0, 0]];
let pt = 0;
visited[0][0] = 0;

while (pt < queue.length) {
  let [x, y, c] = queue[pt++];
  if (c > visited[x][y]) continue;

  for (let i = 0; i < 4; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];

    if (0 <= nx && nx < n && 0 <= ny && ny < n) {
      // * 검은방일 때
      if (arr[nx][ny] == 0) {
        if (visited[nx][ny] > c + 1) {
          visited[nx][ny] = c + 1;
          queue.push([nx, ny, c + 1]);
        }
      } else {
        // * 흰방일 때
        if (visited[nx][ny] > c) {
          visited[nx][ny] = c;
          queue.push([nx, ny, c]);
        }
      }
    }
  }
}

console.log(visited[n - 1][n - 1]);
/**
 * ?채점 결과
 * 메모리: 12712KB
 * 시간: 200ms
 * 언어: JS
 */
