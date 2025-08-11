import { useState } from 'react'

export default function FilterButton({ icon, onClick }) {
    const [pressed, setPressed] = useState(false);

    return (
        <li
            className="w-10 h-10 flex items-center justify-center rounded-[20px]"
            style={{ backgroundColor: 'var(--color-buttons-clicked)' }}
        >
            <div
                onMouseDown={() => setPressed(prev => !prev)}
                className={
                    `w-8 h-8 flex flex-col items-center justify-center rounded-[20px] p-1.5 relative transition-all duration-150 cursor-pointer ` +
                    (pressed
                        ? ''
                        : '')
                }
                style={{
                    backgroundColor: pressed ? 'var(--color-buttons-clicked)' : 'var(--color-buttons)',
                    boxShadow: pressed
                        ? 'inset 0 2px 4px rgba(73, 33, 33, 0.8)'
                        : '0 2px 6px rgba(0,0,0,0.7)',
                }}
            >
                <div className="flex-1 flex items-center justify-center text-[18px]" style={{ color: 'var(--color-text-main)' }}>
                    <span onClick={onClick} className="material-symbols-outlined">
                        {icon}
                    </span>
                </div>
                <div
                    className="absolute z-20 text-[18px]"
                    style={{
                        bottom: pressed ? -10 : -19,
                        transform: pressed ? 'rotate(180deg)' : 'none',
                        color: 'var(--color-text-muted)',
                    }}
                >
                    <span className="material-symbols-outlined">
                        arrow_drop_down
                    </span>
                </div>
            </div>
        </li>
    );
}
