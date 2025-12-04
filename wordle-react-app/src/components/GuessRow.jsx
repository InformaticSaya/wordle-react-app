export default function GuessRow({ word, similarity, correct }) {
  return (
    <li className='flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3'>
      <div className='flex items-center gap-3'>
        <img src={correct ? '/sprites/check.svg' : '/sprites/guess.svg'} alt='' className='h-5 w-5' />
        <span className='font-medium'>{word}</span>
      </div>
      <div className={'text-sm px-2 py-1 rounded-lg ' + (correct ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700')}>
        유사도 {similarity}%
      </div>
    </li>
  )
}
