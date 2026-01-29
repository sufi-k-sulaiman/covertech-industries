import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ZoomIn, ZoomOut, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Pool3DViewer({ shape, dimensions, unit }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const waterRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const [, setRender] = useState(0);

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
    cameraRef.current = camera;

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
    controlsRef.current = controls;

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

  const handleZoomIn = () => {
    if (cameraRef.current && controlsRef.current) {
      const distance = cameraRef.current.position.length();
      const newDistance = Math.max(distance - 2, controlsRef.current.minDistance);
      const direction = cameraRef.current.position.clone().normalize();
      cameraRef.current.position.copy(direction.multiplyScalar(newDistance));
      controlsRef.current.target.copy(new THREE.Vector3(0, 0, 0));
      setRender(r => r + 1);
    }
  };

  const handleZoomOut = () => {
    if (cameraRef.current && controlsRef.current) {
      const distance = cameraRef.current.position.length();
      const newDistance = Math.min(distance + 2, controlsRef.current.maxDistance);
      const direction = cameraRef.current.position.clone().normalize();
      cameraRef.current.position.copy(direction.multiplyScalar(newDistance));
      controlsRef.current.target.copy(new THREE.Vector3(0, 0, 0));
      setRender(r => r + 1);
    }
  };

  const handleDefaultView = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(8, 10, 8);
      cameraRef.current.lookAt(0, 0, 0);
      controlsRef.current.target.copy(new THREE.Vector3(0, 0, 0));
      setRender(r => r + 1);
    }
  };

  return (
    <div className="relative w-full h-full">
      <div 
        ref={containerRef} 
        className="w-full h-full rounded-xl overflow-hidden"
        style={{ minHeight: '600px' }}
      />
      
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <Button
          onClick={handleZoomIn}
          size="icon"
          variant="outline"
          className="bg-white hover:bg-slate-50 shadow-lg"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          onClick={handleDefaultView}
          size="icon"
          variant="outline"
          className="bg-white hover:bg-slate-50 shadow-lg"
          title="Default View"
        >
          <Home className="w-4 h-4" />
        </Button>
        <Button
          onClick={handleZoomOut}
          size="icon"
          variant="outline"
          className="bg-white hover:bg-slate-50 shadow-lg"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

function createPoolShape(scene, shape, length, width, shallowDepth, deepDepth, waterLevel = 90) {
  // Pool outer material (exterior walls)
  const outerMaterial = new THREE.MeshStandardMaterial({
    color: 0x3b82f6,
    roughness: 0.4,
    metalness: 0.2,
  });

  // Pool inner material (interior walls - lighter blue)
  const innerMaterial = new THREE.MeshStandardMaterial({
    color: 0x60a5fa,
    roughness: 0.3,
    metalness: 0.1,
  });

  // Floor material
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x93c5fd,
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

  const group = new THREE.Group();
  const avgDepth = (shallowDepth + deepDepth) / 2;
  const wallThickness = 0.15;
  
  // Create inner shape for hollow interior
  const points = poolShape.getPoints(50);
  const innerPoints = points.map(p => {
    const center = new THREE.Vector2(0, 0);
    const dir = new THREE.Vector2().subVectors(p, center).normalize();
    return new THREE.Vector2().subVectors(p, dir.multiplyScalar(wallThickness));
  });
  
  const innerShape = new THREE.Shape();
  innerShape.moveTo(innerPoints[0].x, innerPoints[0].y);
  for (let i = 1; i < innerPoints.length; i++) {
    innerShape.lineTo(innerPoints[i].x, innerPoints[i].y);
  }
  innerShape.closePath();

  // Create outer walls
  const outerWallSettings = {
    depth: avgDepth,
    bevelEnabled: false,
  };
  const outerWallGeometry = new THREE.ExtrudeGeometry(poolShape, outerWallSettings);
  const outerWalls = new THREE.Mesh(outerWallGeometry, outerMaterial);
  outerWalls.rotation.x = -Math.PI / 2;
  outerWalls.position.y = 0;
  outerWalls.castShadow = true;
  outerWalls.receiveShadow = true;
  group.add(outerWalls);

  // Create inner walls (visible from inside)
  const innerWallSettings = {
    depth: avgDepth - 0.05, // Slightly shorter
    bevelEnabled: false,
  };
  const innerWallGeometry = new THREE.ExtrudeGeometry(innerShape, innerWallSettings);
  const innerWalls = new THREE.Mesh(innerWallGeometry, innerMaterial);
  innerWalls.rotation.x = -Math.PI / 2;
  innerWalls.position.y = -0.05;
  innerWalls.receiveShadow = true;
  group.add(innerWalls);
  
  // Create floor (bottom of pool)
  const floorGeometry = new THREE.ShapeGeometry(innerShape);
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -avgDepth;
  floor.receiveShadow = true;
  group.add(floor);

  // Create top rim (coping)
  const rimShape = poolShape.clone();
  rimShape.holes.push(innerShape);
  
  const rimGeometry = new THREE.ShapeGeometry(rimShape);
  const rim = new THREE.Mesh(rimGeometry, outerMaterial);
  rim.rotation.x = -Math.PI / 2;
  rim.position.y = 0.05;
  rim.castShadow = true;
  rim.receiveShadow = true;
  group.add(rim);
  
  scene.add(group);

  // Create water volume based on water level percentage
  const waterLevelPercent = waterLevel / 100;
  const waterDepth = avgDepth * waterLevelPercent;
  
  const waterMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x0891b2,
    transparent: true,
    opacity: 0.75,
    metalness: 0,
    roughness: 0.05,
    transmission: 0.9,
    thickness: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    ior: 1.33,
  });
  
  // Create water filling
  const waterExtrudeSettings = {
    depth: waterDepth,
    bevelEnabled: false,
  };
  
  const waterGeometry = new THREE.ExtrudeGeometry(innerShape, waterExtrudeSettings);
  const water = new THREE.Mesh(waterGeometry, waterMaterial);
  water.rotation.x = -Math.PI / 2;
  water.position.y = -avgDepth + waterDepth;
  water.receiveShadow = true;
  
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
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x94a3b8, linewidth: 2 });
  const highlightMaterial = new THREE.LineBasicMaterial({ color: 0x0ea5e9, linewidth: 3 });
  
  // Vertical depth line on the right side
  const depthLineOffset = length / 2 + 1.5;
  const verticalPoints = [
    new THREE.Vector3(depthLineOffset, 0, 0),
    new THREE.Vector3(depthLineOffset, -poolDepth, 0),
  ];
  const verticalGeometry = new THREE.BufferGeometry().setFromPoints(verticalPoints);
  const verticalLine = new THREE.Line(verticalGeometry, highlightMaterial);
  scene.add(verticalLine);
  
  // Top and bottom ticks
  const tickLength = 0.3;
  addHorizontalTick(scene, depthLineOffset, 0, 0, tickLength, highlightMaterial);
  addHorizontalTick(scene, depthLineOffset, -poolDepth, 0, tickLength, highlightMaterial);
  
  // Water level indicator
  const actualWaterLevel = -poolDepth + waterDepth;
  addHorizontalTick(scene, depthLineOffset, actualWaterLevel, 0, tickLength, lineMaterial);
  
  // Dimension labels positioned on the pool
  // Depth label (shallow end)
  addTextLabel(scene, `${shallowDepth.toFixed(1)}ft`, depthLineOffset + 0.8, -shallowDepth / 2, 0, 0x475569);
  
  // Total depth label
  addTextLabel(scene, `${deepDepth.toFixed(1)}ft`, depthLineOffset + 0.8, -deepDepth + 0.5, 0, 0x475569);
  
  // Water level label
  if (waterDepth < poolDepth) {
    addTextLabel(scene, `${waterDepth.toFixed(1)}ft`, depthLineOffset + 0.8, actualWaterLevel, 0, 0x0ea5e9, 0.7);
  }
  
  // Length dimension at the back
  const lengthY = 0.4;
  const lengthZ = -width / 2 - 1.2;
  const lengthPoints = [
    new THREE.Vector3(-length / 2, lengthY, lengthZ),
    new THREE.Vector3(length / 2, lengthY, lengthZ),
  ];
  const lengthGeometry = new THREE.BufferGeometry().setFromPoints(lengthPoints);
  const lengthLine = new THREE.Line(lengthGeometry, lineMaterial);
  scene.add(lengthLine);
  
  addVerticalTick(scene, -length / 2, lengthY, lengthZ, 0.2, lineMaterial);
  addVerticalTick(scene, length / 2, lengthY, lengthZ, 0.2, lineMaterial);
  addTextLabel(scene, `${length.toFixed(1)}ft`, 0, lengthY + 0.5, lengthZ, 0x64748b);
  
  // Width dimension on the right side
  const widthX = length / 2 + 1.2;
  const widthY = 0.4;
  const widthPoints = [
    new THREE.Vector3(widthX, widthY, -width / 2),
    new THREE.Vector3(widthX, widthY, width / 2),
  ];
  const widthGeometry = new THREE.BufferGeometry().setFromPoints(widthPoints);
  const widthLine = new THREE.Line(widthGeometry, lineMaterial);
  scene.add(widthLine);
  
  addVerticalTick(scene, widthX, widthY, -width / 2, 0.2, lineMaterial);
  addVerticalTick(scene, widthX, widthY, width / 2, 0.2, lineMaterial);
  addTextLabel(scene, `${width.toFixed(1)}ft`, widthX, widthY + 0.5, 0, 0x64748b);
}

function addTextLabel(scene, text, x, y, z, color = 0x1e293b, scale = 1) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 512;
  canvas.height = 128;
  
  // Convert hex color to CSS format
  const cssColor = '#' + color.toString(16).padStart(6, '0');
  
  context.fillStyle = cssColor;
  context.font = 'bold 64px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, 256, 64);
  
  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture, depthTest: false });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.position.set(x, y, z);
  sprite.scale.set(2 * scale, 0.5 * scale, 1);
  sprite.renderOrder = 999;
  scene.add(sprite);
}

function addHorizontalTick(scene, x, y, z, length, material) {
  const tickPoints = [
    new THREE.Vector3(x - length / 2, y, z),
    new THREE.Vector3(x + length / 2, y, z),
  ];
  const tickGeometry = new THREE.BufferGeometry().setFromPoints(tickPoints);
  const tick = new THREE.Line(tickGeometry, material);
  scene.add(tick);
}

function addVerticalTick(scene, x, y, z, length, material) {
  const tickPoints = [
    new THREE.Vector3(x, y - length / 2, z),
    new THREE.Vector3(x, y + length / 2, z),
  ];
  const tickGeometry = new THREE.BufferGeometry().setFromPoints(tickPoints);
  const tick = new THREE.Line(tickGeometry, material);
  scene.add(tick);
}

function createTick(x, y, z) {
  const tickGeometry = new THREE.BoxGeometry(0.15, 0.05, 0.05);
  const tickMaterial = new THREE.MeshBasicMaterial({ color: 0x64748b });
  const tick = new THREE.Mesh(tickGeometry, tickMaterial);
  tick.position.set(x, y, z);
  return tick;
}