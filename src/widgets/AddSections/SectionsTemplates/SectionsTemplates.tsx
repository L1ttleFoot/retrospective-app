import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Bookmark} from 'lucide-react';
import {useState} from 'react';
import {useFormContext} from 'react-hook-form';

import {toasts} from '@/store/useToasts';
import {Box} from '@/ui/Box';
import {Button} from '@/ui/Button';
import {Divider} from '@/ui/Divider';
import {Header} from '@/ui/Header/Header';
import {Input} from '@/ui/Input';

import {createTemplate} from '../api';
import {SectionsForm} from '../CreateSections/CreateSections';
import {CreateTemplate} from './CreateTemplate';
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
			toasts.success('Шаблон успешно сохранен');
		},
	});

	const handleSaveTemplate = async () => {
		const isSectionsValid = await trigger('sections');

		const isTitleValid = templateTitle.trim();

		if (!isTitleValid) {
			setIsTouched(true);
		}

		if (!isSectionsValid || !isTitleValid) return;

		mutateTemplates({
			title: templateTitle,
			sections: sections.map((s) => ({title: s.title, color: s.color})),
		});
	};

	return (
		<Styled.SectionsTemplates>
			<Header title="Ваши шаблоны" subtitle="Сохраненные шаблоны секций" level={2} />

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

			<div>тут кароч будет выпадающий спимсрк</div>

			<TemplatesList />

			<Divider />

			<Button onClick={handleSaveTemplate} fullWidth variant="outline">
				<Bookmark />
				Сохранить как шаблон
			</Button>

			<Divider />

			<CreateTemplate />
		</Styled.SectionsTemplates>
	);
};
