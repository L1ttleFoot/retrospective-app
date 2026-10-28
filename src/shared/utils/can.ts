export type Action =
	| 'message.move'
	| 'message.edit'
	| 'message.delete'
	| 'message.pin'
	| 'message.react';

export type PermissionContext = {userId?: string; ownerId: string; authorId?: string};

const isOwner = ({userId, ownerId}: PermissionContext) => !!userId && userId === ownerId;
const isAuthor = ({userId, authorId}: PermissionContext) => !!userId && userId === authorId;

const rules: Record<Action, (ctx: PermissionContext) => boolean> = {
	'message.move': (ctx) => isOwner(ctx) || isAuthor(ctx),
	'message.edit': (ctx) => isOwner(ctx) || isAuthor(ctx),
	'message.delete': (ctx) => isOwner(ctx) || isAuthor(ctx),
	'message.pin': (ctx) => isOwner(ctx) || isAuthor(ctx),
	'message.react': (ctx) => !!ctx.userId,
};

export const can = (action: Action, ctx: PermissionContext) => rules[action](ctx);
