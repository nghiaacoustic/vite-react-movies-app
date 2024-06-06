export const BannerSkeleton: React.FC = () => {
  return (
    <div
      data-testid='banner-skeleton'
      className='relative w-full h-[800px] bg-cover cursor-pointer overflow-hidden shadow-lg transition duration-300 ease-in-out animate-pulse text-white-primary bg-black-primary'
    >
      <div className='absolute bottom-[120px] left-[35px] w-full p-2 text-white-primary rounded-lg bg-gradient-to-t from-black-primary to-transparent'>
        <div className='h-4 bg-white-primary rounded-full dark:bg-white-primary w-80 mb-4'></div>
        <div className='h-3 bg-white-primary rounded-full dark:bg-white-primary w-1/2 mb-4'></div>
        <div className='h-3 bg-white-primary rounded-full dark:bg-white-primary w-1/2 mb-4'></div>
        <div className='h-3 bg-white-primary rounded-full dark:bg-white-primary w-1/2 mb-4'></div>
        <div className='h-3 bg-white-primary rounded-full dark:bg-white-primary w-60 mb-4'></div>
        <div className='h-10 bg-white-primary rounded-sm dark:bg-white-primary w-20 mb-4'></div>
      </div>
    </div>
  )
}
