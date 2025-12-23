# Component Creation

## Overview
Create reusable, well-structured frontend components following best practices and design patterns.

## Component Design Principles
1. **Single Responsibility**: One clear purpose
2. **Reusability**: Design for multiple uses
3. **Composability**: Work well with other components
4. **Accessibility**: WCAG compliant
5. **Performance**: Optimized rendering
6. **Testability**: Easy to test

## Component Checklist

### Structure
- [ ] Clear component name (descriptive, PascalCase)
- [ ] Organized file structure
- [ ] Props interface/types defined
- [ ] Default props specified
- [ ] Component documentation
- [ ] Export properly

### Functionality
- [ ] State management appropriate
- [ ] Props validated
- [ ] Event handlers implemented
- [ ] Side effects managed (useEffect, lifecycle)
- [ ] Error boundaries where needed
- [ ] Loading states handled

### Styling
- [ ] Responsive design
- [ ] Theme support
- [ ] CSS modules or styled-components
- [ ] No inline styles (unless dynamic)
- [ ] Consistent spacing
- [ ] Proper typography

### Accessibility
- [ ] Semantic HTML used
- [ ] ARIA attributes where needed
- [ ] Keyboard navigation support
- [ ] Focus management
- [ ] Screen reader friendly
- [ ] Color contrast sufficient
- [ ] Alt text for images

### Performance
- [ ] Memoization where appropriate
- [ ] Lazy loading for heavy components
- [ ] Avoid unnecessary re-renders
- [ ] Optimize dependencies in hooks
- [ ] Virtual scrolling for lists
- [ ] Image optimization

### Testing
- [ ] Unit tests written
- [ ] Accessibility tests
- [ ] Snapshot tests (if appropriate)
- [ ] Integration tests
- [ ] Visual regression tests

## React Component Examples

### Functional Component with Hooks
```typescript
// Button.tsx
import React, { FC, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  children: React.ReactNode;
}

/**
 * Reusable Button component
 * 
 * @example
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 */
export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled,
  children,
  className,
  ...props
}) => {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    loading && styles.loading,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <>
          <span className={styles.spinner} aria-hidden="true" />
          <span className="sr-only">Loading...</span>
        </>
      ) : children}
    </button>
  );
};
```

### Form Component with Validation
```typescript
// LoginForm.tsx
import React, { FC, FormEvent, useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
}

export const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    try {
      await onSubmit(email, password);
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        required
        autoComplete="email"
      />
      
      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        required
        autoComplete="current-password"
      />

      {errors.submit && (
        <div role="alert" className="error">
          {errors.submit}
        </div>
      )}

      <Button 
        type="submit" 
        loading={loading}
        disabled={loading}
      >
        Log In
      </Button>
    </form>
  );
};
```

### Custom Hook
```typescript
// useLocalStorage.ts
import { useState, useEffect } from 'react';

/**
 * Custom hook for localStorage with type safety
 * 
 * @example
 * const [user, setUser] = useLocalStorage<User>('user', null);
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Get initial value from localStorage or use default
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
```

### Context Provider
```typescript
// ThemeContext.tsx
import React, { FC, createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

## Vue Component Example

```vue
<!-- Button.vue -->
<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    :aria-busy="loading"
    @click="handleClick"
  >
    <span v-if="loading" class="spinner" aria-hidden="true"></span>
    <span v-if="loading" class="sr-only">Loading...</span>
    <slot v-else></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  loading: false,
  disabled: false
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const buttonClasses = computed(() => [
  'button',
  `button--${props.variant}`,
  `button--${props.size}`,
  { 'button--loading': props.loading }
]);

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>

<style scoped>
.button {
  /* Button styles */
}
</style>
```

## Component File Structure

```
components/
├── Button/
│   ├── Button.tsx          # Component implementation
│   ├── Button.module.css   # Component styles
│   ├── Button.test.tsx     # Unit tests
│   ├── Button.stories.tsx  # Storybook stories
│   └── index.ts            # Export
├── Input/
│   ├── Input.tsx
│   ├── Input.module.css
│   ├── Input.test.tsx
│   └── index.ts
└── ...
```

## Storybook Story Example

```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading Button'
  }
};
```

## Component Testing

```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when loading', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies correct variant class', () => {
    render(<Button variant="secondary">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('secondary');
  });

  it('is accessible', () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });
});
```

## Performance Optimization

### Memoization
```typescript
// Memoize expensive components
export const ExpensiveComponent = React.memo(({ data }) => {
  // Component implementation
}, (prevProps, nextProps) => {
  // Custom comparison
  return prevProps.data.id === nextProps.data.id;
});

// Memoize values
const memoizedValue = useMemo(() => {
  return expensiveComputation(data);
}, [data]);

// Memoize callbacks
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### Code Splitting
```typescript
// Lazy load components
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
}
```

## Best Practices
- [ ] Keep components small and focused
- [ ] Extract reusable logic into custom hooks
- [ ] Use TypeScript for type safety
- [ ] Follow consistent naming conventions
- [ ] Document complex components
- [ ] Write tests for all components
- [ ] Use composition over inheritance
- [ ] Keep state as local as possible
- [ ] Lift state up when needed by multiple components
- [ ] Use context for global state sparingly

