import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import GuessRow from './components/GuessRow.jsx'

/**
 * UI 전용 App
 * - 유사도/정답 판정은 기능팀 API로부터만 받습니다.
 * - 계약: window.WordleAPI.compute(guess) -> Promise<{ similarity: number, correct?: boolean }>
 *   - similarity: 0~100
 *   - correct: (선택) true/false. 없으면 similarity === 100을 정답으로 간주.
 */
export default function App() {
  const [input, setInput] = useState('')
  const [guesses, setGuesses] = useState([]) // { word, similarity, correct }
  const won = useMemo(() => guesses.some(g => g.correct), [guesses])

  const featureAPI = typeof window !== 'undefined' ? window.WordleAPI : undefined
  const wired = !!(featureAPI && typeof featureAPI.compute === 'function')

  const submitGuess = async () => {
    const word = input.trim()
    if (!word || won || !wired) return
    try {
      const res = await featureAPI.compute(word)
      const similarity = Math.max(0, Math.min(100, Number(res?.similarity ?? 0)))
      const correct = typeof res?.correct === 'boolean' ? !!res.correct : (similarity === 100)
      setGuesses(prev => [...prev, { word, similarity, correct }])
      setInput('')
      featureAPI.onSubmitGuess?.(word)
      if (correct) featureAPI.onWin?.(word)
    } catch (e) {
      console.error(e)
      alert('유사도 계산 중 오류가 발생했습니다. (기능팀 API)')
    }
  }

  const onKeyDown = (e) => { if (e.key === 'Enter') submitGuess() }

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 flex items-center justify-center p-6'>
      <div className='w-full max-w-xl'>
        <div className='bg-white rounded-2xl shadow-xl ring-1 ring-slate-200 overflow-hidden'>
          <Header />

          <div className='p-6 space-y-6'>
            <p className='text-center text-lg'>단어를 입력하세요</p>

            {!wired && (
              <div className='rounded-xl border border-amber-200 bg-amber-50 text-amber-900 px-4 py-3'>
                <p className='font-semibold'>기능팀 API 연결이 필요합니다.</p>
                <p className='text-sm opacity-90 mt-1'>
                  window.WordleAPI.compute(guess) 를 주입하면 입력이 활성화됩니다.
                </p>
              </div>
            )}

            <div className='flex gap-2'>
              <input
                className='flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-100'
                placeholder='예: 알고리즘'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={!wired || won}
              />
              <button
                onClick={submitGuess}
                className='rounded-xl px-5 py-3 bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 active:scale-[0.98] disabled:bg-slate-300'
                disabled={!wired || won}
              >
                제출
              </button>
            </div>

            {won && (
              <div className='rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-900 px-4 py-3'>
                <p className='font-semibold'>정답입니다! 셈틀 기장한테 연락하세요!</p>
              </div>
            )}

            <section>
              <h2 className='mb-3 text-sm font-semibold tracking-wide text-slate-500'>최근 입력</h2>
              {guesses.length === 0 ? (
                <div className='rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500'>
                  아직 입력이 없습니다.
                </div>
              ) : (
                <ul className='space-y-3'>
                  {[...guesses].reverse().map((g, i) => (
                    <GuessRow key={i} word={g.word} similarity={g.similarity} correct={g.correct} />
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
