export interface ISection {
    id: string;
    title: string;
    color: string;
    discussionId: string;
}

export interface IMessage {
    id: string;
    sectionId: string;
    sectionIndex: number;
    text: string;
    votes: number;
    timestamp: number;
    color: string;
    emoji: Record<string, number>;
}
