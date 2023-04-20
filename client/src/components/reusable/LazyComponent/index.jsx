import React, { Component, lazy, Suspense} from 'react';


class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, errorInfo) {
        console.error({ error });
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        return this.state.hasError ? 'An error occured!' : this.props.children;
    }
}
const LazyComponent = ({ Component, path, fallback = 'Loading', ...props }) => {
    return (
        <ErrorBoundary>
            <Suspense fallback={fallback}>
                <Component {...props} />
            </Suspense>
        </ErrorBoundary>
    )
}

export default LazyComponent;