import { SettingSection, SettingItem, InfoBox } from '~/components/shared';

const LabIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M10 2v7.31" />
        <path d="M14 9.3V2" />
        <path d="M8.5 2h7" />
        <path d="M14 9.3a6 6 0 1 1-4 0" />
    </svg>
);

export const ExperimentalSection = () => {

    return (
        <SettingSection
            title="Experimental Features"
            icon={<LabIcon />}
            description="Try out new features that are still in development.">
            <SettingItem
                title="No Experimental Features"
                description="There are currently no experimental features available. Check back later for new features.">
                <div>See you soon! 😉💕</div>
            </SettingItem>
            <InfoBox type="warning">
                <p>These features may not work properly. Use at your own risk. Features may be removed without notice.</p>
            </InfoBox>
        </SettingSection>
    );
};
