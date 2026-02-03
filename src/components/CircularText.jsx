import { useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

const getRotationTransition = (duration, from, loop = true) => ({
    from,
    to: from + 360,
    ease: 'linear',
    duration,
    type: 'tween',
    repeat: loop ? Infinity : 0
});

const getTransition = (duration, from) => ({
    rotate: getRotationTransition(duration, from),
    scale: {
        type: 'spring',
        damping: 20,
        stiffness: 300
    }
});

const CircularText = ({ text, spinDuration = 20, onHover = 'speedUp', className = '' }) => {
    const letters = Array.from(text);
    const controls = useAnimation();
    const rotation = useMotionValue(0);

    useEffect(() => {
        const start = rotation.get();
        controls.start({
            rotate: start + 360,
            scale: 1,
            transition: getTransition(spinDuration, start)
        });
    }, [spinDuration, text, onHover, controls, rotation]);

    const handleHoverStart = () => {
        const start = rotation.get();
        if (!onHover) return;

        let transitionConfig;
        let scaleVal = 1;

        switch (onHover) {
            case 'slowDown':
                transitionConfig = getTransition(spinDuration * 2, start);
                break;
            case 'speedUp':
                transitionConfig = getTransition(spinDuration / 4, start);
                break;
            case 'pause':
                transitionConfig = {
                    rotate: { type: 'spring', damping: 20, stiffness: 300 },
                    scale: { type: 'spring', damping: 20, stiffness: 300 }
                };
                scaleVal = 1;
                break;
            case 'goBonkers':
                transitionConfig = getTransition(spinDuration / 20, start);
                scaleVal = 0.8;
                break;
            default:
                transitionConfig = getTransition(spinDuration, start);
        }

        controls.start({
            rotate: start + 360,
            scale: scaleVal,
            transition: transitionConfig
        });
    };

    const handleHoverEnd = () => {
        const start = rotation.get();
        controls.start({
            rotate: start + 360,
            scale: 1,
            transition: getTransition(spinDuration, start)
        });
    };

    return (
        <motion.div
            className={`m-0 mx-auto rounded-full relative font-black text-center cursor-pointer origin-center ${className}`}
            style={{ rotate: rotation }}
            initial={{ rotate: 0 }}
            animate={controls}
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
        >
            {letters.map((letter, i) => {
                const rotationDeg = (360 / letters.length) * i;
                const radius = 85; // Fixed radius to position text closer to center
                const angle = (rotationDeg * Math.PI) / 180;
                const x = Math.sin(angle) * radius;
                const y = -Math.cos(angle) * radius;
                const transform = `translate(${x}px, ${y}px) rotate(${rotationDeg}deg)`;

                return (
                    <span
                        key={i}
                        className="absolute left-1/2 top-1/2 inline-block text-lg transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
                        style={{
                            transform,
                            WebkitTransform: transform,
                            transformOrigin: '0 0'
                        }}
                    >
                        {letter}
                    </span>
                );
            })}
        </motion.div>
    );
};

export default CircularText;
