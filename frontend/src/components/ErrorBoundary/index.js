import React from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary as ErrorContainer } from 'react-error-boundary';
import { ServerError } from '../ServerError';

function ErrorBoundary({ children }) {
  const { reset } = useQueryErrorResetBoundary();
  const fallbackRender = ({ resetErrorBoundary }) => {
    return <ServerError resetErrorBoundary={resetErrorBoundary} />;
  };
  return (
    <ErrorContainer onReset={reset} fallbackRender={fallbackRender}>
      {children}
    </ErrorContainer>
  );
}

export { ErrorBoundary };
