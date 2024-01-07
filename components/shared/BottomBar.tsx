import { sidebarLinks } from '@/constants'
import Link from 'next/link'
const BottomBar = () => {
  return (
    <section className='bottombar'>
      <div className='bottombar_container'>
        {sidebarLinks.map((link) => {
          return(
            <Link href={link.route} key={link.label} className='bottombar_link'>
              <p className='text-white'>{link.label.split(/\s+/)[0]}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default BottomBar