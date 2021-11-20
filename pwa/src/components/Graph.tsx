import React, { useEffect, useRef } from 'react';

interface GraphProps {
    values: number[]
}

function Graph({ values } : GraphProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const width = 395;
    const height = 80;

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas == null) return;

        const ctx = canvas.getContext('2d');

        let animationId = 0;
        let frameCount = 0;

        const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
            ctx.fillStyle = '#dedede'
            ctx.fillRect(0, 0, width, height)
    
    
            const numValues = values.length;
            const sectionWidth = (width - 5) / (numValues - 1);

            const getHeight = (value: number) => height * (1 - value / 500);
    
            // for (let i = 0; i < numValues - 1; i++) {
            //     ctx.fillStyle = getAQIColor(values[i]);
    
            //     ctx.beginPath();
            //     ctx.moveTo(i * sectionWidth, height);
            //     ctx.lineTo(i * sectionWidth, getHeight(values[i]));
            //     ctx.lineTo((i + 1) * sectionWidth, getHeight(values[i + 1]));
            //     ctx.lineTo((i + 1) * sectionWidth, height);
            //     ctx.moveTo(i * sectionWidth, height);
            //     ctx.fill();
            // }

            ctx.strokeStyle = "#000000";
            ctx.fillStyle = '#bcbcbc'
            ctx.beginPath();
            ctx.moveTo(0, height);
            for (let i = 0; i < numValues; i++) {
                ctx.lineTo(i * sectionWidth, getHeight(values[i]));
            }
            ctx.lineTo(width - 5, height);
            ctx.stroke();
            ctx.fill();
    
            ctx.fillStyle = '#000000'
            ctx.beginPath()
            ctx.arc(width - 5, getHeight(values[numValues - 1]), 5*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
            ctx.fill()
        }

        const render = () => {
            if (ctx != null)
                draw(ctx, frameCount++);

            animationId = requestAnimationFrame(render)
        }
        render();

        return () => {
            cancelAnimationFrame(animationId);
        }
    }, [values]);

    return <canvas height={height} width={width} ref={canvasRef} />
}

export default Graph;