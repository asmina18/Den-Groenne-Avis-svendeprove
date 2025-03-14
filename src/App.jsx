
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { KategoriPage } from './pages/KategoriPage/KategoriPage';
import { ForsidePage } from './pages/ForsidePage/ForsidePage';
import { MinSidePage } from "./pages/MinSidePage/MinSidePage"
import { DetailsPage } from './pages/DetailsPage/DetailsPage';
import { AnnonceForm } from "./components/Anonce/AnnonceForm"
import { MinKontoAnnonce } from './components/Anonce/MinKontoAnnonce';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage'
import { MainLayout } from './layout/MainLayout';

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<MainLayout />}>
                        <Route index element={<ForsidePage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/min-side' element={<MinSidePage />} />
                        <Route path='/opret-annonce' element={<AnnonceForm />} />
                        <Route path='/mine-annoncer' element={<MinKontoAnnonce />} />
                        <Route path='/produkter/:slug' element={<DetailsPage />} />
                        <Route path='/produkter/kategori/:kategoriSlug' element={<KategoriPage />} />
                        <Route path='/*' element={<ErrorPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default App

