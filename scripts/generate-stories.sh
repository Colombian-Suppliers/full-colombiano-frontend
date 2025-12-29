#!/bin/bash

# Generate Storybook stories for all components
echo "🎨 Generating Storybook stories for all components..."
echo ""

count=0

find src/components -name "*.tsx" -type f ! -name "*.stories.tsx" ! -name "*.test.tsx" ! -name "index.ts" | while read file; do
  story_file="${file%.tsx}.stories.tsx"
  
  if [[ ! -f "$story_file" ]]; then
    component=$(basename "$file" .tsx)
    dir=$(dirname "$file")
    
    # Extract category from path (ui, auth, landing, etc.)
    category=$(echo "$dir" | sed 's|src/components/||' | sed 's|/.*||')
    
    # Capitalize first letter of category
    category_title=$(echo "$category" | awk '{print toupper(substr($0,1,1)) tolower(substr($0,2))}')
    
    # Determine layout based on category
    layout="centered"
    if [[ "$category" == "landing" ]]; then
      layout="fullscreen"
    fi
    
    cat > "$story_file" << EOF
// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import ${component} from './${component}';

const meta = {
  title: '${category_title}/${component}',
  component: ${component},
  parameters: {
    layout: '${layout}',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ${component}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
EOF
    echo "✅ Created: $story_file"
    count=$((count + 1))
  fi
done

echo ""
echo "✨ Story generation complete! Created $count stories."
echo "🚀 Run 'npm run storybook' to view your component library."

