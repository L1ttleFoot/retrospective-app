import {Route, Routes} from 'react-router-dom';
import {LoginPage} from '../pages/LoginPage';
import {MainPage} from '../pages/MainPage';
import {Test} from '../pages/TestPage';
import {RegisterPage} from '@src/pages/RegisterPage';
import {AdminPage} from '@src/pages/AdminPage';
import {ForbidenPage} from '@src/pages/ForbidenPage';
import {ProtectedRoute} from '@ui/ProtectedRoute';
import {NotFoundPage} from '@src/pages/NotFoundPage';
import {ROUTES} from '@consts/routes';

export function Router() {
    return (
        <Routes>
            <Route
                path={ROUTES.ADMIN}
                element={<ProtectedRoute element={<AdminPage />} allowedRoles={['ADMIN']} />}
            />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.TEST} element={<Test />} />
            <Route path={ROUTES.HOME} element={<MainPage />} />
            <Route path={ROUTES.FORBIDDEN} element={<ForbidenPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
