import {useMutation, useQueryClient} from '@tanstack/react-query';
import {PlusCircle, X} from 'lucide-react';
import {useEffect} from 'react';
import {useFieldArray, useFormContext, useWatch} from 'react-hook-form';
import {v4} from 'uuid';

import {useDiscussions} from '@/store/useDiscussions';
import {useTemplates} from '@/store/useTemplates';
import {Button} from '@/ui/Button';
import {IconButton} from '@/ui/IconButton';
import {Input} from '@/ui/Input';

import {Section} from '../../Board/BoardSection/BoardSection.types';
import {createSections} from '../api';
import {ColorPicker} from '../ColorPicker';
import {useSectionsTemplatesData} from '../SectionsTemplates/useSectionsTemplates';
import * as Styled from './CreateSections.styled';

type CreateSectionsProps = {handleClose: () => void};

export type SectionsForm = {sections: Section[]};

export const CreateSections = ({handleClose}: CreateSectionsProps) => {
	const client = useQueryClient();
	const {currentDiscussionId} = useDiscussions();
	const {templatesData} = useSectionsTemplatesData();
	const selectedTemplate = useTemplates((state) => state.selectedTemplate);

	const {
		register,
		handleSubmit,
		control,
		setValue,
		reset,
		formState: {errors, touchedFields},
	} = useFormContext<SectionsForm>();
	const {fields, append, remove} = useFieldArray({control, name: 'sections'});
	const watchedSections = useWatch({control, name: 'sections'});

	useEffect(() => {
		if (selectedTemplate && templatesData) {
			const template = templatesData.find((t) => t.id === selectedTemplate);
			if (template) {
				reset({
					sections: template.sections.map((s) => ({
						id: v4(),
						title: s.title,
						color: s.color,
						discussionId: currentDiscussionId,
					})),
				});
			}
		}
	}, [selectedTemplate, templatesData, reset, currentDiscussionId]);

	const {mutate} = useMutation({
		mutationFn: createSections,
		onSuccess: () => {
			client.invalidateQueries({queryKey: ['sections', currentDiscussionId]});
		},
	});

	const onSubmit = (data: SectionsForm) => {
		if (!currentDiscussionId) return;

		mutate(data);

		handleClose();
	};

	const onAdd = () => {
		append({title: '', id: v4(), color: '#adb5bd', discussionId: currentDiscussionId});
	};

	const setColor = (index: number, color: string) => {
		setValue(`sections.${index}.color`, color);
	};

	return (
		<Styled.ModalForm onSubmit={handleSubmit(onSubmit)}>
			<div>
				<h2>Настройка полей</h2>

				{fields.map((field, index) => {
					const isTouched = touchedFields.sections?.[index]?.title;
					const isEmpty = !watchedSections[index]?.title;
					const hasError = !!errors.sections?.[index]?.title;

					return (
						<Styled.SectionNameInput key={field.id}>
							<Input
								id={`section-${index}-title`}
								{...register(`sections.${index}.title`, {required: true})}
								error={hasError || (isTouched && isEmpty)}
							/>
							<ColorPicker
								{...field}
								currentColor={watchedSections[index]?.color}
								index={index}
								setColor={setColor}
							/>
							<IconButton onClick={() => remove(index)} size="verySmall" withTheme={true}>
								<X />
							</IconButton>
						</Styled.SectionNameInput>
					);
				})}

				<Button variant="outline" type="button" fullWidth style={{width: 225}} onClick={onAdd}>
					<PlusCircle />
				</Button>
			</div>
			<Styled.ControlButtons>
				{/* <Button type="button" onClick={onAdd}>
					Добавить поле
				</Button> */}

				<Button type="submit" fullWidth>
					Создать поля
				</Button>
			</Styled.ControlButtons>
		</Styled.ModalForm>
	);
};
