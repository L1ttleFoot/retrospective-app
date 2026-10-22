import {useMutation, useQueryClient} from '@tanstack/react-query';

import {Reaction} from '@/src/shared/types/models';
import {toasts} from '@/store/useToasts';

import {handleReaction} from '../../api';
import {Message} from '../../BoardSection.types';

export const useMessageReactions = (messageId: string, sectionId: string) => {
	const queryClient = useQueryClient();

	const queryKey = ['messages', sectionId];

	return useMutation({
		mutationFn: async ({reaction}: {reaction: Reaction; isSelected?: boolean}) => {
			return handleReaction({reaction, messageId});
		},
		onMutate: async (variables) => {
			await queryClient.cancelQueries({queryKey});

			const {reaction, isSelected} = variables;

			const previousData = queryClient.getQueryData<{messages: Message[]}>(queryKey);

			queryClient.setQueryData(queryKey, (old: {messages: Message[]}) => {
				if (!old) return {messages: []};

				return {
					messages: old.messages.map((msg) => {
						if (msg.id !== messageId) return msg;

						const newReactions = msg.reactions
							.map((r) => {
								if (r.name !== reaction.name) return r;

								return {
									...r,
									count: isSelected ? r.count - 1 : r.count + 1,
									isSelected: !isSelected,
								};
							})
							.filter((r) => r.count > 0);

						const isNewReaction = !msg.reactions.some((r) => r.name === reaction.name);

						if (!isSelected && isNewReaction) {
							newReactions.push({
								name: reaction.name,
								char: reaction.char,
								isSelected: true,
								count: 1,
							});
						}

						return {...msg, reactions: newReactions};
					}),
				};
			});

			return {previousData};
		},
		onError(err, _var, ctx) {
			if (ctx) queryClient.setQueryData(queryKey, ctx.previousData);

			toasts.error('Доступ ограничен', 'У вас нет прав для выполнения этого действия.');
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey});
		},
	});
};
