import { Component, type ReactNode } from "react";

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
	state: State = { hasError: false };

	static getDerivedStateFromError(): State {
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			return (
				<div
					className="app"
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100vh",
					}}
				>
					<p style={{ fontSize: 18, color: "var(--gb-lightest)" }}>
						数据加载异常，请稍后刷新
					</p>
				</div>
			);
		}
		return this.props.children;
	}
}
