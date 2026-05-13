import {HttpResponse, http} from 'msw';

export const handlers = [
	http.get('*/api/boards', () => {
		return HttpResponse.json({
			boards: [
				{
					id: 'cmmaik6tx000004l4j2k6fw7p',
					title: 'My test board',
					ownerId: 'cm8pxl8at0000ttq86fm0myl3',
					createdAt: '2026-03-03T11:17:38.307Z',
					updatedAt: '2026-03-03T11:17:38.307Z',
				},
				{
					id: 'cmlcw0l5a00020ott5h7q3g2f',
					title: '123',
					ownerId: 'cm8pxl8at0000ttq86fm0myl3',
					createdAt: '2026-02-07T22:30:08.398Z',
					updatedAt: '2026-02-07T22:30:08.398Z',
				},
				{
					id: 'cml7wiyj80001tcttvkfo7pes',
					title: 'Test3',
					ownerId: 'cm8pxl8at0000ttq86fm0myl3',
					createdAt: '2026-02-04T10:45:34.676Z',
					updatedAt: '2026-02-04T10:45:34.676Z',
				},
			],
		});
	}),
];
