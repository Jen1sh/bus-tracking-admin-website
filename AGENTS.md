# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Stack

- **Next.js 16.2.6** with App Router, React 19.2.4, TypeScript 5, Tailwind CSS 4
- **Tailwind v4** uses `@import "tailwindcss"` in CSS (not `@tailwind` directives) and `@theme inline` for theme vars
- **ESLint flat config** (`eslint.config.mjs`)
- Path alias `@/*` → root directory

# Commands

| Command         | Action                      |
| --------------- | --------------------------- |
| `npm run dev`   | Dev server (localhost:3000) |
| `npm run build` | Production build            |
| `npm run start` | Start production server     |
| `npm run lint`  | ESLint check                |

No test framework is installed. No CI, pre-commit hooks, or formatter config.

# Conventions

- `.env*` files are gitignored; document required env vars here if added
- Dark mode via `prefers-color-scheme` (no toggle)
- Geist font via `next/font/google`

````markdown
# Open Code Agents - Development Guide

Welcome to the development guidelines for the **Bus Tracking Admin Portal** project. This document outlines the architectural standards, UI/UX philosophy, and code quality expectations for our Next.js application.

---

## 1. File Naming Convention: Kebab-Case

All file and folder names must strictly follow **kebab-case**.

- **Correct:** `use-auth.ts`, `agent-card.tsx`, `api-endpoints.ts`, `auth-service.ts`, `user-model.ts`
- **Incorrect:** `useAuth.ts`, `AgentCard.tsx`, `ApiEndpoints.ts`

---

## 2. Project Structure

We follow a modular structure to ensure scalability and maintainability.

```text
src/
├── app/              # App Router: Pages, Layouts, Loading, Error components
├── components/       # Reusable UI components (kebab-case files)
├── constants/        # Static string values and configuration constants
├── hooks/            # Custom logic hooks grouped by domain (e.g., use-auth.ts)
├── lib/              # Shared utilities (e.g., axios/fetch configuration)
├── services/         # API functions for external calls (e.g., auth-service.ts)
├── types/            # TypeScript interfaces
│   ├── api/          # Interfaces for API responses/requests
│   └── models/       # Interfaces for domain data models
└── store/            # State management
```
````

---

## 3. UI/UX: DaisyUI Integration

We prioritize **DaisyUI** for its utility-first approach and clean design system.

- **Avoid Custom CSS:** Prefer Tailwind classes combined with DaisyUI components (e.g., `btn`, `card`, `modal`).
- **Theming:** Maintain a consistent theme by configuring `tailwind.config.js`.
- **Accessibility:** Ensure all interactive elements have proper `aria-labels` and keyboard support.

---

## 4. Services Layer

API interactions must be abstracted into service functions. These should be strictly typed and separated from UI components.

```typescript
// services/auth-service.ts
import { AuthResponse } from "@/types/api/auth-response";
import { AUTH_ENDPOINTS } from "@/constants/api-endpoints";

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
    /* ... */
  });
  return response.json();
};
```

---

## 5. Hooks Pattern

Logic is grouped by domain (e.g., all auth-related hooks in `use-auth.ts`). We use named exports for the hooks to allow multiple exports per file.

````typescript
// hooks/use-auth.ts
import { loginUser, registerUser } from "@/services/auth-service";

const useAuth = () => {

    const useRegister = () => {

    }

    const useLogin = () => {

    }

    return {
        useRegister,
        useLogin
    }
}

export default useAuth;

---

## 6. Type Safety (Interfaces)

Segregate interfaces into `api` and `models` to maintain a clear boundary between transport types and data structures.

### API Interfaces (Request/Response)

```typescript
// types/api/auth-response.ts
export interface AuthResponse {
  token: string;
  user: User; // Imports from models
}
````

### Model Interfaces (Domain Entities)

```typescript
// types/models/user.ts
export interface User {
  id: string;
  email: string;
  role: "admin" | "user";
}
```

---

## 7. Constants

Centralize static strings, URLs, and keys in the `constants/` directory.

```typescript
// constants/api-endpoints.ts
export const AUTH_ENDPOINTS = {
  LOGIN: "/api/v1/auth/login",
  REGISTER: "/api/v1/auth/register",
};
```

---

## 8. Server Error Handling

Never expose raw stack traces. Use a robust error handling strategy:

1. **Server-Side:** Log errors using a logger (e.g., Pino) and return a structured response.
2. **Client-Side:** Wrap data-fetching logic in `ErrorBoundary` components and display user-friendly feedback using DaisyUI components (Alerts/Toasts).

---

## 9. Performance: Memoization

Apply memoization strategically:

- **`React.memo`**: Wrap heavy sub-components that don't need frequent re-renders.
- **`useMemo`**: Cache expensive calculations.
- **`useCallback`**: Memoize event handlers passed as props to children to prevent unnecessary re-renders.

_Note: Do not premature optimize. Profile using React DevTools before memoizing._

---

## 10. Proactive Interaction ("Asking for Questions")

If the user's prompt is ambiguous or missing information, the agent must be designed to pause and ask for clarification rather than hallucinating or executing on bad data.

**The Workflow:**

1. **Validation:** The agent analyzes the input schema.
2. **Check:** If required fields or context is missing -> `isAmbiguous: true`.
3. **UI Feedback:** Render a "Clarification Required" component that lists missing variables and provides a form to fill them.

---

---

## 11. Data Fetching with React Query

All server-state data fetching uses `@tanstack/react-query`. No `useEffect` for data fetching.

### Pattern: Domain hooks returning named query hooks

Each domain (auth, bus, driver, bus-management) has a hook file that returns named inner hooks. Callers destructure what they need.

```typescript
// hooks/use-bus.ts
const useBus = () => {
  const useBusList = (params: BusListParams) =>
    useQuery({ queryKey: ["buses", params], queryFn: () => listBuses(params) })

  const useBusDetail = (id?: string) =>
    useQuery({
      queryKey: ["bus", id ?? "none"],
      queryFn: () => getBusById(id!),
      enabled: !!id,
    })

  return { useBusList, useBusDetail }
}
```

### Usage in pages

```typescript
const { useBusList } = useBus()
const { data, isLoading, error } = useBusList(params)
```

- Use `isLoading`, `isError`, `error` from React Query — no manual state.
- Avoid client-side `filteredBuses` patterns; send filters to the API.

### Paginated lists → `useInfiniteQuery`

```typescript
const useDrivers = (params) =>
  useInfiniteQuery({
    queryKey: ["drivers", params],
    queryFn: ({ pageParam }) => listDrivers({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  })
```

Render with `fetchNextPage()` + "Load More" button. Flatten pages: `data.pages.flatMap(p => p.items)`.

### Mutations → `useMutation` + `invalidateQueries` + `toast`

```typescript
const useCreateAssignment = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: BusDriverAssignmentRequest) => addBusManagement(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bus-assignments"] })
      toast.success("Assignment created")
    },
    onError: () => toast.error("Failed to create assignment"),
  })
}
```

- Always invalidate related queries after mutation success.
- Use `toast.success` / `toast.error` from `sonner` (matching `use-auth.ts`).
- `enabled: false` + `.refetch()` for lazy queries (e.g. unassigned lists in a modal).

### Query key conventions

- `["entity"]` — list of all entities
- `["entity", id]` — single entity by id
- `["entity", { ...params }]` — filtered list
- `["entity", "summary"]` — derived/summary data

## Need Help?

If you find that this architecture prevents you from solving a specific problem, or if you identify a bottleneck, please **open an issue or start a discussion** on our repository.

_Always check: Is there a cleaner way to abstract this logic?_
