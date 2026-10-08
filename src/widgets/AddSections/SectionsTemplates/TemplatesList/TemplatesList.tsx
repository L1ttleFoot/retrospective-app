import {useMutation, useQueryClient} from '@tanstack/react-query';
import {ChevronDown, LayoutTemplate, X} from 'lucide-react';
import {useState} from 'react';

import {useTemplates} from '@/store/useTemplates';
import {Header} from '@/ui/Header/Header';
import {IconButton} from '@/ui/IconButton';

import {Template} from '../../AddSections.types';
import {deleteTemplate} from '../../api';
import {useSectionsTemplatesData} from '../useSectionsTemplates';
import * as Styled from './TemplatesList.styled';

export const TemplatesList = () => {
	const [isOpen, setIsOpen] = useState(false);

	const queryClient = useQueryClient();

	const {templatesData} = useSectionsTemplatesData();

	const {selectedTemplate, setSelectedTemplate} = useTemplates();

	const {mutate} = useMutation({
		mutationFn: deleteTemplate,
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['templates']});
		},
	});

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: Template['id']) => {
		e.stopPropagation();
		mutate(id);
	};

	return (
		<Styled.TemplatesList>
			<Styled.DD onClick={() => setIsOpen((o) => !o)}>
				<Styled.DDD>
					<LayoutTemplate />
					Выберите шаблон
				</Styled.DDD>
				<ChevronDown />
			</Styled.DD>

			{isOpen && (
				<Styled.List>
					{templatesData.templates.map((template) => (
						<Styled.TemplateItem
							key={template.id}
							$isSelected={selectedTemplate === template.id}
							onClick={() => setSelectedTemplate(template.id)}
						>
							<Header
								title={template.title}
								level={2}
								subtitle={
									<div style={{display: 'flex', alignItems: 'center', gap: 4}}>
										<div>
											<div
												style={{
													width: 8,
													height: 8,
													backgroundColor: '#52b788',
													borderRadius: '50%',
												}}
											/>
											<div>Что было хорошо?</div>
										</div>

										<div>
											<div
												style={{
													width: 8,
													height: 8,
													backgroundColor: '#e85d04',
													borderRadius: '50%',
												}}
											/>
											<div>Что было плохо?</div>
										</div>
										<div className="tag-item">
											<div
												style={{
													width: 8,
													height: 8,
													backgroundColor: '#0096c7',
													borderRadius: '50%',
												}}
											/>
											<div>Что можно улучшить?</div>
										</div>

										<div className="tag-item">
											<div
												style={{
													width: 8,
													height: 8,
													backgroundColor: '#0096c7',
													borderRadius: '50%',
												}}
											/>
											<div>Что можно улучшить?</div>
										</div>
									</div>
								}
							/>
							<IconButton size="small" onClick={(e) => handleDelete(e, template.id)}>
								<X />
							</IconButton>
						</Styled.TemplateItem>
					))}
				</Styled.List>
			)}
		</Styled.TemplatesList>
	);
};
