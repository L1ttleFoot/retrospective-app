//export const reactionList = ['😂', '😀', '😎', '🤡', '💀', '🤬', '👏', '👍', '👎', '🔥', '❤️', '👀'];

export const reactionList = [
	{name: 'thumbsUp', char: '👍'},
	{name: 'thumbsDown', char: '👎'},
	{name: 'fire', char: '🔥'},
] as const;

export const reactionObj = {thumbsUp: '👍', thumbsDown: '👎', fire: '🔥'} as const;

export type reactionObjType = keyof typeof reactionObj;
