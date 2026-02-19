import {useMutation, useQueryClient} from '@tanstack/react-query';
import {X} from 'lucide-react';

import {useTemplates} from '@/store/useTemplates';
import {IconButton} from '@/ui/IconButton';

import {deleteTemplate} from '../../api';
import {useSectionsTemplatesData} from '../useSectionsTemplates';
import * as Styled from './TemplatesList.styled';

export const TemplatesList = () => {
	const queryClient = useQueryClient();

	const {templatesData} = useSectionsTemplatesData();

	const {selectedTemplate, setSelectedTemplate} = useTemplates();

	const {mutate} = useMutation({
		mutationFn: deleteTemplate,
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['templates']});
		},
	});

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
		e.stopPropagation();
		mutate(id);
	};

	return (
		<Styled.TemplatesList>
			{templatesData.map((template) => (
				<Styled.TemplateItem
					key={template.id}
					$isSelected={selectedTemplate === template.id}
					onClick={() => setSelectedTemplate(template.id)}
				>
					<div>{template.title}</div>
					<IconButton size="small" onClick={(e) => handleDelete(e, template.id)}>
						<X />
					</IconButton>
				</Styled.TemplateItem>
			))}
		</Styled.TemplatesList>
	);
};
