import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {useFormContext} from 'react-hook-form';

import {Box} from '@/ui/Box';
import {Button} from '@/ui/Button';
import {Input} from '@/ui/Input';

import {createTemplate} from '../api';
import {SectionsForm} from '../CreateSections/CreateSections';
import * as Styled from './SectionsTemplates.styled';
import {TemplatesList} from './TemplatesList/TemplatesList';

export const SectionsTemplates = () => {
	const client = useQueryClient();
	const [templateTitle, setTemplateTitle] = useState('');

	const [isTouched, setIsTouched] = useState(false);

	const error = isTouched && !templateTitle.trim();

	const {trigger, getValues} = useFormContext<SectionsForm>();
	const sections = getValues('sections');

	const {mutate: mutateTemplates} = useMutation({
		mutationFn: createTemplate,
		onSuccess: () => {
			setTemplateTitle('');
			setIsTouched(false);
			client.invalidateQueries({queryKey: ['templates']});
		},
	});

	const handleSaveTemplate = async () => {
		const isSectionsValid = await trigger('sections');

		const isTitleValid = templateTitle.trim();

		if (!isTitleValid) {
			setIsTouched(true);
		}

		if (!isSectionsValid || !isTitleValid) return;

		console.log(getValues('sections'));

		mutateTemplates({
			title: templateTitle,
			sections: sections.map((s) => ({title: s.title, color: s.color})),
		});
	};

	return (
		<Styled.SectionsTemplates>
			<h2>Шаблоны</h2>
			<Box m="10px 0 10px 0">
				<Input
					id="template-title"
					error={error}
					value={templateTitle}
					onChange={(e) => setTemplateTitle(e.target.value)}
					onBlur={() => setIsTouched(true)}
					placeholder="Название шаблона"
				/>
			</Box>
			<Button onClick={handleSaveTemplate} fullWidth>
				Сохранить как шаблон
			</Button>
			<TemplatesList />
		</Styled.SectionsTemplates>
	);
};
