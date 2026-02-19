import {BASE_URL} from '@/consts/api';
import api from '@/src/api/axios';

import {Template, TemplateSection} from './AddSections.types';
import {SectionsForm} from './CreateSections/CreateSections';

type createTemplatesProps = {
	title: Template['title'];
	sections: Pick<TemplateSection, 'title' | 'color'>[];
};

export const createSections = async ({sections}: SectionsForm) => {
	const response = await api.post(`${BASE_URL}/api/sections`, {sections}, {withCredentials: true});

	return response.data;
};

export const createTemplate = async (data: createTemplatesProps): Promise<Template[]> => {
	const response = await api.post(`${BASE_URL}/api/templates`, data, {withCredentials: true});
	return response.data;
};

export const getTemplates = async (): Promise<Template[]> => {
	const response = await api.get(`${BASE_URL}/api/templates`, {withCredentials: true});
	return response.data;
};

export const deleteTemplate = async (id: Template['id']): Promise<Template[]> => {
	const response = await api.delete(`${BASE_URL}/api/templates/${id}`, {withCredentials: true});
	return response.data;
};
