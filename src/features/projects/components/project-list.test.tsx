
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProjectList } from './project-list';

// Mock dependecies
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockProjects = [
  {
    id: '1',
    name: 'Project A',
    description: 'Description A',
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: { tasks: 5 },
  },
];

describe('ProjectList', () => {
    it('renders empty state when no projects', () => {
      render(<ProjectList projects={[]} />);
      expect(screen.getByText(/No projects found/i)).toBeInTheDocument();
    });

    it('renders list of projects', () => {
      render(<ProjectList projects={mockProjects} />);
      expect(screen.getByText('Project A')).toBeInTheDocument();
      expect(screen.getByText('Tasks: 5')).toBeInTheDocument();
    });
});
