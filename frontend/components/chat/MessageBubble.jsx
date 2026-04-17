export default function MessageBubble({ message, isOwn }) {
  const time = new Date(message.createdAt).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const Tick = ({ status }) => {
    if (status === 'read') {
      return (
          <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
            <path d="M1 5.5L5 9.5L11 1" stroke="#53BDEB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 5.5L9 9.5L15 1" stroke="#53BDEB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
      );
    }
    if (status === 'delivered') {
      return (
          <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
            <path d="M1 5.5L5 9.5L11 1" stroke="#aab8c2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 5.5L9 9.5L15 1" stroke="#aab8c2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

      );
    }
    return (
        <svg width="10" height="11" viewBox="0 0 10 11" fill="none">
          <path d="M1 5.5L4 8.5L9 1" stroke="#aab8c2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
  };

  return (
      <div
          style={{
            display: 'flex',
            justifyContent: isOwn ? 'flex-end' : 'flex-start',
            marginBottom: '2px',
            paddingLeft: isOwn ? '60px' : '0',
            paddingRight: isOwn ? '0' : '60px',
          }}
      >
        <div
            style={{
              maxWidth: '100%',
              padding: '6px 10px 4px',
              borderRadius: isOwn
                  ? '12px 12px 3px 12px'
                  : '12px 12px 12px 3px',
              background: isOwn ? 'var(--wa-bubble-out)' : 'var(--wa-bubble-in)',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
            }}
        >
          <p
              style={{
                fontSize: '13.5px',
                color: 'var(--wa-text)',
                lineHeight: 1.5,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
          >
            {message.text}
          </p>

          <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '4px',
                marginTop: '2px',
              }}
          >
          <span style={{ fontSize: '10px', color: '#aab8c2', lineHeight: 1 }}>
            {time}
          </span>
            {isOwn && <Tick status={message.status || 'sent'} />}
          </div>
        </div>
      </div>
  );
}