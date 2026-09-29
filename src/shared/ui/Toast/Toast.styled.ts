import {animated} from '@react-spring/web';
import styled from 'styled-components';

import {ToastItemType} from '@/store/useToasts';

export const AnimatedItemWrapper = animated.div;

export const ToastCard = styled.div<{$type: ToastItemType['toastType']}>`

    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    font-size: 14px;
    
    background-color: ${({$type, theme}) => {
			const isDark = theme.currentTheme === 'dark';

			if (isDark) {
				return '#303030';
			}

			if ($type === 'success') return '#edf7ed';
			if ($type === 'error') return '#fdeded';
			if ($type === 'warning') return '#fff4e5';
			return '#e5f6fd';
		}};

  color: ${({$type, theme}) => {
		const isDark = theme.currentTheme === 'dark';

		if (isDark) {
			if ($type === 'success') return '#4ade80';
			if ($type === 'error') return '#f87171';
			if ($type === 'warning') return '#fbbf24';
			return '#60a5fa';
		}

		if ($type === 'success') return '#1e4620';
		if ($type === 'error') return '#5f2120';
		if ($type === 'warning') return '#663c00';
		return '#014361';
	}};

  border: 2px solid ${({$type, theme}) => {
		const isDark = theme.currentTheme === 'dark';

		if (isDark) {
			if ($type === 'success') return 'rgba(74, 222, 128, 0.4)';
			if ($type === 'error') return 'rgba(248, 113, 113, 0.4)';
			if ($type === 'warning') return 'rgba(251, 191, 36, 0.4)';
			return 'rgba(96, 165, 251, 0.4)';
		}

		if ($type === 'success') return '#c3e6cb';
		if ($type === 'error') return '#f5c6cb';
		if ($type === 'warning') return '#ffeeba';
		return '#bee5eb';
	}};

`;

export const ToastMessage = styled.div`
    color:inherit
`;

export const ToastsContainer = styled.div`
    position: fixed;
    right: 30px;
    bottom:30px;

    display: flex;
  flex-direction: column;
  gap: 10px; 
`;
