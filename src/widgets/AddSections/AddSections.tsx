import {FormProvider, useForm} from 'react-hook-form';
import {v4} from 'uuid';

import {useDiscussions} from '@/store/useDiscussions';

import * as Styled from './AddSections.styled';
import {colorsList} from './ColorPicker/ColorPicker.consts';
import {CreateSections} from './CreateSections';
import {SectionsForm} from './CreateSections/CreateSections';
import {SectionsTemplates} from './SectionsTemplates';

type AddSectionsProps = {handleClose: () => void};

export const AddSections = ({handleClose}: AddSectionsProps) => {
	const currentDiscussionId = useDiscussions((state) => state.currentDiscussionId);

	const methods = useForm<SectionsForm>({
		mode: 'onSubmit',
		defaultValues: {
			sections: [
				{
					id: v4(),
					title: 'Что было хорошо?',
					color: colorsList.green,
					discussionId: currentDiscussionId,
				},
				{
					id: v4(),
					title: 'Что было плохо?',
					color: colorsList.red,
					discussionId: currentDiscussionId,
				},
			],
		},
	});

	return (
		<FormProvider {...methods}>
			<Styled.AddSections>
				<SectionsTemplates />
				<CreateSections handleClose={handleClose} />
			</Styled.AddSections>
		</FormProvider>
	);
};
