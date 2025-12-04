// 예시: 기능팀이 제공하는 API를 UI에 주입하는 어댑터 (데모)
// 실제 서비스에서는 이 파일을 교체하거나, 번들 외부 스크립트로 로드하세요.
window.WordleAPI = {
  async compute(guess) {
    // TODO: 기능팀 로직으로 교체 (HTTP 호출이나 wasm, worker 등)
    // 아래는 데모(무작위 유사도). 100이면 correct.
    const similarity = Math.floor(Math.random() * 101)
    const correct = similarity === 100
    return { similarity, correct }
  },
  onSubmitGuess(guess) {
    // 선택: 이벤트 훅
    console.log('[Feature] onSubmitGuess:', guess)
  },
  onWin(guess) {
    // 선택: 이벤트 훅
    console.log('[Feature] onWin:', guess)
  }
}
