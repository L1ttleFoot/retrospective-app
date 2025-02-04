import {useFieldArray, useForm} from 'react-hook-form';
import * as Styled from './ModalForm.styled';
import {Input} from '../../../../../../components/Input';
import {Button} from '../../../../../../components/Button';
import {IconButton} from '../../../../../../components/IconButton';
import Close from '@assets/icons/close.svg?react';
import {doc, setDoc} from 'firebase/firestore';
import {db} from '../../../../../../initFirebase';
import {useDiscussions} from '../../../../../../store/useDiscussions';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {v4} from 'uuid';
import {ColorPicker} from '../ColorPicker';
import {ISection} from '../../BoardSection/BoardSection.types';
import {colorsList} from '../ColorPicker/ColorPicker.consts';
import {BASE_URL} from '@src/consts/api';

type IModalForm = {
    handleClose: () => void;
};

type SectionsForm = {
    sections: ISection[];
};

export const ModalForm = ({handleClose}: IModalForm) => {
    const client = useQueryClient();

    const {currentDiscussionId} = useDiscussions();

    const {register, handleSubmit, control, setValue} = useForm<SectionsForm>({
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
    const {fields, append, remove, update} = useFieldArray({
        control,
        name: 'sections',
    });

    const createSections = async ({sections}: SectionsForm) => {
        const response = await fetch(`${BASE_URL}/api/sections`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({sections}),
        });
    };

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
        append({title: '', id: v4(), color: '', discussionId: currentDiscussionId});
    };

    const retroTemplate = () => {
        setValue('sections', [
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
        ]);
    };

    const setColor = (index: number, section: ISection, color: string) => {
        update(index, {...section, color});
    };

    return (
        <Styled.ModalForm onSubmit={handleSubmit(onSubmit)}>
            <h2>Создание полей</h2>
            {fields.map((field, index) => (
                <Styled.SectionNameInput key={field.id}>
                    <Input {...register(`sections.${index}.title`)} />
                    <ColorPicker
                        {...field}
                        currentColor={field.color}
                        index={index}
                        setColor={setColor}
                    />
                    <IconButton onClick={() => remove(index)} size="verySmall" withTheme={true}>
                        <Close />
                    </IconButton>
                </Styled.SectionNameInput>
            ))}

            {/* <Button type="button" onClick={retroTemplate} fullWidth>
                Шаблон для ретро
            </Button> */}

            <Styled.ControlButtons>
                <Button type="button" onClick={onAdd}>
                    Добавить поле
                </Button>
                <Button type="submit">Готово</Button>
            </Styled.ControlButtons>
        </Styled.ModalForm>
    );
};
