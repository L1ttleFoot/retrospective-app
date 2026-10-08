import {FormProvider, useForm} from 'react-hook-form';
import {v4} from 'uuid';

import {useBoards} from '@/store/useBoards';
import {Divider} from '@/ui/Divider';
import {Header} from '@/ui/Header/Header';

import * as Styled from './AddSections.styled';
import {colorsList} from './ColorPicker/ColorPicker.consts';
import {CreateSections} from './CreateSections';
import {SectionsForm} from './CreateSections/CreateSections';
import {SectionsTemplates} from './SectionsTemplates';

type AddSectionsProps = {handleClose: () => void};

export const AddSections = ({handleClose}: AddSectionsProps) => {
	const currentBoardId = useBoards((state) => state.currentBoardId);

	const methods = useForm<SectionsForm>({
		mode: 'onSubmit',
		defaultValues: {
			sections: [
				{id: v4(), title: 'Что было хорошо?', color: colorsList.green, boardId: currentBoardId},
				{id: v4(), title: 'Что было плохо?', color: colorsList.red, boardId: currentBoardId},
			],
		},
	});

	return (
		<FormProvider {...methods}>
			<Styled.AddSections>
				<Header title="Создание секций" subtitle="Настройка структуры доски" />
				{/* <Divider />
				<SectionsTemplates /> */}
				<Divider />
				<CreateSections handleClose={handleClose} />
			</Styled.AddSections>
		</FormProvider>
	);
};
