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
import {Area} from '../../../../../../store/useAreas';
import {colorsList} from '../ColorPicker/ColorPicker.consts';

type IModalForm = {
    handleClose: () => void;
};

type AreasForm = {
    areas: Area[];
};

export const ModalForm = ({handleClose}: IModalForm) => {
    const client = useQueryClient();

    const {currentDiscussionId} = useDiscussions();

    const {register, handleSubmit, control, setValue} = useForm<AreasForm>();
    const {fields, append, remove, update} = useFieldArray({
        control,
        name: 'areas',
    });

    const {mutate} = useMutation({
        mutationFn: async (data: AreasForm) =>
            await setDoc(doc(db, 'areas', currentDiscussionId!), {...data.areas}),
        onSuccess: () => {
            setDoc(doc(db, 'messages', currentDiscussionId!), {});
            client.invalidateQueries({queryKey: ['areas', currentDiscussionId]});
        },
    });

    const onSubmit = (data: AreasForm) => {
        if (!currentDiscussionId) return;

        mutate(data);

        handleClose();
    };

    const onAdd = () => {
        append({title: '', id: v4(), color: ''});
    };

    const retroTemplate = () => {
        setValue('areas', [
            {id: v4(), title: 'Что было хорошо?', color: colorsList.green},
            {id: v4(), title: 'Что было плохо?', color: colorsList.red},
        ]);
    };

    const setColor = (index: number, area: Area, color: string) => {
        update(index, {...area, color});
    };

    return (
        <Styled.ModalForm onSubmit={handleSubmit(onSubmit)}>
            <h2>Введите названия полей</h2>
            {fields.map((field, index) => (
                <Styled.AreaNameInput key={field.id}>
                    <Input {...register(`areas.${index}.title`)} />
                    <ColorPicker
                        {...field}
                        currentColor={field.color}
                        index={index}
                        setColor={setColor}
                    />
                    <IconButton onClick={() => remove(index)}>
                        <Close />
                    </IconButton>
                </Styled.AreaNameInput>
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
