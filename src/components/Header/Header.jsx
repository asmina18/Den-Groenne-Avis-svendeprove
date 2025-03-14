
import style from './Header.module.scss'
import { Nav } from '../Nav/Nav';
//import NAVN PÅ IMAGE from '../../assets/NAVN PÅ IMAGE.jpg'

export const Header = () => {

    return (
        <header className={style.header}>
            <Nav />
            {/* <img scr={'NAVN PÅ IMAGE'} alt={'NAVN PÅ IMAGE'} /> */}
        </header>
    )
}


