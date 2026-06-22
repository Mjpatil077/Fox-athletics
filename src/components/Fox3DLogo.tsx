"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

interface Fox3DLogoProps {
  className?: string;
}

export default function Fox3DLogo({ className = "w-9 h-9" }: Fox3DLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // We get dimensions from the container
    let width = container.clientWidth || 36;
    let height = container.clientHeight || 36;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.2; // Slightly closer for a logo

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
    container.appendChild(renderer.domElement);

    // 4. Lighting setup (metallic reflections)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00e5ff, 1.8); // Electric Blue light
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x39ff14, 1.5); // Volt Green light
    dirLight2.position.set(-5, 3, 3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1.0, 10);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // 5. Unified Procedural Low-Poly Fox Head Geometry
    const foxGroup = new THREE.Group();

    // Wireframe Materials (Neon Green & Electric Blue)
    const greenWireMaterial = new THREE.MeshBasicMaterial({
      color: 0x39ff14, // Neon green
      wireframe: true,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });

    const blueWireMaterial = new THREE.MeshBasicMaterial({
      color: 0x00e5ff, // Electric blue
      wireframe: true,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });

    const verticesArray = new Float32Array([
      // Center Line (x = 0)
      0.0, -0.7,  0.8, // 0: Nose tip
      0.0, -0.1,  0.5, // 1: Snout bridge
      0.0,  0.3,  0.4, // 2: Forehead
      0.0,  0.7,  0.1, // 3: Crown
      0.0, -0.4,  0.4, // 4: Under chin / throat

      // Left Side (x < 0)
      -0.25,  0.1,  0.45, // 5: Eye Inner L
      -0.55,  0.2,  0.3,  // 6: Eye Outer L
      -0.75, -0.1,  0.1,  // 7: Cheek L
      -0.45, -0.45, 0.2,  // 8: Jaw/Throat Side L
      -0.25,  0.6,  0.15, // 9: Ear Base Inner L
      -0.65,  0.45, 0.0,  // 10: Ear Base Outer L
      -0.75,  1.15, -0.1, // 11: Ear Tip L

      // Right Side (x > 0)
      0.25,  0.1,  0.45, // 12: Eye Inner R
      0.55,  0.2,  0.3,  // 13: Eye Outer R
      0.75, -0.1,  0.1,  // 14: Cheek R
      0.45, -0.45, 0.2,  // 15: Jaw/Throat Side R
      0.25,  0.6,  0.15, // 16: Ear Base Inner R
      0.65,  0.45, 0.0,  // 17: Ear Base Outer R
      0.75,  1.15, -0.1, // 18: Ear Tip R
    ]);

    // Green Indices (Snout and Ears)
    const greenIndices = [
      // Snout
      0, 1, 5,
      0, 5, 8,
      0, 8, 4,
      // Ears
      2, 3, 9,
      3, 11, 9,
      3, 10, 11,
      9, 11, 10,
      10, 6, 9,
      10, 7, 6,
      3, 7, 10,
      
      // Right Snout
      0, 12, 1,
      0, 15, 12,
      0, 4, 15,
      // Right Ears
      2, 16, 3,
      3, 18, 16,
      3, 17, 18,
      16, 17, 18,
      17, 13, 16,
      17, 14, 13,
      3, 17, 14
    ];

    // Blue Indices (Forehead, Eyes, Cheeks, Jaw)
    const blueIndices = [
      // Left Face
      1, 2, 5,
      2, 9, 5,
      5, 9, 6,
      5, 6, 7,
      5, 7, 8,
      7, 4, 8,

      // Right Face
      1, 12, 2,
      2, 12, 16,
      12, 13, 16,
      12, 14, 13,
      12, 15, 14,
      14, 15, 4
    ];

    // Create Green Geometry
    const greenGeometry = new THREE.BufferGeometry();
    greenGeometry.setAttribute('position', new THREE.BufferAttribute(verticesArray, 3));
    greenGeometry.setIndex(greenIndices);
    greenGeometry.computeVertexNormals();

    // Create Blue Geometry
    const blueGeometry = new THREE.BufferGeometry();
    blueGeometry.setAttribute('position', new THREE.BufferAttribute(verticesArray, 3));
    blueGeometry.setIndex(blueIndices);
    blueGeometry.computeVertexNormals();

    const greenWireMesh = new THREE.Mesh(greenGeometry, greenWireMaterial);
    const blueWireMesh = new THREE.Mesh(blueGeometry, blueWireMaterial);
    
    // Scale to fit nicely in a logo container
    greenWireMesh.scale.set(1.35, 1.35, 1.35);
    blueWireMesh.scale.set(1.35, 1.35, 1.35);

    // Offset slightly downwards so the pivot point is around forehead/eyes
    greenWireMesh.position.y = -0.15;
    blueWireMesh.position.y = -0.15;

    foxGroup.add(greenWireMesh);
    foxGroup.add(blueWireMesh);
    scene.add(foxGroup);

    // 6. Interactive Mouse Tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      // Clamp coordinates to keep rotation subtle
      mouse.current = {
        x: Math.max(-1.5, Math.min(1.5, x)),
        y: Math.max(-1.5, Math.min(1.5, y)),
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 6.5 Visibility tracking
    let isElementVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isElementVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 7. Animation loop
    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      if (!isElementVisible || document.hidden) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      const elapsedTime = clock.getElapsedTime();

      // Slow idle horizontal rotation
      const baseRotY = Math.sin(elapsedTime * 0.5) * 0.25;

      // React to mouse
      const targetRotX = mouse.current.y * 0.35;
      const targetRotY = baseRotY + mouse.current.x * 0.35;

      foxGroup.rotation.x += (targetRotX - foxGroup.rotation.x) * 0.1;
      foxGroup.rotation.y += (targetRotY - foxGroup.rotation.y) * 0.1;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    // 8. Resize Handling
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 36;
      height = container.clientHeight || 36;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      greenGeometry.dispose();
      blueGeometry.dispose();
      greenWireMaterial.dispose();
      blueWireMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${className} relative flex items-center justify-center overflow-visible select-none`}
    />
  );
}
