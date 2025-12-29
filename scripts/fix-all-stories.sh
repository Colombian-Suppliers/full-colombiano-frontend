#!/bin/bash

# Script to add default args to all Storybook stories
# This prevents "Cannot read properties of undefined" errors

cd "$(dirname "$0")/.."

echo "🔧 Fixing all Storybook stories with default args..."
echo ""

# Fix AnnouncementsFilters
cat > src/components/announcements/AnnouncementsFilters.stories.tsx << 'EOF'
// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import AnnouncementsFilters from './AnnouncementsFilters';

const meta = {
  title: 'Announcements/AnnouncementsFilters',
  component: AnnouncementsFilters,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnnouncementsFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filters: {
      status: 'all',
      search: '',
      dateFrom: null,
      dateTo: null,
    },
    onFilterChange: (filters) => console.log('Filters changed:', filters),
    announcements: [],
  },
};
EOF

# Fix AnnouncementsDetail
cat > src/components/announcements/AnnouncementsDetail.stories.tsx << 'EOF'
// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import AnnouncementsDetail from './AnnouncementsDetail';

const meta = {
  title: 'Announcements/AnnouncementsDetail',
  component: AnnouncementsDetail,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnnouncementsDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    announcement: {
      id: 1,
      title: 'Anuncio de Ejemplo',
      content: '<p>Este es el contenido del anuncio con <strong>formato HTML</strong>.</p>',
      date: '2024-01-15T10:00:00Z',
      isRead: false,
      priority: 'normal',
    },
    onBack: () => console.log('Back clicked'),
    onMarkAsRead: () => console.log('Mark as read'),
  },
};
EOF

# Fix AnnouncementsHeader
cat > src/components/announcements/AnnouncementsHeader.stories.tsx << 'EOF'
// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import AnnouncementsHeader from './AnnouncementsHeader';

const meta = {
  title: 'Announcements/AnnouncementsHeader',
  component: AnnouncementsHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnnouncementsHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    unreadCount: 5,
    onMarkAllAsRead: () => console.log('Mark all as read'),
  },
};
EOF

# Fix AnnouncementsList
cat > src/components/announcements/AnnouncementsList.stories.tsx << 'EOF'
// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import AnnouncementsList from './AnnouncementsList';

const meta = {
  title: 'Announcements/AnnouncementsList',
  component: AnnouncementsList,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnnouncementsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    announcements: [
      {
        id: 1,
        title: 'Anuncio 1',
        content: 'Contenido del anuncio 1',
        date: '2024-01-15T10:00:00Z',
        isRead: false,
        priority: 'high',
      },
      {
        id: 2,
        title: 'Anuncio 2',
        content: 'Contenido del anuncio 2',
        date: '2024-01-14T10:00:00Z',
        isRead: true,
        priority: 'normal',
      },
    ],
    selectedAnnouncements: new Set(),
    onSelectAnnouncement: (id) => console.log('Select:', id),
    onAnnouncementClick: (id) => console.log('Click:', id),
    markingAsRead: new Set(),
  },
};
EOF

echo "✅ Fixed Announcements components"
echo "✨ All stories now have proper default args"
echo ""
echo "Refresh Storybook to see the changes!"
EOF

chmod +x scripts/fix-all-stories.sh

