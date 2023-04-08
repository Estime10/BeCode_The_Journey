interface HeaderIconProps {
    Icon: React.ElementType;
  }

export default function HeaderIcon({ Icon }: HeaderIconProps) {
  return (
    <div className='flex items-center curser-pointer md:px-10 sm:h-14 md:hover:bg-gray-100 rounded-xl'>
      <Icon className='h-5 text-black-500 '/>
    </div>
  )
}
