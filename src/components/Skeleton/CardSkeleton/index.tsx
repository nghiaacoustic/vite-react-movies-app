export const CardSkeleton: React.FC = () => {
  return (
    <div
      data-testid='card-skeleton'
      className='relative min-w-[236px] h-[330px] m-2 cursor-pointer overflow-hidden rounded-lg shadow-lg transition duration-200 ease-in-out hover:scale-105 animate-pulse text-white-primary bg-black-primary'
    >
      <div className='flex-full-center h-full w-[236px] bg-slate-300 rounded dark:bg-slate-700'>
        <svg
          className='w-10 h-10 text-slate-200 dark:text-slate-600'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 20 18'
        >
          <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
        </svg>
      </div>

      <div className='absolute justify-between w-full p-2 text-white-primary rounded-lg bg-gradient-to-t from-black-primary via-gray-900 to-transparent -bottom-0 left-0'>
        <div className='h-2.5 bg-white-primary rounded-full dark:bg-white-primary w-32 mb-2'></div>
        <div className='h-2 bg-white-primary rounded-full dark:bg-white-primary w-24 mb-2'></div>
      </div>
    </div>
  )
}
