
export default function StartupSplash() {
    return (
        <div className="ow-startup-splash" role="status" aria-live="polite" aria-label="Loading music library">
            <div className="ow-startup-splash-card">
                <img className="ow-startup-splash-logo" src="/ocean-wave.svg" alt="" aria-hidden="true" />
                <div className="ow-startup-splash-copy">
                    <span className="ow-startup-splash-kicker">Ocean Wave</span>
                    <span className="ow-startup-splash-title">Warming up your library</span>
                </div>
                <span className="ow-startup-splash-meter" aria-hidden="true" />
            </div>
        </div>
    );
}
