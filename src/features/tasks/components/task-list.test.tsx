
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TaskList } from './task-list';
import { TaskStatus } from '@prisma/client';

const mockTasks = [
    {
        id: 't1',
        title: 'Task 1',
        description: 'Desc 1',
        status: TaskStatus.TODO,
        priority: 'MEDIUM',
        projectId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        assigneeId: null
    }
]

describe('TaskList', () => {
    it('renders empty state', () => {
        render(<TaskList tasks={[]} />);
        expect(screen.getByText(/No tasks in this project yet/i)).toBeInTheDocument();
    })

    it('renders tasks', () => {
        render(<TaskList tasks={mockTasks} />);
        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Desc 1')).toBeInTheDocument();
    })
})
