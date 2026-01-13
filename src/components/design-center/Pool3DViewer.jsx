import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Pool3DViewer({ shape, dimensions, unit }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const waterRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width === 0 || height === 0) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe2e8f0);
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
    rendererRef.current = renderer;
    
    // Clear and append
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

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
    const waterLevel = parseFloat(dimensions.waterLevel) || 90;

    // Create pool based on shape
    const water = createPoolShape(scene, shape || 'rectangle', poolLength, poolWidth, shallowDepth, deepDepth, waterLevel);
    waterRef.current = water;

    // Grid helper (ground)
    const gridHelper = new THREE.GridHelper(30, 30, 0x94a3b8, 0xcbd5e1);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      
      // Subtle water animation
      if (waterRef.current) {
        const time = Date.now() * 0.0005;
        waterRef.current.rotation.y = Math.sin(time) * 0.002;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (renderer) {
        renderer.dispose();
      }
      if (controls) {
        controls.dispose();
      }
      if (container && renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [shape, dimensions, unit]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full rounded-xl overflow-hidden"
      style={{ minHeight: '600px' }}
    />
  );
}

function createPoolShape(scene, shape, length, width, shallowDepth, deepDepth, waterLevel = 90) {
  // Pool liner material (like tile/vinyl liner)
  const linerMaterial = new THREE.MeshStandardMaterial({
    color: 0x9ca3af,
    roughness: 0.4,
    metalness: 0.2,
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

  // Create pool shell
  const group = new THREE.Group();
  const avgDepth = (shallowDepth + deepDepth) / 2;
  
  // Create floor
  const floorGeometry = new THREE.PlaneGeometry(length, width);
  const floor = new THREE.Mesh(floorGeometry, linerMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -avgDepth;
  floor.receiveShadow = true;
  group.add(floor);

  // Create walls using extrusion
  const wallExtrudeSettings = {
    depth: avgDepth * 0.98, // Slightly shorter to show rim
    bevelEnabled: false,
  };
  
  const wallsGeometry = new THREE.ExtrudeGeometry(poolShape, wallExtrudeSettings);
  const walls = new THREE.Mesh(wallsGeometry, linerMaterial);
  walls.rotation.x = -Math.PI / 2;
  walls.position.y = -0.02; // Slight offset to show rim
  walls.castShadow = true;
  walls.receiveShadow = true;
  group.add(walls);
  
  // Create pool rim/edge
  const rimMaterial = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.6,
    metalness: 0.2,
  });
  
  const rimExtrudeSettings = {
    depth: 0.15,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 2,
  };
  
  const rimGeometry = new THREE.ExtrudeGeometry(poolShape, rimExtrudeSettings);
  const rim = new THREE.Mesh(rimGeometry, rimMaterial);
  rim.rotation.x = -Math.PI / 2;
  rim.position.y = 0.1;
  rim.castShadow = true;
  group.add(rim);
  
  scene.add(group);

  // Create water volume based on water level percentage
  const waterLevelPercent = waterLevel / 100;
  const waterDepth = avgDepth * waterLevelPercent;
  
  const waterMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x0891b2,
    transparent: true,
    opacity: 0.7,
    metalness: 0.1,
    roughness: 0.2,
    transmission: 0.2,
    thickness: 0.5,
    clearcoat: 0.3,
    clearcoatRoughness: 0.2,
    envMapIntensity: 0.8,
    reflectivity: 0.6,
    ior: 1.33,
  });
  
  // Create water as extruded shape that fills inside the pool
  const waterExtrudeSettings = {
    depth: waterDepth,
    bevelEnabled: false,
  };
  
  const waterGeometry = new THREE.ExtrudeGeometry(poolShape, waterExtrudeSettings);
  const water = new THREE.Mesh(waterGeometry, waterMaterial);
  water.rotation.x = -Math.PI / 2;
  // Position so water fills from bottom up to waterDepth level
  water.position.y = -avgDepth + waterDepth;
  water.receiveShadow = true;
  water.castShadow = true;
  
  scene.add(water);
  
  // Add dimension lines/labels with actual values
  addDimensionLines(scene, length, width, avgDepth, waterDepth, shallowDepth, deepDepth);
  
  return water;
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

function addDimensionLines(scene, length, width, poolDepth, waterDepth, shallowDepth, deepDepth) {
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x64748b, linewidth: 2 });
  const dashedMaterial = new THREE.LineDashedMaterial({ 
    color: 0x0ea5e9, 
    linewidth: 2,
    dashSize: 0.2,
    gapSize: 0.1,
  });
  
  // Depth indicator line (right side)
  const depthPoints = [
    new THREE.Vector3(length / 2 + 0.8, 0, 0),
    new THREE.Vector3(length / 2 + 0.8, -poolDepth, 0),
  ];
  const depthGeometry = new THREE.BufferGeometry().setFromPoints(depthPoints);
  const depthLine = new THREE.Line(depthGeometry, lineMaterial);
  scene.add(depthLine);
  
  // Water level indicator line
  const actualWaterLevel = -poolDepth + waterDepth;
  const waterLevelPoints = [
    new THREE.Vector3(length / 2 + 0.8, actualWaterLevel, -width / 2 * 0.3),
    new THREE.Vector3(length / 2 + 0.8, actualWaterLevel, width / 2 * 0.3),
  ];
  const waterLevelGeometry = new THREE.BufferGeometry().setFromPoints(waterLevelPoints);
  const waterLevelLine = new THREE.Line(waterLevelGeometry, dashedMaterial);
  waterLevelLine.computeLineDistances();
  scene.add(waterLevelLine);
  
  // Small ticks for depth markers
  const topTick = createTick(length / 2 + 0.7, 0, 0);
  const bottomTick = createTick(length / 2 + 0.7, -poolDepth, 0);
  const waterTick = createTick(length / 2 + 0.7, actualWaterLevel, 0);
  scene.add(topTick, bottomTick, waterTick);
  
  // Add text labels for dimensions
  addTextLabel(scene, `${shallowDepth.toFixed(1)}ft`, length / 2 + 1.5, -shallowDepth / 2, 0);
  addTextLabel(scene, `${deepDepth.toFixed(1)}ft`, length / 2 + 1.5, -deepDepth, 0);
  addTextLabel(scene, 'Water Level', length / 2 + 1.5, actualWaterLevel, 0.5);
  
  // Length and width labels
  addTextLabel(scene, `${length.toFixed(1)}ft`, 0, 0.5, -width / 2 - 1);
  addTextLabel(scene, `${width.toFixed(1)}ft`, length / 2 + 1, 0.5, 0);
}

function addTextLabel(scene, text, x, y, z) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 512;
  canvas.height = 128;
  
  context.fillStyle = '#1e293b';
  context.font = 'bold 64px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, 256, 64);
  
  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.position.set(x, y, z);
  sprite.scale.set(2, 0.5, 1);
  scene.add(sprite);
}

function createTick(x, y, z) {
  const tickGeometry = new THREE.BoxGeometry(0.15, 0.05, 0.05);
  const tickMaterial = new THREE.MeshBasicMaterial({ color: 0x64748b });
  const tick = new THREE.Mesh(tickGeometry, tickMaterial);
  tick.position.set(x, y, z);
  return tick;
}