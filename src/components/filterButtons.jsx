import { useState } from "react";
import FilterButton from "./filterButton";
import * as motion from "motion/react-client"
import { ButtonsSrc } from "../utils/data"
import { filterAll, FilterTitle, AltFilterTitle, FilterData, AltFilterData, FilterCompleted, AltFilterCompleted } from "../utils/filters"


const transition = {
    duration: 0.5,
    ease: "linear",
    type: "tween"
}

function getFilterFunction({ type, asc }) {
    switch (type) {
        case "Title":
            return asc ? FilterTitle : AltFilterTitle;
        case "Completed":
            return asc ? FilterCompleted : AltFilterCompleted;
        case "Data":
            return asc ? FilterData : AltFilterData;
        default:
            return filterAll;
    }
}

export default function ButtonWrapper({ todos, setTodos }) {
    const [openList, setOpenList] = useState(false)
    const [rotating, setRotating] = useState(false)
    const [active, setActive] = useState(
        {
            type: 'Title',
            asc: true,
        }
    )

    return (
        <div className="relative h-[60px]">
            <motion.div
                className="overflow-hidden flex justify-start items-center bg-[var(--color-bg-main)] rounded-full h-[60px] absolute right-0 top-0 min-w-[60px]"
                animate={{ width: openList ? 230 : 0 }}
                transition={transition}
            >
                <div className="flex items-center gap-[10px]" style={{ marginLeft: 15 }}>
                    {ButtonsSrc.map(buttonIcon => (
                        <FilterButton
                            key={buttonIcon.id}
                            icon={buttonIcon.icon}
                            onClick={() => {
                                if (!Array.isArray(todos)) {
                                    console.error("TODOS is not an array:", todos);
                                    return;
                                }
                                const isSameType = active.type === buttonIcon.id;
                                const newAsc = isSameType ? !active.asc : true;

                                const newActive = {
                                    type: buttonIcon.id,
                                    asc: newAsc,
                                };

                                const filterFunc = getFilterFunction(newActive);
                                const sorted = filterFunc(todos);

                                setActive(newActive);
                                setTodos(sorted);
                            }}
                        />
                    ))}
                </div>
            </motion.div>


            <motion.button
                onClick={() => {
                    setOpenList(prev => !prev)
                    setRotating(prev => !prev)
                }}
                className="absolute right-0 top-0 z-[999] h-[60px] w-[60px] rounded-full cursor-pointer flex items-center justify-center border"
                style={{
                    backgroundColor: 'var(--color-bg-main)',
                    border: openList
                        ? '1px solid var(--border-button-active)'
                        : '1px solid rgba(0, 0, 0, 0.2)',
                    boxShadow: `
      0 0 10px var(--button-glow),
      inset -2px -2px 4px var(--button-inset-light),
      inset 2px 2px 4px var(--button-inset-dark)
    `,
                }}
                animate={{ rotate: rotating ? 180 : 0 }}
                transition={transition}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    width="24"
                    height="24"
                    fill="var(--color-text-main)"
                    className="pointer-events-none"
                >
                    <path d="M200-160v-280h-80v-80h240v80h-80v280h-80Zm0-440v-200h80v200h-80Zm160 0v-80h80v-120h80v120h80v80H360Zm80 440v-360h80v360h-80Zm240 0v-120h-80v-80h240v80h-80v120h-80Zm0-280v-360h80v360h-80Z" />
                </svg>
            </motion.button>

        </div>
    )
}