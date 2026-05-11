# Campus Notifications Platform - System Design Document

## 1. Architecture Overview
The Campus Notifications Platform is a single-page React application (SPA) built with Vite and TypeScript. It interfaces with the centralized Evaluation Service APIs to fetch, sort, and display real-time notifications for students.

The application follows a modular, component-based architecture:
- **Presentation Layer**: Material UI (M3) components tailored for responsive web viewing across desktop and mobile.
- **State Management**: React Context API (`NotificationContext`) to handle the client-side persistence of "viewed" notifications without requiring database modifications.
- **Service Layer**: Axios-based service modules (`api/authService.ts`, `api/notificationService.ts`) with a centralized interceptor to handle pre-authorization and bearer token injection.
- **Observability**: A custom local package (`logging_middleware`) is integrated directly into the Vite build pipeline to seamlessly stream frontend telemetry back to the central evaluation logging server.

## 2. Design Choices & Aesthetics
**Material Design 3 (M3) Principles:**
We strictly adhered to the modern M3 specification to provide a highly professional, institutional feel.
- **Color Palette**: Selected a robust, high-contrast scheme featuring Navy Blue (`#000666`) as the primary brand color, supported by muted slate grays and distinct chip accents for categorical mapping (Placement, Results, Events).
- **Typography**: Adopted Google's `Inter` font for extreme legibility at all scaling sizes, employing strict tracking and weight rules for hierarchy.
- **Layouts**: Implemented a responsive Drawer pattern (side navigation on desktop, bottom bar on mobile) to maximize the reading viewport for notification cards.
- **Micro-interactions**: Subtle hover states, elevation changes on hover, and smooth border transitions provide immediate visual feedback without overwhelming the user.

## 3. Intelligent Sorting & Priority Algorithm
The core feature of the platform is the **Intelligent Sorter** used on the Priority Inbox page. Given the high volume of campus communications, notifications are sorted via a client-side weighted algorithm rather than simple chronology.

**Weighting Matrix:**
1. `Placement` (Weight: 3) - Highest priority (Career-impacting)
2. `Result` (Weight: 2) - Medium priority (Academic-impacting)
3. `Event` (Weight: 1) - Standard priority (Campus life)

**Algorithm Logic (`usePriorityInbox.ts`):**
1. Fetch a large batch of active notifications (up to 100 items).
2. Filter the batch based on the user's selected category (if not "All").
3. Sort the array first by the **Weight** (Descending).
4. For items with identical weights, perform a secondary sort by **Recency / Timestamp** (Descending).
5. Truncate the sorted array to the user's selected limit (e.g., Top 5, 10, or 20).

## 4. State Management (Read/Unread Tracking)
To minimize API write requests and handle read receipts entirely on the client, we implemented a persistent `Set` within `localStorage`:
- Unread notifications render with full opacity, a primary-colored border, and an actionable "Mark as Read" button.
- Clicking the notification pushes its `ID` to the `NotificationContext` state, which syncs to `localStorage`.
- The component re-renders instantly, dropping the opacity to 80% and mutating the card border to an outline variant, providing an immediate psychological completion state.

## 5. Security & Pre-Authorization
Since the platform is designed for a frictionless evaluation environment, there is no explicit Login screen. 
- On app initialization, `authService.ts` fires a silent authentication payload containing the secure student credentials.
- The returned JWT is injected into the `AxiosInstance`, completely abstracting token management from the UI components.
- API traffic is routed through a `vite.config.ts` proxy to gracefully bypass CORS restrictions during local development while maintaining exact URL pathways.
