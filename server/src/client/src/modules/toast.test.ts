import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest';

vi.mock('sonner', () => ({
    toast: Object.assign(vi.fn(), {
        success: vi.fn(),
        error: vi.fn()
    })
}));

import { toast as sonnerToast } from 'sonner';
import { toast } from './toast';

describe('toast wrapper', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('applies default duration to basic toasts', () => {
        toast('Added to queue');

        expect(sonnerToast).toHaveBeenCalledWith('Added to queue', expect.objectContaining({ duration: 2400 }));
    });

    it('applies default duration to success and error toasts', () => {
        toast.success('Completed sync music');
        toast.error('Error while sync music');

        expect(sonnerToast.success).toHaveBeenCalledWith('Completed sync music', expect.objectContaining({ duration: 2400 }));
        expect(sonnerToast.error).toHaveBeenCalledWith('Error while sync music', expect.objectContaining({ duration: 2400 }));
    });
});
