# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Idle Dungeon Looter (working title: "rise of arwiea") is an idle RPG web game built with React, TypeScript, and Vite. Players send characters on quests, collect rewards, and progress through a world map with various locations.

## Common Commands

```bash
# Development
npm run dev              # Start Vite dev server

# Build & Quality
npm run build           # TypeScript compile + Vite build
npm run lint            # Run ESLint
npm run preview         # Preview production build
```

## Environment Setup

Copy `sample.env` to `.env` and configure:
- `VITE_CLERK_PUBLISHABLE_KEY` - Clerk authentication key
- `VITE_SERVER_ENDPOINT` - Backend API endpoint (default: http://localhost:3000/api)
- `VITE_GOOGLE_OAUTH_REDIRECT` - Google OAuth redirect URL
- `VITE_GOOGLE_OAUTH_CLIENT_ID` - Google OAuth client ID

## Architecture

### State Management

**Zustand Store** (`src/store/index.ts`)
- Global authentication state managed with Zustand
- Stores `authUser` (IUser | null) and `requestLoading` boolean
- Primary methods: `setAuthUser`, `getUser`, `reset`

### Data Fetching

**TanStack Query (React Query)** - All API calls use React Query hooks:
- Controllers in `src/controllers/`:
  - `user.ts`: `useGetUserData` - verifies user on backend
  - `quest.ts`: `useGetLocationQuests` - fetches quests for a location
  - `characters.ts`: `useGetCharacters`, `useSendCharacterOnQuest`, `useCompleteQuest`
- Base URL pattern: `${import.meta.env.VITE_SERVER_ENDPOINT}/{resource}`

### Authentication Flow

1. **Clerk Integration** (`@clerk/clerk-react`)
2. **AuthGuard Component** (`src/components/auth/AuthGuard.tsx`):
   - Wraps protected routes
   - Extracts user data from Clerk's `useUser` hook
   - Redirects to `/login` if unauthenticated
   - Populates Zustand store with IUser object

### Quest System

**Character States** (`src/types.ts`):
```typescript
enum CharacterStatus {
  IDLE = "IDLE",
  INQUEST = "INQUEST",
  QUESTCOMPLETED = "QUESTCOMPLETED",
  RECOVERING = "RECOVERING"
}
```

**Quest Loop** (`src/hooks/useQuestLoop.ts`):
- Uses `requestAnimationFrame` for continuous time tracking
- Compares current time with `character.questCompletionTime` (Moment.js)
- Auto-triggers reward claiming when quest completes
- Properly cancels animation frames on cleanup

**Quest Workflow**:
1. Select location on world map → opens location modal with Questboard tab
2. Accept quest → character selection modal
3. Send character on quest → API call + optimistic update to `INQUEST` status
4. Quest completion detected by useQuestLoop → status changes to `QUESTCOMPLETED`
5. Player claims reward → API call + invalidates character query cache

### Routing

**React Router v7** (`src/router/index.tsx`):
- Uses `<BrowserRouter>` with `<AnimatePresence>` for page transitions
- Custom `<InitialTransition>` component with Framer Motion animations
- Routes:
  - `/` - World Map (protected by AuthGuard)
  - `/login` - Login page
  - `/map` - World Map (unprotected)
  - `*` - 404 page

### Component Structure

**Pages** (`src/pages/`):
- `WorldMap.tsx` - Main game interface with draggable map, location modals, quest selection
- `GameScreen.tsx` - Legacy screen with SSE integration (EventSource for real-time quest updates)
- `Login.tsx` - Authentication page
- `StartScreen.tsx` - Initial screen

**Components** (`src/components/`):
- UI components use custom NES-style design (`nes-ui-react` library)
- `Modal.tsx` - Uses React portals to `#modal-root`
- `DraggableMap.tsx` - Pan/zoom map interface (`react-zoom-pan-pinch`)
- Sound effects integrated via `use-sound` (Howler.js wrapper)

### TypeScript Types

**Key Types** (`src/types.ts`):
- `Character` - Database character model (id, name, img, hp, mana, energy, status)
- `TCharacter` - Client-side character state (with Moment.js times for quest tracking)
- `LocationQuest` - Quest definition (title, description, rewards, requirements)
- `IMapLocation` - Map location data (position, disabled state)
- `QuestItem` with `ItemRarity` enum (common → divine)

## Important Notes

### API Integration
- All API calls expect JSON payloads with `Content-Type: application/json`
- Character operations require `userId` or `characterId` in request body
- Quest operations use `locationId` and `questId` parameters

### State Synchronization
- Use `queryClient.invalidateQueries` to refetch after mutations
- Optimistic updates for `sendCharacterOnQuest` improve UX
- Character status changes require cache invalidation to reflect server state

### Animation & Performance
- Quest timer uses `requestAnimationFrame` - always clean up with `cancelAnimationFrame`
- Map centering uses `ResizeObserver` to handle container size changes
- Framer Motion animations on route transitions - respect `AnimatePresence` mode

### Legacy Code
- `GameScreen.tsx` contains older SSE-based implementation for quest completion notifications
- `WorldMap.tsx` is the current active implementation
- Both files exist but WorldMap is the primary interface
