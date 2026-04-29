import {
    describe,
    expect,
    it,
    vi
} from 'vitest';

const { mockCreateToast, mockToast } = vi.hoisted(() => {
    const createdToast = Object.assign(vi.fn(), {
        success: vi.fn(),
        error: vi.fn()
    });

    return {
        mockToast: createdToast,
        mockCreateToast: vi.fn(() => createdToast)
    };
});

vi.mock('@baejino/react-ui/toast', () => ({ createToast: mockCreateToast }));

import { createToast } from '@baejino/react-ui/toast';
import { toast } from './toast';

describe('toast wrapper', () => {
    it('creates app toast api with the Ocean Wave default duration', () => {
        expect(createToast).toBe(mockCreateToast);
        expect(createToast).toHaveBeenCalledWith({ duration: 2400 });
        expect(toast).toBe(mockToast);
    });
});
