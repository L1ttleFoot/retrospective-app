import {create} from 'zustand'

export interface IWorkspaceAreaItem {
    id: number;
    text: string;
    votes: number
}

export interface IWorkspaceArea {
    id: number;
    title: string;
    items: IWorkspaceAreaItem[];
}

export interface Workspace {
    id: number;
    name: string;
    date: Date;
    areas: IWorkspaceArea[];
    current?: boolean;
}

interface ListStore {
    workspaceList: Workspace[],
    addWorkspace: (name: string) => void,
    deleteWorkspace: (id: number) => void,
    currentWorkspace?: number
    setCurrentWorkspace: (id: number) => void,
    addItem: (workspaceId: number, areaId: number, item: IWorkspaceAreaItem) => void;
    deleteItem: (workspaceId: number, areaId: number, itemId: number) => void;
}

export const useWorkspace = create<ListStore>()((set) => ({
    currentWorkspace: undefined,
    workspaceList: [{
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
    }],
    addItem: (workspaceId, areaId, item) => set(state => ({
        workspaceList: state.workspaceList.map((workspace) => workspace.id === workspaceId ? {
            ...workspace,
            areas: workspace.areas.map(area => area.id === areaId ? {...area, items: [...area.items, item]} : area)
        } : workspace)
    })),
    deleteItem: (workspaceId, areaId, itemId) => set(state => ({
        workspaceList: state.workspaceList.map((workspace) => workspace.id === workspaceId ? {
            ...workspace,
            areas: workspace.areas.map(area => area.id === areaId ? {
                ...area,
                items: area.items.filter(item => item.id !== itemId)
            } : area)
        } : workspace)
    })),
    setCurrentWorkspace: (id) => set((state) => ({
        workspaceList: state.workspaceList.map(item => item.id === id ? ({
            ...item,
            current: true
        }) : ({
            ...item,
            current: false
        }))
    })),
    addWorkspace: (name) => set((state) => ({
        workspaceList: [...state.workspaceList, {
            name: name,
            id: new Date().getTime(),
            date: new Date(),
            areas: [],
        }], currentWorkspace: new Date().getTime(),
    })),
    deleteWorkspace: (id) => set(state => ({workspaceList: state.workspaceList.filter(item => item.id !== id)})),
}))