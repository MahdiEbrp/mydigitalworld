import React, { useEffect, useState } from 'react';
import { BsTriangleFill } from 'react-icons/bs';
import { FaCircle } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { IoIosSquare } from 'react-icons/io';
import { TbRectangleFilled } from 'react-icons/tb';

const MAX_PARTICLES = 30;
const PARTICLE_MOVE_SPEED = 0.5;
const ANIMATION_INTERVAL = 30;

type GeometricObject = {
    id: number;
    x: number;
    y: number;
    speedX: number;
    speedY: number;
    shape: IconType;
};

export const GeometricParticle = () => {
    const [geometricObjects, setGeometricObjects] = useState<GeometricObject[]>([]);

    useEffect(() => {
        const geometricObjectArray: GeometricObject[] = [...Array(MAX_PARTICLES)].map((_, i) => ({
            id: i,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            speedX: Math.random() - PARTICLE_MOVE_SPEED,
            speedY: Math.random() - PARTICLE_MOVE_SPEED,
            shape: getRandomShape()
        }));

        setGeometricObjects(geometricObjectArray);

        const handleResize = () => {
            setGeometricObjects(prevState =>
                prevState.map(geometricObject => ({
                    ...geometricObject,
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    speedX: Math.random() - PARTICLE_MOVE_SPEED,
                    speedY: Math.random() - PARTICLE_MOVE_SPEED,
                    shape: getRandomShape()
                }))
            );
        };

        window.addEventListener('resize', handleResize);

        const interval = setInterval(() => {
            setGeometricObjects(prevState =>
                prevState.map(geometricObject => {
                    // Check if geometricObject is outside window
                    if (geometricObject.x < 0 || geometricObject.x > window.innerWidth || geometricObject.y < 0 || geometricObject.y > window.innerHeight) {
                        return {
                            ...geometricObject,
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            shape: getRandomShape()
                        };
                    }
                    return {
                        ...geometricObject,
                        x: geometricObject.x + geometricObject.speedX,
                        y: geometricObject.y + geometricObject.speedY
                    };
                })
            );
        }, ANIMATION_INTERVAL);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getRandomShape = () => {
        const shapes = [BsTriangleFill, FaCircle, TbRectangleFilled, IoIosSquare];
        const randomIndex = Math.floor(Math.random() * shapes.length);
        return shapes[randomIndex];
    };

    return (
        <div className='static w-full h-full z-10'>
            {geometricObjects.map(geometricObject =>
                React.createElement(geometricObject.shape, {
                    key: geometricObject.id,
                    className: 'fixed animate-pulse text-particle w-2 h-2',
                    style: {
                        top: `${geometricObject.y}px`,
                        left: `${geometricObject.x}px`,
                        transform: `rotate(${geometricObject.x % 360}deg)`
                    },
                })
            )}
        </div>
    );
};

export default GeometricParticle;
