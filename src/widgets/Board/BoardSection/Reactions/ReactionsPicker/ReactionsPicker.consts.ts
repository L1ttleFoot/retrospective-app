//export const reactionList = ['😂', '😀', '😎', '🤡', '💀', '🤬', '👏', '👍', '👎', '🔥', '❤️', '👀'];

export const reactionList = [
	{id: 'thumbsUp', value: '👍'},
	{id: 'thumbsDown', value: '👎'},
	{id: 'fire', value: '🔥'},
] as const;

export const reactionObj = {thumbsUp: '👍', thumbsDown: '👎', fire: '🔥'} as const;
