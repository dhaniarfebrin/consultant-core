
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProjectHeader } from './project-header';

const mockProjectDetail = {
    id: '1',
    name: 'Project Detail',
    description: 'Detail Description',
    createdAt: new Date(),
    updatedAt: new Date(),
    tasks: [] // Added missing property from Project type if needed, but Project type usually doesn't force relation array unless specified. Assuming Project type matches Prisma client.
              // Based on props it takes Project.
}

describe('ProjectHeader', () => {
    it('renders project details', () => {
        render(<ProjectHeader project={mockProjectDetail} />);
        expect(screen.getByText('Project Detail')).toBeInTheDocument();
        expect(screen.getByText('Detail Description')).toBeInTheDocument();
    })
})
