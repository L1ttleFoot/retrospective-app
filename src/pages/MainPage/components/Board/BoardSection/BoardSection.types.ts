export interface ISection {
    id: string;
    title: string;
    color: string;
}

export interface IMessages {
    [key: string]: {
        id: string;
        sectionId: string;
        sectionIndex: number;
        text: string;
        votes: number;
        timestamp: number;
        color: string;
        emoji: Record<string, number>;
    }[];
}
