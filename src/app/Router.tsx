import {Route, Routes} from 'react-router-dom';

import {ROLES} from '@/consts/roles';
import {ROUTES} from '@/consts/routes';
import {AdminPage} from '@/src/pages/AdminPage';
import {ForbidenPage} from '@/src/pages/ForbidenPage';
import {NotFoundPage} from '@/src/pages/NotFoundPage';
import {RegisterPage} from '@/src/pages/RegisterPage';
import {ProtectedRoute} from '@/ui/ProtectedRoute';

import {LoginPage} from '../pages/LoginPage';
import {MainPage} from '../pages/MainPage';
import {SomeTestPage} from '../pages/SomeTestPage';
import {Test} from '../pages/TestPage';
import {ThreeJS} from '../pages/ThreeJs';

export function Router() {
	return (
		<Routes>
			<Route
				path={ROUTES.ADMIN}
				element={<ProtectedRoute element={<AdminPage />} allowedRoles={[ROLES.ADMIN]} />}
			/>
			<Route path={ROUTES.REGISTER} element={<RegisterPage />} />
			<Route path={ROUTES.LOGIN} element={<LoginPage />} />
			<Route path={ROUTES.TEST} element={<Test />} />
			<Route path={ROUTES.HOME} element={<MainPage />} />
			<Route path={ROUTES.FORBIDDEN} element={<ForbidenPage />} />
			<Route path={'/test1'} element={<SomeTestPage />} />
			<Route path={'/three'} element={<ThreeJS />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}
