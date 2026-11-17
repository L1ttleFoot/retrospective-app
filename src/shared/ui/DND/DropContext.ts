import {createContext} from 'react';

export type DropHandler = (dragId: string, targetDropId: string, sourceDropId: string) => void;

export const DropContext = createContext<DropHandler>(() => {});
