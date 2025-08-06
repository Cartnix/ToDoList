import { useState } from "react";
import FilterButton from "./filterButton";
import * as motion from "motion/react-client"

const ButtonsSrc = [
    {
        id: 1,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--color-text-main)">
                <path d="M432-192v-480H240v-96h480v96H528v480h-96Z" />
            </svg>
        ),
    },
    {
        id: 2,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--color-text-main)">
                <path d="M389-267 195-460l51-52 143 143 325-324 51 51-376 375Z" />
            </svg>
        ),
    },
    {
        id: 3,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--color-text-main)">
                <path d="M480-96q-70 0-131.13-26.6-61.14-26.6-106.4-71.87-45.27-45.26-71.87-106.4Q144-362 144-432t26.6-131.13q26.6-61.14 71.87-106.4 45.26-45.27 106.4-71.87Q410-768 480-768t131.13 26.6q61.14 26.6 106.4 71.87 45.27 45.26 71.87 106.4Q816-502 816-432t-26.6 131.13q-26.6 61.14-71.87 106.4-45.26 45.27-106.4 71.87Q550-96 480-96Zm100 136 51-51-115-115v-162h-72v192l136 136ZM237-845l51 51-170 170-51-51 170-170Zm486 0 170 170-51 51-170-170 51-51ZM479.78-168Q590-168 667-244.78t77-187Q744-542 667.22-619t-187-77Q370-696 293-619.22t-77 187Q216-322 292.78-245t187 77Z" />
            </svg>
        ),
    },
];

const transition = {
  duration: 0.4,
  ease: [.50,.67,.83,.67],
  
}

export default function ButtonWrapper() {
    const [openList, isOpenList] = useState(false)
    const [rotating, isRotating] = useState(false)

    return (
        <div style={{
            display: 'flex',
            gap: 10,
            padding: 10,
            backgroundColor: 'var(--color-bg-main)',
            borderRadius: 50,
            height: 60,
            width: 200,
            position: 'relative',
            alignItems: 'center',
        }}>
            <div style={{

                display: openList ? 'flex' : 'none',
            }}>
                {ButtonsSrc.map(buttonIcon => (
                    <FilterButton
                        key={buttonIcon.id}
                        icon={buttonIcon.icon}
                    />
                ))}
            </div>
            <motion.button

                onClick={() => {
                    isOpenList(prev => !prev)
                    isRotating(prev => !prev)
                }}
                style={{
                    borderRadius: '50%',
                    height: 60,
                    width: 60,
                    background: 'linear-gradient(145deg, var(--color-buttons-light), var(--color-buttons-dark))',
                    border: openList ? '1px solid var(--border-button-active)' : '1px solid rgba(0, 0, 0, 0.2)',
                    boxShadow: `4px 4px 10px rgba(0, 0, 0, 0.4),
                     inset -2px -2px 5px rgba(255,255,255,0.3),
                     inset 2px 2px 5px rgba(0,0,0,0.4)`,
                    position: 'absolute',
                    right: 0,
                    transition: 'all 0.2s ease-in-out',
                    cursor: 'pointer'
                }}
                animate={{ rotate: rotating ? 360 : 0 }}
                transition={transition}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--color-text-main)"><path d="M200-160v-280h-80v-80h240v80h-80v280h-80Zm0-440v-200h80v200h-80Zm160 0v-80h80v-120h80v120h80v80H360Zm80 440v-360h80v360h-80Zm240 0v-120h-80v-80h240v80h-80v120h-80Zm0-280v-360h80v360h-80Z" /></svg>
            </motion.button>
        </div>
    )

}