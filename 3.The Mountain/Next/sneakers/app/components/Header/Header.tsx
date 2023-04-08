import Image from 'next/image'
import { SearchIcon, HomeIcon, FlagIcon, ShoppingCartIcon, UserGroupIcon} from '@heroicons/react/outline';
import HeaderIcon from './HeaderIcon';


export default function Header() {
  return (
  <div>
      {/* left section */}
    <div className='flex items-center'>
        <Image className='rounded-full flex items-center '
          src='/images/vie.png' width={50} height={50}  alt='logo'/>
      <div className='flex ml-2 item-center rounded-full bg-gray-100 p-2'>
        <SearchIcon className= 'h-6 text-gray-600 '/>
          <input className='flex ml-2 items-center bg-transparent outline-none placeholder-gray-500'
          type="text" 
          placeholder='Search...' />
      </div>
    </div>
    {/* center section */}
    <div className='flex justify-center flex grow'>
      <div className='flex space-x-6 md:space-x-2 '>
        <HeaderIcon Icon={HomeIcon}/>
        <HeaderIcon Icon={FlagIcon}/>
        <HeaderIcon Icon={ShoppingCartIcon}/>
        <HeaderIcon Icon={UserGroupIcon}/>
      </div>
    </div>
    {/* right section */}
  </div>
  )
}
