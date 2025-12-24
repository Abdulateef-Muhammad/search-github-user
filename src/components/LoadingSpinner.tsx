import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex justify-center items-center p-12">
            <div
                className="w-12 h-12 border-4 rounded-full animate-spin"
                style={{
                    borderColor: 'var(--color-bg-tertiary)',
                    borderTopColor: 'var(--color-primary)'
                }}
            ></div>
        </div>
    );
};

export default LoadingSpinner;
