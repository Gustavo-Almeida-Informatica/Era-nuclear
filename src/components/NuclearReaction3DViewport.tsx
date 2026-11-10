import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RotateCcw, Atom } from 'lucide-react';

export type SimMode = 'fission' | 'fusion';
export type FissionFuel = 'u235' | 'pu239';
export type FusionReaction = 'dt' | 'dd';

export interface NuclearReaction3DViewportProps {
  mode: SimMode;
  fissionFuel: FissionFuel;
  fusionReaction: FusionReaction;
  stage: number;
  speed: number;
  autoPlaying: boolean;
  resetSignal: number;
  onStageChange: (newStage: number) => void;
  onAutoPlayEnd: () => void;
}

interface FissionNucleonDescriptor {
  id: number;
  isProton: boolean;
  protonIdx: number; // 0..93
  neutronIdx: number; // 0..145
  isExtraIncoming: boolean; // True for the +1 absorbed neutron only visible as bound from Step 2 onwards
  becomesFreeInStep4: boolean; // Neck neutrons that become free neutrons in Step 4
  freeIdx: number; // 0..2 index if ejected in Step 4
  basePos: THREE.Vector3;
  dumbbellPos: THREE.Vector3;
  fragment: 'frag1' | 'frag2';
  fragLocalPos: THREE.Vector3;
}

interface FissionDataset {
  totalProtons: number;
  boundTargetNeutrons: number; // Neutrons initially inside target nucleus (Step 1)
  totalCompoundNeutrons: number; // Total bound neutrons in Steps 2 & 3 (target + 1 absorbed)
  freeNeutronCount: number;
  nucleons: FissionNucleonDescriptor[];
}

// Reusable module-scope math helpers (zero per-frame GC allocation)
const _vec3 = new THREE.Vector3();
const _vec3B = new THREE.Vector3();
const _vec3C = new THREE.Vector3();
const _quat = new THREE.Quaternion();
const _scaleVec = new THREE.Vector3(1, 1, 1);
const _mat4 = new THREE.Matrix4();
const _color = new THREE.Color();
const _upVec = new THREE.Vector3(0, 1, 0);

const COLOR_PROTON_HEX = 0x8f83ff;
const COLOR_NEUTRON_HEX = 0x73cae5;
const COLOR_PLASMA_HEX = 0xfbbf24;
const SCENE_BG_HEX = 0x060913;
const NUCLEON_RADIUS_FISSION = 0.38;
const NUCLEON_RADIUS_FUSION = 0.55;

function fibonacciSpherePositions(count: number, maxRadius: number): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const t = (i + 0.5) / count;
    const r = Math.cbrt(t) * maxRadius;
    const y = 1 - 2 * t;
    const radial = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    positions.push(new THREE.Vector3(Math.cos(theta) * radial * r, y * r, Math.sin(theta) * radial * r));
  }
  return positions;
}

function buildFissionDataset(fuel: FissionFuel): FissionDataset {
  const isPu = fuel === 'pu239';
  const totalProtons = isPu ? 94 : 92;
  const boundTargetNeutrons = isPu ? 145 : 143;
  const targetTotal = totalProtons + boundTargetNeutrons; // 235 or 239
  const frag1Protons = isPu ? 54 : 56; // Xe-134 (54p) or Ba-141 (56p)
  const frag1Neutrons = isPu ? 80 : 85;
  const frag2Neutrons = isPu ? 64 : 56;
  const neckEjectedCount = isPu ? 1 : 2; // Plus 1 incoming absorbed neutron = 2 or 3 free neutrons
  const freeNeutronCount = isPu ? 2 : 3;

  const spherePts = fibonacciSpherePositions(targetTotal, isPu ? 3.22 : 3.16);

  // Assign proton vs neutron evenly & isotropically throughout the 3D sphere (seeded Fisher-Yates shuffle avoids Fibonacci spiral bands)
  const indices = Array.from({ length: targetTotal }, (_, idx) => idx);
  let seed = isPu ? 9876543 : 1234567;
  for (let i = indices.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const j = seed % (i + 1);
    const tmp = indices[i];
    indices[i] = indices[j];
    indices[j] = tmp;
  }
  const protonSlotSet = new Set<number>(indices.slice(0, totalProtons));

  interface RawNode {
    pos: THREE.Vector3;
    isProton: boolean;
  }
  const rawNodes: RawNode[] = spherePts.map((pos, i) => ({
    pos,
    isProton: protonSlotSet.has(i),
  }));

  // Sort along X axis so left-side nucleons naturally coalesce into Frag 1 and right-side into Frag 2
  const protons = rawNodes.filter((n) => n.isProton).sort((a, b) => a.pos.x - b.pos.x);
  const neutrons = rawNodes.filter((n) => !n.isProton).sort((a, b) => a.pos.x - b.pos.x);

  // Pick central neck neutrons closest to x = 0 for free neutron ejection alongside absorbed neutron
  const neutronsByNeckProximity = neutrons
    .map((n, idx) => ({ n, idx, absX: Math.abs(n.pos.x) }))
    .sort((a, b) => a.absX - b.absX);
  const freeNeckSet = new Set<number>();
  for (let i = 0; i < neckEjectedCount; i++) {
    freeNeckSet.add(neutronsByNeckProximity[i].idx);
  }

  const remainingNeutrons = neutrons.filter((_, idx) => !freeNeckSet.has(idx));
  const neckNeutrons = neutrons.filter((_, idx) => freeNeckSet.has(idx));

  // Precompute spherical target slots for Daughter Fragment 1 & Daughter Fragment 2
  const frag1Total = frag1Protons + frag1Neutrons;
  const frag2Total = totalProtons - frag1Protons + frag2Neutrons;
  const frag1Slots = fibonacciSpherePositions(frag1Total, isPu ? 2.52 : 2.56).sort((a, b) => a.x - b.x || a.y - b.y);
  const frag2Slots = fibonacciSpherePositions(frag2Total, isPu ? 2.34 : 2.24).sort((a, b) => a.x - b.x || a.y - b.y);

  // Interleave fragment slots proportionally for protons & neutrons inside daughter nuclei
  let f1SlotPtr = 0;
  let f2SlotPtr = 0;

  const descriptors: FissionNucleonDescriptor[] = [];
  let idCounter = 0;
  let pInstIdx = 0;
  let nInstIdx = 0;

  // Helper to compute pinched liquid-drop dumbbell position at peak Step 3 deformation (connected peanut waist)
  const makeDumbbellPos = (base: THREE.Vector3, frag: 'frag1' | 'frag2' | 'neck'): THREE.Vector3 => {
    if (frag === 'neck') {
      return new THREE.Vector3(base.x * 0.45, base.y * 0.32, base.z * 0.32);
    }
    const signX = base.x < 0 ? -1 : 1;
    const absX = Math.abs(base.x) / 3.2;
    const stretchOffset = signX * (0.8 + Math.pow(absX, 0.65) * 1.9);
    const waistFactor = Math.max(0.28, Math.pow(absX, 0.78) * 0.72 + 0.28);
    return new THREE.Vector3(
      base.x * 1.08 + stretchOffset,
      base.y * waistFactor,
      base.z * waistFactor,
    );
  };

  // Assign protons -> frag1 & frag2
  const f1ProtonsList = protons.slice(0, frag1Protons);
  const f2ProtonsList = protons.slice(frag1Protons);

  // Merge Frag 1 protons + neutrons interleaved so spherical slots stay well mixed
  const f1NeutronsList = remainingNeutrons.slice(0, frag1Neutrons);
  const f2NeutronsList = remainingNeutrons.slice(frag1Neutrons);

  // Sort combined Frag 1 by X/Y for smooth deformation morph
  const f1Combined = [
    ...f1ProtonsList.map((n) => ({ ...n, role: 'p' as const })),
    ...f1NeutronsList.map((n) => ({ ...n, role: 'n' as const })),
  ].sort((a, b) => a.pos.x - b.pos.x || a.pos.y - b.pos.y);

  f1Combined.forEach((item) => {
    const slot = frag1Slots[Math.min(f1SlotPtr++, frag1Slots.length - 1)];
    descriptors.push({
      id: idCounter++,
      isProton: item.role === 'p',
      protonIdx: item.role === 'p' ? pInstIdx++ : -1,
      neutronIdx: item.role === 'n' ? nInstIdx++ : -1,
      isExtraIncoming: false,
      becomesFreeInStep4: false,
      freeIdx: -1,
      basePos: item.pos.clone(),
      dumbbellPos: makeDumbbellPos(item.pos, 'frag1'),
      fragment: 'frag1',
      fragLocalPos: slot.clone(),
    });
  });

  const f2Combined = [
    ...f2ProtonsList.map((n) => ({ ...n, role: 'p' as const })),
    ...f2NeutronsList.map((n) => ({ ...n, role: 'n' as const })),
  ].sort((a, b) => a.pos.x - b.pos.x || a.pos.y - b.pos.y);

  f2Combined.forEach((item) => {
    const slot = frag2Slots[Math.min(f2SlotPtr++, frag2Slots.length - 1)];
    descriptors.push({
      id: idCounter++,
      isProton: item.role === 'p',
      protonIdx: item.role === 'p' ? pInstIdx++ : -1,
      neutronIdx: item.role === 'n' ? nInstIdx++ : -1,
      isExtraIncoming: false,
      becomesFreeInStep4: false,
      freeIdx: -1,
      basePos: item.pos.clone(),
      dumbbellPos: makeDumbbellPos(item.pos, 'frag2'),
      fragment: 'frag2',
      fragLocalPos: slot.clone(),
    });
  });

  // Neck neutrons that stay inside [U-236]* / [Pu-240]* in Steps 1–3, then eject as free neutrons in Step 4
  neckNeutrons.forEach((item, idx) => {
    descriptors.push({
      id: idCounter++,
      isProton: false,
      protonIdx: -1,
      neutronIdx: nInstIdx++,
      isExtraIncoming: false,
      becomesFreeInStep4: true,
      freeIdx: idx,
      basePos: item.pos.clone(),
      dumbbellPos: makeDumbbellPos(item.pos, 'neck'),
      fragment: idx % 2 === 0 ? 'frag1' : 'frag2',
      fragLocalPos: new THREE.Vector3(0, 0, 0),
    });
  });

  // +1 absorbed incident neutron inside compound nucleus (visible in InstancedMesh during Steps 2 & 3, ejects in Step 4)
  descriptors.push({
    id: idCounter++,
    isProton: false,
    protonIdx: -1,
    neutronIdx: nInstIdx++,
    isExtraIncoming: true,
    becomesFreeInStep4: true,
    freeIdx: neckEjectedCount,
    basePos: new THREE.Vector3(-0.35, 0.15, 0.25),
    dumbbellPos: new THREE.Vector3(0.15, 0, 0.15),
    fragment: 'frag2',
    fragLocalPos: new THREE.Vector3(0, 0, 0),
  });

  return {
    totalProtons,
    boundTargetNeutrons,
    totalCompoundNeutrons: boundTargetNeutrons + 1,
    freeNeutronCount,
    nucleons: descriptors,
  };
}

const FISSION_DATASETS: Record<FissionFuel, FissionDataset> = {
  u235: buildFissionDataset('u235'),
  pu239: buildFissionDataset('pu239'),
};

function createRadialGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.32, 'rgba(255, 255, 255, 0.65)');
    grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.15)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function detectSoftwareGl(): { softwareGl: boolean; supported: boolean } {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl =
      (probeCanvas.getContext('webgl2') as WebGL2RenderingContext | null) ||
      (probeCanvas.getContext('webgl') as WebGLRenderingContext | null);
    if (!gl) return { softwareGl: true, supported: false };
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return {
      softwareGl: /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu),
      supported: true,
    };
  } catch {
    return { softwareGl: true, supported: false };
  }
}

function getDefaultCameraPosition(mode: SimMode, aspect: number): THREE.Vector3 {
  // Automatically pull back subtly on narrow portrait phones so left/right ejecta stay framed inside horizontal FOV
  const portraitCompensation = aspect < 1.15 ? THREE.MathUtils.clamp(1.15 / Math.max(aspect, 0.58), 1, 1.48) : 1;
  const baseZ = mode === 'fission' ? 21.5 : 15.8;
  return new THREE.Vector3(0, mode === 'fission' ? 2.2 : 1.6, baseZ * portraitCompensation);
}

function getStageStartTime(stageIdx: number): number {
  const clamped = Math.max(0, Math.min(3, stageIdx));
  return clamped * 5;
}

function getManualStageEntryOffset(mode: SimMode, stageIdx: number): number {
  if (stageIdx === 0) return 1.4;
  if (stageIdx === 1) return 1.6;
  if (stageIdx === 2) return mode === 'fission' ? 2.75 : 2.1;
  return mode === 'fission' ? 1.35 : 1.15;
}

export const NuclearReaction3DViewport: React.FC<NuclearReaction3DViewportProps> = ({
  mode,
  fissionFuel,
  fusionReaction,
  stage,
  speed,
  autoPlaying,
  resetSignal,
  onStageChange,
  onAutoPlayEnd,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const [webglUnavailable, setWebglUnavailable] = useState(false);
  const [contextLost, setContextLost] = useState(false);

  // Store latest React props & callbacks in mutable refs so WebGL context stays stable across state updates
  const propsRef = useRef({
    mode,
    fissionFuel,
    fusionReaction,
    stage,
    speed,
    autoPlaying,
    onStageChange,
    onAutoPlayEnd,
  });
  propsRef.current = {
    mode,
    fissionFuel,
    fusionReaction,
    stage,
    speed,
    autoPlaying,
    onStageChange,
    onAutoPlayEnd,
  };

  // Timeline & camera preset refs shared safely between React prop sync and WebGL loop
  const simStateRef = useRef({
    timeline: getStageStartTime(stage),
    stageClock: 0,
    lastStageSynced: stage,
    lastModeSynced: mode,
    lastFuelSynced: fissionFuel,
    lastFusionSynced: fusionReaction,
    lastAutoPlayingSynced: autoPlaying,
    lastResetSignal: resetSignal,
    cameraPresetActive: false,
    snapCameraImmediate: false,
    cameraTargetPos: new THREE.Vector3(0, 2.2, 21.5),
    aspect: 1.6,
  });
  const renderNowRef = useRef<(() => void) | null>(null);

  // React to explicit prop switches immediately without recreating WebGLRenderer
  useEffect(() => {
    const s = simStateRef.current;

    if (mode !== s.lastModeSynced) {
      s.lastModeSynced = mode;
      s.timeline = 0;
      s.stageClock = 0;
      s.lastStageSynced = 0;
      s.cameraTargetPos.copy(getDefaultCameraPosition(mode, s.aspect));
      s.cameraPresetActive = true;
      s.snapCameraImmediate = true;
    }

    if (fissionFuel !== s.lastFuelSynced) {
      s.lastFuelSynced = fissionFuel;
      s.timeline = getStageStartTime(stage);
      s.stageClock = 0;
    }

    if (fusionReaction !== s.lastFusionSynced) {
      s.lastFusionSynced = fusionReaction;
      s.timeline = getStageStartTime(stage);
      s.stageClock = 0;
    }

    if (resetSignal !== s.lastResetSignal) {
      s.lastResetSignal = resetSignal;
      s.timeline = 0;
      s.stageClock = 0;
      s.lastStageSynced = 0;
      s.cameraTargetPos.copy(getDefaultCameraPosition(mode, s.aspect));
      s.cameraPresetActive = true;
      s.snapCameraImmediate = true;
    }

    // Detect external React stage change (user clicked PASSO 01..04 card)
    if (stage !== s.lastStageSynced) {
      s.lastStageSynced = stage;
      const offset = autoPlaying ? 0 : getManualStageEntryOffset(mode, stage);
      s.stageClock = offset;
      s.timeline = getStageStartTime(stage) + offset;
    }

    // If user clicked Play while resting at the very end of Passo 04, rewind seamlessly to Passo 01
    if (autoPlaying && !s.lastAutoPlayingSynced) {
      const totalDur = mode === 'fission' ? 22 : 20;
      if (s.timeline >= totalDur - 0.3 || stage === 3) {
        s.stageClock = 0;
        s.timeline = getStageStartTime(stage === 3 ? 0 : stage);
        if (stage === 3) {
          s.lastStageSynced = 0;
          onStageChange(0);
        }
      }
    }
    s.lastAutoPlayingSynced = autoPlaying;

    // Render updated reaction / step immediately on next sync tick so UI and WebGL never lag out of sync
    renderNowRef.current?.();
  }, [mode, fissionFuel, fusionReaction, stage, autoPlaying, resetSignal, onStageChange]);

  const handleResetCamera = () => {
    const s = simStateRef.current;
    s.cameraTargetPos.copy(getDefaultCameraPosition(propsRef.current.mode, s.aspect));
    s.cameraPresetActive = true;
    renderNowRef.current?.();
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const { softwareGl, supported } = detectSoftwareGl();
    if (!supported) {
      setWebglUnavailable(true);
      return;
    }

    let disposed = false;
    let frameId = 0;
    let isContextCurrentlyLost = false;
    let activeSync: WebGLSync | null = null;

    const width = Math.max(container.clientWidth || 640, 280);
    const height = Math.max(container.clientHeight || 380, 260);
    simStateRef.current.aspect = width / height;

    // 1. Renderer setup with modern color pipeline and software-WebGL guard
    const renderer = new THREE.WebGLRenderer({
      antialias: !softwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(softwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    renderer.setClearColor(SCENE_BG_HEX, 1);
    renderer.shadowMap.enabled = false;

    const domCanvas = renderer.domElement;
    domCanvas.style.width = '100%';
    domCanvas.style.height = '100%';
    domCanvas.style.display = 'block';
    domCanvas.style.touchAction = 'pan-y';
    container.appendChild(domCanvas);

    // 2. Scene, Fog & Studio Environment Reflection (mandatory across all devices for calibrated PBR metallic reflections)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(SCENE_BG_HEX);
    scene.fog = new THREE.FogExp2(SCENE_BG_HEX, 0.014);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    scene.environmentIntensity = 0.52;
    roomEnv.dispose();
    pmremGenerator.dispose();

    // 3. Camera & OrbitControls
    const initialCam = getDefaultCameraPosition(propsRef.current.mode, width / height);
    simStateRef.current.cameraTargetPos.copy(initialCam);
    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 250);
    camera.position.copy(initialCam);

    const controls = new OrbitControls(camera, domCanvas);
    controls.enableDamping = !softwareGl;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 8;
    controls.maxDistance = 42;
    controls.minPolarAngle = 0.2;
    controls.maxPolarAngle = Math.PI - 0.2;
    controls.target.set(0, 0, 0);
    controls.update();

    const handleControlStart = () => {
      simStateRef.current.cameraPresetActive = false;
    };
    controls.addEventListener('start', handleControlStart);

    // 4. Balanced 3-Point Warm/Cool Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0x73cae5, 0x1b143b, 0.72);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e4, 1.35);
    keyLight.position.set(16, 22, 18);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x73cae5, 0.9);
    rimLight.position.set(-18, -12, -14);
    scene.add(rimLight);

    const violetPointLight = new THREE.PointLight(COLOR_PROTON_HEX, 1.8, 45);
    violetPointLight.position.set(-7, 2, 7);
    scene.add(violetPointLight);

    const cyanPointLight = new THREE.PointLight(COLOR_NEUTRON_HEX, 1.6, 45);
    cyanPointLight.position.set(7, -2, 7);
    scene.add(cyanPointLight);

    const coreFlashLight = new THREE.PointLight(0xfff6cf, 0, 55);
    coreFlashLight.position.set(0, 0, 2);
    scene.add(coreFlashLight);

    // Track disposable resources cleanly
    const disposableGeometries: THREE.BufferGeometry[] = [];
    const disposableMaterials: THREE.Material[] = [];
    const disposableTextures: THREE.Texture[] = [];

    const glowSpriteTex = createRadialGlowTexture();
    disposableTextures.push(glowSpriteTex);

    // 5. Cosmic Starfield & Subtle Containment Reference Ring
    const starCount = 650;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 24 + ((i * 73) % 52);
      const theta = i * 2.3999632;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / starCount);
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);

      const isViolet = i % 2 === 0;
      starColors[i * 3] = isViolet ? 0.58 : 0.45;
      starColors[i * 3 + 1] = isViolet ? 0.52 : 0.79;
      starColors[i * 3 + 2] = isViolet ? 1.0 : 0.9;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.4,
      map: glowSpriteTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);
    disposableGeometries.push(starGeo);
    disposableMaterials.push(starMat);

    // Subtle spatial measurement ring
    const trapRingGeo = new THREE.RingGeometry(11.4, 11.46, 84);
    const trapRingMat = new THREE.MeshBasicMaterial({
      color: 0x73cae5,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
    });
    const trapRing = new THREE.Mesh(trapRingGeo, trapRingMat);
    trapRing.rotation.x = Math.PI / 2.25;
    scene.add(trapRing);
    disposableGeometries.push(trapRingGeo);
    disposableMaterials.push(trapRingMat);

    // Shared PBR Nucleon Materials
    const protonMat = new THREE.MeshPhysicalMaterial({
      color: COLOR_PROTON_HEX,
      emissive: 0x2b1761,
      emissiveIntensity: 0.65,
      roughness: 0.22,
      metalness: 0.25,
      clearcoat: 0.75,
      clearcoatRoughness: 0.15,
    });
    const neutronMat = new THREE.MeshPhysicalMaterial({
      color: COLOR_NEUTRON_HEX,
      emissive: 0x0b3a4a,
      emissiveIntensity: 0.6,
      roughness: 0.22,
      metalness: 0.28,
      clearcoat: 0.8,
      clearcoatRoughness: 0.14,
    });
    disposableMaterials.push(protonMat, neutronMat);

    // =========================================================================
    // 6. FISSION SCENE GRAPH (InstancedMesh + Shockwave + Incident & Ejected Neutrons)
    // =========================================================================
    const fissionGroup = new THREE.Group();
    scene.add(fissionGroup);

    const fissionNucleonGeo = new THREE.SphereGeometry(NUCLEON_RADIUS_FISSION, 18, 14);
    disposableGeometries.push(fissionNucleonGeo);

    // Max counts cover both U-235 (92p, 144n) and Pu-239 (94p, 146n)
    const protonInstanced = new THREE.InstancedMesh(fissionNucleonGeo, protonMat, 94);
    protonInstanced.frustumCulled = false;
    protonInstanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    for (let i = 0; i < 94; i++) {
      const tint = 0.86 + (i % 5) * 0.04;
      _color.setHex(COLOR_PROTON_HEX).multiplyScalar(tint);
      protonInstanced.setColorAt(i, _color);
    }
    if (protonInstanced.instanceColor) protonInstanced.instanceColor.needsUpdate = true;
    fissionGroup.add(protonInstanced);

    const neutronInstanced = new THREE.InstancedMesh(fissionNucleonGeo, neutronMat, 146);
    neutronInstanced.frustumCulled = false;
    neutronInstanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    for (let i = 0; i < 146; i++) {
      const tint = 0.86 + (i % 5) * 0.04;
      _color.setHex(COLOR_NEUTRON_HEX).multiplyScalar(tint);
      neutronInstanced.setColorAt(i, _color);
    }
    if (neutronInstanced.instanceColor) neutronInstanced.instanceColor.needsUpdate = true;
    fissionGroup.add(neutronInstanced);

    // Soft feathered additive containment aura sprite (eliminates sharp sphere silhouette edges)
    const fissionAuraMat = new THREE.SpriteMaterial({
      map: glowSpriteTex,
      color: COLOR_NEUTRON_HEX,
      transparent: true,
      opacity: 0.24,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const fissionAuraSprite = new THREE.Sprite(fissionAuraMat);
    fissionAuraSprite.scale.set(10.5, 10.5, 1);
    fissionGroup.add(fissionAuraSprite);
    disposableMaterials.push(fissionAuraMat);

    // Repulsion halo rings during dumbbell Step 3
    const pinchRingGeo = new THREE.TorusGeometry(2.1, 0.04, 12, 56);
    const pinchRingMat = new THREE.MeshBasicMaterial({
      color: COLOR_PROTON_HEX,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const pinchRing = new THREE.Mesh(pinchRingGeo, pinchRingMat);
    pinchRing.rotation.y = Math.PI / 2;
    fissionGroup.add(pinchRing);
    disposableGeometries.push(pinchRingGeo);
    disposableMaterials.push(pinchRingMat);

    // Wireframe cyan shockwave sphere for Step 4 rupture
    const fissionShockGeo = new THREE.IcosahedronGeometry(1, 2);
    const fissionShockMat = new THREE.MeshBasicMaterial({
      color: COLOR_NEUTRON_HEX,
      wireframe: true,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const fissionShockwave = new THREE.Mesh(fissionShockGeo, fissionShockMat);
    fissionGroup.add(fissionShockwave);
    disposableGeometries.push(fissionShockGeo);
    disposableMaterials.push(fissionShockMat);

    // Flash burst core in Step 4
    const coreBurstGeo = new THREE.SphereGeometry(1, 24, 18);
    const fissionCoreBurstMat = new THREE.MeshBasicMaterial({
      color: 0xfff6cf,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const fissionCoreBurst = new THREE.Mesh(coreBurstGeo, fissionCoreBurstMat);
    fissionGroup.add(fissionCoreBurst);
    disposableGeometries.push(coreBurstGeo);
    disposableMaterials.push(fissionCoreBurstMat);

    // Incident thermal neutron composite (core + outer halo + trajectory line)
    const incidentNeutronGroup = new THREE.Group();
    const thermalCoreGeo = new THREE.SphereGeometry(0.45, 22, 16);
    const thermalHaloGeo = new THREE.SphereGeometry(0.75, 18, 14);
    const thermalHaloMat = new THREE.MeshBasicMaterial({
      color: COLOR_NEUTRON_HEX,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const thermalCoreMesh = new THREE.Mesh(thermalCoreGeo, neutronMat);
    const thermalHaloMesh = new THREE.Mesh(thermalHaloGeo, thermalHaloMat);
    incidentNeutronGroup.add(thermalCoreMesh, thermalHaloMesh);
    fissionGroup.add(incidentNeutronGroup);
    disposableGeometries.push(thermalCoreGeo, thermalHaloGeo);
    disposableMaterials.push(thermalHaloMat);

    const trajectoryPoints = [new THREE.Vector3(-12.5, 0, 0), new THREE.Vector3(-3.3, 0, 0)];
    const fissionTrajGeo = new THREE.BufferGeometry().setFromPoints(trajectoryPoints);
    const fissionTrajMat = new THREE.LineDashedMaterial({
      color: COLOR_NEUTRON_HEX,
      dashSize: 0.45,
      gapSize: 0.35,
      transparent: true,
      opacity: 0.45,
    });
    const fissionTrajLine = new THREE.Line(fissionTrajGeo, fissionTrajMat);
    fissionTrajLine.computeLineDistances();
    fissionGroup.add(fissionTrajLine);
    disposableGeometries.push(fissionTrajGeo);
    disposableMaterials.push(fissionTrajMat);

    // 3 Ejected free neutron groups with additive energy trails for Step 4
    const freeNeutronDirs = [
      new THREE.Vector3(0.22, 0.92, 0.34).normalize(),
      new THREE.Vector3(-0.32, -0.84, 0.44).normalize(),
      new THREE.Vector3(0.28, -0.78, -0.56).normalize(),
    ];
    const ejectedNeutronItems = freeNeutronDirs.map((dir) => {
      const grp = new THREE.Group();
      const mesh = new THREE.Mesh(thermalCoreGeo, neutronMat);
      const halo = new THREE.Mesh(thermalHaloGeo, thermalHaloMat);
      grp.add(mesh, halo);
      fissionGroup.add(grp);

      const trailPts = new Float32Array([0, 0, 0, dir.x, dir.y, dir.z]);
      const trailGeo = new THREE.BufferGeometry();
      const trailAttr = new THREE.BufferAttribute(trailPts, 3);
      trailGeo.setAttribute('position', trailAttr);
      const trailMat = new THREE.LineBasicMaterial({
        color: COLOR_NEUTRON_HEX,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      });
      const trail = new THREE.Line(trailGeo, trailMat);
      fissionGroup.add(trail);
      disposableGeometries.push(trailGeo);
      disposableMaterials.push(trailMat);

      return { grp, trail, trailAttr, dir };
    });

    // =========================================================================
    // 7. FUSION SCENE GRAPH (Plasma + 5 Composite Nucleons + Coulomb Shield + Tunnel Torus)
    // =========================================================================
    const fusionGroup = new THREE.Group();
    scene.add(fusionGroup);

    // Ambient golden-amber plasma field particles
    const plasmaCount = 150;
    const plasmaGeo = new THREE.BufferGeometry();
    const plasmaPos = new Float32Array(plasmaCount * 3);
    for (let i = 0; i < plasmaCount; i++) {
      const angle = i * 2.39996;
      const rad = 2.2 + ((i * 37) % 100) / 11;
      plasmaPos[i * 3] = Math.cos(angle) * rad * (i % 2 === 0 ? 1 : 0.78);
      plasmaPos[i * 3 + 1] = ((i * 53) % 100 - 50) * 0.11;
      plasmaPos[i * 3 + 2] = Math.sin(angle) * rad * 0.85;
    }
    plasmaGeo.setAttribute('position', new THREE.BufferAttribute(plasmaPos, 3));
    const plasmaMat = new THREE.PointsMaterial({
      size: 0.45,
      map: glowSpriteTex,
      color: COLOR_PLASMA_HEX,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const plasmaPoints = new THREE.Points(plasmaGeo, plasmaMat);
    fusionGroup.add(plasmaPoints);
    disposableGeometries.push(plasmaGeo);
    disposableMaterials.push(plasmaMat);

    // Fusion composite nucleons (0: deutP, 1: deutN, 2: tritP, 3: tritN1, 4: tritN2)
    const fusionSphereGeo = new THREE.SphereGeometry(NUCLEON_RADIUS_FUSION, 28, 22);
    const fusionHaloGeo = new THREE.SphereGeometry(NUCLEON_RADIUS_FUSION * 1.38, 20, 16);
    const fusionAccentRingGeo = new THREE.TorusGeometry(NUCLEON_RADIUS_FUSION * 1.03, 0.032, 10, 32);

    const fusionProtonHaloMat = new THREE.MeshBasicMaterial({
      color: COLOR_PROTON_HEX,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const fusionNeutronHaloMat = new THREE.MeshBasicMaterial({
      color: COLOR_NEUTRON_HEX,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const accentRingMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.85,
      transparent: true,
      opacity: 0.4,
    });
    disposableGeometries.push(fusionSphereGeo, fusionHaloGeo, fusionAccentRingGeo);
    disposableMaterials.push(fusionProtonHaloMat, fusionNeutronHaloMat, accentRingMat);

    const createFusionNucleon = (isProton: boolean): THREE.Group => {
      const grp = new THREE.Group();
      const sphere = new THREE.Mesh(fusionSphereGeo, isProton ? protonMat : neutronMat);
      const accentRing = new THREE.Mesh(fusionAccentRingGeo, accentRingMat);
      accentRing.rotation.x = Math.PI / 3;
      const halo = new THREE.Mesh(fusionHaloGeo, isProton ? fusionProtonHaloMat : fusionNeutronHaloMat);
      grp.add(sphere, accentRing, halo);
      fusionGroup.add(grp);
      return grp;
    };

    const fusionNucleons = {
      deutP: createFusionNucleon(true),
      deutN: createFusionNucleon(false),
      tritP: createFusionNucleon(true),
      tritN1: createFusionNucleon(false),
      tritN2: createFusionNucleon(false),
    };

    // Dynamic nuclear strong-force bond cylinders (up to 6 bonds)
    const bondGeo = new THREE.CylinderGeometry(0.065, 0.065, 1, 10);
    const bondMat = new THREE.MeshBasicMaterial({
      color: 0xd8d5ff,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposableGeometries.push(bondGeo);
    disposableMaterials.push(bondMat);
    const bondMeshes: THREE.Mesh[] = Array.from({ length: 6 }, () => {
      const m = new THREE.Mesh(bondGeo, bondMat);
      fusionGroup.add(m);
      return m;
    });

    const placeBond = (mesh: THREE.Mesh, a: THREE.Vector3, b: THREE.Vector3, visible: boolean) => {
      mesh.visible = visible;
      if (!visible) return;
      _vec3.addVectors(a, b).multiplyScalar(0.5);
      _vec3B.subVectors(b, a);
      const len = _vec3B.length();
      if (len < 0.001) {
        mesh.visible = false;
        return;
      }
      mesh.position.copy(_vec3);
      _vec3B.normalize();
      mesh.quaternion.setFromUnitVectors(_upVec, _vec3B);
      mesh.scale.set(1, len, 1);
    };

    // Dashed approach guide lines for Fusion Step 1
    const fTrajLGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-7.4, 0, 0),
      new THREE.Vector3(-1.9, 0, 0),
    ]);
    const fTrajRGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(7.4, 0, 0),
      new THREE.Vector3(1.9, 0, 0),
    ]);
    const fTrajMat = new THREE.LineDashedMaterial({
      color: COLOR_PROTON_HEX,
      dashSize: 0.35,
      gapSize: 0.3,
      transparent: true,
      opacity: 0.4,
    });
    const fTrajL = new THREE.Line(fTrajLGeo, fTrajMat);
    const fTrajR = new THREE.Line(fTrajRGeo, fTrajMat);
    fTrajL.computeLineDistances();
    fTrajR.computeLineDistances();
    fusionGroup.add(fTrajL, fTrajR);
    disposableGeometries.push(fTrajLGeo, fTrajRGeo);
    disposableMaterials.push(fTrajMat);

    // Coulomb repulsion wireframe sphere
    const barrierGeo = new THREE.SphereGeometry(2.35, 28, 20);
    const barrierMat = new THREE.MeshBasicMaterial({
      color: COLOR_PROTON_HEX,
      wireframe: true,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const coulombBarrierMesh = new THREE.Mesh(barrierGeo, barrierMat);
    fusionGroup.add(coulombBarrierMesh);
    disposableGeometries.push(barrierGeo);
    disposableMaterials.push(barrierMat);

    // Twin quantum-tunneling rings
    const tunnelGeo = new THREE.TorusGeometry(2.1, 0.048, 14, 64);
    const tunnelCyanMat = new THREE.MeshBasicMaterial({
      color: COLOR_NEUTRON_HEX,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const tunnelVioletMat = new THREE.MeshBasicMaterial({
      color: COLOR_PROTON_HEX,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const tunnelRing1 = new THREE.Mesh(tunnelGeo, tunnelCyanMat);
    const tunnelRing2 = new THREE.Mesh(tunnelGeo, tunnelVioletMat);
    fusionGroup.add(tunnelRing1, tunnelRing2);
    disposableGeometries.push(tunnelGeo);
    disposableMaterials.push(tunnelCyanMat, tunnelVioletMat);

    // Coalescence flash & Step 4 shockwave
    const fusionFlashMat = new THREE.MeshBasicMaterial({
      color: 0xfff6cf,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const fusionFlashMesh = new THREE.Mesh(coreBurstGeo, fusionFlashMat);
    fusionGroup.add(fusionFlashMesh);
    disposableMaterials.push(fusionFlashMat);

    // High-energy ejected neutron trail in Fusion Step 4
    const fNeutronTrailPts = new Float32Array([0, 0, 0, 1, 0.4, 0]);
    const fNeutronTrailGeo = new THREE.BufferGeometry();
    const fNeutronTrailAttr = new THREE.BufferAttribute(fNeutronTrailPts, 3);
    fNeutronTrailGeo.setAttribute('position', fNeutronTrailAttr);
    const fNeutronTrailMat = new THREE.LineBasicMaterial({
      color: COLOR_NEUTRON_HEX,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const fNeutronTrailLine = new THREE.Line(fNeutronTrailGeo, fNeutronTrailMat);
    fusionGroup.add(fNeutronTrailLine);
    disposableGeometries.push(fNeutronTrailGeo);
    disposableMaterials.push(fNeutronTrailMat);

    // Pre-compile shaders for both Fission and Fusion subgraphs upfront to eliminate mode-switch stall
    fissionGroup.visible = true;
    fusionGroup.visible = true;
    renderer.compile(scene, camera);
    fissionGroup.visible = propsRef.current.mode === 'fission';
    fusionGroup.visible = propsRef.current.mode === 'fusion';

    // ResizeObserver for crisp layout across desktop, tablet, and mobile viewports
    const handleResize = () => {
      if (!container || disposed) return;
      const w = Math.max(container.clientWidth, 240);
      const h = Math.max(container.clientHeight, 220);
      simStateRef.current.aspect = w / h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(handleResize) : null;
    resizeObserver?.observe(container);
    window.addEventListener('resize', handleResize);

    // WebGL context loss safety handlers
    const onContextLost = (e: Event) => {
      e.preventDefault();
      isContextCurrentlyLost = true;
      setContextLost(true);
    };
    const onContextRestored = () => {
      isContextCurrentlyLost = false;
      setContextLost(false);
    };
    domCanvas.addEventListener('webglcontextlost', onContextLost);
    domCanvas.addEventListener('webglcontextrestored', onContextRestored);

    // =========================================================================
    // 8. PER-FRAME TIMELINE & PHYSICS UPDATE (Zero GC)
    // =========================================================================
    const updateFissionScene = (t: number, globalClock: number, fuel: FissionFuel) => {
      const ds = FISSION_DATASETS[fuel];
      protonInstanced.count = ds.totalProtons;
      neutronInstanced.count = ds.totalCompoundNeutrons;

      // Subtle parent group float & spin in Stages 0..2
      fissionGroup.rotation.y = t < 15 ? Math.sin(globalClock * 0.4) * 0.25 : 0;

      // PHASE 1 (0s .. 5s): Incoming thermal neutron approaches breathing nucleus
      if (t < 5) {
        const p = THREE.MathUtils.clamp(t / 5, 0, 1);
        const eased = 1 - Math.pow(1 - p, 2);

        incidentNeutronGroup.visible = true;
        incidentNeutronGroup.position.set(-12.5 + eased * 8.9, Math.sin(globalClock * 3.5) * 0.16, 0);
        fissionTrajLine.visible = true;
        fissionTrajMat.opacity = 0.45 * (1 - p * 0.4);

        fissionAuraMat.color.setHex(COLOR_NEUTRON_HEX);
        fissionAuraMat.opacity = 0.24 + Math.sin(globalClock * 2.5) * 0.06;
        fissionAuraSprite.position.set(0, 0, 0);
        fissionAuraSprite.scale.set(10.5, 10.5, 1);

        pinchRingMat.opacity = 0;
        fissionShockMat.opacity = 0;
        fissionShockwave.visible = false;
        fissionCoreBurstMat.opacity = 0;
        coreFlashLight.intensity = 0;
        ejectedNeutronItems.forEach((item) => {
          item.grp.visible = false;
          item.trail.visible = false;
        });

        protonMat.emissive.setHex(0x2b1761);
        neutronMat.emissive.setHex(0x0b3a4a);

        for (let i = 0; i < ds.nucleons.length; i++) {
          const n = ds.nucleons[i];
          if (n.isExtraIncoming) {
            _mat4.makeScale(0, 0, 0);
            neutronInstanced.setMatrixAt(n.neutronIdx, _mat4);
            continue;
          }
          const breath = 1 + Math.sin(globalClock * 3.2 + n.basePos.x * 0.7) * 0.025;
          _vec3.copy(n.basePos).multiplyScalar(breath);
          _quat.identity();
          _scaleVec.set(1, 1, 1);
          _mat4.compose(_vec3, _quat, _scaleVec);
          if (n.isProton) protonInstanced.setMatrixAt(n.protonIdx, _mat4);
          else neutronInstanced.setMatrixAt(n.neutronIdx, _mat4);
        }
      }
      // PHASE 2 (5s .. 10s): Absorption & Excited Compound Resonance [236U]* / [240Pu]*
      else if (t < 10) {
        const stepT = t - 5;
        fissionTrajLine.visible = false;
        pinchRingMat.opacity = 0;
        fissionShockwave.visible = false;
        fissionCoreBurstMat.opacity = 0;
        ejectedNeutronItems.forEach((item) => {
          item.grp.visible = false;
          item.trail.visible = false;
        });

        if (stepT < 0.75) {
          const captureP = stepT / 0.75;
          incidentNeutronGroup.visible = true;
          incidentNeutronGroup.position.set(THREE.MathUtils.lerp(-3.6, 0, captureP), 0, 0);
        } else {
          incidentNeutronGroup.visible = false;
        }

        const energyRamp = THREE.MathUtils.clamp(stepT / 1.5, 0.25, 1);
        fissionAuraMat.color.setHex(COLOR_PLASMA_HEX);
        fissionAuraMat.opacity = (0.34 + Math.sin(stepT * 18) * 0.12) * energyRamp;
        fissionAuraSprite.position.set(0, 0, 0);
        const auraPulse = 11.2 + Math.sin(stepT * 14) * 0.85;
        fissionAuraSprite.scale.set(auraPulse, auraPulse, 1);
        coreFlashLight.intensity = 1.6 * energyRamp;

        protonMat.emissive.setHex(0x4b2498);
        neutronMat.emissive.setHex(0x165e75);

        const amp = 0.14 * energyRamp;
        const stretchWobble = 1 + Math.sin(stepT * 14) * 0.08 * energyRamp;

        for (let i = 0; i < ds.nucleons.length; i++) {
          const n = ds.nucleons[i];
          if (n.isExtraIncoming && stepT < 0.75) {
            _mat4.makeScale(0, 0, 0);
            neutronInstanced.setMatrixAt(n.neutronIdx, _mat4);
            continue;
          }
          const vibX = Math.sin(stepT * 28 + n.id * 1.9) * amp;
          const vibY = Math.cos(stepT * 26 + n.id * 2.3) * amp;
          const vibZ = Math.sin(stepT * 30 + n.id * 1.1) * amp;
          _vec3.set(
            n.basePos.x * stretchWobble + vibX,
            (n.basePos.y / stretchWobble) + vibY,
            (n.basePos.z / stretchWobble) + vibZ,
          );
          _quat.identity();
          _scaleVec.set(1, 1, 1);
          _mat4.compose(_vec3, _quat, _scaleVec);
          if (n.isProton) protonInstanced.setMatrixAt(n.protonIdx, _mat4);
          else neutronInstanced.setMatrixAt(n.neutronIdx, _mat4);
        }
      }
      // PHASE 3 (10s .. 15s): Liquid-Drop Dumbbell Deformation & Waist Pinching
      else if (t < 15) {
        const stepT = t - 10;
        const p = THREE.MathUtils.clamp(stepT / 5, 0, 1);
        const eased = p * p * (3 - 2 * p);

        incidentNeutronGroup.visible = false;
        fissionTrajLine.visible = false;
        fissionShockwave.visible = false;
        fissionCoreBurstMat.opacity = 0;
        coreFlashLight.intensity = 1.4;
        ejectedNeutronItems.forEach((item) => {
          item.grp.visible = false;
          item.trail.visible = false;
        });

        fissionAuraMat.color.setHex(COLOR_PROTON_HEX);
        fissionAuraMat.opacity = 0.34;
        fissionAuraSprite.position.set(0, 0, 0);
        fissionAuraSprite.scale.set(11 + eased * 6.5, 9.2 - eased * 1.2, 1);

        pinchRingMat.opacity = (0.25 + Math.sin(stepT * 10) * 0.12) * eased;
        pinchRing.scale.setScalar(1.3 - eased * 0.55);

        protonMat.emissive.setHex(0x3a1c78);
        neutronMat.emissive.setHex(0x0f495c);

        for (let i = 0; i < ds.nucleons.length; i++) {
          const n = ds.nucleons[i];
          const ripple = Math.sin(stepT * 16 + n.basePos.x * 1.4) * 0.08;
          _vec3.lerpVectors(n.basePos, n.dumbbellPos, eased);
          _vec3.y += ripple;
          _vec3.z += Math.cos(stepT * 14 + n.id) * 0.06;
          _quat.identity();
          _scaleVec.set(1, 1, 1);
          _mat4.compose(_vec3, _quat, _scaleVec);
          if (n.isProton) protonInstanced.setMatrixAt(n.protonIdx, _mat4);
          else neutronInstanced.setMatrixAt(n.neutronIdx, _mat4);
        }
      }
      // PHASE 4 (15s .. 22s): Violent Rupture -> Two Daughter Spheres + Wireframe Shockwave + Ejected Neutrons
      else {
        const stepT = t - 15;
        const recoilP = THREE.MathUtils.clamp(stepT / 4.2, 0, 1);
        const recoilEase = 1 - Math.pow(1 - recoilP, 2.2);
        const clusterFormP = THREE.MathUtils.clamp(stepT / 0.85, 0, 1);
        const wobble = Math.exp(-stepT * 1.4) * Math.sin(stepT * 16) * 0.18;

        incidentNeutronGroup.visible = false;
        fissionTrajLine.visible = false;
        pinchRingMat.opacity = 0;
        fissionAuraMat.opacity = 0;

        protonMat.emissive.setHex(0x2b1761);
        neutronMat.emissive.setHex(0x0b3a4a);

        // Daughter centers travel in opposite momentum directions within clear framing
        const sepX = 2.6 + recoilEase * 5.2;
        const sepY = recoilEase * 0.9;
        const sepZ = recoilEase * 0.4;
        _vec3B.set(-sepX, -sepY, sepZ); // Fragment 1 center (Ba-141 or Xe-134)
        _vec3C.set(sepX, sepY, -sepZ); // Fragment 2 center (Kr-92 or Zr-104)

        // Shockwave & core flash burst
        if (stepT < 2.6) {
          fissionShockwave.visible = true;
          fissionShockwave.scale.setScalar(0.5 + stepT * 6.5);
          fissionShockwave.rotation.y = stepT * 1.4;
          fissionShockMat.opacity = Math.max(0, 0.78 * (1 - stepT / 2.6));
        } else {
          fissionShockwave.visible = false;
          fissionShockMat.opacity = 0;
        }

        if (stepT < 1.2) {
          const flashP = stepT / 1.2;
          fissionCoreBurst.scale.setScalar(0.8 + flashP * 5.2);
          fissionCoreBurstMat.opacity = Math.max(0, 0.92 * (1 - flashP));
          coreFlashLight.intensity = 10 * Math.max(0, 1 - flashP);
        } else {
          fissionCoreBurstMat.opacity = 0;
          coreFlashLight.intensity = 0;
        }

        // Update bound nucleons into compact daughter spheres & hide those transferred to free neutrons
        const clusterSpin = stepT * 0.9;
        const cosS = Math.cos(clusterSpin);
        const sinS = Math.sin(clusterSpin);

        for (let i = 0; i < ds.nucleons.length; i++) {
          const n = ds.nucleons[i];
          if (n.becomesFreeInStep4) {
            _mat4.makeScale(0, 0, 0);
            neutronInstanced.setMatrixAt(n.neutronIdx, _mat4);
            continue;
          }
          const center = n.fragment === 'frag1' ? _vec3B : _vec3C;
          // Rotate local spherical offset subtly
          const rx = n.fragLocalPos.x * cosS - n.fragLocalPos.z * sinS;
          const rz = n.fragLocalPos.x * sinS + n.fragLocalPos.z * cosS;
          const targetX = center.x + rx * (1 + wobble);
          const targetY = center.y + n.fragLocalPos.y * (1 - wobble * 0.6);
          const targetZ = center.z + rz * (1 + wobble);

          _vec3.set(
            THREE.MathUtils.lerp(n.dumbbellPos.x, targetX, clusterFormP),
            THREE.MathUtils.lerp(n.dumbbellPos.y, targetY, clusterFormP),
            THREE.MathUtils.lerp(n.dumbbellPos.z, targetZ, clusterFormP),
          );
          _quat.identity();
          _scaleVec.set(1, 1, 1);
          _mat4.compose(_vec3, _quat, _scaleVec);
          if (n.isProton) protonInstanced.setMatrixAt(n.protonIdx, _mat4);
          else neutronInstanced.setMatrixAt(n.neutronIdx, _mat4);
        }

        // Eject 2 (Pu-239) or 3 (U-235) high-speed free neutrons with trails
        ejectedNeutronItems.forEach((item, idx) => {
          if (idx >= ds.freeNeutronCount) {
            item.grp.visible = false;
            item.trail.visible = false;
            return;
          }
          item.grp.visible = true;
          item.trail.visible = true;
          const travel = Math.min(11.5, stepT * (5.2 + idx * 0.95));
          item.grp.position.copy(item.dir).multiplyScalar(travel);

          const arr = item.trailAttr.array as Float32Array;
          arr[0] = 0;
          arr[1] = 0;
          arr[2] = 0;
          arr[3] = item.grp.position.x;
          arr[4] = item.grp.position.y;
          arr[5] = item.grp.position.z;
          item.trailAttr.needsUpdate = true;
        });
      }

      protonInstanced.instanceMatrix.needsUpdate = true;
      neutronInstanced.instanceMatrix.needsUpdate = true;
    };

    const updateFusionScene = (t: number, globalClock: number, reaction: FusionReaction) => {
      const isDD = reaction === 'dd';
      plasmaPoints.rotation.y = globalClock * 0.25;
      plasmaPoints.rotation.x = Math.sin(globalClock * 0.2) * 0.08;

      // Tritium's 2nd neutron only exists in D-T reaction
      fusionNucleons.tritN2.visible = !isDD;

      // PHASE 1 (0s .. 5s): Light nuclei accelerating toward each other
      if (t < 5) {
        const p = THREE.MathUtils.clamp(t / 5, 0, 1);
        const eased = p * p * (3 - 2 * p);

        coulombBarrierMesh.visible = false;
        tunnelRing1.visible = false;
        tunnelRing2.visible = false;
        fusionFlashMat.opacity = 0;
        coreFlashLight.intensity = 0;
        fNeutronTrailLine.visible = false;
        fTrajL.visible = true;
        fTrajR.visible = true;
        fTrajMat.opacity = 0.42 * (1 - p * 0.5);

        const leftX = -7.2 + eased * 5.2;
        const rightX = 7.2 - eased * 5.2;
        const bobL = Math.sin(globalClock * 5) * 0.16;
        const bobR = Math.cos(globalClock * 5) * 0.16;
        const spinL = globalClock * 2.2;
        const spinR = -globalClock * 2.0;

        // Deuterium (²H) left cluster
        const rD = NUCLEON_RADIUS_FUSION * 0.92;
        fusionNucleons.deutP.position.set(leftX + Math.cos(spinL) * rD, bobL + Math.sin(spinL) * rD, Math.sin(spinL * 0.7) * 0.25);
        fusionNucleons.deutN.position.set(leftX - Math.cos(spinL) * rD, bobL - Math.sin(spinL) * rD, -Math.sin(spinL * 0.7) * 0.25);
        placeBond(bondMeshes[0], fusionNucleons.deutP.position, fusionNucleons.deutN.position, true);

        // Partner nucleus right: Tritium (³H) or 2nd Deuterium (²H)
        if (isDD) {
          fusionNucleons.tritP.position.set(rightX + Math.cos(spinR) * rD, bobR + Math.sin(spinR) * rD, Math.cos(spinR * 0.7) * 0.25);
          fusionNucleons.tritN1.position.set(rightX - Math.cos(spinR) * rD, bobR - Math.sin(spinR) * rD, -Math.cos(spinR * 0.7) * 0.25);
          placeBond(bondMeshes[1], fusionNucleons.tritP.position, fusionNucleons.tritN1.position, true);
          for (let i = 2; i < bondMeshes.length; i++) bondMeshes[i].visible = false;
        } else {
          const rT = NUCLEON_RADIUS_FUSION * 1.05;
          fusionNucleons.tritP.position.set(rightX + Math.cos(spinR) * rT, bobR + Math.sin(spinR) * rT, 0.22);
          fusionNucleons.tritN1.position.set(rightX + Math.cos(spinR + 2.094) * rT, bobR + Math.sin(spinR + 2.094) * rT, -0.22);
          fusionNucleons.tritN2.position.set(rightX + Math.cos(spinR + 4.189) * rT, bobR + Math.sin(spinR + 4.189) * rT, 0.15);
          placeBond(bondMeshes[1], fusionNucleons.tritP.position, fusionNucleons.tritN1.position, true);
          placeBond(bondMeshes[2], fusionNucleons.tritN1.position, fusionNucleons.tritN2.position, true);
          placeBond(bondMeshes[3], fusionNucleons.tritN2.position, fusionNucleons.tritP.position, true);
          bondMeshes[4].visible = false;
          bondMeshes[5].visible = false;
        }
      }
      // PHASE 2 (5s .. 10s): Coulomb Repulsion Barrier & Quantum Tunneling Rings
      else if (t < 10) {
        const stepT = t - 5;
        const p = THREE.MathUtils.clamp(stepT / 5, 0, 1);

        fTrajL.visible = false;
        fTrajR.visible = false;
        fusionFlashMat.opacity = 0;
        coreFlashLight.intensity = 1.2;
        fNeutronTrailLine.visible = false;

        coulombBarrierMesh.visible = true;
        coulombBarrierMesh.scale.setScalar(1 + Math.sin(stepT * 10) * 0.14);
        coulombBarrierMesh.rotation.y = stepT * 0.8;
        barrierMat.opacity = 0.28 + Math.sin(stepT * 16) * 0.16;

        tunnelRing1.visible = true;
        tunnelRing2.visible = true;
        tunnelRing1.rotation.set(stepT * 2.2, stepT * 3.4, 0);
        tunnelRing2.rotation.set(-stepT * 1.8, stepT * 2.6, Math.PI / 2);
        const ringScale = 0.84 + Math.sin(stepT * 8) * 0.22;
        tunnelRing1.scale.setScalar(ringScale);
        tunnelRing2.scale.setScalar(1.08 - Math.sin(stepT * 8) * 0.18);
        tunnelCyanMat.opacity = 0.48 + Math.cos(stepT * 12) * 0.22;
        tunnelVioletMat.opacity = 0.4 + Math.sin(stepT * 12) * 0.2;

        const jitter = Math.sin(stepT * 34) * 0.08;
        const leftX = -2.0 + p * 0.65 + jitter;
        const rightX = 2.0 - p * 0.65 - jitter;
        const spinL = stepT * 4.5;
        const spinR = -stepT * 4.5;

        const rD = NUCLEON_RADIUS_FUSION * 0.9;
        fusionNucleons.deutP.position.set(leftX + Math.cos(spinL) * rD, Math.sin(spinL) * rD, 0.18);
        fusionNucleons.deutN.position.set(leftX - Math.cos(spinL) * rD, -Math.sin(spinL) * rD, -0.18);
        placeBond(bondMeshes[0], fusionNucleons.deutP.position, fusionNucleons.deutN.position, true);

        if (isDD) {
          fusionNucleons.tritP.position.set(rightX + Math.cos(spinR) * rD, Math.sin(spinR) * rD, -0.18);
          fusionNucleons.tritN1.position.set(rightX - Math.cos(spinR) * rD, -Math.sin(spinR) * rD, 0.18);
          placeBond(bondMeshes[1], fusionNucleons.tritP.position, fusionNucleons.tritN1.position, true);
          for (let i = 2; i < bondMeshes.length; i++) bondMeshes[i].visible = false;
        } else {
          const rT = NUCLEON_RADIUS_FUSION * 1.02;
          fusionNucleons.tritP.position.set(rightX + Math.cos(spinR) * rT, Math.sin(spinR) * rT, 0.2);
          fusionNucleons.tritN1.position.set(rightX + Math.cos(spinR + 2.094) * rT, Math.sin(spinR + 2.094) * rT, -0.2);
          fusionNucleons.tritN2.position.set(rightX + Math.cos(spinR + 4.189) * rT, Math.sin(spinR + 4.189) * rT, 0.15);
          placeBond(bondMeshes[1], fusionNucleons.tritP.position, fusionNucleons.tritN1.position, true);
          placeBond(bondMeshes[2], fusionNucleons.tritN1.position, fusionNucleons.tritN2.position, true);
          placeBond(bondMeshes[3], fusionNucleons.tritN2.position, fusionNucleons.tritP.position, true);
          bondMeshes[4].visible = false;
          bondMeshes[5].visible = false;
        }
      }
      // PHASE 3 (10s .. 15s): Coalescence & Excited Compound [5He]* / [4He]*
      else if (t < 15) {
        const stepT = t - 10;
        const p = THREE.MathUtils.clamp(stepT / 5, 0, 1);

        fTrajL.visible = false;
        fTrajR.visible = false;
        coulombBarrierMesh.visible = false;
        tunnelRing1.visible = false;
        tunnelRing2.visible = false;
        fNeutronTrailLine.visible = false;

        const mergeEase = 1 - THREE.MathUtils.clamp(p * 2.2, 0, 1);
        const offset = 1.2 * mergeEase;
        const vib = Math.sin(stepT * 36) * 0.14;
        const vibY = Math.cos(stepT * 32) * 0.12;

        fusionFlashMesh.position.set(0, 0, 0);
        fusionFlashMesh.scale.setScalar(2.1 + Math.sin(stepT * 16) * 0.35);
        fusionFlashMat.opacity = 0.28 + Math.sin(stepT * 20) * 0.16;
        coreFlashLight.intensity = 3.2;

        fusionNucleons.deutP.position.set(-0.56 - offset + vib, 0.48 + vibY, 0.35);
        fusionNucleons.deutN.position.set(0.56 + offset - vib, -0.46 - vibY, 0.38);
        fusionNucleons.tritP.position.set(0.54 + offset + vibY, 0.52 - vib, -0.35);
        fusionNucleons.tritN1.position.set(-0.54 - offset - vibY, -0.48 + vib, -0.38);
        fusionNucleons.tritN2.position.set(vib * 1.1, 0.05 - vibY, 0.85 - mergeEase * 0.4);

        placeBond(bondMeshes[0], fusionNucleons.deutP.position, fusionNucleons.deutN.position, true);
        placeBond(bondMeshes[1], fusionNucleons.tritP.position, fusionNucleons.tritN1.position, true);
        placeBond(bondMeshes[2], fusionNucleons.deutP.position, fusionNucleons.tritN1.position, true);
        placeBond(bondMeshes[3], fusionNucleons.deutN.position, fusionNucleons.tritP.position, true);
        placeBond(bondMeshes[4], fusionNucleons.deutP.position, fusionNucleons.tritP.position, true);
        placeBond(bondMeshes[5], fusionNucleons.tritN1.position, fusionNucleons.tritN2.position, !isDD);
      }
      // PHASE 4 (15s .. 20s): 17.6 MeV / 3.27 MeV Energy Burst + Alpha/He-3 + Fast Neutron Ejection
      else {
        const stepT = t - 15;
        const sepEase = 1 - Math.pow(1 - THREE.MathUtils.clamp(stepT / 3.5, 0, 1), 2);

        fTrajL.visible = false;
        fTrajR.visible = false;
        coulombBarrierMesh.visible = false;
        tunnelRing2.visible = false;

        if (stepT < 1.6) {
          const flashP = stepT / 1.6;
          fusionFlashMesh.scale.setScalar(1.2 + flashP * 11.5);
          fusionFlashMat.opacity = Math.max(0, 0.9 * (1 - flashP));
          coreFlashLight.intensity = 9.5 * Math.max(0, 1 - flashP);

          tunnelRing1.visible = true;
          tunnelRing1.rotation.set(0.3, stepT * 1.5, 0);
          tunnelRing1.scale.setScalar(0.8 + flashP * 5.2);
          tunnelCyanMat.opacity = Math.max(0, 0.72 * (1 - flashP));
        } else {
          fusionFlashMat.opacity = 0;
          coreFlashLight.intensity = 0;
          tunnelRing1.visible = false;
        }

        // Alpha (⁴He) or Helium-3 (³He) flies Left/Down
        const alphaCenterX = -sepEase * 5.8;
        const alphaCenterY = -sepEase * 2.0;
        const alphaCenterZ = sepEase * 0.5;
        const spin = stepT * 2.4;

        if (isDD) {
          // ³He (2 protons + 1 neutron) triangle
          const rHe3 = NUCLEON_RADIUS_FUSION * 0.92;
          fusionNucleons.deutP.position.set(
            alphaCenterX + Math.cos(spin) * rHe3,
            alphaCenterY + Math.sin(spin) * rHe3,
            alphaCenterZ + 0.16,
          );
          fusionNucleons.tritP.position.set(
            alphaCenterX + Math.cos(spin + 2.094) * rHe3,
            alphaCenterY + Math.sin(spin + 2.094) * rHe3,
            alphaCenterZ - 0.16,
          );
          fusionNucleons.deutN.position.set(
            alphaCenterX + Math.cos(spin + 4.189) * rHe3,
            alphaCenterY + Math.sin(spin + 4.189) * rHe3,
            alphaCenterZ,
          );

          placeBond(bondMeshes[0], fusionNucleons.deutP.position, fusionNucleons.tritP.position, true);
          placeBond(bondMeshes[1], fusionNucleons.tritP.position, fusionNucleons.deutN.position, true);
          placeBond(bondMeshes[2], fusionNucleons.deutN.position, fusionNucleons.deutP.position, true);
          for (let i = 3; i < bondMeshes.length; i++) bondMeshes[i].visible = false;

          // tritN1 ejects as fast free neutron (+3.27 MeV)
          const fastTravel = Math.min(10.5, stepT * 4.4);
          fusionNucleons.tritN1.position.set(fastTravel * 0.92, fastTravel * 0.36, -fastTravel * 0.14);
          fNeutronTrailLine.visible = true;
          const arr = fNeutronTrailAttr.array as Float32Array;
          arr[3] = fusionNucleons.tritN1.position.x;
          arr[4] = fusionNucleons.tritN1.position.y;
          arr[5] = fusionNucleons.tritN1.position.z;
          fNeutronTrailAttr.needsUpdate = true;
        } else {
          // ⁴He Alpha (2 protons + 2 neutrons) stable 3D tetrahedron
          const a = NUCLEON_RADIUS_FUSION * 0.72;
          const cosA = Math.cos(spin);
          const sinA = Math.sin(spin);
          const placeTetra = (target: THREE.Group, lx: number, ly: number, lz: number) => {
            target.position.set(
              alphaCenterX + lx * cosA - lz * sinA,
              alphaCenterY + ly,
              alphaCenterZ + lx * sinA + lz * cosA,
            );
          };
          placeTetra(fusionNucleons.deutP, a, a, a);
          placeTetra(fusionNucleons.tritP, -a, -a, a);
          placeTetra(fusionNucleons.deutN, -a, a, -a);
          placeTetra(fusionNucleons.tritN1, a, -a, -a);

          placeBond(bondMeshes[0], fusionNucleons.deutP.position, fusionNucleons.tritP.position, true);
          placeBond(bondMeshes[1], fusionNucleons.deutP.position, fusionNucleons.deutN.position, true);
          placeBond(bondMeshes[2], fusionNucleons.deutP.position, fusionNucleons.tritN1.position, true);
          placeBond(bondMeshes[3], fusionNucleons.tritP.position, fusionNucleons.deutN.position, true);
          placeBond(bondMeshes[4], fusionNucleons.tritP.position, fusionNucleons.tritN1.position, true);
          placeBond(bondMeshes[5], fusionNucleons.deutN.position, fusionNucleons.tritN1.position, true);

          // tritN2 ejects as 14.1 MeV free neutron
          const fastTravel = Math.min(10.8, stepT * 4.8);
          fusionNucleons.tritN2.position.set(fastTravel * 0.92, fastTravel * 0.36, -fastTravel * 0.14);
          fNeutronTrailLine.visible = true;
          const arr = fNeutronTrailAttr.array as Float32Array;
          arr[3] = fusionNucleons.tritN2.position.x;
          arr[4] = fusionNucleons.tritN2.position.y;
          arr[5] = fusionNucleons.tritN2.position.z;
          fNeutronTrailAttr.needsUpdate = true;
        }
      }
    };

    const cancelPendingLoop = () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(frameId);
      frameId = 0;
      if (activeSync) {
        const gl = renderer.getContext() as WebGL2RenderingContext;
        if (typeof gl.deleteSync === 'function') gl.deleteSync(activeSync);
        activeSync = null;
      }
    };

    // Paced Software-WebGL Helper (`afterDraw`) per Three.js skill requirements
    function afterDraw(cb: () => void) {
      if (disposed) return;
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        activeSync = sync;
        gl.flush();
        const poll = () => {
          if (disposed) {
            if (activeSync) {
              gl.deleteSync(activeSync);
              activeSync = null;
            }
            return;
          }
          const status = sync ? gl.getSyncParameter(sync, gl.SYNC_STATUS) : gl.SIGNALED;
          if (status === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            if (activeSync === sync) activeSync = null;
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 80);
      }
    }

    const startMs = performance.now();
    let prevMs = startMs;

    function tick() {
      if (disposed) return;

      const p = propsRef.current;
      const s = simStateRef.current;
      const nowMs = performance.now();
      const maxDelta = p.autoPlaying ? 5.0 : 0.25;
      const delta = Math.min(maxDelta, Math.max(0.001, (nowMs - prevMs) / 1000));
      prevMs = nowMs;
      const elapsed = (nowMs - startMs) / 1000;
      const totalDur = p.mode === 'fission' ? 22 : 20;

      // Advance simulation timeline
      if (p.autoPlaying) {
        s.timeline += delta * p.speed;
        if (s.timeline >= totalDur) {
          s.timeline = totalDur - 0.05;
          if (s.lastStageSynced !== 3) {
            s.lastStageSynced = 3;
            p.onStageChange(3);
          }
          p.onAutoPlayEnd();
        } else {
          const derivedStage = s.timeline < 5 ? 0 : s.timeline < 10 ? 1 : s.timeline < 15 ? 2 : 3;
          if (derivedStage !== s.lastStageSynced) {
            s.lastStageSynced = derivedStage;
            p.onStageChange(derivedStage);
          }
        }
      } else {
        // Loop the selected PASSO smoothly so the 3D specimen stays kinetically alive
        const stepStart = getStageStartTime(p.stage);
        const stepLen = p.stage === 3 && p.mode === 'fission' ? 7 : 5;
        s.stageClock = (s.stageClock + delta * p.speed) % stepLen;
        s.timeline = stepStart + s.stageClock;
      }

      // Camera preset reset / mode framing (immediate snap when mode changes or on software WebGL, smooth damp on GPU)
      if (s.cameraPresetActive) {
        if (s.snapCameraImmediate || softwareGl) {
          camera.position.copy(s.cameraTargetPos);
          controls.target.set(0, 0, 0);
          s.cameraPresetActive = false;
          s.snapCameraImmediate = false;
        } else {
          camera.position.x = THREE.MathUtils.damp(camera.position.x, s.cameraTargetPos.x, 8, delta);
          camera.position.y = THREE.MathUtils.damp(camera.position.y, s.cameraTargetPos.y, 8, delta);
          camera.position.z = THREE.MathUtils.damp(camera.position.z, s.cameraTargetPos.z, 8, delta);
          controls.target.x = THREE.MathUtils.damp(controls.target.x, 0, 8, delta);
          controls.target.y = THREE.MathUtils.damp(controls.target.y, 0, 8, delta);
          controls.target.z = THREE.MathUtils.damp(controls.target.z, 0, 8, delta);
          if (camera.position.distanceToSquared(s.cameraTargetPos) < 0.01) {
            camera.position.copy(s.cameraTargetPos);
            s.cameraPresetActive = false;
          }
        }
      }

      // Background ambient motion
      starField.rotation.y += delta * 0.018;
      trapRing.rotation.z += delta * 0.04;

      // Toggle mode sub-graphs cleanly without tearing down WebGL context
      if (p.mode === 'fission') {
        fissionGroup.visible = true;
        fusionGroup.visible = false;
        updateFissionScene(s.timeline, elapsed, p.fissionFuel);
      } else {
        fissionGroup.visible = false;
        fusionGroup.visible = true;
        updateFusionScene(s.timeline, elapsed, p.fusionReaction);
      }

      // Update thin DOM progress bar directly at 60fps without triggering React re-renders
      if (progressBarRef.current) {
        const pct = THREE.MathUtils.clamp((s.timeline / totalDur) * 100, 0, 100);
        progressBarRef.current.style.width = `${pct.toFixed(1)}%`;
      }

      controls.update();

      if (!isContextCurrentlyLost) {
        renderer.render(scene, camera);
      }

      if (softwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    renderNowRef.current = () => {
      if (disposed) return;
      cancelPendingLoop();
      prevMs = performance.now();
      tick();
    };

    tick();

    // Full unmount cleanup
    return () => {
      disposed = true;
      renderNowRef.current = null;
      cancelPendingLoop();
      resizeObserver?.disconnect();
      window.removeEventListener('resize', handleResize);
      controls.removeEventListener('start', handleControlStart);
      domCanvas.removeEventListener('webglcontextlost', onContextLost);
      domCanvas.removeEventListener('webglcontextrestored', onContextRestored);

      controls.dispose();
      envTarget?.dispose();
      disposableGeometries.forEach((g) => g.dispose());
      disposableMaterials.forEach((m) => m.dispose());
      disposableTextures.forEach((t) => t.dispose());
      renderer.dispose();

      if (domCanvas.parentNode === container) {
        container.removeChild(domCanvas);
      }
    };
  }, []);

  if (webglUnavailable || contextLost) {
    return (
      <div className="relative w-full h-[340px] sm:h-[420px] lg:h-[450px] bg-[#060913] flex flex-col items-center justify-center p-6 text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-[#73CAE5]/10 border border-[#73CAE5]/30 flex items-center justify-center">
          <Atom className="w-7 h-7 text-[#73CAE5]" />
        </div>
        <div className="space-y-1 max-w-md">
          <h4 className="text-sm font-bold text-white font-display">
            {mode === 'fission'
              ? fissionFuel === 'u235'
                ? 'Fissão Nuclear 3D — Urânio-235 (²³⁵U)'
                : 'Fissão Nuclear 3D — Plutônio-239 (²³⁹Pu)'
              : fusionReaction === 'dt'
              ? 'Fusão Nuclear 3D — Deutério + Trítio (D-T)'
              : 'Fusão Nuclear 3D — Deutério + Deutério (D-D)'}
          </h4>
          <p className="text-xs text-[#B7B7B7]">
            {contextLost
              ? 'O contexto gráfico WebGL foi suspenso temporariamente pelo navegador.'
              : 'Visualização 3D WebGL indisponível neste dispositivo. Use os cartões de etapa abaixo para acompanhar a reação.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[340px] sm:h-[420px] lg:h-[450px] bg-[#060913] overflow-hidden select-none">
      {/* Dedicated empty mount div isolated from React HUD elements */}
      <div
        ref={mountRef}
        data-testid="nuclear-3d-canvas-host"
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Camera interaction hint + reset button (bottom-right, clear of central 3D model) */}
      <div className="absolute bottom-3.5 right-3 z-10 flex items-center gap-2 pointer-events-auto">
        <span className="hidden md:inline-flex items-center px-2.5 py-1 rounded-lg bg-[#0D0D0D]/90 border border-white/10 text-[10px] font-mono text-[#B7B7B7]">
          Arraste para girar 3D • Scroll para zoom
        </span>
        <button
          type="button"
          onClick={handleResetCamera}
          className="px-2.5 py-1.5 sm:py-1 rounded-lg bg-[#0D0D0D]/90 border border-white/15 hover:border-[#73CAE5]/50 text-[10px] font-mono text-white/85 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Centralizar câmera 3D"
        >
          <RotateCcw className="w-3 h-3 text-[#73CAE5]" />
          <span>Centralizar 3D</span>
        </button>
      </div>

      {/* Slim real-time cycle progress indicator at the bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 pointer-events-none">
        <div
          ref={progressBarRef}
          className={`h-full transition-none ${
            mode === 'fission'
              ? 'bg-gradient-to-r from-[#73CAE5] via-[#8F83FF] to-[#73CAE5]'
              : 'bg-gradient-to-r from-[#8F83FF] via-amber-400 to-[#73CAE5]'
          }`}
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
};
