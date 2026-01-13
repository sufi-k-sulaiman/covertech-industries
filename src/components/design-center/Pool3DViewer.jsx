import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function Pool3DViewer({ shape, dimensions, unit }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1e293b);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(8, 10, 8);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.minDistance = 5;
    controls.maxDistance = 30;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -15;
    directionalLight.shadow.camera.right = 15;
    directionalLight.shadow.camera.top = 15;
    directionalLight.shadow.camera.bottom = -15;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0x88ccff, 0.3);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // Get dimensions with defaults
    const poolLength = parseFloat(dimensions.length) || 8;
    const poolWidth = parseFloat(dimensions.width) || 4;
    const shallowDepth = parseFloat(dimensions.shallowDepth) || 1;
    const deepDepth = parseFloat(dimensions.deepDepth) || 2;

    // Create pool based on shape
    createPoolShape(scene, shape || 'rectangle', poolLength, poolWidth, shallowDepth, deepDepth);

    // Grid helper (ground)
    const gridHelper = new THREE.GridHelper(30, 30, 0x333344, 0x222233);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      controls.dispose();
    };
  }, [shape, dimensions, unit]);

  return <div ref={containerRef} className="w-full h-full rounded-xl overflow-hidden" />;
}

function createPoolShape(scene, shape, length, width, shallowDepth, deepDepth) {
  // Create pool walls and floor
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xf8f9fa,
    roughness: 0.3,
    metalness: 0.1,
  });

  let poolShape;
  
  switch (shape) {
    case 'rectangle':
      poolShape = createRectanglePool(length, width);
      break;
    case 'oval':
      poolShape = createOvalPool(length, width);
      break;
    case 'round':
      poolShape = createRoundPool(Math.min(length, width));
      break;
    case 'grecian':
      poolShape = createGrecianPool(length, width);
      break;
    case 'roman':
      poolShape = createRomanPool(length, width);
      break;
    case 'lazy-l':
      poolShape = createLazyLPool(length, width);
      break;
    case 'true-l':
      poolShape = createTrueLPool(length, width);
      break;
    case 'kidney':
      poolShape = createKidneyPool(length, width);
      break;
    case 'freeform':
      poolShape = createFreeformPool(length, width);
      break;
    default:
      poolShape = createRectanglePool(length, width);
  }

  // Extrude pool shape to create walls
  const avgDepth = (shallowDepth + deepDepth) / 2;
  const extrudeSettings = {
    depth: avgDepth,
    bevelEnabled: false,
  };

  const geometry = new THREE.ExtrudeGeometry(poolShape, extrudeSettings);
  const pool = new THREE.Mesh(geometry, wallMaterial);
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = 0;
  pool.castShadow = true;
  pool.receiveShadow = true;
  scene.add(pool);

  // Create water surface
  const waterGeometry = new THREE.ShapeGeometry(poolShape);
  const waterMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x0891b2,
    transparent: true,
    opacity: 0.85,
    metalness: 0.1,
    roughness: 0.1,
    transmission: 0.5,
    thickness: 0.5,
    envMapIntensity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  });
  
  const water = new THREE.Mesh(waterGeometry, waterMaterial);
  water.rotation.x = -Math.PI / 2;
  water.position.y = avgDepth * 0.05;
  water.receiveShadow = true;
  scene.add(water);

  // Add dimension lines
  addDimensionLines(scene, shape, length, width, avgDepth);
}

function createRectanglePool(length, width) {
  const shape = new THREE.Shape();
  const l = length / 2;
  const w = width / 2;
  shape.moveTo(-l, -w);
  shape.lineTo(l, -w);
  shape.lineTo(l, w);
  shape.lineTo(-l, w);
  shape.lineTo(-l, -w);
  return shape;
}

function createOvalPool(length, width) {
  const shape = new THREE.Shape();
  const l = length / 2;
  const w = width / 2;
  shape.ellipse(0, 0, l, w, 0, Math.PI * 2, false, 0);
  return shape;
}

function createRoundPool(diameter) {
  const shape = new THREE.Shape();
  const r = diameter / 2;
  shape.arc(0, 0, r, 0, Math.PI * 2, false);
  return shape;
}

function createGrecianPool(length, width) {
  const shape = new THREE.Shape();
  const l = length / 2;
  const w = width / 2;
  const cut = Math.min(l, w) * 0.2;
  
  shape.moveTo(-l + cut, -w);
  shape.lineTo(l - cut, -w);
  shape.lineTo(l, -w + cut);
  shape.lineTo(l, w - cut);
  shape.lineTo(l - cut, w);
  shape.lineTo(-l + cut, w);
  shape.lineTo(-l, w - cut);
  shape.lineTo(-l, -w + cut);
  shape.lineTo(-l + cut, -w);
  return shape;
}

function createRomanPool(length, width) {
  const shape = new THREE.Shape();
  const l = length / 2;
  const w = width / 2;
  const curve = w * 0.8;
  
  shape.moveTo(-l + curve, -w);
  shape.lineTo(l - curve, -w);
  shape.quadraticCurveTo(l, -w, l, -w + curve);
  shape.lineTo(l, w - curve);
  shape.quadraticCurveTo(l, w, l - curve, w);
  shape.lineTo(-l + curve, w);
  shape.quadraticCurveTo(-l, w, -l, w - curve);
  shape.lineTo(-l, -w + curve);
  shape.quadraticCurveTo(-l, -w, -l + curve, -w);
  return shape;
}

function createLazyLPool(length, width) {
  const shape = new THREE.Shape();
  const l = length / 2;
  const w = width / 2;
  const step = l * 0.4;
  
  shape.moveTo(-l, -w);
  shape.lineTo(0, -w);
  shape.lineTo(0, 0);
  shape.lineTo(l, 0);
  shape.lineTo(l, w);
  shape.lineTo(-l, w);
  shape.lineTo(-l, -w);
  return shape;
}

function createTrueLPool(length, width) {
  const shape = new THREE.Shape();
  const l = length / 2;
  const w = width / 2;
  
  shape.moveTo(-l, -w);
  shape.lineTo(-l * 0.2, -w);
  shape.lineTo(-l * 0.2, 0);
  shape.lineTo(l, 0);
  shape.lineTo(l, w);
  shape.lineTo(-l, w);
  shape.lineTo(-l, -w);
  return shape;
}

function createKidneyPool(length, width) {
  const shape = new THREE.Shape();
  const l = length / 2;
  const w = width / 2;
  
  // Create kidney shape with bezier curves
  shape.moveTo(-l, 0);
  shape.bezierCurveTo(-l, -w, -l * 0.3, -w, 0, -w * 0.8);
  shape.bezierCurveTo(l * 0.3, -w * 0.6, l, -w * 0.5, l, 0);
  shape.bezierCurveTo(l, w * 0.5, l * 0.3, w * 0.6, 0, w * 0.8);
  shape.bezierCurveTo(-l * 0.3, w, -l, w, -l, 0);
  return shape;
}

function createFreeformPool(length, width) {
  const shape = new THREE.Shape();
  const l = length / 2;
  const w = width / 2;
  
  // Organic freeform shape
  shape.moveTo(-l * 0.6, -w * 0.8);
  shape.bezierCurveTo(-l * 0.9, -w, -l, -w * 0.5, -l * 0.8, 0);
  shape.bezierCurveTo(-l * 0.9, w * 0.4, -l * 0.6, w * 0.9, 0, w);
  shape.bezierCurveTo(l * 0.5, w * 0.9, l * 0.9, w * 0.5, l, w * 0.2);
  shape.bezierCurveTo(l, -w * 0.3, l * 0.8, -w * 0.8, l * 0.3, -w);
  shape.bezierCurveTo(0, -w * 0.9, -l * 0.3, -w * 0.9, -l * 0.6, -w * 0.8);
  return shape;
}

function addDimensionLines(scene, shape, length, width, depth) {
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x94a3b8 });
  
  // Length line
  const lengthPoints = [
    new THREE.Vector3(-length / 2, depth + 0.5, -width / 2 - 1),
    new THREE.Vector3(length / 2, depth + 0.5, -width / 2 - 1),
  ];
  const lengthGeometry = new THREE.BufferGeometry().setFromPoints(lengthPoints);
  const lengthLine = new THREE.Line(lengthGeometry, lineMaterial);
  scene.add(lengthLine);
  
  // Width line
  const widthPoints = [
    new THREE.Vector3(length / 2 + 1, depth + 0.5, -width / 2),
    new THREE.Vector3(length / 2 + 1, depth + 0.5, width / 2),
  ];
  const widthGeometry = new THREE.BufferGeometry().setFromPoints(widthPoints);
  const widthLine = new THREE.Line(widthGeometry, lineMaterial);
  scene.add(widthLine);
}