import React, { Component, Suspense} from 'react';

import ErrorBoundary from '../ErrorBoundary';


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