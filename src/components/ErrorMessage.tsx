import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
    return (
        <div className="animate-fade-in flex flex-col items-center justify-center p-12 text-center gap-4">
            <div className="text-5xl opacity-80 text-[var(--color-accent)]">
                <FiAlertTriangle />
            </div>
            <p className="text-base m-0" style={{ color: 'var(--color-text-secondary)' }}>
                {message}
            </p>
            {onRetry && (
                <button className="btn btn-primary" onClick={onRetry}>
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
