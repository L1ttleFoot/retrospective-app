import {useMutation, useQueryClient} from '@tanstack/react-query';
import {PlusCircle, X} from 'lucide-react';
import {useEffect} from 'react';
import {useFieldArray, useFormContext, useWatch} from 'react-hook-form';
import {v4} from 'uuid';

import {useBoards} from '@/store/useBoards';
import {useTemplates} from '@/store/useTemplates';
import {Button} from '@/ui/Button';
import {Divider} from '@/ui/Divider';
import {Header} from '@/ui/Header/Header';
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
	const queryClient = useQueryClient();
	const {currentBoardId} = useBoards();
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
			const template = templatesData.templates.find((t) => t.id === selectedTemplate);
			if (template) {
				reset({
					sections: template.sections.map((s) => ({
						id: v4(),
						title: s.title,
						color: s.color,
						boardId: currentBoardId,
					})),
				});
			}
		}
	}, [selectedTemplate, templatesData, reset, currentBoardId]);

	const {mutate} = useMutation({
		mutationFn: createSections,
		onMutate: (variables) => {
			queryClient.setQueryData(['sections', currentBoardId], () => ({
				sections: variables.sections,
			}));
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['sections', currentBoardId]});
		},
	});

	const onSubmit = (data: SectionsForm) => {
		if (!currentBoardId) return;

		mutate(data);

		handleClose();
	};

	const onAdd = () => {
		append({title: '', id: v4(), color: '#adb5bd', boardId: currentBoardId});
	};

	const setColor = (index: number, color: string) => {
		setValue(`sections.${index}.color`, color);
	};

	return (
		<Styled.TemplateForm onSubmit={handleSubmit(onSubmit)}>
			<Header
				title="Настройка секций"
				subtitle="Выбор названия и цвета для каждой секции"
				level={2}
			/>
			<Styled.SectionsConfig>
				{fields.map((field, index) => {
					const isTouched = touchedFields.sections?.[index]?.title;
					const isEmpty = !watchedSections[index]?.title;
					const hasError = !!errors.sections?.[index]?.title;

					return (
						<Styled.SectionConfigRow key={field.id}>
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
						</Styled.SectionConfigRow>
					);
				})}

				<Button variant="outline" type="button" fullWidth onClick={onAdd}>
					<PlusCircle /> Добавить секцию
				</Button>
			</Styled.SectionsConfig>

			<Divider />

			<Styled.ControlButtons>
				{/* <Button type="button" onClick={onAdd}>
					Добавить поле
				</Button> */}

				<Button variant="outline" onClick={handleClose}>
					Отмена
				</Button>

				<Button type="submit">Создать поля</Button>
			</Styled.ControlButtons>
		</Styled.TemplateForm>
	);
};
