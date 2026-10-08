import {Bookmark, ChevronRight} from 'lucide-react';

import {useModal} from '@/hooks/useModal';
import {Backdrop} from '@/ui/Backdrop';
import {Box} from '@/ui/Box';
import {Button} from '@/ui/Button';
import {Header} from '@/ui/Header/Header';
import {Input} from '@/ui/Input';
import {Portal} from '@/ui/Portal';

import * as Styled from './CreateTemplate.styled';

export const CreateTemplate = () => {
	const {open, handleOpen, handleClose} = useModal();

	return (
		<Styled.CreateTemplate onClick={handleOpen}>
			<Bookmark />
			<Header
				title="Сохранить как шаблон"
				subtitle="Сохранить текущую настройку секций для повторного использования"
				level={2}
			/>
			<ChevronRight />

			{open && (
				<Portal>
					<Backdrop onClose={handleClose}>
						<div>
							<Box m="10px 0 10px 0">
								<Input
									id="template-title"
									//error={error}
									//value={templateTitle}
									//onChange={(e) => setTemplateTitle(e.target.value)}
									//onBlur={() => setIsTouched(true)}
									placeholder="Название шаблона"
								/>
							</Box>
							<Button fullWidth variant="outline">
								<Bookmark />
								Сохранить как шаблон
							</Button>
						</div>
					</Backdrop>
				</Portal>
			)}
		</Styled.CreateTemplate>
	);
};
