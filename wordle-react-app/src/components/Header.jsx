export default function Header() {
  return (
    <div className='flex items-center gap-3 bg-slate-900 text-white px-5 py-4'>
      <img src='/logo.svg' alt='logo' className='h-8 w-8' />
      <div>
        <p className='text-lg font-semibold leading-tight'>워들 UI</p>
        <p className='text-xs text-slate-300'>기능팀 연결 전용 데모 인터페이스</p>
      </div>
    </div>
  )
}
