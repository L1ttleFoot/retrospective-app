import {beforeEach, describe, expect, it} from 'vitest';

import {Section} from '../widgets/Board/BoardSection/BoardSection.types';
import {useTemplates} from './useTemplates';

const initialState = useTemplates.getState();

const sections: Section[] = [
	{id: 's1', title: 'Что пошло хорошо', color: '#00ff00', boardId: 'tpl-1'},
	{id: 's2', title: 'Что пошло плохо', color: '#ff0000', boardId: 'tpl-1'},
];

describe('useTemplates store', () => {
	beforeEach(() => {
		useTemplates.setState(initialState, true);
	});

	it('имеет selectedTemplate = undefined по умолчанию', () => {
		expect(useTemplates.getState().selectedTemplate).toBeUndefined();
	});

	it('имеет пустой массив templateSections по умолчанию', () => {
		expect(useTemplates.getState().templateSections).toEqual([]);
	});

	it('setSelectedTemplate устанавливает id шаблона', () => {
		useTemplates.getState().setSelectedTemplate('tpl-1');

		expect(useTemplates.getState().selectedTemplate).toBe('tpl-1');
	});

	it('setSelectedTemplate перезаписывает предыдущий выбор', () => {
		useTemplates.getState().setSelectedTemplate('tpl-1');
		useTemplates.getState().setSelectedTemplate('tpl-2');

		expect(useTemplates.getState().selectedTemplate).toBe('tpl-2');
	});

	it('сброс selectedTemplate в undefined через setState', () => {
		useTemplates.getState().setSelectedTemplate('tpl-1');
		useTemplates.setState({selectedTemplate: undefined});

		expect(useTemplates.getState().selectedTemplate).toBeUndefined();
	});

	it('setTemplateSections сохраняет переданные секции', () => {
		useTemplates.getState().setTemplateSections(sections);

		expect(useTemplates.getState().templateSections).toEqual(sections);
	});

	it('setTemplateSections заменяет секции целиком, а не дописывает', () => {
		useTemplates.getState().setTemplateSections(sections);
		useTemplates.getState().setTemplateSections([sections[0]]);

		expect(useTemplates.getState().templateSections).toEqual([sections[0]]);
	});

	it('setTemplateSections с пустым массивом очищает секции', () => {
		useTemplates.getState().setTemplateSections(sections);
		useTemplates.getState().setTemplateSections([]);

		expect(useTemplates.getState().templateSections).toEqual([]);
	});

	it('экшены не трогают друг друга: selectedTemplate и templateSections независимы', () => {
		useTemplates.getState().setSelectedTemplate('tpl-1');
		useTemplates.getState().setTemplateSections(sections);

		expect(useTemplates.getState().selectedTemplate).toBe('tpl-1');
		expect(useTemplates.getState().templateSections).toEqual(sections);
	});
});
