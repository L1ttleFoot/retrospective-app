import {useFieldArray, useForm} from 'react-hook-form';
import * as Styled from './ModalForm.styled';
import {Input} from '../../../../../../components/Input';
import {Button} from '../../../../../../components/Button';
import {IconButton} from '../../../../../../components/IconButton';
import Close from '../../../../../../assets/close';
import {doc, setDoc} from 'firebase/firestore';
import {db} from '../../../../../../initFirebase';
import {useDiscussions} from '../../../../../../store/useDiscussions';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {v4} from 'uuid';
import {ColorPicker} from '../ColorPicker';
import {ISection} from '../../../../../../store/useSections';
import {colorsList} from '../ColorPicker/ColorPicker.consts';

type IModalForm = {
    handleClose: () => void;
};

type SectionsForm = {
    sections: ISection[];
};

export const ModalForm = ({handleClose}: IModalForm) => {
    const client = useQueryClient();

    const {currentDiscussionId} = useDiscussions();

    const {register, handleSubmit, control, setValue} = useForm<SectionsForm>();
    const {fields, append, remove, update} = useFieldArray({
        control,
        name: 'sections',
    });

    const {mutate} = useMutation({
        mutationFn: async (data: SectionsForm) =>
            await setDoc(doc(db, 'sections', currentDiscussionId!), {...data.sections}),
        onSuccess: () => {
            setDoc(doc(db, 'messages', currentDiscussionId!), {});
            client.invalidateQueries({queryKey: ['sections', currentDiscussionId]});
        },
    });

    const onSubmit = (data: SectionsForm) => {
        if (!currentDiscussionId) return;

        mutate(data);

        handleClose();
    };

    const onAdd = () => {
        append({title: '', id: v4(), color: ''});
    };

    const retroTemplate = () => {
        setValue('sections', [
            {id: v4(), title: 'Что было хорошо?', color: colorsList.green},
            {id: v4(), title: 'Что было плохо?', color: colorsList.red},
        ]);
    };

    const setColor = (index: number, section: ISection, color: string) => {
        update(index, {...section, color});
    };

    return (
        <Styled.ModalForm onSubmit={handleSubmit(onSubmit)}>
            <h2>Введите названия полей</h2>
            {fields.map((field, index) => (
                <Styled.SectionNameInput key={field.id}>
                    <Input {...register(`sections.${index}.title`)} />
                    <ColorPicker
                        {...field}
                        currentColor={field.color}
                        index={index}
                        setColor={setColor}
                    />
                    <IconButton onClick={() => remove(index)}>
                        <Close />
                    </IconButton>
                </Styled.SectionNameInput>
            ))}

            <Button type="button" onClick={retroTemplate} fullWidth>
                Шаблон для ретро
            </Button>

            <Styled.ControlButtons>
                <Button type="button" onClick={onAdd}>
                    Добавить
                </Button>
                <Button type="submit">Готово</Button>
            </Styled.ControlButtons>
        </Styled.ModalForm>
    );
};
