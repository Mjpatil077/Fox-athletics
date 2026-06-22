"use client";
 
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
 
export default function Fox3DModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
 
  useEffect(() => {
    if (!containerRef.current) return;
 
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
 
    // 1. Scene setup
    const scene = new THREE.Scene();
 
    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.5;
 
    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
    container.appendChild(renderer.domElement);
 
    // 4. Lighting setup (metallic reflections)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);
 
    const dirLight1 = new THREE.DirectionalLight(0x00e5ff, 1.5); // Electric Blue light
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);
 
    const dirLight2 = new THREE.DirectionalLight(0x39ff14, 1.2); // Volt Green light
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
      opacity: 0.7,
      side: THREE.DoubleSide,
    });

    const blueWireMaterial = new THREE.MeshBasicMaterial({
      color: 0x00e5ff, // Electric blue
      wireframe: true,
      transparent: true,
      opacity: 0.7,
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
    
    // Scale up slightly
    greenWireMesh.scale.set(1.4, 1.4, 1.4);
    blueWireMesh.scale.set(1.4, 1.4, 1.4);

    foxGroup.add(greenWireMesh);
    foxGroup.add(blueWireMesh);
    scene.add(foxGroup);
 
    // 6. Floating 3D Starfield/Particles
    const particleGeom = new THREE.BufferGeometry();
    const particleCount = 65;
    const positions = new Float32Array(particleCount * 3);
 
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 6; // x
      positions[i + 1] = (Math.random() - 0.5) * 6; // y
      positions[i + 2] = (Math.random() - 0.5) * 6; // z
    }
 
    particleGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
 
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x39ff14,
      size: 0.025,
      transparent: true,
      opacity: 0.45,
    });
 
    const particleSystem = new THREE.Points(particleGeom, particleMaterial);
    scene.add(particleSystem);
 
    // 7. Interactive Mouse Tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.current = { x, y };
    };
 
    window.addEventListener("mousemove", handleMouseMove);

    // 7.5 Visibility tracking
    let isElementVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isElementVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);
 
    // 8. Animation loop
    let frameId: number;
    let clock = new THREE.Clock();
 
    const animate = () => {
      if (!isElementVisible || document.hidden) {
        frameId = requestAnimationFrame(animate);
        return;
      }
      
      const elapsedTime = clock.getElapsedTime();
 
      // Oscillate left-to-right within a 180-degree range (-90 to +90 degrees)
      const baseRotY = Math.sin(elapsedTime * 0.45) * (Math.PI / 2);
 
      // Smooth tilt responding to mouse position
      const targetRotX = mouse.current.y * 0.4;
      const targetRotY = baseRotY + mouse.current.x * 0.35;
 
      foxGroup.rotation.x += (targetRotX - foxGroup.rotation.x) * 0.08;
      foxGroup.rotation.y += (targetRotY - foxGroup.rotation.y) * 0.08;
 
      // Rotate particle starfield
      particleSystem.rotation.y = elapsedTime * -0.04;
      particleSystem.rotation.x = elapsedTime * 0.02;
 
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
 
    animate();
 
    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
 
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
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
      // Dispose materials & geometries
      greenGeometry.dispose();
      blueGeometry.dispose();
      greenWireMaterial.dispose();
      blueWireMaterial.dispose();
      particleGeom.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);
 
  return (
    <div
      ref={containerRef}
      className="w-full h-[450px] md:h-[550px] relative flex items-center justify-center overflow-visible"
    />
  );
}
