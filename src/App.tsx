import React, { Suspense } from 'react';
import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import Loader from '..//loader/loader';
import 'react-toastify/dist/ReactToastify.css';
// import AuthGuardRoute from './guards/AuthGuardRoutes';
import { useAppSelector } from './app/hooks';

// Lazy Loading
const LandingPage = React.lazy(() => import('../src/pages/landing-page/LandingPage'))
const HomePage = React.lazy(() => import('../src/pages/home-page/HomePage'))

function App() {
    const globalState = useAppSelector((state: any) => state.global);

    return (
      <Suspense>
        <div className="App">
            <Routes>
                <Route path={'/'} element={<LandingPage />} />
                <Route path={'/home'} element={<HomePage />} />
            </Routes>
            <div>
                <ToastContainer
                    position="top-center"
                    autoClose={2500}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    limit={2}
                    toastClassName={'theme-toast'}
                />
            </div>
        </div>
      </Suspense>
    );
}

export default App;
