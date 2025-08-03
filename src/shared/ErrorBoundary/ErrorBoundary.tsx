import React, {ErrorInfo, ReactNode} from 'react';

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	state: ErrorBoundaryState = {hasError: false, error: null, errorInfo: null};

	static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
		return {hasError: true, error};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		this.setState({error, errorInfo});
		console.log('Error:', error, errorInfo);
	}

	resetError = (): void => {
		this.setState({hasError: false, error: null, errorInfo: null});
	};

	render(): ReactNode {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						height: '100vh',
					}}
				>
					<h2>Что-то пошло не так</h2>
					<div style={{whiteSpace: 'pre-wrap'}}>
						{this.state.error?.toString()}
						<br />
						{this.state.errorInfo?.componentStack}
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
