import React, { useEffect, useRef } from "react";
import "./CanvasBg.css";

const CanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;
    const shapes = [];
    const numShapes = 15;

    // Shape types with different configurations
    const shapeTypes = [
      { type: "vortex", complexity: 8, speedMod: 1.2 },
      { type: "star", complexity: 5, speedMod: 0.8 },
      { type: "organic", complexity: 3, speedMod: 1.5 },
      { type: "crystal", complexity: 6, speedMod: 1.0 },
    ];

    // Initialize shapes with different properties
    for (let i = 0; i < numShapes; i++) {
      const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      shapes.push({
        type: type.type,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 40 + Math.random() * 80,
        speed: (0.02 + Math.random() * 0.03) * type.speedMod,
        phase: Math.random() * Math.PI * 2,
        complexity: type.complexity + Math.floor(Math.random() * 3),
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02,
        colorOffset: Math.random() * 360,
      });
    }

    const drawShape = (shape, ctx, time) => {
      ctx.beginPath();
      const hue = (time * 20 + shape.colorOffset) % 360;

      // Create gradient with dynamic color stops
      const gradient = ctx.createRadialGradient(
        shape.x,
        shape.y,
        shape.radius * 0.2,
        shape.x,
        shape.y,
        shape.radius * 2
      );
      gradient.addColorStop(0, `hsla(${hue}, 85%, 60%, 0.8)`);
      gradient.addColorStop(0.5, `hsla(${hue + 20}, 70%, 40%, 0.4)`);
      gradient.addColorStop(1, `hsla(${hue + 40}, 60%, 20%, 0)`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2 + Math.sin(time + shape.phase) * 3;

      // Different drawing algorithms for each shape type
      switch (shape.type) {
        case "vortex":
          drawVortex(shape, ctx, time);
          break;
        case "star":
          drawStar(shape, ctx, time);
          break;
        case "organic":
          drawOrganic(shape, ctx, time);
          break;
        case "crystal":
          drawCrystal(shape, ctx, time);
          break;
      }

      ctx.closePath();
      ctx.stroke();
    };

    // Vortex shape with rotating arms
    const drawVortex = (shape, ctx, time) => {
      const points = [];
      for (let t = 0; t < Math.PI * 2; t += 0.1) {
        const ripple = Math.sin(t * shape.complexity + time * 2) * 0.3 + 1;
        const x =
          shape.x + Math.cos(t + shape.rotation) * shape.radius * ripple;
        const y =
          shape.y + Math.sin(t + shape.rotation) * shape.radius * ripple;
        points.push({ x, y });
      }
      points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
    };

    // Dynamic star shape with varying points
    const drawStar = (shape, ctx, time) => {
      const spikes = shape.complexity * 2;
      const outerRadius = shape.radius;
      const innerRadius = outerRadius * (0.3 + Math.sin(time) * 0.2);

      for (let i = 0; i < spikes; i++) {
        const angle = (i * Math.PI * 2) / spikes + shape.rotation;
        const outerX = shape.x + Math.cos(angle) * outerRadius;
        const outerY = shape.y + Math.sin(angle) * outerRadius;
        const innerAngle = angle + Math.PI / spikes;
        const innerX = shape.x + Math.cos(innerAngle) * innerRadius;
        const innerY = shape.y + Math.sin(innerAngle) * innerRadius;

        if (i === 0) ctx.moveTo(outerX, outerY);
        ctx.lineTo(innerX, innerY);
        ctx.lineTo(outerX, outerY);
      }
    };

    // Organic blob shape with noise
    const drawOrganic = (shape, ctx, time) => {
      for (let t = 0; t < Math.PI * 2; t += 0.1) {
        const noise =
          Math.sin(t * shape.complexity + time) * 0.5 +
          Math.cos(t * 3 + time * 0.7) * 0.3;
        const radius = shape.radius * (1 + noise * 0.2);
        const x = shape.x + Math.cos(t + shape.rotation) * radius;
        const y = shape.y + Math.sin(t + shape.rotation) * radius;

        if (t === 0) ctx.moveTo(x, y);
        else ctx.quadraticCurveTo(x + noise * 5, y - noise * 5, x, y);
      }
    };

    // Geometric crystal shape
    const drawCrystal = (shape, ctx, time) => {
      const sides = shape.complexity;
      const angleStep = (Math.PI * 2) / sides;
      const pulse = Math.sin(time * 2) * 0.2 + 0.8;

      for (let i = 0; i <= sides; i++) {
        const angle = angleStep * i + shape.rotation;
        const radius = shape.radius * pulse * (i % 2 === 0 ? 1 : 0.8);
        const x = shape.x + Math.cos(angle) * radius;
        const y = shape.y + Math.sin(angle) * radius;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
    };

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 18, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((shape) => {
        // Update shape properties
        shape.x += Math.cos(time * shape.speed) * 0.7;
        shape.y += Math.sin(time * shape.speed) * 0.7;
        shape.rotation += shape.spin;

        // Keep shapes within canvas bounds
        if (shape.x < -shape.radius) shape.x = canvas.width + shape.radius;
        if (shape.x > canvas.width + shape.radius) shape.x = -shape.radius;
        if (shape.y < -shape.radius) shape.y = canvas.height + shape.radius;
        if (shape.y > canvas.height + shape.radius) shape.y = -shape.radius;

        drawShape(shape, ctx, time);
      });

      drawConnections(ctx, shapes);
      time += 0.015;
      requestAnimationFrame(draw);
    };

    const drawConnections = (ctx, shapes) => {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const dx = shapes[i].x - shapes[j].x;
          const dy = shapes[i].y - shapes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 250) {
            ctx.beginPath();
            ctx.moveTo(shapes[i].x, shapes[i].y);
            ctx.lineTo(shapes[j].x, shapes[j].y);
            ctx.stroke();
          }
        }
      }
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default CanvasBackground;
