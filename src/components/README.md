# Components Directory Structure

This directory contains all reusable components organized by their purpose and usage.

## Directory Structure

```
components/
├── common/                  # Shared/reusable components
│   ├── overlay-card/       # Main overlay card wrapper component
│   └── team-player-item/   # Reusable team player item component
├── overlays/               # Overlay-specific slide components
│   ├── challenges-ranking/ # Challenges ranking overlay
│   ├── overall-ranking/    # Overall ranking overlay
│   └── team-players-ranking/ # Team players ranking overlay
├── team-cards/            # Team-specific card components
│   ├── demacia-card.tsx
│   └── noxus-card.tsx
├── layout/                # Layout components
│   ├── AppSidebar.tsx
│   ├── Dashboard.tsx
│   ├── DashboardLayout.tsx
│   └── Navbar.tsx
└── ui/                    # shadcn/ui components
    └── ...
```

## Import Examples

### Using Common Components
```typescript
import { OverlayCard, TeamColor } from '@/components/common/overlay-card'
import { TeamPlayerItem } from '@/components/common/team-player-item'

// Or use the barrel export
import { OverlayCard, TeamColor, TeamPlayerItem } from '@/components/common'
```

### Using Overlay Components
```typescript
import { ChallengesRanking } from '@/components/overlays/challenges-ranking'
import { OverallRanking } from '@/components/overlays/overall-ranking'
import { TeamPlayersRanking } from '@/components/overlays/team-players-ranking'

// Or use the barrel export
import { ChallengesRanking, OverallRanking, TeamPlayersRanking } from '@/components/overlays'
```

### Using Team Cards
```typescript
import { DemaciaCard, NoxusCard } from '@/components/team-cards'
```

## Naming Conventions

- **Files & Directories**: kebab-case (e.g., `overlay-card.tsx`, `team-player-item/`)
- **Components**: PascalCase (e.g., `OverlayCard`, `TeamPlayerItem`)
- **CSS Modules**: kebab-case with `.module.css` extension (e.g., `overlay-card.module.css`)
- **Barrel Exports**: `index.ts` files for clean imports

## Component Organization

Each component directory typically contains:
- Component file (`.tsx`)
- CSS Module file (`.module.css`) if needed
- Barrel export (`index.ts`)

## Benefits of This Structure

1. **Clear Separation of Concerns**: Components are grouped by their purpose
2. **Easy to Find**: Intuitive directory names make components easy to locate
3. **Scalable**: Easy to add new component categories
4. **Clean Imports**: Barrel exports simplify import statements
5. **Consistent Naming**: Uniform naming convention across all files

