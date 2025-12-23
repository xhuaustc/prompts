# State Management

## Overview
Implement effective state management patterns for frontend applications, choosing the right solution for your needs.

## State Management Strategies

### 1. Local Component State
**When to use**: Simple, component-specific data
```typescript
// React useState
const [count, setCount] = useState(0);
const [user, setUser] = useState<User | null>(null);

// React useReducer (complex state logic)
const [state, dispatch] = useReducer(reducer, initialState);
```

### 2. Lifted State
**When to use**: Shared state between sibling components
```typescript
// Parent component manages state
function Parent() {
  const [data, setData] = useState();
  
  return (
    <>
      <ChildA data={data} onUpdate={setData} />
      <ChildB data={data} />
    </>
  );
}
```

### 3. Context API
**When to use**: Global state with infrequent updates
```typescript
// ThemeContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

// Usage
function App() {
  const { theme, setTheme } = useTheme();
  return <div className={theme}>...</div>;
}
```

### 4. Redux / Redux Toolkit
**When to use**: Complex state with many updates, time-travel debugging needed

```typescript
// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import postsReducer from './features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// userSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null
};

// Async thunk
export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (userId: string) => {
    const response = await api.getUser(userId);
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user';
      });
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

// Component usage
import { useAppDispatch, useAppSelector } from './hooks';

function UserProfile() {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchUser('123'));
  }, [dispatch]);

  if (loading) return <Loading />;
  return <div>{user?.name}</div>;
}
```

### 5. Zustand
**When to use**: Simple global state without boilerplate

```typescript
// store.ts
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserStore {
  user: User | null;
  loading: boolean;
  fetchUser: (id: string) => Promise<void>;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        loading: false,
        
        fetchUser: async (id) => {
          set({ loading: true });
          try {
            const user = await api.getUser(id);
            set({ user, loading: false });
          } catch (error) {
            set({ loading: false });
          }
        },
        
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null })
      }),
      { name: 'user-storage' }
    )
  )
);

// Component usage
function UserProfile() {
  const { user, loading, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser('123');
  }, [fetchUser]);

  if (loading) return <Loading />;
  return <div>{user?.name}</div>;
}

// Access specific properties to avoid unnecessary re-renders
function UserName() {
  const userName = useUserStore(state => state.user?.name);
  return <span>{userName}</span>;
}
```

### 6. Jotai (Atomic State)
**When to use**: Fine-grained reactivity, derived state

```typescript
// atoms.ts
import { atom } from 'jotai';

// Primitive atom
export const countAtom = atom(0);

// Derived atom (read-only)
export const doubleCountAtom = atom((get) => get(countAtom) * 2);

// Derived atom (read-write)
export const incrementAtom = atom(
  (get) => get(countAtom),
  (get, set) => set(countAtom, get(countAtom) + 1)
);

// Async atom
export const userAtom = atom(async (get) => {
  const userId = get(userIdAtom);
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
});

// Component usage
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const doubleCount = useAtomValue(doubleCountAtom);
  const increment = useSetAtom(incrementAtom);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Double: {doubleCount}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

### 7. Recoil
**When to use**: Complex derived state, atom-based approach

```typescript
// atoms.ts
import { atom, selector } from 'recoil';

// Atom
export const userIdState = atom({
  key: 'userId',
  default: null as string | null
});

// Selector (derived state)
export const userState = selector({
  key: 'user',
  get: async ({ get }) => {
    const userId = get(userIdState);
    if (!userId) return null;
    
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  }
});

// Selector with parameters
export const userQuery = selectorFamily({
  key: 'userQuery',
  get: (userId: string) => async () => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  }
});

// Component usage
import { useRecoilState, useRecoilValue } from 'recoil';

function UserProfile() {
  const [userId, setUserId] = useRecoilState(userIdState);
  const user = useRecoilValue(userState);

  return <div>{user?.name}</div>;
}
```

### 8. TanStack Query (React Query)
**When to use**: Server state management, caching, synchronization

```typescript
// queries.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch data
export function useUser(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => api.getUser(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000 // 10 minutes
  });
}

// Fetch with dependencies
export function useUserPosts(userId: string) {
  return useQuery({
    queryKey: ['posts', userId],
    queryFn: () => api.getUserPosts(userId),
    enabled: !!userId // Only run if userId exists
  });
}

// Mutation
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: User) => api.updateUser(user),
    onSuccess: (data, variables) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
      
      // Or optimistically update
      queryClient.setQueryData(['user', variables.id], data);
    }
  });
}

// Component usage
function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useUser(userId);
  const updateUser = useUpdateUser();

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  const handleUpdate = () => {
    updateUser.mutate({ ...user, name: 'New Name' });
  };

  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

// Prefetch data
function App() {
  const queryClient = useQueryClient();

  const prefetchUser = () => {
    queryClient.prefetchQuery({
      queryKey: ['user', '123'],
      queryFn: () => api.getUser('123')
    });
  };

  return <button onMouseEnter={prefetchUser}>Hover to prefetch</button>;
}
```

## State Management Decision Tree

```
Do you need to share state?
│
├─ No → Use local component state (useState, useReducer)
│
└─ Yes → Where is the state used?
    │
    ├─ Only in parent-child → Lift state up
    │
    ├─ Across distant components → Is it server data?
    │   │
    │   ├─ Yes → Use React Query / SWR
    │   │
    │   └─ No → How complex is the state?
    │       │
    │       ├─ Simple → Context API or Zustand
    │       │
    │       └─ Complex → Redux Toolkit, Recoil, or Jotai
```

## Best Practices

### General
- [ ] Keep state as local as possible
- [ ] Separate server state from client state
- [ ] Use appropriate state management tool
- [ ] Normalize complex state
- [ ] Avoid state duplication
- [ ] Use selectors to compute derived state
- [ ] Implement proper error handling
- [ ] Add loading states

### Performance
- [ ] Prevent unnecessary re-renders
- [ ] Use selectors to subscribe to specific data
- [ ] Memoize selectors
- [ ] Split large stores into smaller ones
- [ ] Use lazy loading for large state
- [ ] Debounce frequent updates

### Redux Specific
- [ ] Use Redux Toolkit (not plain Redux)
- [ ] Keep reducers pure
- [ ] Normalize nested state
- [ ] Use createAsyncThunk for async logic
- [ ] Use RTK Query for API calls
- [ ] Create typed hooks (useAppDispatch, useAppSelector)

### Context API Tips
- [ ] Split contexts by concern
- [ ] Memoize context values
- [ ] Use multiple providers if needed
- [ ] Extract context logic into custom hooks
- [ ] Avoid frequent updates in context

### Testing State
```typescript
// Testing Redux
import { renderWithProviders } from './test-utils';

test('renders user name', () => {
  const { getByText } = renderWithProviders(<UserProfile />, {
    preloadedState: {
      user: { user: { name: 'John' }, loading: false }
    }
  });
  expect(getByText('John')).toBeInTheDocument();
});

// Testing hooks
import { renderHook, act } from '@testing-library/react';

test('increments counter', () => {
  const { result } = renderHook(() => useCounter());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

## Common Patterns

### Optimistic Updates
```typescript
const updateUser = useMutation({
  mutationFn: api.updateUser,
  onMutate: async (newUser) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['user', newUser.id] });
    
    // Snapshot previous value
    const previousUser = queryClient.getQueryData(['user', newUser.id]);
    
    // Optimistically update
    queryClient.setQueryData(['user', newUser.id], newUser);
    
    return { previousUser };
  },
  onError: (err, newUser, context) => {
    // Rollback on error
    queryClient.setQueryData(['user', newUser.id], context.previousUser);
  },
  onSettled: (newUser) => {
    // Refetch after error or success
    queryClient.invalidateQueries({ queryKey: ['user', newUser.id] });
  }
});
```

### Pagination
```typescript
function usePaginatedPosts(page: number) {
  return useQuery({
    queryKey: ['posts', page],
    queryFn: () => api.getPosts(page),
    keepPreviousData: true // Keep old data while fetching new
  });
}
```

### Infinite Scroll
```typescript
function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => api.getPosts(pageParam),
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
  });
}

// Component
const { data, fetchNextPage, hasNextPage } = useInfinitePosts();
```

