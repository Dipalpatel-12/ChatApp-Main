export default function TypingIndicator({ name }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '4px' }}>
            <div
                style={{
                    background: 'var(--wa-bubble-in)',
                    padding: '10px 14px',
                    borderRadius: '12px 12px 12px 3px',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                }}
            >
                {name && (
                    <p style={{ fontSize: '10px', color: 'var(--wa-light-green)', fontWeight: '600', lineHeight: 1, marginBottom: '2px' }}>
                        {name}
                    </p>
                )}
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '14px' }}>
                    {[0, 150, 300].map((delay) => (
                        <span
                            key={delay}
                            style={{
                                width: '7px', height: '7px',
                                background: '#aab8c2',
                                borderRadius: '50%',
                                display: 'inline-block',
                                animation: 'typingBounce 1.2s infinite ease-in-out',
                                animationDelay: `${delay}ms`,
                            }}
                        />
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.6; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
        </div>
    );
}