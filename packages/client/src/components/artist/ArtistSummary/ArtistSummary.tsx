import { Image, Text } from '~/components/shared';
import { User } from '~/icon';

interface ArtistSummaryProps {
    name: string;
    cover: string;
    listenedCount: number;
}

const ArtistSummary = ({
    name,
    cover,
    listenedCount
}: ArtistSummaryProps) => {
    return (
        <div className="flex flex-col items-center gap-[var(--b-spacing-md)] text-center">
            <div className="mb-[var(--b-spacing-sm)] w-[260px] max-w-[76%]">
                <div className="relative aspect-square overflow-hidden rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.5)] after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] after:content-['']">
                    <Image className="h-full w-full object-cover" src={cover} alt={name} icon={<User />} />
                </div>
            </div>
            <Text as="h1" size="xl" weight="bold" className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                {name}
            </Text>
            {listenedCount > 0 && (
                <Text variant="tertiary" size="sm">
                    {listenedCount} plays
                </Text>
            )}
        </div>
    );
};

export default ArtistSummary;
