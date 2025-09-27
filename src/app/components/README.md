# Components Documentation

## ErrorBoundary

A React error boundary component that catches JavaScript errors anywhere in the child component tree and displays a fallback UI.

### Usage

```tsx
import ErrorBoundary from './ErrorBoundary'

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### Features

- Catches and logs errors in the component tree
- Displays a user-friendly error message
- Provides a "Try again" button to reset the error state
- Customizable fallback component