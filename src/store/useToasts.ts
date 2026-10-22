import {create} from 'zustand';

type ToastType = 'success' | 'info' | 'warning' | 'error';

export type ToastItemType = {
	id: string;
	message: string;
	description?: string;
	toastType: ToastType;
	duration: number;
};

type ToastOptions = {
	message: string;
	description?: string;
	toastType?: ToastType;
	duration?: number;
};

interface ToastsStore {
	toasts: ToastItemType[];
	addToast: (options: ToastOptions) => void;
	removeToast: (id: string) => void;
}

export const useToast = create<ToastsStore>((set) => ({
	toasts: [],
	addToast: (options) => {
		const {message, description, toastType = 'error', duration = 3000} = options;

		const id = crypto.randomUUID();

		set((state) => ({toasts: [...state.toasts, {id, description, message, toastType, duration}]}));

		setTimeout(() => {
			set((state) => ({toasts: state.toasts.filter((toast) => toast.id !== id)}));
		}, duration);
	},
	removeToast: (id) => set((state) => ({toasts: state.toasts.filter((toast) => toast.id !== id)})),
}));

export const toasts = {
	success: (msg: string, desc?: string, dur?: number) => {
		useToast
			.getState()
			.addToast({message: msg, description: desc, toastType: 'success', duration: dur});
	},
	info: (msg: string, desc?: string, dur?: number) => {
		useToast
			.getState()
			.addToast({message: msg, description: desc, toastType: 'info', duration: dur});
	},
	warning: (msg: string, desc?: string, dur?: number) => {
		useToast
			.getState()
			.addToast({message: msg, description: desc, toastType: 'warning', duration: dur});
	},
	error: (msg: string, desc?: string, dur?: number) => {
		useToast
			.getState()
			.addToast({message: msg, description: desc, toastType: 'error', duration: dur});
	},
};
