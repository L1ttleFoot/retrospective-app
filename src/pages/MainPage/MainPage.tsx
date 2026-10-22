import {AppBar} from '@/src/widgets/AppBar';
import {Board} from '@/src/widgets/Board';

import * as style from './MainPage.css';

export const MainPage = () => {
	return (
		<div className={style.wrapper}>
			<AppBar />
			<div className={style.main}>
				<Board />
			</div>
		</div>
	);
};
