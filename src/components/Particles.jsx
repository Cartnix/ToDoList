import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function AppParticles() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log("Particles loaded:", container);
    };

    const options = useMemo(
        () => ({
            "autoPlay": true,
            "background": {
                "color": {
                    "value": "var(--color-bg-main)"
                }
            },
            "clear": true,
            "fullScreen": {
                "enable": true,
                "zIndex": -1
            },
            "detectRetina": true,
            "fpsLimit": 120,
            "interactivity": {
                "detectsOn": "window",
                "events": {
                    "onClick": {
                        "enable": !true,
                        "mode": "push"
                    },
                    "onHover": {
                        "enable": true,
                        "mode": "grab",
                        "parallax": {
                            "enable": true,
                            "force": 60,
                            "smooth": 10
                        }
                    },
                    "resize": {
                        "delay": 0.5,
                        "enable": true
                    }
                },
                "modes": {
                    "trail": {
                        "delay": 1,
                        "pauseOnStop": false,
                        "quantity": 1
                    },
                    "attract": {
                        "distance": 200,
                        "duration": 0.4,
                        "easing": "ease-out-quad",
                        "factor": 1,
                        "maxSpeed": 50,
                        "speed": 1
                    },
                    "bounce": {
                        "distance": 200
                    },
                    "bubble": {
                        "distance": 400,
                        "duration": 2,
                        "mix": false,
                        "opacity": 0.8,
                        "size": 40,
                    },
                    "connect": {
                        "distance": 80,
                        "links": {
                            "opacity": 0.7
                        },
                        "radius": 60
                    },
                    "grab": {
                        "distance": 400,
                        "links": {
                            "blink": false,
                            "consent": false,
                            "opacity": 1
                        }
                    },
                    "push": {
                        "default": true,
                        "quantity": 4
                    },
                    "remove": {
                        "quantity": 2
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4,
                        "factor": 100,
                        "speed": 1,
                        "maxSpeed": 50,
                        "easing": "ease-out-quad",
                    },
                    "slow": {
                        "factor": 3,
                        "radius": 200
                    },
                }
            },
            "particles": {
                "bounce": {
                    "horizontal": { "value": 1 },
                    "vertical": { "value": 1 }
                },
                "collisions": {
                    "absorb": { "speed": 2 },
                    "bounce": {
                        "horizontal": { "value": 1 },
                        "vertical": { "value": 1 }
                    },
                    "enable": false,
                    "maxSpeed": 50,
                    "mode": "bounce",
                    "overlap": {
                        "enable": true,
                        "retries": 0
                    }
                },
                "color": {
                    "value": "#a57ee4",
                    "animation": {
                        "h": { "enable": false },
                        "s": { "enable": false },
                        "l": { "enable": false }
                    }
                },
                "move": {
                    "angle": { "offset": 0, "value": 90 },
                    "center": {
                        "x": 50, "y": 50, "mode": "percent", "radius": 0
                    },
                    "direction": "none",
                    "enable": true,
                    "outModes": {
                        "default": "out",
                        "bottom": "out",
                        "left": "out",
                        "right": "out",
                        "top": "out"
                    },
                    "random": false,
                    "size": false,
                    "speed": 2,
                    "straight": false,
                },
                "number": {
                    "density": {
                        "enable": true,
                        "width": 1920,
                        "height": 1080
                    },
                    "value": 100
                },
                "opacity": {
                    "value": { "min": 0.1, "max": 0.5 },
                    "animation": {
                        "count": 0,
                        "enable": true,
                        "speed": 3,
                        "decay": 0,
                        "delay": 0,
                        "sync": false,
                        "mode": "auto",
                        "startValue": "random",
                        "destroy": "none"
                    }
                },
                "shape": {
                    "close": true,
                    "fill": true,
                    "type": "circle"
                },
                "size": {
                    "value": { "min": 1, "max": 10 },
                    "animation": {
                        "count": 0,
                        "enable": true,
                        "speed": 20,
                        "decay": 0,
                        "delay": 0,
                        "sync": false,
                        "mode": "auto",
                        "startValue": "random",
                        "destroy": "none"
                    }
                },
                "zIndex": {
                    "value": 0,
                    "opacityRate": 1,
                    "sizeRate": 1,
                    "velocityRate": 1
                },
                "links": {
                    "blink": false,
                    "color": { "value": "#ffffff" },
                    "consent": false,
                    "distance": 150,
                    "enable": true,
                    "frequency": 1,
                    "opacity": 0.4,
                    "width": 1,
                    "warp": false
                },
            },
            "pauseOnBlur": true,
            "pauseOnOutsideViewport": true,
            "zLayers": 100,
            "key": "parallax",
            "name": "Parallax",
            "motion": {
                "disable": false,
                "reduce": {
                    "factor": 4,
                    "value": true
                }
            }
        }),
        [],
    );

    if (init) {
        return (
            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
            />
        );
    }

    return <></>;
}
