import { useState } from 'react'

export default function FilterButton({ icon }) {
    const [pressed, setPressed] = useState(false);

    return (
        <li style={{
            backgroundColor: 'var(--color-buttons-clicked)',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20
        }}>
            <div
                onMouseDown={() => setPressed(prev => !prev)}

                style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: pressed ? 'var(--color-buttons-clicked)' : 'var(--color-buttons)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    padding: '6px',
                    boxShadow: pressed
                        ? 'inset 0 2px 4px rgba(73, 33, 33, 0.8)'
                        : '0 2px 6px rgba(0,0,0,0.7)',
                    cursor: 'pointer',
                    transition: '0.15s ease-in-out',
                    position: 'relative',
                }}>
                <div style={{
                    flex: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ccc',
                    fontSize: '18px',
                }}>
                    <span className="material-symbols-outlined">
                        {icon}
                    </span>
                </div>
                <div style={{
                    position: 'absolute',
                    zIndex: 2,
                    bottom: pressed ? -10 : -19,
                    transform: pressed ? 'rotate(180deg)' : 'none',
                    color: '#888',
                    fontSize: '18px'
                }}>
                    <span className="material-symbols-outlined">
                        arrow_drop_down
                    </span>
                </div>
            </div>
        </li>
    );
}
