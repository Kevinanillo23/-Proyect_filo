import React, { useEffect, useRef } from 'react';

const philosophicalWorks = [
    "La República", "Ética a Nicómaco", "Meditaciones", "Crítica de la razón pura",
    "Así habló Zaratustra", "El Ser y el Tiempo", "Discurso del Método", "Leviatán",
    "El Príncipe", "Fenomenología del Espíritu", "Más allá del bien y del mal",
    "Tratado de la naturaleza humana", "El contrato social", "Elogio de la locura"
];

const PhilosophyBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Meteor {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = -Math.random() * 500;
                this.speed = 0.8 + Math.random() * 1.5;
                this.text = philosophicalWorks[Math.floor(Math.random() * philosophicalWorks.length)];
                this.opacity = 0.1 + Math.random() * 0.3;
                this.fontSize = 11 + Math.random() * 12;
                this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.1;
                this.trailLength = 8 + Math.random() * 15;
            }

            update() {
                this.y += this.speed;
                this.x += Math.sin(this.angle) * this.speed * 0.3;

                if (this.y > canvas.height + 100) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = '#f1c40f';
                ctx.font = `600 ${this.fontSize}px 'Outfit', sans-serif`;
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#f1c40f';

                const trailX = this.x - Math.sin(this.angle) * this.trailLength * 2;
                const trailY = this.y - this.trailLength * 2;

                ctx.beginPath();
                const grad = ctx.createLinearGradient(this.x, this.y, trailX, trailY);
                grad.addColorStop(0, 'rgba(241, 196, 15, 0.5)');
                grad.addColorStop(1, 'rgba(241, 196, 15, 0)');
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.5;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(trailX, trailY);
                ctx.stroke();

                ctx.fillText(this.text, this.x, this.y);
                ctx.restore();
            }
        }

        const meteors = Array.from({ length: 12 }, () => new Meteor());

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            meteors.forEach(meteor => {
                meteor.update();
                meteor.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: -1,
                background: 'transparent'
            }}
        />
    );
};

export default PhilosophyBackground;
