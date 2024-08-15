import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {LoginPage} from './pages/LoginPage';
import {RetroMainPage} from './pages/RetroMainPage';
import './initFirebase';
import {TestPage} from './pages/TestPage';

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/" element={<RetroMainPage />} />
            </Routes>
        </BrowserRouter>
    );
}
