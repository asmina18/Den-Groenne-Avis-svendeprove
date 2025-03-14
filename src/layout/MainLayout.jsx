
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer/Footer'
import { Nav } from '../components/Nav/Nav';

export const MainLayout = () => {

    return (
        <div>
            <Nav />
            <Outlet />
            <Footer />
        </div>
    )
}

