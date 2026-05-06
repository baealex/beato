import classNames from 'classnames';

import { Image } from '~/components/shared';
import { getOriginalImage } from '~/modules/image';

interface MusicPlayerDiskStyleProps {
    isPlaying: boolean;
    src: string;
    alt: string;
}

const discClassName = 'relative h-full w-full overflow-hidden rounded-full border border-[var(--b-color-border-subtle)] bg-[radial-gradient(circle_at_50%_50%,var(--b-color-background)_0_9%,transparent_9.5%),repeating-radial-gradient(circle_at_50%_50%,transparent_0_13px,rgba(244,244,245,0.045)_13px_14px),conic-gradient(from_135deg,#09090b_0deg,#18181b_46deg,#27272a_72deg,#111113_126deg,rgba(139,92,246,0.18)_130deg,#111113_138deg,#27272a_214deg,#18181b_282deg,#09090b_360deg)] shadow-none before:pointer-events-none before:absolute before:in-[5%] before:rounded-full before:border before:border-[rgba(244,244,245,0.1)] before:shadow-[inset_0_0_0_18px_rgba(244,244,245,0.018),inset_0_0_0_42px_rgba(0,0,0,0.16),inset_0_0_0_68px_rgba(244,244,245,0.018),inset_0_0_0_96px_rgba(0,0,0,0.14)] before:content-[\'\'] after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:bg-[linear-gradient(118deg,transparent_0_42%,rgba(244,244,245,0.08)_47%,transparent_54%),radial-gradient(circle_at_50%_50%,transparent_0_62%,rgba(0,0,0,0.34)_100%)] after:opacity-[0.62] after:mix-blend-screen after:content-[\'\']';

const MusicPlayerDiskStyle = ({ isPlaying, src, alt }: MusicPlayerDiskStyleProps) => {
    return (
        <div className="relative h-full w-full">
            <div
                className={classNames(discClassName, 'music-player-disk')}
                data-playing={isPlaying ? 'true' : 'false'}>
                <div className="absolute inset-[24%] overflow-hidden rounded-full border border-[rgba(244,244,245,0.16)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-[radial-gradient(circle_at_50%_50%,transparent_0_58%,rgba(0,0,0,0.28)_100%)] after:content-['']">
                    <Image
                        className="h-full w-full object-cover"
                        src={getOriginalImage(src)}
                        alt={alt}
                        loading="eager"
                    />
                </div>
                <span className="pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[16%] w-[16%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(244,244,245,0.18)] bg-[radial-gradient(circle_at_50%_50%,var(--b-color-background)_0_36%,#18181b_38%_62%,var(--b-color-background)_64%_100%)] shadow-none after:absolute after:inset-[38%] after:rounded-[inherit] after:bg-[var(--b-color-point)] after:content-['']" />
            </div>
        </div>
    );
};

export default MusicPlayerDiskStyle;
