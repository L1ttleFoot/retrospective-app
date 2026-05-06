import {useMutation, useQueryClient} from '@tanstack/react-query';

import {Reaction} from '@/src/shared/types/models';

import {handleReaction} from '../../api';
import {Message} from '../../BoardSection.types';

export const useMessageReactions = (messageId: string, sectionId: string) => {
	const queryClient = useQueryClient();

	const queryKey = ['messages', sectionId];

	return useMutation({
		mutationFn: async ({reaction}: {isSelected?: boolean; reaction: Reaction}) => {
			return handleReaction({reaction, messageId});
		},
		onMutate: async (variables) => {
			await queryClient.cancelQueries({queryKey});

			const {isSelected, reaction} = variables;

			const previousData = queryClient.getQueryData<Message[]>(queryKey);

			queryClient.setQueryData(queryKey, (old: Message[]) => {
				if (!old) return [];

				return old.map((msg) => {
					if (msg.id !== messageId) return msg;

					const newReactions = msg.reactions
						.map((r) => {
							if (r.id !== reaction.id) return r;

							return {...r, count: isSelected ? r.count - 1 : r.count + 1, isSelected: !isSelected};
						})
						.filter((r) => r.count > 0);

					const isNewReaction = !msg.reactions.some((r) => r.id === reaction.id);

					if (!isSelected && isNewReaction) {
						newReactions.push({value: reaction.value, id: reaction.id, isSelected: true, count: 1});
					}

					return {...msg, reactions: newReactions};
				});
			});

			return {previousData};
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey});
		},
	});
};
