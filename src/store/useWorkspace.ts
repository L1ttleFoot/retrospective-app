import {create} from 'zustand';

export interface IWorkspaceAreaItem {
    id: string;
    text: string;
    votes: number;
}

export interface IWorkspaceArea {
    id: string;
    title: string;
    items: IWorkspaceAreaItem[];
}

export interface IWorkspaceAreaCreator {
    id: string;
    title: string;
}

export interface Workspace {
    id: string;
    name: string;
    date: Date;
    areas: IWorkspaceArea[];
    areasCreator: IWorkspaceAreaCreator[];
    current?: boolean;
}

interface ListStore {
    workspaceData: Workspace[];
    setWorkspaceData: (data: Workspace[]) => void;
    currentWorkspace?: Workspace;
    setCurrentWorkspace: (id: string) => void;

    addItem: (workspaceId: string, areaId: string, item: IWorkspaceAreaItem) => void;
    deleteItem: (workspaceId: string, areaId: string, itemId: string) => void;
    deleteWorkspace: (id: string) => void;
}

export const useWorkspace = create<ListStore>()((set) => ({
    workspaceData: [],
    currentWorkspace: undefined,
    setWorkspaceData: (data) => set(() => ({workspaceData: [...data]})),
    setCurrentWorkspace: (id) =>
        set((state) => ({currentWorkspace: state.workspaceData.find((item) => item.id === id)})),
    addItem: (workspaceId, areaId, item) =>
        set((state) => ({
            workspaceData: state.workspaceData.map((workspace) =>
                workspace.id === workspaceId
                    ? {
                          ...workspace,
                          areas: workspace.areas.map((area) =>
                              area.id === areaId
                                  ? {...area, items: area.items ? [...area.items, item] : [item]}
                                  : area,
                          ),
                      }
                    : workspace,
            ),
        })),
    deleteItem: (workspaceId, areaId, itemId) =>
        set((state) => ({
            workspaceData: state.workspaceData.map((workspace) =>
                workspace.id === workspaceId
                    ? {
                          ...workspace,
                          areas: workspace.areas.map((area) =>
                              area.id === areaId
                                  ? {
                                        ...area,
                                        items: area.items.filter((item) => item.id !== itemId),
                                    }
                                  : area,
                          ),
                      }
                    : workspace,
            ),
        })),
    deleteWorkspace: (id) =>
        set((state) => ({workspaceData: state.workspaceData.filter((item) => item.id !== id)})),
}));

/*
{
        id: 1,
        name: 'new Name',
        date: new Date(),
        areas: [{
            id: 1,
            title: 'Что было хорошо',
            items: [{id: 1, text: 'вот так вот', votes: 1}, {id: 2, text: 'ага ага', votes: 1}]
        }, {
            id: 2,
            title: 'Что было плохо',
            items: [{id: 1, text: 'вот так вот', votes: 1}, {id: 2, text: 'ага ага', votes: 1}]
        }]
    }, {
        id: 2,
        name: 'new Name 2',
        date: new Date(),
        areas: [{
            id: 1,
            title: 'Что было хорошо',
            items: [{id: 1, text: 'вот так вот', votes: 1}, {id: 2, text: 'ага ага', votes: 1}]
        }, {
            id: 2,
            title: 'Что было плохо',
            items: [{id: 1, text: 'вот так вот', votes: 1}, {id: 2, text: 'ага ага', votes: 1}]
        }, {
            id: 3,
            title: 'Планы на будущее',
            items: [{id: 1, text: 'вот так вот', votes: 1}, {id: 2, text: 'ага ага', votes: 1}]
        }]
    }

*/
