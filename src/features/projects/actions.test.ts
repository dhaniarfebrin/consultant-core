/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getProjects, getProject, createProject } from './actions';
import { db } from '@/lib/db';
import { auth } from '@/auth';

// Mock dependencies
vi.mock('@/lib/db', () => ({
  db: {
    project: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock('@/auth', () => ({
  auth: vi.fn(),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('Project Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getProjects', () => {
    it('should return empty array if not authenticated', async () => {
      (auth as any).mockResolvedValue(null);
      const result = await getProjects();
      expect(result).toEqual([]);
    });

    it('should return projects if authenticated', async () => {
      (auth as any).mockResolvedValue({ user: { id: 'user1' } });
      const mockProjects = [{ id: '1', name: 'Project 1' }];
      (db.project.findMany as any).mockResolvedValue(mockProjects);

      const result = await getProjects();
      expect(result).toEqual(mockProjects);
      expect(db.project.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
        take: undefined,
        include: { _count: { select: { tasks: true } } }
      });
    });
  });

  describe('getProject', () => {
    it('should return null if not authenticated', async () => {
      (auth as any).mockResolvedValue(null);
      const result = await getProject('1');
      expect(result).toBeNull();
    });

    it('should return project if found', async () => {
      (auth as any).mockResolvedValue({ user: { id: 'user1' } });
      const mockProject = { id: '1', name: 'Project 1', tasks: [] };
      (db.project.findUnique as any).mockResolvedValue(mockProject);

      const result = await getProject('1');
      expect(result).toEqual(mockProject);
      expect(db.project.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { tasks: { orderBy: { createdAt: 'desc' } } }
      });
    });
  });

  describe('createProject', () => {
    it('should return unauthorized error if not logged in', async () => {
      (auth as any).mockResolvedValue(null);
      const result = await createProject({ name: 'New Project' });
      expect(result).toEqual({ error: 'Unauthorized' });
    });

    it('should return validation error for invalid input', async () => {
      (auth as any).mockResolvedValue({ user: { id: 'user1' } });
      const result = await createProject({ name: '' });
      expect(result).toEqual({ error: 'Invalid fields' });
    });

    it('should create project successfully', async () => {
      (auth as any).mockResolvedValue({ user: { id: 'user1' } });
      (db.project.create as any).mockResolvedValue({ id: '1', name: 'New Project' });
      
      const result = await createProject({ name: 'New Project', description: 'Desc' });
      expect(result).toEqual({ success: 'Project created' });
      expect(db.project.create).toHaveBeenCalledWith({
        data: { name: 'New Project', description: 'Desc' }
      });
    });

    it('should handle database error', async () => {
      (auth as any).mockResolvedValue({ user: { id: 'user1' } });
      (db.project.create as any).mockRejectedValue(new Error('DB Error'));
      
      const result = await createProject({ name: 'New Project' });
      expect(result).toEqual({ error: 'Failed to create project' });
    });
  });
});
