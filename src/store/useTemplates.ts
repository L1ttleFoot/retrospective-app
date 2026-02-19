import {create} from 'zustand';

import {Section} from '../widgets/Board/BoardSection/BoardSection.types';

type TemplatsStor = {
	selectedTemplate: string | undefined;
	setSelectedTemplate: (id: string) => void;
	templateSections: Section[];
	setTemplateSections: (sections: Section[]) => void;
};

export const useTemplates = create<TemplatsStor>()((set) => ({
	selectedTemplate: undefined,
	templateSections: [],
	setTemplateSections: (sections) => set(() => ({templateSections: sections})),
	setSelectedTemplate: (id) => set(() => ({selectedTemplate: id})),
}));
