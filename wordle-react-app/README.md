# 워들 React UI (Vite + Tailwind)

UI만 담당하는 데모 앱입니다. 기능팀(정답/유사도 로직)과는 prop으로 쉽게 연결 가능합니다.

## 시작하기
```bash
npm i
npm run dev
```
브라우저에서 표시되는 로컬 주소로 접속합니다.

## 빌드
```bash
npm run build
npm run preview
```

## 기능팀과의 연결(HOC/props)
- 정답 단어 주입: `correctWord` (현재는 데모로 '코딩')
- 유사도 함수 주입: `(guess) => number`(0~100)
- 이벤트: `onSubmitGuess(guess)`, `onWin(guess)`

원한다면 `src/App.jsx`를 컨테이너로 바꾸고, 기능팀 훅/컨텍스트를 주입하세요.

## GitHub Pages 배포(간단)
1) 이 저장소를 GitHub에 올립니다.
2) `npm run build` 후 생성되는 `dist/`를 `gh-pages` 브랜치 루트로 푸시하거나,
3) Actions 템플릿(Vite) 또는 `gh-pages` 패키지 사용을 권장합니다.


## 기능팀 API 연결 계약 (UI는 계산하지 않음)
UI는 유사도/정답을 계산하지 않습니다. 아래 전역 API를 주입해 주세요.

```html
<!-- index.html 혹은 외부 스크립트로 로드 -->
<script src="/feature-adapter.example.js"></script>
```

```ts
// 기대하는 전역 객체 형태
declare global {
  interface Window {
    WordleAPI?: {
      compute: (guess: string) => Promise<{ similarity: number, correct?: boolean }>
      onSubmitGuess?: (guess: string) => void
      onWin?: (guess: string) => void
    }
  }
}
```

- `compute(guess)`: 반드시 Promise 반환, `{ similarity: 0~100, correct?: boolean }`
- `correct`가 생략되면 `similarity === 100`을 정답으로 간주합니다.
- 연결이 없으면 입력/제출이 비활성화되고, 경고 배너가 표시됩니다.
