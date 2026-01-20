
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card, CardHeader, CardTitle, CardContent } from './card';

describe('Card', () => {
    it('renders content', () => {
        render(
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                </CardHeader>
                <CardContent>Content</CardContent>
            </Card>
        );
        expect(screen.getByText('Card Title')).toBeInTheDocument();
        expect(screen.getByText('Content')).toBeInTheDocument();
    });
});
