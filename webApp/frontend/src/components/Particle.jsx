import React from 'react'
import Particles from 'react-tsparticles'
import './particle.css'
import { loadFull } from 'tsparticles'

function Particle() {
  const particlesInit=async (main) =>{
    console.log(main)
    await loadFull(main);
  };

  const particlesLoaded=(container) =>{
    console.log(container);
  }
  
  return (
    <Particles
    id='tsparticles'
    init={particlesInit}
    loaded={particlesLoaded}
     options={
      {
                fullScreen: {
                  enable: false
                },
                background: {
                    color: {
                        value: "#fff",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: false,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 50,
                            duration: 0.2,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#0d47a1",
                    },
                    links: {
                        color: "#0d47a1",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    collisions: {
                        enable: false,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 1,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 600,
                        },
                        value: 100,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }
     }
     />
  )
}

export default Particle