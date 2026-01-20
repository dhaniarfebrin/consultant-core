/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateProjectModal } from './create-project-modal';
import { createProject } from '../actions';

// Mock server action for modal
vi.mock('../actions', () => ({
  createProject: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
}));

describe('CreateProjectModal', () => {
    
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders trigger button', () => {
        render(<CreateProjectModal />);
        expect(screen.getByRole('button', { name: /new project/i })).toBeInTheDocument();
    })


    it('opens modal and submits form', async () => {
    // Mock success
    (createProject as any).mockResolvedValue({ success: "Project created" });

    render(<CreateProjectModal />);
    const trigger = screen.getByRole('button', { name: /new project/i });
    fireEvent.click(trigger);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    
    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: 'My New Project' } });

    const submitButton = screen.getByRole('button', { name: /create/i });
    fireEvent.click(submitButton);

    // Wait for async submission
    await waitFor(() => {
        expect(createProject).toHaveBeenCalledWith(expect.objectContaining({
            name: 'My New Project'
        }));
    });
    })

    it('handles submission error', async () => {
        // Mock error
        (createProject as any).mockResolvedValue({ error: "Failed" });

        render(<CreateProjectModal />);
        const trigger = screen.getByRole('button', { name: /new project/i });
        fireEvent.click(trigger);

        const nameInput = screen.getByLabelText(/name/i);
        fireEvent.change(nameInput, { target: { value: 'Error Project' } });

        const submitButton = screen.getByRole('button', { name: /create/i });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(createProject).toHaveBeenCalledWith(expect.objectContaining({
                name: 'Error Project'
            }));
        });
    })
})
