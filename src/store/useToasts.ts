import {create} from 'zustand';

type ToastType = 'success' | 'info' | 'warning' | 'error';

export type ToastItemType = {id: string; message: string; toastType: ToastType; duration?: number};

interface ToastsStore {
	toasts: ToastItemType[];
	addToast: (message: string, toastType?: ToastType, duration?: number) => void;
	removeToast: (id: string) => void;
}

export const useToast = create<ToastsStore>((set) => ({
	toasts: [],
	addToast: (message, toastType = 'error', duration = 3000) => {
		const id = crypto.randomUUID();

		set((state) => ({toasts: [...state.toasts, {id, message, toastType, duration}]}));

		setTimeout(() => {
			set((state) => ({toasts: state.toasts.filter((toast) => toast.id !== id)}));
		}, duration);
	},
	removeToast: (id) => set((state) => ({toasts: state.toasts.filter((toast) => toast.id !== id)})),
}));

export const toasts = {
	success: (msg: string, dur?: number) => {
		useToast.getState().addToast(msg, 'success', dur);
	},
	info: (msg: string, dur?: number) => {
		useToast.getState().addToast(msg, 'info', dur);
	},
	warning: (msg: string, dur?: number) => {
		useToast.getState().addToast(msg, 'warning', dur);
	},
	error: (msg: string, dur?: number) => {
		useToast.getState().addToast(msg, 'error', dur);
	},
};
