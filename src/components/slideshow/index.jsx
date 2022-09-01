import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { Plane, useCurtains } from "react-curtains";
import { vertexShader, fragmentShader } from "../shaders/shaders";

import test001 from '../../utils/displacementMaps/test_001.jpeg'
import disp001 from '../../utils/displacementMaps/disp_001.jpg'
import disp002 from '../../utils/displacementMaps/disp_002.jpg'
import disp003 from '../../utils/displacementMaps/disp_003.jpg'
import disp004 from '../../utils/displacementMaps/disp_004.jpg'
import disp005 from '../../utils/displacementMaps/disp_005.jpg'
import disp006 from '../../utils/displacementMaps/disp_006.png'
import disp007 from '../../utils/displacementMaps/disp_007.png'
import disp008 from '../../utils/displacementMaps/disp_008.jpg'
import disp010 from '../../utils/displacementMaps/disp_010.jpg'
import disp011 from '../../utils/displacementMaps/disp_011.png'
import disp013 from '../../utils/displacementMaps/disp_013.jpg'
import disp015 from '../../utils/displacementMaps/disp_015.png'
import disp016 from '../../utils/displacementMaps/disp_016.jpg'
import { H1 } from "./style";

export const Slideshow = () => {
    const [plane, setPlane] = useState(null);

    const slideshowInner = useRef(null);

    // slideshow states
    const [activeTexture, setActiveTexture] = useState(1);
    const [maxTextures, setMaxTextures] = useState(0);

    const isChanging = useRef(false);
    const tween = useRef(null);
    const activeTex = useRef(null);
    const nextTex = useRef(null);

    // This will take us to the next image
    useEffect(() => {
        if (slideshowInner.current) {
            setMaxTextures(slideshowInner.current.childElementCount - 2);
        }

        let currentTween = tween.current;
        return () => {
            if (currentTween) {
                currentTween.kill();
            }
        };
    }, []);

    const uniforms = {
        transitionTimer: {
            name: "uTransitionTimer",
            type: "1f",
            value: 0
        }
    };

    const onLoading = (plane, texture) => {
        // improve texture rendering on small screens with LINEAR_MIPMAP_NEAREST minFilter
        texture.setMinFilter(texture.gl.LINEAR_MIPMAP_NEAREST);
    };

    const onReady = (plane) => {
        setPlane(plane);
    };

    const onClick = () => {
        console.log(plane.uniforms.transitionTimer);
        if (!isChanging.current && plane) {
            isChanging.current = true;

            // check what will be next image
            let nextTextureIndex;
            if (activeTexture < maxTextures) {
                nextTextureIndex = activeTexture + 1;
            } else {
                nextTextureIndex = 1;
            }
            // apply it to our next texture
            nextTex.current.setSource(plane.images[nextTextureIndex]);

            tween.current = gsap.to(plane.uniforms.transitionTimer, {
                duration: 1.75,
                value: 90, // how fast/slow bouncy the transition will be
                ease: "power2.inOut",
                onComplete: () => {
                    isChanging.current = false;
                    tween.current = null;

                    plane.uniforms.transitionTimer.value = 0;

                    const activeTextureIndex = nextTextureIndex;
                    // our next texture becomes our active texture
                    activeTex.current.setSource(plane.images[activeTextureIndex]);
                    setActiveTexture(activeTextureIndex);
                }
            });
        }
    };

    useCurtains(
        (curtains) => {
            if (plane) {
                // first we set our very first image as the active texture
                activeTex.current = plane.createTexture({
                    sampler: "activeTex",
                    fromTexture: plane.textures[activeTexture]
                });
                // next we set the second image as next texture but this is not mandatory
                // as we will reset the next texture on slide change
                nextTex.current = plane.createTexture({
                    sampler: "nextTex",
                    fromTexture: plane.textures[activeTexture + 1]
                });
            }
        },
        [plane]
    );

    return (
        <Plane
            className="Slideshow"
            // plane init parameters
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
            // plane events
            onLoading={onLoading}
            onReady={onReady}
            onClick={onClick}
        >
            <div ref={slideshowInner}>
                <H1>click image</H1>
                <img
                    // src="https://www.curtainsjs.com/examples/medias/displacement.jpg"
                    src={disp016}
                    data-sampler="displacement"
                    alt=""
                />
                <img src="https://unsplash.it/1920/1080?random=1" alt="" />
                <img src="https://unsplash.it/1920/1080?random=2" alt="" />
                <img src="https://unsplash.it/1920/1080?random=3" alt="" />
                <img src="https://unsplash.it/1920/1080?random=4" alt="" />
            </div>
        </Plane>
    );
}

export default Slideshow;
