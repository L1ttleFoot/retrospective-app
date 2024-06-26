import {create} from 'zustand'

type Tstatus = 'incomplete' | 'inprogress' | 'complete'

export interface IWorkspaceArea {
    id: string;
    title?: string;
}

export interface WorkspaceCreator {
    id: string;
    date: Date;
    areas: IWorkspaceArea[];
    status: Tstatus
}

interface ListStore {
    workspaceCreatorData: WorkspaceCreator[],
    addtWorkspaceCreatorData: (id: string) => void,
    setWorkspaceCreatorData: (data: WorkspaceCreator[]) => void,
    currentWorkspaceCreator?: string
    setCurrentWorkspaceCreator: (id: string) => void,
    updateWorkspaceCreator?: (id: string, areaId: string, ) => void

    addArea: (workspaceId: string, item: IWorkspaceArea) => void
    addItem: (workspaceId: string, areaId:string, title: string) => void

    setStatus: (workspaceId: string, status: Tstatus) => void
}

export const useWorkspaceCreator = create<ListStore>()((set) => ({
    workspaceCreatorData: [],
    addtWorkspaceCreatorData: (id) => set((state) => ({workspaceCreatorData: [...state.workspaceCreatorData, {id, date:new Date(), areas: [], status: 'incomplete'}]})),
    setWorkspaceCreatorData: (data) => set(() => ({workspaceCreatorData: [...data]})),
    currentWorkspaceCreator: undefined,
    setCurrentWorkspaceCreator: (id) => set(() => ({currentWorkspaceCreator: id})),

    addArea: (workspaceId, item) => set((state) => ({workspaceCreatorData: state.workspaceCreatorData.map((workspace) => workspace.id === workspaceId ? {...workspace, areas: [...workspace.areas, item]} : workspace)})),
    addItem: (workspaceId, areaId, title) => set((state) => ({workspaceCreatorData: state.workspaceCreatorData.map((workspace) => workspace.id === workspaceId ? {...workspace, areas: workspace.areas.map(area => area.id===areaId ? {...area, title} : area)} : workspace)})),
    setStatus: (workspaceId, status) => set(state => ({workspaceCreatorData: state.workspaceCreatorData.map(workspace=> workspace.id === workspaceId ? {...workspace, status}: workspace)}))
}))