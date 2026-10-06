import React, { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  NUCLEAR_RANKING_BOMBS,
  TARGET_CITIES,
  HISTORIC_NUCLEAR_TEST_SITES,
  WORLD_PRESET_CITIES,
  IMPACT_LAYERS,
  FALLOUT_ZONES_CONFIG,
  computeFalloutContourCoordinates,
  NuclearBombRanking,
  TargetCity,
  calculateRealNuclearRadiiM,
  calculateBombCityCasualties,
  formatCasualtyNumber,
  formatCasualtyRange,
  detectLocationDemographics,
  isLikelyOceanOrUninhabited,
  lookupLocationDemographics,
  BombCasualtySummary,
  ZoneCasualtyEstimate,
  createCustomNuclearBomb,
  calculateFalloutCasualties,
  BombFalloutCasualtiesSummary,
  FalloutCasualtyEstimate
} from '../data/nuclearRankingData';
import {
  ShieldAlert,
  Satellite,
  MapPin,
  Flame,
  Radio,
  Zap,
  Target,
  Maximize2,
  Minimize2,
  Layers,
  Info,
  Calendar,
  Crosshair,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Eye,
  EyeOff,
  Radiation,
  Wind,
  Compass,
  Navigation,
  ChevronDown,
  ChevronUp,
  Ruler,
  Cloud,
  ArrowUpDown,
  Skull,
  Sparkles,
  Search,
  Globe,
  Star,
  Loader2,
  X,
  Building2,
  Check,
  ZoomIn,
  ZoomOut,
  Table,
  Users
} from 'lucide-react';

export const NuclearRankingMapTab: React.FC = () => {
  const [selectedBomb, setSelectedBomb] = useState<NuclearBombRanking>(NUCLEAR_RANKING_BOMBS[1]); // Default Little Boy
  const [selectedCity, setSelectedCity] = useState<TargetCity>(TARGET_CITIES[0]); // Default Washington
  const [burstType, setBurstType] = useState<'surface' | 'air'>('surface');

  // Estado de Detonação: As zonas de destruição e precipitação radioativa só aparecem quando a bomba for detonada
  const [isDetonated, setIsDetonated] = useState<boolean>(false);
  const [detonationFlash, setDetonationFlash] = useState<boolean>(false);

  // Cálculo físico em tempo real dos raios reais de destruição (escalas físicas de Glasstone & Dolan e Brode)
  const realRadii = calculateRealNuclearRadiiM(selectedBomb.yieldKt, burstType);
  const effectiveBomb: NuclearBombRanking = {
    ...selectedBomb,
    fireballRadiusM: realRadii.fireballRadiusM,
    vaporizationRadiusM: realRadii.vaporizationRadiusM,
    carbonizationRadiusM: realRadii.carbonizationRadiusM,
    heavyBlastRadiusM: realRadii.heavyBlastRadiusM,
    moderateBlastRadiusM: realRadii.moderateBlastRadiusM,
    thermalRadiusM: realRadii.thermalRadiusM,
    lightBlastRadiusM: realRadii.lightBlastRadiusM,
  };

  // Modelo analítico de estimativa de mortes e vítimas reais em tempo real
  const casualties = calculateBombCityCasualties(selectedBomb, selectedCity, burstType);

  const handleDetonate = () => {
    shouldFitBoundsOnDetonateRef.current = true;
    setDetonationFlash(true);
    setTimeout(() => {
      setDetonationFlash(false);
    }, 600);
    setIsDetonated(true);
  };

  const handleResetDetonation = () => {
    setIsDetonated(false);
  };

  // Ao detonar uma bomba e escolher outra (ou alterar a potência), ela se desarma automaticamente
  const prevSelectedBombRef = useRef<string>(selectedBomb.id);
  const prevYieldKtRef = useRef<number>(selectedBomb.yieldKt);
  useEffect(() => {
    if (prevSelectedBombRef.current !== selectedBomb.id || prevYieldKtRef.current !== selectedBomb.yieldKt) {
      prevSelectedBombRef.current = selectedBomb.id;
      prevYieldKtRef.current = selectedBomb.yieldKt;
      setIsDetonated(false);
    }
  }, [selectedBomb.id, selectedBomb.yieldKt]);

  const [activeTabMobile, setActiveTabMobile] = useState<'map' | 'options'>('map');
  const [visibleLayers, setVisibleLayers] = useState<Record<string, boolean>>({
    fireball: true,
    vaporization: true,
    carbonization: true, // Zona de carbonização humana instantânea
    heavy: true,
    moderate: true, // 5º Onda de Choque Moderada (~5 psi)
    thermal: true,
    light: true
  });
  // Estado de Zona em Destaque (Hover): ativa o brilho sincronizado no mapa e na área de opções/métricas
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);
  const zoneCirclesRef = useRef<Record<string, { circle: L.Circle; baseStyle: any; color: string }>>({});

  // Efeito de brilho luminoso sincronizado nas zonas do mapa ao passar o mouse ou focar no painel
  useEffect(() => {
    const entries = Object.entries(zoneCirclesRef.current) as [string, { circle: L.Circle; baseStyle: L.PathOptions; color: string }][];
    entries.forEach(([id, item]) => {
      const isHovered = hoveredZoneId === id;
      const pathEl = (item.circle as any)._path as SVGPathElement | undefined;
      if (isHovered) {
        item.circle.setStyle({
          weight: 4.5,
          color: '#FFFFFF',
          fillOpacity: Math.min(0.88, (item.baseStyle.fillOpacity ?? 0.2) + 0.32)
        });
        if (pathEl) {
          pathEl.style.filter = `drop-shadow(0 0 10px #FFFFFF) drop-shadow(0 0 24px ${item.color})`;
          pathEl.style.transition = 'stroke 0.2s ease, stroke-width 0.2s ease, fill-opacity 0.2s ease, filter 0.2s ease';
        }
      } else {
        item.circle.setStyle(item.baseStyle);
        if (pathEl) {
          pathEl.style.filter = '';
          pathEl.style.transition = 'stroke 0.2s ease, stroke-width 0.2s ease, fill-opacity 0.2s ease, filter 0.2s ease';
        }
      }
    });
  }, [hoveredZoneId]);

  // Estado de Zona de Fallout em Destaque (Hover): brilho sincronizado nas plumas de precipitação radioativa
  const [hoveredFalloutZoneId, setHoveredFalloutZoneId] = useState<string | null>(null);
  const falloutPolygonsRef = useRef<Record<string, { polygon: L.Polygon; baseStyle: any; color: string }>>({});

  // Efeito de brilho luminoso sincronizado nas plumas de fallout no mapa ao passar o mouse ou focar no painel
  useEffect(() => {
    const entries = Object.entries(falloutPolygonsRef.current) as [
      string,
      { polygon: L.Polygon; baseStyle: L.PathOptions; color: string }
    ][];
    entries.forEach(([id, item]) => {
      const isHovered = hoveredFalloutZoneId === id;
      const pathEl = (item.polygon as any)._path as SVGPathElement | undefined;
      if (isHovered) {
        item.polygon.setStyle({
          weight: 4.5,
          color: '#FFFFFF',
          fillOpacity: Math.min(0.88, (item.baseStyle.fillOpacity ?? 0.25) + 0.35)
        });
        if (pathEl) {
          pathEl.style.filter = `drop-shadow(0 0 12px #FFFFFF) drop-shadow(0 0 28px ${item.color})`;
          pathEl.style.transition = 'stroke 0.2s ease, stroke-width 0.2s ease, fill-opacity 0.2s ease, filter 0.2s ease';
        }
      } else {
        item.polygon.setStyle(item.baseStyle);
        if (pathEl) {
          pathEl.style.filter = '';
          pathEl.style.transition = 'stroke 0.2s ease, stroke-width 0.2s ease, fill-opacity 0.2s ease, filter 0.2s ease';
        }
      }
    });
  }, [hoveredFalloutZoneId]);

  const [dimensionMode, setDimensionMode] = useState<'radius' | 'diameter' | 'both'>('both'); // Opção de ver raio, diâmetro ou ambos
  const [mapTheme, setMapTheme] = useState<'tactical' | 'satellite' | 'osm'>('satellite'); // Modelo realista de satélite como padrão
  const [isCasualtyHudCollapsed, setIsCasualtyHudCollapsed] = useState<boolean>(false); // Minimizar ou expandir o quadro tático de mortes reais no mapa
  const [showAllCasualtyZones, setShowAllCasualtyZones] = useState<boolean>(false); // Alternar entre as 3 zonas solicitadas ou todas as 7 zonas

  // Map visibility, layout, and sizing states
  const [mapHeightMode, setMapHeightMode] = useState<'compact' | 'standard' | 'large' | 'immersive'>('standard'); // Default to spacious standard height (640px)
  const [isOptionsPanelOpen, setIsOptionsPanelOpen] = useState<boolean>(true); // Painel de Opções & Métricas aberto por padrão com todas as opções anteriores
  const [optionsActiveTab, setOptionsActiveTab] = useState<'layers' | 'fallout' | 'physics'>('layers'); // Active tab inside right options panel

  // Compass helper function
  const getCompassPoint = (deg: number) => {
    const directions = ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO'];
    const index = Math.round(((deg % 360) / 45)) % 8;
    return directions[index];
  };

  // Helper to toggle all 7 blast layers at once
  const setAllLayers = (enable: boolean) => {
    setVisibleLayers({
      fireball: enable,
      vaporization: enable,
      carbonization: enable,
      heavy: enable,
      moderate: enable,
      thermal: enable,
      light: enable
    });
  };

  // Global City Search & Targeting State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<TargetCity[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWorldDropdownOpen, setIsWorldDropdownOpen] = useState(false);
  const [showBenchmarkModal, setShowBenchmarkModal] = useState(false);
  const [showCoordModal, setShowCoordModal] = useState(false);
  const [coordLat, setCoordLat] = useState('');
  const [coordLng, setCoordLng] = useState('');
  const [coordCityName, setCoordCityName] = useState('');
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);

  // Estado e Controle de Potência Customizada (0.02 kt até 100 Mt)
  const MIN_YIELD_KT = 0.02;
  const MAX_YIELD_KT = 100000;

  const [isBombDropdownOpen, setIsBombDropdownOpen] = useState(false);
  const bombDropdownRef = useRef<HTMLDivElement>(null);

  const [customYieldKt, setCustomYieldKt] = useState<number>(selectedBomb.yieldKt);
  const [yieldUnit, setYieldUnit] = useState<'kt' | 'Mt'>(selectedBomb.yieldKt >= 1000 ? 'Mt' : 'kt');
  const [yieldInputValue, setYieldInputValue] = useState<string>(
    selectedBomb.yieldKt >= 1000 ? (selectedBomb.yieldKt / 1000).toString() : selectedBomb.yieldKt.toString()
  );
  const isTypingYieldRef = useRef<boolean>(false);

  // Sincroniza a potência da bomba selecionada com o campo de digitação se o usuário não estiver digitando
  useEffect(() => {
    if (isTypingYieldRef.current) return;
    setCustomYieldKt(selectedBomb.yieldKt);
    if (selectedBomb.yieldKt >= 1000) {
      setYieldUnit('Mt');
      const mtVal = selectedBomb.yieldKt / 1000;
      setYieldInputValue(Number.isInteger(mtVal) ? mtVal.toString() : parseFloat(mtVal.toFixed(3)).toString());
    } else {
      setYieldUnit('kt');
      setYieldInputValue(Number.isInteger(selectedBomb.yieldKt) ? selectedBomb.yieldKt.toString() : parseFloat(selectedBomb.yieldKt.toFixed(2)).toString());
    }
  }, [selectedBomb.id, selectedBomb.yieldKt]);

  // Fecha o dropdown de escolha de bomba ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (bombDropdownRef.current && !bombDropdownRef.current.contains(e.target as Node)) {
        setIsBombDropdownOpen(false);
      }
    };
    if (isBombDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isBombDropdownOpen]);

  // Escolhe uma bomba pré-calibrada: a potência vai instantaneamente para o campo de pesquisa
  const handleSelectBomb = (b: NuclearBombRanking) => {
    isTypingYieldRef.current = false;
    setSelectedBomb(b);
    setIsDetonated(false); // Desarma automaticamente ao escolher outra bomba
    setCustomYieldKt(b.yieldKt);
    if (b.yieldKt >= 1000) {
      setYieldUnit('Mt');
      const mtVal = b.yieldKt / 1000;
      setYieldInputValue(Number.isInteger(mtVal) ? mtVal.toString() : parseFloat(mtVal.toFixed(3)).toString());
    } else {
      setYieldUnit('kt');
      setYieldInputValue(Number.isInteger(b.yieldKt) ? b.yieldKt.toString() : parseFloat(b.yieldKt.toFixed(2)).toString());
    }
    setIsBombDropdownOpen(false);
  };

  // Atualização em tempo real conforme o usuário digita a potência desejada (0,02 kt até 100 Mt)
  const handleDirectInputChange = (valStr: string) => {
    isTypingYieldRef.current = true;
    setYieldInputValue(valStr);
    const normalized = valStr.trim().replace(',', '.');
    const num = parseFloat(normalized);
    if (!isNaN(num) && num > 0) {
      const kt = yieldUnit === 'Mt' ? num * 1000 : num;
      const clampedKt = Math.max(MIN_YIELD_KT, Math.min(MAX_YIELD_KT, kt));
      setCustomYieldKt(clampedKt);

      const matched = NUCLEAR_RANKING_BOMBS.find((b) => Math.abs(b.yieldKt - clampedKt) < 0.001);
      if (matched) {
        setSelectedBomb(matched);
      } else {
        setSelectedBomb(createCustomNuclearBomb(clampedKt));
      }
      setIsDetonated(false); // Desarma automaticamente ao alterar potência
    }
  };

  // Garante valor válido ao sair do campo ou pressionar Enter
  const handleInputBlurOrEnter = () => {
    isTypingYieldRef.current = false;
    const normalized = yieldInputValue.trim().replace(',', '.');
    const num = parseFloat(normalized);
    if (isNaN(num) || num <= 0) {
      if (yieldUnit === 'Mt') {
        const mtVal = customYieldKt / 1000;
        setYieldInputValue(Number.isInteger(mtVal) ? mtVal.toString() : parseFloat(mtVal.toFixed(3)).toString());
      } else {
        setYieldInputValue(Number.isInteger(customYieldKt) ? customYieldKt.toString() : parseFloat(customYieldKt.toFixed(2)).toString());
      }
      return;
    }
    const kt = yieldUnit === 'Mt' ? num * 1000 : num;
    const clampedKt = Math.max(MIN_YIELD_KT, Math.min(MAX_YIELD_KT, kt));
    setCustomYieldKt(clampedKt);
    if (yieldUnit === 'Mt') {
      const mtVal = clampedKt / 1000;
      setYieldInputValue(Number.isInteger(mtVal) ? mtVal.toString() : parseFloat(mtVal.toFixed(3)).toString());
    } else {
      setYieldInputValue(Number.isInteger(clampedKt) ? clampedKt.toString() : parseFloat(clampedKt.toFixed(2)).toString());
    }

    const matched = NUCLEAR_RANKING_BOMBS.find((b) => Math.abs(b.yieldKt - clampedKt) < 0.001);
    if (matched) {
      setSelectedBomb(matched);
    } else {
      setSelectedBomb(createCustomNuclearBomb(clampedKt));
    }
  };

  const handleUnitChange = (newUnit: 'kt' | 'Mt') => {
    if (newUnit === yieldUnit) return;
    isTypingYieldRef.current = false;
    setYieldUnit(newUnit);
    const normalized = yieldInputValue.trim().replace(',', '.');
    const num = parseFloat(normalized);
    if (!isNaN(num) && num > 0) {
      const currentKt = yieldUnit === 'Mt' ? num * 1000 : num;
      const clampedKt = Math.max(MIN_YIELD_KT, Math.min(MAX_YIELD_KT, currentKt));
      setCustomYieldKt(clampedKt);
      if (newUnit === 'Mt') {
        const mtVal = clampedKt / 1000;
        setYieldInputValue(Number.isInteger(mtVal) ? mtVal.toString() : parseFloat(mtVal.toFixed(4)).toString());
      } else {
        setYieldInputValue(Number.isInteger(clampedKt) ? clampedKt.toString() : parseFloat(clampedKt.toFixed(2)).toString());
      }
    } else {
      if (newUnit === 'Mt') {
        const mtVal = customYieldKt / 1000;
        setYieldInputValue(Number.isInteger(mtVal) ? mtVal.toString() : parseFloat(mtVal.toFixed(4)).toString());
      } else {
        setYieldInputValue(Number.isInteger(customYieldKt) ? customYieldKt.toString() : parseFloat(customYieldKt.toFixed(2)).toString());
      }
    }
  };

  // Atalho para definir potência rápida pré-calibrada
  const handleSetQuickYield = (kt: number) => {
    isTypingYieldRef.current = false;
    const clampedKt = Math.max(MIN_YIELD_KT, Math.min(MAX_YIELD_KT, kt));
    setCustomYieldKt(clampedKt);
    if (clampedKt >= 1000) {
      setYieldUnit('Mt');
      const mtVal = clampedKt / 1000;
      setYieldInputValue(Number.isInteger(mtVal) ? mtVal.toString() : parseFloat(mtVal.toFixed(3)).toString());
    } else {
      setYieldUnit('kt');
      setYieldInputValue(Number.isInteger(clampedKt) ? clampedKt.toString() : parseFloat(clampedKt.toFixed(2)).toString());
    }
    const matched = NUCLEAR_RANKING_BOMBS.find((b) => Math.abs(b.yieldKt - clampedKt) < 0.001);
    if (matched) {
      setSelectedBomb(matched);
    } else {
      setSelectedBomb(createCustomNuclearBomb(clampedKt));
    }
    setIsDetonated(false);
  };

  // Ref to hold the latest handleMapClick without re-instantiating the map
  const onMapClickRef = useRef<(lat: number, lng: number) => void>(() => {});

  // Fallout Visualization State
  const [showFallout, setShowFallout] = useState<boolean>(true); // Default enabled so user sees the new feature immediately
  const [windDirectionDeg, setWindDirectionDeg] = useState<number>(65); // 65° = ENE
  const [windSpeedKmh, setWindSpeedKmh] = useState<number>(25); // 25 km/h
  const [visibleFalloutZones, setVisibleFalloutZones] = useState<Record<string, boolean>>({
    rad1000: true,
    rad300: true,
    rad100: true,
    rad10: true
  });
  const [falloutPanelOpen, setFalloutPanelOpen] = useState<boolean>(true);

  // Estimativa analítica de vítimas da precipitação radioativa a sotavento
  const falloutCasualties = calculateFalloutCasualties(selectedBomb, selectedCity, burstType, windSpeedKmh);

  // Zoom level & World Map View state
  const [currentZoom, setCurrentZoom] = useState<number>(12);
  const [isWorldView, setIsWorldView] = useState<boolean>(false);
  const isWorldViewRef = useRef<boolean>(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const circlesLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const testSitesLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const referenceLayerRef = useRef<L.TileLayer | null>(null);
  const oceanReferenceLayerRef = useRef<L.TileLayer | null>(null);
  const transportationReferenceLayerRef = useRef<L.TileLayer | null>(null);
  const isDraggingTargetRef = useRef<boolean>(false);
  const shouldFitBoundsOnDetonateRef = useRef<boolean>(false);

  // Toggle for rendering Historic Nuclear Test Sites on the map (Bikini, Novaya Zemlya, Nevada, Semipalatinsk)
  const [showTestSites, setShowTestSites] = useState<boolean>(false);

  // Compass directions for quick wind presets
  const WIND_COMPASS_PRESETS = [
    { label: 'N', deg: 0, arrow: '↑' },
    { label: 'NE', deg: 45, arrow: '↗' },
    { label: 'L', deg: 90, arrow: '→' },
    { label: 'SE', deg: 135, arrow: '↘' },
    { label: 'S', deg: 180, arrow: '↓' },
    { label: 'SO', deg: 225, arrow: '↙' },
    { label: 'O', deg: 270, arrow: '←' },
    { label: 'NO', deg: 315, arrow: '↖' }
  ];

  // Wind speed presets
  const WIND_SPEED_PRESETS = [
    { label: 'Brisa (15 km/h)', speed: 15 },
    { label: 'Normal (25 km/h)', speed: 25 },
    { label: 'Forte (45 km/h)', speed: 45 }
  ];

  // Helper formatters
  const formatRadius = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} km`;
    }
    return `${meters.toLocaleString('pt-BR')} m`;
  };

  const formatDiameter = (radiusMeters: number) => {
    const diameterMeters = radiusMeters * 2;
    if (diameterMeters >= 1000) {
      return `${(diameterMeters / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} km`;
    }
    return `${diameterMeters.toLocaleString('pt-BR')} m`;
  };

  const calculateAreaKm2 = (radiusM: number) => {
    const rKm = radiusM / 1000;
    const area = Math.PI * rKm * rKm;
    if (area < 0.01) {
      return `< 0.01 km²`;
    }
    return `${area.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} km²`;
  };

  const calculateVolumeKm3 = (radiusM: number) => {
    const rKm = radiusM / 1000;
    const vol = (4 / 3) * Math.PI * Math.pow(rKm, 3);
    if (vol < 0.001) {
      return `< 0.001 km³`;
    }
    if (vol < 1) {
      return `${vol.toFixed(3)} km³`;
    }
    return `${vol.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} km²`;
  };

  const calculateTotalDiameter = () => {
    const maxRadius = Math.max(
      effectiveBomb.fireballRadiusM,
      effectiveBomb.vaporizationRadiusM,
      effectiveBomb.carbonizationRadiusM,
      effectiveBomb.heavyBlastRadiusM,
      effectiveBomb.moderateBlastRadiusM,
      effectiveBomb.thermalRadiusM,
      effectiveBomb.lightBlastRadiusM
    );
    return formatRadius(maxRadius * 2);
  };

  const getHiroshimaMultiplier = (yieldKt: number) => {
    const mult = yieldKt / 15;
    if (mult < 1) {
      return `${mult.toFixed(3)}× Little Boy`;
    }
    if (mult === 1) {
      return `Referência (15 kt)`;
    }
    return `${Math.round(mult).toLocaleString('pt-BR')}× Little Boy`;
  };

  // Helper to compute fallout distance for current weapon under active wind conditions
  const getCalculatedFalloutLengthKm = (zoneId: 'rad1000' | 'rad300' | 'rad100' | 'rad10') => {
    const speedScale = Math.pow(windSpeedKmh / 25, 0.65);
    const burstScale = burstType === 'air' ? 0.35 : 1.0;
    const baseKm = selectedBomb.fallout?.surfaceContours[zoneId]?.lengthKm || 0;
    return (baseKm * speedScale * burstScale).toFixed(1);
  };

  // Mathematically safe bounding box from center lat/lng and radius in meters
  const getBoundsForRadius = (lat: number, lng: number, radiusMeters: number): L.LatLngBounds => {
    const latDelta = radiusMeters / 111320;
    const radLat = (lat * Math.PI) / 180;
    const cosLat = Math.max(Math.cos(radLat), 0.05);
    const lngDelta = radiusMeters / (111320 * cosLat);

    const southWest = L.latLng(lat - latDelta, lng - lngDelta);
    const northEast = L.latLng(lat + latDelta, lng + lngDelta);
    return L.latLngBounds(southWest, northEast);
  };

  // Combined bounds covering both prompt blast and elongated fallout plume
  const getCombinedBounds = (
    lat: number,
    lng: number,
    blastRadiusMeters: number,
    falloutPts: [number, number][]
  ): L.LatLngBounds => {
    const blastBounds = getBoundsForRadius(lat, lng, blastRadiusMeters * 1.15);
    if (falloutPts.length === 0) {
      return blastBounds;
    }
    let minLat = blastBounds.getSouth();
    let maxLat = blastBounds.getNorth();
    let minLng = blastBounds.getWest();
    let maxLng = blastBounds.getEast();

    for (const [pLat, pLng] of falloutPts) {
      if (pLat < minLat) minLat = pLat;
      if (pLat > maxLat) maxLat = pLat;
      if (pLng < minLng) minLng = pLng;
      if (pLng > maxLng) maxLng = pLng;
    }

    return L.latLngBounds(L.latLng(minLat, minLng), L.latLng(maxLat, maxLng));
  };

  // Toggle individual prompt blast layer
  const toggleLayer = (layerId: string) => {
    setVisibleLayers((prev) => ({
      ...prev,
      [layerId]: !prev[layerId]
    }));
  };

  // Toggle individual fallout dose zone
  const toggleFalloutZone = (zoneId: string) => {
    setVisibleFalloutZones((prev) => ({
      ...prev,
      [zoneId]: !prev[zoneId]
    }));
  };

  // Select a target city and smoothly fly the map
  const handleSelectCity = (city: TargetCity) => {
    isWorldViewRef.current = false;
    setIsWorldView(false);
    setSelectedCity(city);
    setSearchQuery('');
    setIsSearchOpen(false);
    setIsWorldDropdownOpen(false);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([city.lat, city.lng], 12, { duration: 1.2 });
    }
  };

  // Zoom in & Zoom out helpers
  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn(1, { animate: true });
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut(1, { animate: true });
    }
  };

  // Switch to whole World Map (Planisfério Global - Todos os países inteiros)
  const handleViewWorldMap = () => {
    if (!mapInstanceRef.current) return;
    isWorldViewRef.current = true;
    setIsWorldView(true);
    mapInstanceRef.current.setView([20, 0], 2, { animate: true });
  };

  // Handle click or drag on the map to set Ground Zero anywhere in the world
  const handleMapClick = (lat: number, lng: number) => {
    isDraggingTargetRef.current = true;
    const latStr = lat >= 0 ? `${lat.toFixed(4)}°N` : `${Math.abs(lat).toFixed(4)}°S`;
    const lngStr = lng >= 0 ? `${lng.toFixed(4)}°E` : `${Math.abs(lng).toFixed(4)}°W`;

    // Detectar realisticamente se a coordenada é oceano ou terra e estimar a demografia real
    const initialDemo = detectLocationDemographics(lat, lng);

    const customCity: TargetCity = {
      id: `coord-${lat.toFixed(4)}-${lng.toFixed(4)}`,
      name: initialDemo.isUninhabitedOrWater ? 'Zona Marítima / Oceânica' : 'Local no Mapa',
      country: `${latStr}, ${lngStr}`,
      lat,
      lng,
      description: initialDemo.dataLimitationNotice,
      populationEstimate: initialDemo.populationEstimate,
      urbanPopulation: initialDemo.urbanPopulation,
      metroPopulation: initialDemo.metroPopulation,
      coreDensityPerKm2: initialDemo.coreDensityPerKm2,
      metroDensityPerKm2: initialDemo.metroDensityPerKm2,
      ruralDensityPerKm2: initialDemo.ruralDensityPerKm2,
      isUninhabitedOrWater: initialDemo.isUninhabitedOrWater,
      settlementType: initialDemo.settlementType,
      confidenceLevel: initialDemo.confidenceLevel,
      dataLimitationNotice: initialDemo.dataLimitationNotice
    };

    setSelectedCity(customCity);
    setIsReverseGeocoding(true);

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=11`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const updatedDemo = detectLocationDemographics(lat, lng, data);
          const addr = data.address || {};
          const detectedName =
            addr.city ||
            addr.town ||
            addr.village ||
            addr.municipality ||
            addr.county ||
            addr.state ||
            data.name ||
            (updatedDemo.isUninhabitedOrWater ? 'Zona Marítima Desabitada' : 'Local Selecionado');
          const detectedCountry = addr.country || '';

          setSelectedCity((prev) => {
            if (Math.abs(prev.lat - lat) < 0.001 && Math.abs(prev.lng - lng) < 0.001) {
              return {
                ...prev,
                name: detectedName,
                country: detectedCountry ? `${detectedCountry} (${latStr}, ${lngStr})` : prev.country,
                description: data.display_name
                  ? `${data.display_name}. ${updatedDemo.dataLimitationNotice}`
                  : updatedDemo.dataLimitationNotice,
                populationEstimate: updatedDemo.populationEstimate,
                urbanPopulation: updatedDemo.urbanPopulation,
                metroPopulation: updatedDemo.metroPopulation,
                coreDensityPerKm2: updatedDemo.coreDensityPerKm2,
                metroDensityPerKm2: updatedDemo.metroDensityPerKm2,
                ruralDensityPerKm2: updatedDemo.ruralDensityPerKm2,
                isUninhabitedOrWater: updatedDemo.isUninhabitedOrWater,
                settlementType: updatedDemo.settlementType,
                confidenceLevel: updatedDemo.confidenceLevel,
                dataLimitationNotice: updatedDemo.dataLimitationNotice
              };
            }
            return prev;
          });
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsReverseGeocoding(false);
      });
  };

  useEffect(() => {
    onMapClickRef.current = (lat: number, lng: number) => {
      handleMapClick(lat, lng);
    };
  });

  // Debounced search with local preset matching + Nominatim API
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    // Immediate local match in preset cities
    const localMatches = WORLD_PRESET_CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        (c.highlightTag && c.highlightTag.toLowerCase().includes(q))
    );
    setSearchResults(localMatches);

    if (q.length < 2) return;

    setIsSearching(true);
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery.trim()
        )}&limit=8&addressdetails=1`,
        { signal: controller.signal }
      )
        .then((res) => res.json())
        .then((data: any[]) => {
          if (Array.isArray(data)) {
            const apiCities: TargetCity[] = data.map((item, idx) => {
              const addr = item.address || {};
              const name =
                addr.city ||
                addr.town ||
                addr.municipality ||
                addr.village ||
                item.name ||
                item.display_name.split(',')[0];
              const country = addr.country || '';
              const itemLat = parseFloat(item.lat);
              const itemLng = parseFloat(item.lon);
              const demo = detectLocationDemographics(itemLat, itemLng, item);

              return {
                id: `osm-${item.place_id || idx}`,
                name: name.trim(),
                country: country ? `${country}` : '',
                lat: itemLat,
                lng: itemLng,
                description: item.display_name,
                populationEstimate: demo.populationEstimate,
                urbanPopulation: demo.urbanPopulation,
                metroPopulation: demo.metroPopulation,
                coreDensityPerKm2: demo.coreDensityPerKm2,
                metroDensityPerKm2: demo.metroDensityPerKm2,
                ruralDensityPerKm2: demo.ruralDensityPerKm2,
                isUninhabitedOrWater: demo.isUninhabitedOrWater,
                settlementType: demo.settlementType,
                confidenceLevel: demo.confidenceLevel,
                dataLimitationNotice: demo.dataLimitationNotice
              };
            });

            // Merge without duplicates
            const merged = [...localMatches];
            apiCities.forEach((ac) => {
              if (
                !merged.some(
                  (mc) => Math.abs(mc.lat - ac.lat) < 0.08 && Math.abs(mc.lng - ac.lng) < 0.08
                )
              ) {
                merged.push(ac);
              }
            });
            setSearchResults(merged);
          }
        })
        .catch((err) => {
          if (err.name !== 'AbortError') {
            console.warn('Geocoding search warning:', err);
          }
        })
        .finally(() => {
          setIsSearching(false);
        });
    }, 350);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [searchQuery]);

  // Handle manual coordinate submission
  const handleApplyCoordinates = () => {
    const parsedLat = parseFloat(coordLat);
    const parsedLng = parseFloat(coordLng);
    if (
      isNaN(parsedLat) ||
      isNaN(parsedLng) ||
      parsedLat < -90 ||
      parsedLat > 90 ||
      parsedLng < -180 ||
      parsedLng > 180
    ) {
      alert('Por favor, insira coordenadas válidas: Latitude entre -90 e 90, Longitude entre -180 e 180.');
      return;
    }
    const demo = detectLocationDemographics(parsedLat, parsedLng);
    const customCity: TargetCity = {
      id: `coord-${Date.now()}`,
      name: coordCityName.trim() || (demo.isUninhabitedOrWater ? 'Ponto Marítimo / Desabitado' : 'Ponto Informado'),
      country: `[${parsedLat.toFixed(4)}°, ${parsedLng.toFixed(4)}°]`,
      lat: parsedLat,
      lng: parsedLng,
      description: demo.dataLimitationNotice,
      populationEstimate: demo.populationEstimate,
      urbanPopulation: demo.urbanPopulation,
      metroPopulation: demo.metroPopulation,
      coreDensityPerKm2: demo.coreDensityPerKm2,
      metroDensityPerKm2: demo.metroDensityPerKm2,
      ruralDensityPerKm2: demo.ruralDensityPerKm2,
      isUninhabitedOrWater: demo.isUninhabitedOrWater,
      settlementType: demo.settlementType,
      confidenceLevel: demo.confidenceLevel,
      dataLimitationNotice: demo.dataLimitationNotice
    };
    handleSelectCity(customCity);
    setShowCoordModal(false);
    setCoordLat('');
    setCoordLng('');
    setCoordCityName('');
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [selectedCity.lat, selectedCity.lng],
        zoom: 12,
        minZoom: 1, // Permite ver todo o mapa mundi e continentes
        maxZoom: 19, // Suporte a zoom detalhado
        zoomDelta: 1,
        zoomSnap: 1, // CRÍTICO: remove zoom fracionário que causava embaçamento/blur nos blocos do mapa
        zoomAnimation: true, // Transição suave como era antes ao aumentar e diminuir o zoom
        markerZoomAnimation: true,
        fadeAnimation: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        touchZoom: true,
        worldCopyJump: true,
        zoomControl: false,
        attributionControl: false
      });

      // Attribution
      L.control
        .attribution({ position: 'bottomright' })
        .addAttribution('&copy; OpenStreetMap &copy; Esri')
        .addTo(map);

      // Track zoom level & world view status
      map.on('zoomend', () => {
        const z = map.getZoom();
        setCurrentZoom(z);
        if (z <= 3.5) {
          setIsWorldView(true);
          isWorldViewRef.current = true;
        } else {
          setIsWorldView(false);
          isWorldViewRef.current = false;
        }
      });

      // A bomba só pode ser movida arrastando o alvo tático no centro (Ground Zero marker)
      // O listener de clique no mapa foi removido conforme solicitado pelo usuário.

      // Helper function to resolve tile configurations without API keys or watermarks
      const getTileConfig = (theme: 'tactical' | 'satellite' | 'osm'): {
        url: string;
        referenceUrl?: string;
        oceanReferenceUrl?: string;
        transportationReferenceUrl?: string;
        referenceClassName?: string;
        className: string;
        subdomains: string[];
        maxZoom: number;
        maxNativeZoom: number;
        attribution: string;
      } => {
        if (theme === 'tactical') {
          return {
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
            className: 'tactical-dark-tiles',
            subdomains: ['a', 'b', 'c'],
            maxZoom: 19,
            maxNativeZoom: 16,
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
          };
        }
        if (theme === 'satellite') {
          return {
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            className: 'satellite-tiles',
            subdomains: ['a', 'b', 'c'],
            maxZoom: 19,
            maxNativeZoom: 19,
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics'
          };
        }
        return {
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          className: 'osm-tiles',
          subdomains: ['a', 'b', 'c'],
          maxZoom: 19,
          maxNativeZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>'
        };
      };

      const initialTileConfig = getTileConfig(mapTheme);
      const tileLayer = L.tileLayer(initialTileConfig.url, {
        minZoom: 1,
        maxZoom: initialTileConfig.maxZoom,
        maxNativeZoom: initialTileConfig.maxNativeZoom,
        detectRetina: false,
        subdomains: initialTileConfig.subdomains,
        className: initialTileConfig.className,
        attribution: initialTileConfig.attribution,
        noWrap: false
      }).addTo(map);

      // Adiciona camada de referência oceânica (Atlantic Ocean, Pacific Ocean, Indian Ocean, Southern Ocean)
      if (initialTileConfig.oceanReferenceUrl) {
        const oceanRefLayer = L.tileLayer(initialTileConfig.oceanReferenceUrl, {
          minZoom: 1,
          maxZoom: initialTileConfig.maxZoom,
          maxNativeZoom: 10,
          detectRetina: false,
          subdomains: initialTileConfig.subdomains,
          className: 'satellite-ocean-reference-tiles',
          noWrap: false,
          zIndex: 385
        }).addTo(map);
        oceanReferenceLayerRef.current = oceanRefLayer;
      }

      // Adiciona camada realista de vias, avenidas e malha urbana quando aproxima numa cidade no modo Satélite
      if (initialTileConfig.transportationReferenceUrl) {
        const transRefLayer = L.tileLayer(initialTileConfig.transportationReferenceUrl, {
          minZoom: 9,
          maxZoom: initialTileConfig.maxZoom,
          maxNativeZoom: 19,
          detectRetina: false,
          subdomains: initialTileConfig.subdomains,
          className: 'satellite-transportation-tiles',
          noWrap: false,
          zIndex: 392
        }).addTo(map);
        transportationReferenceLayerRef.current = transRefLayer;
      }

      // Adiciona camada de referência de fronteiras tracejadas discretas, países, estados, cidades e bairros do zoom 1 até o zoom 19
      if (initialTileConfig.referenceUrl) {
        const refLayer = L.tileLayer(initialTileConfig.referenceUrl, {
          minZoom: 1,
          maxZoom: initialTileConfig.maxZoom,
          maxNativeZoom: 16,
          detectRetina: false,
          subdomains: initialTileConfig.subdomains,
          className: initialTileConfig.referenceClassName || 'tactical-reference-tiles',
          noWrap: false,
          zIndex: 400
        }).addTo(map);
        referenceLayerRef.current = refLayer;
      }

      // Fallback em caso de erro no carregamento de azulejo
      tileLayer.on('tileerror', (e) => {
        const coords = (e as unknown as { coords?: { z: number; x: number; y: number } }).coords;
        if (coords && e.tile) {
          if (mapTheme === 'tactical') {
            (e.tile as HTMLImageElement).src = `https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/${coords.z}/${coords.y}/${coords.x}`;
          } else if (mapTheme === 'osm') {
            (e.tile as HTMLImageElement).src = `https://tile.openstreetmap.org/${coords.z}/${coords.x}/${coords.y}.png`;
          } else if (mapTheme === 'satellite') {
            (e.tile as HTMLImageElement).src = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${coords.z}/${coords.y}/${coords.x}`;
          }
        }
      });

      tileLayerRef.current = tileLayer;

      // Group for blast circles
      const circlesGroup = L.layerGroup().addTo(map);
      circlesLayerGroupRef.current = circlesGroup;

      // Group for Historic Nuclear Test Sites markers (Bikini, Novaya Zemlya, Nevada, Semipalatinsk)
      const testSitesGroup = L.layerGroup().addTo(map);
      testSitesLayerGroupRef.current = testSitesGroup;

      mapInstanceRef.current = map;

      // Invalidação imediata para carregar todos os blocos do mapa sem tela preta
      setTimeout(() => {
        map.invalidateSize();
      }, 50);
      setTimeout(() => {
        map.invalidateSize();
      }, 250);
    }

    return () => {
      if (mapInstanceRef.current) {
        if (referenceLayerRef.current) {
          mapInstanceRef.current.removeLayer(referenceLayerRef.current);
          referenceLayerRef.current = null;
        }
        if (oceanReferenceLayerRef.current) {
          mapInstanceRef.current.removeLayer(oceanReferenceLayerRef.current);
          oceanReferenceLayerRef.current = null;
        }
        if (transportationReferenceLayerRef.current) {
          mapInstanceRef.current.removeLayer(transportationReferenceLayerRef.current);
          transportationReferenceLayerRef.current = null;
        }
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer if theme changes (Tático = Mapa Escuro Autêntico, Satélite = Esri Imagery + Labels, Rua = OSM)
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    mapInstanceRef.current.removeLayer(tileLayerRef.current);
    if (referenceLayerRef.current) {
      mapInstanceRef.current.removeLayer(referenceLayerRef.current);
      referenceLayerRef.current = null;
    }
    if (oceanReferenceLayerRef.current) {
      mapInstanceRef.current.removeLayer(oceanReferenceLayerRef.current);
      oceanReferenceLayerRef.current = null;
    }
    if (transportationReferenceLayerRef.current) {
      mapInstanceRef.current.removeLayer(transportationReferenceLayerRef.current);
      transportationReferenceLayerRef.current = null;
    }
    
    const tileConfig = (() => {
      if (mapTheme === 'tactical') {
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
          className: 'tactical-dark-tiles',
          subdomains: ['a', 'b', 'c'],
          maxZoom: 19,
          maxNativeZoom: 16,
          attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
        };
      }
      if (mapTheme === 'satellite') {
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          className: 'satellite-tiles',
          subdomains: ['a', 'b', 'c'],
          maxZoom: 19,
          maxNativeZoom: 19,
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics'
        };
      }
      return {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        className: 'osm-tiles',
        subdomains: ['a', 'b', 'c'],
        maxZoom: 19,
        maxNativeZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>'
      };
    })();

    const newTileLayer = L.tileLayer(tileConfig.url, {
      minZoom: 1,
      maxZoom: tileConfig.maxZoom,
      maxNativeZoom: tileConfig.maxNativeZoom,
      detectRetina: false,
      subdomains: tileConfig.subdomains,
      className: tileConfig.className,
      attribution: tileConfig.attribution,
      noWrap: false
    }).addTo(mapInstanceRef.current);

    newTileLayer.on('tileerror', (e) => {
      const coords = (e as unknown as { coords?: { z: number; x: number; y: number } }).coords;
      if (coords && e.tile) {
        if (mapTheme === 'tactical') {
          (e.tile as HTMLImageElement).src = `https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/${coords.z}/${coords.y}/${coords.x}`;
        } else if (mapTheme === 'osm') {
          (e.tile as HTMLImageElement).src = `https://tile.openstreetmap.org/${coords.z}/${coords.x}/${coords.y}.png`;
        } else if (mapTheme === 'satellite') {
          (e.tile as HTMLImageElement).src = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${coords.z}/${coords.y}/${coords.x}`;
        }
      }
    });

    tileLayerRef.current = newTileLayer;
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 50);
  }, [mapTheme]);

  // Render Historic Nuclear Test Sites on the Map (Bikini, Novaya Zemlya, Nevada, Semipalatinsk)
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = testSitesLayerGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();

    if (!showTestSites) return;

    HISTORIC_NUCLEAR_TEST_SITES.forEach((site) => {
      const isCurrentTarget = selectedCity.id === site.id || selectedCity.name === site.name;

      // Quando o local estiver selecionado como alvo, não exibe o nome nem o marcador dentro do mapa
      if (isCurrentTarget) return;

      const testSiteIcon = L.divIcon({
        className: 'historic-test-site-icon',
        html: `
          <div class="relative flex items-center justify-center group cursor-pointer select-none">
            <div class="w-7 h-7 rounded-full bg-[#1c1c1c]/95 border border-white/25 shadow-lg flex items-center justify-center hover:scale-110 hover:border-red-400 hover:bg-[#282828] transition-all">
              <span class="text-xs text-red-400">📍</span>
            </div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([site.lat, site.lng], { icon: testSiteIcon, zIndexOffset: 500 });

      marker.bindTooltip(
        `<div style="font-family: ui-sans-serif, system-ui, sans-serif; font-size: 11px; line-height: 1.4; color: #f8fafc; min-width: 220px; pointer-events: none;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 3px;">
            <strong style="color: #fde047; font-size: 12px;">☢️ ${site.name}</strong>
            <span style="background: rgba(245,158,11,0.25); border: 1px solid #f59e0b; color: #fde047; font-size: 9px; font-weight: 700; padding: 1px 5px; border-radius: 4px;">TESTES NUCLEARES</span>
          </div>
          <div style="color: #94a3b8; font-size: 10px;">${site.country} • ${site.landmark}</div>
          <div style="color: #fed7aa; font-size: 10.5px; margin-top: 4px; font-weight: 600;">🎯 ${site.highlightTag}</div>
          <div style="color: #38bdf8; font-size: 10px; margin-top: 4px; font-weight: bold;">(Clique para inspecionar ou armar detonação)</div>
        </div>`,
        { direction: 'top', className: 'tactical-map-tooltip' }
      );

      marker.bindPopup(
        `<div style="font-family: ui-sans-serif, system-ui, sans-serif; font-size: 12px; color: #f8fafc; line-height: 1.45; min-width: 270px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 4px;">
            <strong style="font-size: 13px; color: #fde047;">☢️ ${site.name}</strong>
            <span style="background: rgba(245,158,11,0.25); border: 1px solid #f59e0b; color: #fde047; font-size: 9px; font-weight: bold; padding: 1px 6px; border-radius: 4px;">LOCAL HISTÓRICO</span>
          </div>
          <div style="color: #94a3b8; font-size: 11px; margin-bottom: 4px;">
            <b>${site.country}</b> • <span style="font-family: monospace; color: #67e8f9;">${site.lat.toFixed(4)}°, ${site.lng.toFixed(4)}°</span>
          </div>
          <div style="color: #fed7aa; font-weight: 700; font-size: 11.5px; margin-bottom: 4px;">
            🎯 ${site.highlightTag}
          </div>
          <div style="font-size: 11px; color: #cbd5e1; margin-bottom: 6px; line-height: 1.35;">
            ${site.description}
          </div>
          <div style="padding: 4px 6px; background: rgba(0,0,0,0.4); border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); font-size: 10px; color: #94a3b8; margin-bottom: 8px;">
            📍 Marco: <b style="color: #f1f5f9;">${site.landmark}</b>
          </div>
          <button id="btn-target-${site.id}" style="width: 100%; padding: 7px 10px; background: #ef4444; color: #ffffff; font-weight: 800; font-size: 11px; border: none; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
            🎯 Definir como Alvo de Detonação
          </button>
        </div>`
      );

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-target-${site.id}`);
        if (btn) {
          btn.onclick = () => {
            handleSelectCity(site);
            map.closePopup();
          };
        }
      });

      group.addLayer(marker);
    });
  }, [showTestSites, selectedCity]);

  // Update blast circles, fallout plumes, and center whenever configuration changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = circlesLayerGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();

    const center: [number, number] = [selectedCity.lat, selectedCity.lng];
    const allFalloutPoints: [number, number][] = [];

    // Se a bomba NÃO foi detonada: renderiza APENAS o alvo tático no centro (sem número de baixas)
    // O número de mortos e feridos só aparece na cidade quando a bomba for detonada
    if (!isDetonated) {
      const targetingReticleIcon = L.divIcon({
        className: 'ground-zero-targeting-reticle',
        html: `
          <div class="relative flex items-center justify-center w-16 h-16 cursor-grab active:cursor-grabbing group select-none">
            <!-- Pulsing outer target radar rings -->
            <div class="absolute w-16 h-16 rounded-full border-2 border-red-500/80 animate-ping"></div>
            <div class="absolute w-12 h-12 rounded-full border border-dashed border-amber-400 animate-spin" style="animation-duration: 9s;"></div>
            <div class="absolute w-9 h-9 rounded-full border-2 border-red-500/90 bg-red-950/70 shadow-2xl"></div>
            
            <!-- Crosshairs -->
            <div class="absolute w-16 h-0.5 bg-red-500/80 shadow-md"></div>
            <div class="absolute h-16 w-0.5 bg-red-500/80 shadow-md"></div>
            
            <!-- Center target bullseye -->
            <div class="w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-neutral-950 z-10 shadow-lg shadow-red-600/80 flex items-center justify-center">
              <div class="w-1.5 h-1.5 rounded-full bg-red-600"></div>
            </div>
          </div>
        `,
        iconSize: [64, 64],
        iconAnchor: [32, 32]
      });

      const marker = L.marker(center, { icon: targetingReticleIcon, draggable: true });
      marker.on('dragstart', () => {
        isDraggingTargetRef.current = true;
      });
      marker.on('drag', () => {
        isDraggingTargetRef.current = true;
      });
      marker.on('dragend', (e) => {
        isDraggingTargetRef.current = true;
        const newPos = (e.target as L.Marker).getLatLng();
        onMapClickRef.current(newPos.lat, newPos.lng);
      });
      marker.bindPopup(`
        <div style="font-family: ui-sans-serif, system-ui, sans-serif; font-size: 12px; color: #f8fafc; line-height: 1.4; min-width: 260px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 4px;">
            <strong style="font-size: 13px; color: #f87171;">🎯 ALVO ARMADO (CENTRO)</strong>
            <span style="background: rgba(239,68,68,0.25); border: 1px solid #f87171; color: #fca5a5; font-size: 10px; font-weight: bold; padding: 1px 6px; border-radius: 4px;">AGUARDANDO DETONAÇÃO</span>
          </div>
          <span style="color: #fde047; font-weight: 700;">${selectedBomb.name}</span> <span style="color: #cbd5e1;">(${selectedBomb.yieldDisplay})</span><br/>
          <span style="color: #94a3b8;">Alvo Selecionado:</span> <b style="color: #ffffff;">${selectedCity.name}</b> <span style="color: #94a3b8;">(${selectedCity.country})</span><br/>
          <span style="color: #94a3b8;">Coordenadas:</span> <span style="font-family: monospace; color: #67e8f9;">${selectedCity.lat.toFixed(4)}°, ${selectedCity.lng.toFixed(4)}°</span><br/>
          <div style="margin-top: 8px; padding: 8px; background: rgba(239, 68, 68, 0.15); border-radius: 6px; border: 1px solid rgba(239, 68, 68, 0.4); text-align: center;">
            <div style="font-size: 11.5px; color: #fca5a5; font-weight: 800;">⚠️ Zonas Ocultas Até a Detonação</div>
            <div style="font-size: 10.5px; color: #e2e8f0; margin-top: 3px;">
              Clique no botão <strong>"DETONAR BOMBA"</strong> para disparar a arma nuclear e calcular as zonas de destruição reais e o impacto de fatalidades.
            </div>
          </div>
          <div style="margin-top: 6px; font-size: 10px; color: #94a3b8; font-style: italic; text-align: center;">
            (Dica: Para mover a bomba, arraste este alvo no centro)
          </div>
        </div>
      `);
      group.addLayer(marker);

      // Ao mover ou arrastar o alvo, a tela/mapa NÃO se move automaticamente para o centro do alvo
      isDraggingTargetRef.current = false;
      return;
    }

    // 1. Draw Radioactive Fallout Polygons (rendered under prompt blast circles)
    falloutPolygonsRef.current = {};

    if (showFallout && selectedBomb.fallout) {
      const speedScale = Math.pow(windSpeedKmh / 25, 0.65);
      const burstScale = burstType === 'air' ? 0.35 : 1.0;
      const widthScale = Math.pow(25 / windSpeedKmh, 0.3);

      const orderedZones = [...FALLOUT_ZONES_CONFIG].reverse();

      orderedZones.forEach((zone) => {
        if (!visibleFalloutZones[zone.id]) return;

        const contour =
          selectedBomb.fallout.surfaceContours[
            zone.id as keyof typeof selectedBomb.fallout.surfaceContours
          ];
        if (!contour) return;

        const lenKm = contour.lengthKm * speedScale * burstScale;
        const wKm = contour.maxHalfWidthKm * widthScale * (burstType === 'air' ? 0.5 : 1.0);

        const pts = computeFalloutContourCoordinates(
          center[0],
          center[1],
          lenKm,
          wKm,
          windDirectionDeg,
          Math.max(selectedBomb.fireballRadiusM / 1000, 0.2)
        );

        allFalloutPoints.push(...pts);

        const baseStyle: L.PathOptions = {
          color: zone.color,
          fillColor: zone.fillColor,
          fillOpacity: burstType === 'air' ? zone.fillOpacity * 0.6 : zone.fillOpacity,
          weight: zone.strokeWeight,
          dashArray: zone.id === 'rad10' ? '4, 4' : undefined
        };

        const poly = L.polygon(pts, {
          ...baseStyle,
          smoothFactor: 0,
          className: `tactical-zone-path tactical-fallout-zone tactical-fallout-${zone.id}`
        });

        poly.on('mouseover', () => {
          setHoveredFalloutZoneId(zone.id);
        });

        poly.on('mouseout', () => {
          setHoveredFalloutZoneId((prev) => (prev === zone.id ? null : prev));
        });

        falloutPolygonsRef.current[zone.id] = {
          polygon: poly,
          baseStyle,
          color: zone.color
        };

        group.addLayer(poly);
      });

      // Wind direction indicator vector emanating from Ground Zero
      const rad = (windDirectionDeg * Math.PI) / 180;
      const maxFalloutLenKm = selectedBomb.fallout.surfaceContours.rad10.lengthKm * speedScale * burstScale;
      const indicatorLenKm = Math.min(Math.max(maxFalloutLenKm * 0.35, 8), 120);
      const cosLat = Math.max(Math.cos((center[0] * Math.PI) / 180), 0.05);
      const windVectorEnd: [number, number] = [
        center[0] + (indicatorLenKm * Math.cos(rad)) / 111.32,
        center[1] + (indicatorLenKm * Math.sin(rad)) / (111.32 * cosLat)
      ];

      const windLine = L.polyline([center, windVectorEnd], {
        color: '#c084fc',
        weight: 2.5,
        dashArray: '6, 6',
        opacity: 0.85
      });
      windLine.bindTooltip(
        `<div style="font-family: ui-sans-serif, system-ui, sans-serif; font-size: 11px; line-height: 1.4; color: #f8fafc; pointer-events: none;">
          <span style="color: #c084fc; font-weight: 800;">🌬️ Vetor de Vento:</span> <b style="color: #67e8f9; font-weight: 700;">${windDirectionDeg}°</b> <span style="color: #94a3b8;">(</span><b style="color: #fde047; font-weight: 700;">${windSpeedKmh} km/h</b><span style="color: #94a3b8;">)</span> • <span style="color: #a7f3d0; font-weight: 600;">Direção da Precipitação Radioativa</span>
        </div>`,
        {
          sticky: true,
          className: 'tactical-map-tooltip'
        }
      );
      group.addLayer(windLine);
    }

    // 2. Prompt Blast Layers com Dimensões Físicas Reais (7 Zonas Calibradas)
    const layersToDraw = [
      {
        id: 'light',
        radius: effectiveBomb.lightBlastRadiusM,
        color: '#94A3B8',
        fillColor: '#94A3B8',
        fillOpacity: 0.12,
        weight: 1.5,
        dashArray: '6, 6',
        name: '7º Onda de Choque Leve (1-2 psi - Estilhaços)'
      },
      {
        id: 'thermal',
        radius: effectiveBomb.thermalRadiusM,
        color: '#F97316',
        fillColor: '#F97316',
        fillOpacity: 0.16,
        weight: 1.8,
        dashArray: '4, 4',
        name: '6º Raio Térmico (Queimaduras 3º Grau)'
      },
      {
        id: 'moderate',
        radius: effectiveBomb.moderateBlastRadiusM,
        color: '#8B5CF6',
        fillColor: '#8B5CF6',
        fillOpacity: 0.22,
        weight: 2.0,
        dashArray: '4, 4',
        name: '5º Onda de Choque Moderada (5 psi - Colapso Residencial)'
      },
      {
        id: 'heavy',
        radius: effectiveBomb.heavyBlastRadiusM,
        color: '#E11D48',
        fillColor: '#EC4899',
        fillOpacity: 0.34,
        weight: 2.4,
        name: '4º Onda de Choque Pesada (20 psi - Colapso Estrutural)'
      },
      {
        id: 'carbonization',
        radius: effectiveBomb.carbonizationRadiusM,
        color: '#DC2626',
        fillColor: '#EF4444',
        fillOpacity: 0.35,
        weight: 2.4,
        dashArray: '5, 3',
        name: '3º Carbonização Total (Combustão Humana Instantânea)'
      },
      {
        id: 'vaporization',
        radius: effectiveBomb.vaporizationRadiusM,
        color: '#FB923C',
        fillColor: '#FB923C',
        fillOpacity: 0.38,
        weight: 2.2,
        dashArray: '3, 3',
        name: '2º Vaporização Imediata (Fusão Térmica de Materiais)'
      },
      {
        id: 'fireball',
        radius: effectiveBomb.fireballRadiusM,
        color: '#FACC15',
        fillColor: '#FACC15',
        fillOpacity: 0.58,
        weight: 2.6,
        name: '1º Bola de Fogo Nuclear (Plasma ~100M °C)'
      }
    ];

    // Sort so larger circles render behind smaller ones
    const sortedLayers = [...layersToDraw].sort((a, b) => b.radius - a.radius);

    zoneCirclesRef.current = {};

    sortedLayers.forEach((layer) => {
      if (!visibleLayers[layer.id]) return;

      const baseStyle = {
        radius: layer.radius,
        color: layer.color,
        fillColor: layer.fillColor,
        fillOpacity: layer.fillOpacity,
        weight: layer.weight,
        dashArray: layer.dashArray
      };

      const circle = L.circle(center, {
        ...baseStyle,
        className: `tactical-zone-path tactical-zone-${layer.id}`
      });

      circle.on('mouseover', () => {
        setHoveredZoneId(layer.id);
      });

      circle.on('mouseout', () => {
        setHoveredZoneId((prev) => (prev === layer.id ? null : prev));
      });

      zoneCirclesRef.current[layer.id] = {
        circle,
        baseStyle,
        color: layer.color
      };

      group.addLayer(circle);
    });

    // Custom tactical marker at Ground Zero (draggable to any position)
    const groundZeroIcon = L.divIcon({
      className: 'ground-zero-marker',
      html: `
        <div class="relative flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none">
          <div class="relative flex items-center justify-center w-8 h-8">
            <div class="absolute w-8 h-8 rounded-full bg-red-500/40 animate-ping"></div>
            <div class="absolute w-5 h-5 rounded-full border-2 border-red-400"></div>
            <div class="absolute w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white shadow-lg"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const marker = L.marker(center, { icon: groundZeroIcon, draggable: true });
    marker.on('dragstart', () => {
      isDraggingTargetRef.current = true;
    });
    marker.on('drag', () => {
      isDraggingTargetRef.current = true;
    });
    marker.on('dragend', (e) => {
      isDraggingTargetRef.current = true;
      const newPos = (e.target as L.Marker).getLatLng();
      onMapClickRef.current(newPos.lat, newPos.lng);
    });
    marker.bindPopup(`
      <div style="font-family: ui-sans-serif, system-ui, sans-serif; font-size: 12px; color: #f8fafc; line-height: 1.4; min-width: 250px;">
        <strong style="font-size: 13px; color: #f87171;">🎯 MARCO ZERO (GROUND ZERO)</strong><br/>
        <span style="color: #fde047; font-weight: 700;">${selectedBomb.name}</span> <span style="color: #cbd5e1;">(${selectedBomb.yieldDisplay})</span><br/>
        <span style="color: #94a3b8;">Alvo:</span> <b style="color: #ffffff;">${selectedCity.name}</b> <span style="color: #94a3b8;">(${selectedCity.country})</span><br/>
        <span style="color: #94a3b8;">Coordenadas:</span> <span style="font-family: monospace; color: #67e8f9;">${selectedCity.lat.toFixed(4)}°, ${selectedCity.lng.toFixed(4)}°</span><br/>
        <div style="margin-top: 6px; padding: 6px 8px; background: rgba(220, 38, 38, 0.18); border-radius: 6px; border: 1px solid rgba(248, 113, 113, 0.35);">
          <div style="font-size: 12.5px; font-weight: 800; color: #fca5a5;">
            💀 Mortes Estimadas: ${casualties.deathsRangeDisplay}
          </div>
          <div style="font-size: 10px; color: #cbd5e1; margin-top: 1px;">
            (Estimativa média central: ~${formatCasualtyNumber(casualties.totalDeaths)})
          </div>
          <div style="font-size: 11px; font-weight: bold; color: #fdba74; margin-top: 2px;">
            🩹 Feridos Graves: ${casualties.injuriesRangeDisplay}
          </div>
          <div style="font-size: 11px; color: #e2e8f0; margin-top: 1px;">
            👥 População sob Efeito: ${formatCasualtyNumber(casualties.totalAffectedPop)} hab
          </div>
          <div style="font-size: 10.5px; color: #fde047; font-weight: bold; margin-top: 2px;">
            Letalidade Global na Área: ${casualties.mortalityPercentage.toFixed(1)}%
          </div>
          <div style="margin-top: 5px; padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.15); font-size: 9.5px; color: #94a3b8;">
            📊 Confiabilidade: <span style="color: #e2e8f0; font-weight: bold;">${casualties.confidenceLabel}</span>
          </div>
        </div>
        <div style="margin-top: 6px; font-size: 10px; color: #94a3b8; font-style: italic;">
          (Dica: Arraste este marcador para reposicionar o alvo)
        </div>
      </div>
    `);
    group.addLayer(marker);

    // Auto-fit bounds with comfortable padding so the entire affected area (blast + fallout plume) is visible
    const maxBlastRadius = Math.max(
      effectiveBomb.fireballRadiusM,
      effectiveBomb.vaporizationRadiusM,
      effectiveBomb.carbonizationRadiusM,
      effectiveBomb.heavyBlastRadiusM,
      effectiveBomb.moderateBlastRadiusM,
      effectiveBomb.thermalRadiusM,
      effectiveBomb.lightBlastRadiusM
    );

    // Auto-fit bounds somente no disparo da detonação, NUNCA ao arrastar/mover o alvo
    if (isDraggingTargetRef.current) {
      isDraggingTargetRef.current = false;
    } else if (shouldFitBoundsOnDetonateRef.current && !isWorldViewRef.current) {
      shouldFitBoundsOnDetonateRef.current = false;
      try {
        const safeBounds = getCombinedBounds(
          selectedCity.lat,
          selectedCity.lng,
          maxBlastRadius,
          showFallout ? allFalloutPoints : []
        );
        map.fitBounds(safeBounds, {
          padding: [40, 40],
          animate: true,
          duration: 0.9,
          maxZoom: 15
        });
      } catch (err) {
        console.warn('Map fitBounds warning:', err);
      }
    }
  }, [
    selectedBomb,
    selectedCity,
    isDetonated,
    visibleLayers,
    dimensionMode,
    showFallout,
    windDirectionDeg,
    windSpeedKmh,
    burstType,
    visibleFalloutZones
  ]);

  // Invalidate map size when switching mobile tab to 'map'
  useEffect(() => {
    if (activeTabMobile === 'map' && mapInstanceRef.current) {
      const timer = setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [activeTabMobile]);

  // Invalidate Leaflet map size whenever layout, height or panel state changes or window resizes
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };
    window.addEventListener('resize', handleResize);

    if (mapInstanceRef.current) {
      const timer = setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 200);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
      };
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [mapHeightMode, isOptionsPanelOpen]);

  // Options toggle handler ensuring instant Leaflet invalidateSize
  const handleToggleOptions = () => {
    setIsOptionsPanelOpen(!isOptionsPanelOpen);
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 50);
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 220);
  };

  // Center on Ground Zero helper
  const handleRecenter = () => {
    isWorldViewRef.current = false;
    setIsWorldView(false);
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.invalidateSize();

    if (!isDetonated) {
      mapInstanceRef.current.setView([selectedCity.lat, selectedCity.lng], 12, { animate: true });
      return;
    }

    const maxRadius = Math.max(
      effectiveBomb.fireballRadiusM,
      effectiveBomb.vaporizationRadiusM,
      effectiveBomb.carbonizationRadiusM,
      effectiveBomb.heavyBlastRadiusM,
      effectiveBomb.moderateBlastRadiusM,
      effectiveBomb.thermalRadiusM,
      effectiveBomb.lightBlastRadiusM
    );
    try {
      let falloutPts: [number, number][] = [];
      if (showFallout && selectedBomb.fallout) {
        const speedScale = Math.pow(windSpeedKmh / 25, 0.65);
        const burstScale = burstType === 'air' ? 0.35 : 1.0;
        const widthScale = Math.pow(25 / windSpeedKmh, 0.3);
        const outerContour = selectedBomb.fallout.surfaceContours.rad10;
        falloutPts = computeFalloutContourCoordinates(
          selectedCity.lat,
          selectedCity.lng,
          outerContour.lengthKm * speedScale * burstScale,
          outerContour.maxHalfWidthKm * widthScale * (burstType === 'air' ? 0.5 : 1.0),
          windDirectionDeg,
          Math.max(effectiveBomb.fireballRadiusM / 1000, 0.2)
        );
      }
      const safeBounds = getCombinedBounds(selectedCity.lat, selectedCity.lng, maxRadius, falloutPts);
      mapInstanceRef.current.fitBounds(safeBounds, {
        padding: [40, 40],
        animate: true,
        duration: 0.9,
        maxZoom: 15
      });
    } catch (err) {
      console.warn('Map handleRecenter warning:', err);
    }
  };

  // Dynamic height class ensuring all controls and map fit inside screen viewport
  const getContainerHeightClass = () => {
    if (mapHeightMode === 'immersive') return 'h-[82vh] max-h-[82vh] min-h-[520px]';
    if (mapHeightMode === 'large') return 'h-[760px] max-h-[760px] min-h-[500px]';
    if (mapHeightMode === 'standard') return 'h-[640px] max-h-[640px] min-h-[460px]';
    return 'h-[520px] max-h-[520px] min-h-[420px]'; // compact zero-scroll default
  };

  return (
    <div className="w-full bg-[#0D0D0D] text-white rounded-2xl border border-white/10 shadow-2xl overflow-hidden font-sans">
      {/* Sleek Compact Tactical Command Bar */}
      <div className="bg-[#141414] border-b border-white/10 px-3 py-2.5 sm:px-5 sm:py-3">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 xl:gap-8">
          {/* Left: Tabela Técnica Completa das 12 Armas (Mesmo tom de preto bg-[#222222] das outras opções) */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => {
                setIsBombDropdownOpen(false);
                setIsWorldDropdownOpen(false);
                setIsSearchOpen(false);
                setShowBenchmarkModal(true);
              }}
              className="px-3.5 py-2 rounded-lg bg-[#222222] hover:bg-[#282828] border border-white/15 hover:border-white/30 text-white text-xs font-bold flex items-center space-x-2 transition-all shadow-md shrink-0 cursor-pointer"
              title="Visualizar a Tabela Técnica Completa das 12 Armas e todas as suas 6 Zonas de Destruição com Raio e Diâmetro"
            >
              <Table className="w-4 h-4 text-rose-500" />
              <span className="text-white">Tabela Técnica (12 Armas)</span>
            </button>
          </div>

          {/* Center/Right: Target City Chips (Cidades em Destaque) - Afastado para não ocupar o espaço da Tabela Técnica */}
          <div className="flex flex-wrap items-center gap-1.5 xl:ml-auto xl:pl-6 xl:border-l xl:border-white/10 pt-2.5 xl:pt-0 border-t xl:border-t-0 border-white/10">
            <span className="text-[10px] font-bold text-neutral-300 uppercase mr-1">Alvos em Destaque:</span>
            {TARGET_CITIES.map((city) => {
              const isSelected = selectedCity.id === city.id || selectedCity.name === city.name;
              return (
                <button
                  key={city.id}
                  onClick={() => handleSelectCity(city)}
                  className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1 border ${
                    isSelected
                      ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white border-pink-400 shadow-sm shadow-rose-950/40'
                      : 'bg-[#222222] text-neutral-200 hover:text-white hover:bg-[#282828] border-white/15'
                  }`}
                  title={`${city.name} (${city.country}) - ${city.highlightTag || 'Alvo'}`}
                >
                  <MapPin className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-rose-400'}`} />
                  <span>{city.name}</span>
                </button>
              );
            })}

            {/* Metrópoles Populares Dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => {
                  setIsBombDropdownOpen(false);
                  setIsSearchOpen(false);
                  setIsWorldDropdownOpen(!isWorldDropdownOpen);
                }}
                className="px-2 py-1 rounded-lg bg-[#222222] border border-white/15 hover:border-white/20 text-xs font-medium text-neutral-200 hover:text-white flex items-center space-x-1 transition-all"
                title="Lista de grandes capitais mundiais"
              >
                <Globe className="w-3 h-3 text-cyan-400" />
                <span className="hidden sm:inline">Metrópoles</span>
                <ChevronDown className="w-3 h-3 text-neutral-300" />
              </button>
              {isWorldDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-[#161616]/98 backdrop-blur-md border border-white/15 rounded-xl shadow-2xl z-50 max-h-72 overflow-y-auto p-1.5 space-y-1">
                  <div className="px-2.5 py-1 text-[10px] uppercase font-bold text-neutral-300 border-b border-white/10">
                    Grandes Cidades Mundiais
                  </div>
                  {WORLD_PRESET_CITIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelectCity(c)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between hover:bg-[#222222] transition-colors ${
                        selectedCity.name === c.name
                          ? 'bg-rose-500/20 text-rose-300 font-bold'
                          : 'text-neutral-200'
                      }`}
                    >
                      <div className="flex items-center space-x-1.5 truncate">
                        <MapPin className="w-3 h-3 text-neutral-300 shrink-0" />
                        <span className="truncate">{c.name}</span>
                        {c.isHighlighted && <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400 shrink-0" />}
                      </div>
                      <span className="text-[10px] text-neutral-400 shrink-0 ml-1.5">{c.country}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Botão de Coordenadas Manuais */}
            <button
              onClick={() => {
                setIsBombDropdownOpen(false);
                setIsWorldDropdownOpen(false);
                setIsSearchOpen(false);
                setShowCoordModal(true);
              }}
              className="px-2 py-1 rounded-lg bg-[#222222] border border-white/15 hover:border-white/20 text-xs font-medium text-neutral-200 hover:text-white flex items-center space-x-1 transition-all shrink-0"
              title="Digitar Latitude e Longitude exatas"
            >
              <Navigation className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">Coordenadas</span>
            </button>
          </div>
        </div>

        {/* Linha 2 Fixa: Barra de Busca de Qualquer Cidade (Posicionada fixa logo abaixo dos seletores de alvos) */}
        <div className="mt-2.5 pt-2 border-t border-white/10 relative">
          <div className="flex items-center bg-[#1c1c1c] border border-white/15 focus-within:border-red-500 rounded-xl px-3 py-1.5 text-xs transition-all shadow-sm">
            <Search className="w-3.5 h-3.5 text-red-400 shrink-0 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Buscar qualquer local (ex: Atol de Bikini, Novaya Zemlya, Nevada, Semipalatinsk, São Paulo, Tóquio...)"
              className="bg-transparent text-white placeholder-neutral-400 focus:outline-none w-full text-xs"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="text-neutral-400 hover:text-white p-0.5 ml-1 transition-colors"
                title="Limpar busca"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            {isSearching && <Loader2 className="w-3.5 h-3.5 text-red-400 animate-spin ml-1.5" />}
          </div>

          {/* Search results dropdown */}
          {isSearchOpen && (searchResults.length > 0 || isSearching) && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#161616]/98 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-50 max-h-72 overflow-y-auto p-1.5 space-y-1">
              <div className="px-2.5 py-1 text-[10px] uppercase font-bold text-neutral-300 flex items-center justify-between border-b border-white/10">
                <span>Resultados da Busca ({searchResults.length})</span>
                <span className="text-red-400 font-mono text-[9px]">OpenStreetMap Nominatim</span>
              </div>
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => {
                    handleSelectCity(result);
                    setIsSearchOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-[#252525] transition-all flex items-start justify-between gap-2 group"
                >
                  <div className="min-w-0">
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span className="text-xs font-bold text-white group-hover:text-red-300 truncate">
                        {result.name}
                      </span>
                      {result.country && (
                        <span className="text-[10px] text-neutral-300">({result.country})</span>
                      )}
                    </div>
                    <p className="text-[10px] text-neutral-400 truncate pl-5 mt-0.5">
                      {result.description}
                    </p>
                  </div>
                  <span className="text-[9px] font-mono text-neutral-400 shrink-0 self-center">
                    {result.lat.toFixed(2)}°, {result.lng.toFixed(2)}°
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Navigation Tabs (Mapa e Opções & Métricas) */}
        <div className="flex lg:hidden mt-2 bg-[#222222] p-1 rounded-lg border border-white/15">
          <button
            onClick={() => setActiveTabMobile('map')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all flex items-center justify-center space-x-1.5 ${
              activeTabMobile === 'map'
                ? 'bg-red-500 text-white shadow-sm'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>1. Mapa</span>
          </button>
          <button
            onClick={() => setActiveTabMobile('options')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all flex items-center justify-center space-x-1.5 ${
              activeTabMobile === 'options'
                ? 'bg-red-500 text-white shadow-sm'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2. Opções & Métricas</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Center Map (Left) and Right Column Options & Fallout */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
        {/* Interactive Leaflet Map Canvas */}
        <div
          className={`${
            !isOptionsPanelOpen
              ? 'col-span-12 w-full border-r-0'
              : 'lg:col-span-8 xl:col-span-8 2xl:col-span-9 border-r border-white/10'
          } flex flex-col bg-[#0A0A0A] transition-all duration-300 min-h-0 ${
            activeTabMobile === 'map' ? 'block' : 'hidden lg:flex'
          }`}
        >
          {/* Map Top Bar: Map Height Controls (Compacto / Médio / Grande) & Opções & Métricas Toggle */}
          <div className="bg-[#161616]/95 border-b border-white/10 px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between gap-2 text-xs">
            {/* Map Height Size Toggle (Compacto / Médio / Grande) */}
            <div className="flex items-center space-x-1 bg-[#222222] p-1 rounded-lg border border-white/15 text-[11px]">
              <button
                onClick={() => setMapHeightMode('compact')}
                className={`px-3 py-1 rounded font-bold transition-all ${
                  mapHeightMode === 'compact' ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-sm' : 'text-neutral-300 hover:text-white'
                }`}
                title="Altura compacta (520px) - Visão sem rolagem vertical"
              >
                Compacto
              </button>
              <button
                onClick={() => setMapHeightMode('standard')}
                className={`px-3 py-1 rounded font-bold transition-all ${
                  mapHeightMode === 'standard' ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-sm' : 'text-neutral-300 hover:text-white'
                }`}
                title="Altura padrão (640px)"
              >
                Médio
              </button>
              <button
                onClick={() => setMapHeightMode('large')}
                className={`px-3 py-1 rounded font-bold transition-all ${
                  mapHeightMode === 'large' ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-sm' : 'text-neutral-300 hover:text-white'
                }`}
                title="Altura grande (780px) - Ampla Visão"
              >
                Grande
              </button>
            </div>

            {/* Toggle Options Overlay (Opções / Métricas) */}
            <button
              onClick={handleToggleOptions}
              className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                isOptionsPanelOpen
                  ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white border-pink-400 shadow-sm ring-1 ring-pink-400'
                  : 'bg-[#222222] text-neutral-200 hover:text-white hover:bg-[#282828] border-white/15'
              }`}
              title={isOptionsPanelOpen ? 'Fechar painel de opções e métricas' : 'Abrir opções e métricas sobre o mapa'}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Opções & Métricas</span>
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-black ${
                  isOptionsPanelOpen ? 'bg-white text-rose-600' : 'bg-[#333333] text-neutral-300'
                }`}
              >
                {isOptionsPanelOpen ? 'ABERTO' : 'FECHADO'}
              </span>
            </button>
          </div>

          {/* Escolher Bomba & Escolher Potência (0,02 kt a 100 Mt) posicionados na frente do mapa */}
          <div className="relative z-30 bg-[#161616] border-b border-white/10 px-2.5 sm:px-3 py-1.5 flex flex-wrap items-center justify-start gap-2.5 sm:gap-3.5 overflow-visible">
            {/* Escolher Bomba */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-400 uppercase tracking-wider shrink-0">
                <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
                <span className="whitespace-nowrap text-rose-400">Escolher Bomba:</span>
              </div>

              {/* Seletor Customizado com visual em destaque na frente do mapa */}
              <div ref={bombDropdownRef} className="relative shrink-0 z-40">
                <button
                  type="button"
                  onClick={() => {
                    setIsWorldDropdownOpen(false);
                    setIsSearchOpen(false);
                    setIsBombDropdownOpen(!isBombDropdownOpen);
                  }}
                  className="bg-[#222222] hover:bg-[#282828] text-white text-xs font-bold px-2.5 py-1.5 rounded-lg border border-white/15 hover:border-white/30 focus:outline-none focus:border-rose-500 cursor-pointer flex items-center gap-2 transition-all max-w-[210px] sm:max-w-xs shadow-sm"
                  title="Clique para escolher uma arma atômica do ranking"
                >
                  <span className="truncate">{selectedBomb.name}</span>
                  <span className="font-mono text-rose-300 font-extrabold text-[11px] shrink-0 bg-rose-950/60 border border-rose-500/30 px-1.5 py-0.5 rounded">
                    {selectedBomb.yieldDisplay}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 shrink-0 transition-transform duration-200 ${isBombDropdownOpen ? 'rotate-180 text-white' : ''}`} />
                </button>

                {isBombDropdownOpen && (
                  <div className="absolute left-0 top-full mt-1.5 w-80 sm:w-[440px] max-w-[95vw] bg-[#141414] border-2 border-rose-500/60 rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.98)] z-50 max-h-80 sm:max-h-96 overflow-y-auto p-1.5 space-y-1 pointer-events-auto backdrop-blur-md">
                    <div className="px-2.5 py-1.5 text-[10px] uppercase font-bold text-neutral-400 flex items-center justify-between border-b border-white/10">
                      <span className="tracking-wider">Armas Nucleares do Ranking</span>
                      <span className="text-rose-400 font-mono text-[9px]">0,02 kt a 100 Mt</span>
                    </div>
                    {NUCLEAR_RANKING_BOMBS.map((b) => {
                      const isSelected = selectedBomb.id === b.id;
                      const bCas = calculateBombCityCasualties(b, selectedCity);
                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => handleSelectBomb(b)}
                          className={`w-full text-left p-2 rounded-lg transition-all flex items-start justify-between gap-2 cursor-pointer ${
                            isSelected
                              ? 'bg-rose-500/20 border border-rose-500/50 text-white font-bold ring-1 ring-rose-500/30'
                              : 'hover:bg-[#252525] text-neutral-200 hover:text-white border border-transparent'
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-white truncate">{b.name}</span>
                              <span className="text-[10px] font-mono text-rose-300 font-bold shrink-0">({b.yieldDisplay})</span>
                            </div>
                            <p className="text-[10px] text-neutral-400 truncate mt-0.5">
                              {b.type} • {b.country} ({b.year})
                            </p>
                            <div className="text-[9px] font-mono text-rose-400/90 mt-0.5 flex items-center gap-1">
                              <span>💀 {bCas.deathsRangeDisplay} mortes estimadas em {selectedCity.name}</span>
                            </div>
                          </div>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/50 border border-white/10 text-neutral-300 shrink-0 mt-0.5">
                            {b.yieldKt >= 1000 ? `${(b.yieldKt / 1000).toFixed(1)} Mt` : `${b.yieldKt} kt`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Separador vertical */}
            <div className="hidden sm:block h-5 w-px bg-white/15 shrink-0" />

            {/* Escolher Potência das Bombas (0,02 kt até 100 Mt - Usuário digita) */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-400 uppercase tracking-wider shrink-0">
                <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="whitespace-nowrap">Potência:</span>
              </div>

              {/* Campo para o usuário digitar com seletor de unidade kt / Mt */}
              <div className="flex items-center bg-[#222222] border border-white/15 hover:border-white/30 focus-within:border-rose-400 focus-within:ring-1 focus-within:ring-rose-400/40 rounded-lg p-0.5 shadow-sm transition-all">
                <input
                  type="text"
                  inputMode="decimal"
                  value={yieldInputValue}
                  onChange={(e) => handleDirectInputChange(e.target.value)}
                  onBlur={handleInputBlurOrEnter}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleInputBlurOrEnter();
                      (e.target as HTMLInputElement).blur();
                    }
                  }}
                  placeholder="0,02 a 100"
                  className="w-16 sm:w-20 px-2 py-1 bg-transparent text-white font-mono font-bold text-xs focus:outline-none placeholder-neutral-500 text-center"
                  title="Digite a potência desejada (de 0,02 kt até 100 Mt)"
                />

                {/* Seletor de Unidades kt / Mt */}
                <div className="flex items-center bg-[#141414] rounded-md p-0.5 border border-white/10">
                  <button
                    type="button"
                    onClick={() => handleUnitChange('kt')}
                    className={`px-1.5 py-0.5 text-[10px] font-mono font-bold rounded transition-all cursor-pointer ${
                      yieldUnit === 'kt'
                        ? 'bg-amber-500 text-black font-extrabold shadow-xs'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                    title="Definir unidade em Quilotons (0,02 kt a 100.000 kt)"
                  >
                    kt
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUnitChange('Mt')}
                    className={`px-1.5 py-0.5 text-[10px] font-mono font-bold rounded transition-all cursor-pointer ${
                      yieldUnit === 'Mt'
                        ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white font-extrabold shadow-xs'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                    title="Definir unidade em Megatons (0,00002 Mt a 100 Mt)"
                  >
                    Mt
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Leaflet Map Canvas Container */}
          <div className={`relative z-0 w-full ${getContainerHeightClass()} bg-[#0D0D0D] overflow-hidden flex-1 min-h-[500px]`}>
            {/* Inner Leaflet Mount */}
            <div className="relative w-full h-full bg-[#080808]">
              <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

              {/* Nuclear Detonation Flash Optical Effect */}
              {detonationFlash && (
                <div className="absolute inset-0 z-40 pointer-events-none bg-white animate-pulse transition-opacity duration-700 flex items-center justify-center">
                  <div className="text-center font-black font-mono text-black uppercase tracking-widest text-sm sm:text-base px-6 py-3 bg-amber-400/95 rounded-2xl shadow-2xl border-2 border-white flex items-center gap-2 animate-bounce">
                    <Flame className="w-5 h-5 fill-red-600 text-red-600" />
                    <span>DETONAÇÃO NUCLEAR CONFIRMADA</span>
                  </div>
                </div>
              )}

              {/* Floating Tactical Detonation HUD on Map */}
              <div className="absolute top-3 left-3 z-20 pointer-events-auto flex items-center gap-2">
                {!isDetonated ? (
                  <button
                    onClick={handleDetonate}
                    className="group relative flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-xs uppercase tracking-wider shadow-2xl shadow-red-600/60 border-2 border-red-300 active:scale-95 transition-all cursor-pointer animate-pulse"
                    title="Clique para detonar a arma atômica e calcular as zonas de destruição reais"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                    <Flame className="w-4 h-4 fill-amber-200 text-amber-200 group-hover:rotate-12 transition-transform" />
                    <span className="font-extrabold tracking-wide">DETONAR BOMBA</span>
                  </button>
                ) : (
                  <button
                    onClick={handleResetDetonation}
                    className="px-3.5 py-2 rounded-xl bg-[#121212]/95 hover:bg-[#1e1e1e] backdrop-blur-md text-amber-300 hover:text-white border border-amber-500/40 shadow-2xl font-sans font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Ocultar zonas e rearmar novo alvo"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                    <span>Rearmar</span>
                  </button>
                )}
              </div>

              {/* Tactical Zoom, Style & Global View Floating Controls Inside The Map */}
              <div className="absolute top-3 right-3 z-20 flex flex-col items-end space-y-2 pointer-events-auto">
                {/* Tactical Theme Segmented Control Pod (Tático / Satélite / Rua) Inside Map */}
                <div className="bg-[#141414]/95 backdrop-blur-md border border-white/20 rounded-xl p-1 shadow-2xl flex items-center gap-1">
                  <button
                    onClick={() => setMapTheme('tactical')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      mapTheme === 'tactical'
                        ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-md'
                        : 'text-neutral-400 hover:text-white hover:bg-white/10'
                    }`}
                    title="Modo Tático Militar (Mapa Escuro de Alto Contraste)"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Tático</span>
                  </button>
                  <button
                    onClick={() => setMapTheme('satellite')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      mapTheme === 'satellite'
                        ? 'bg-cyan-600 text-white shadow-md'
                        : 'text-neutral-400 hover:text-white hover:bg-white/10'
                    }`}
                    title="Modo Satélite"
                  >
                    <Satellite className="w-3.5 h-3.5" />
                    <span>Satélite</span>
                  </button>
                  <button
                    onClick={() => setMapTheme('osm')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      mapTheme === 'osm'
                        ? 'bg-neutral-200 text-neutral-950 shadow-md'
                        : 'text-neutral-400 hover:text-white hover:bg-white/10'
                    }`}
                    title="Modo Rua (OpenStreetMap Claro)"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Rua</span>
                  </button>
                </div>

                {/* Secondary Tactical Map Controls Pod: Mundi, Focar, Historic Sites & Zoom Inside Map */}
                <div className="flex items-center gap-1.5">
                  {/* World Map Button (Mundi) inside map */}
                  <button
                    onClick={handleViewWorldMap}
                    className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center space-x-1.5 backdrop-blur-md shadow-xl cursor-pointer ${
                      isWorldView
                        ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white border-pink-400 shadow-rose-950/50 ring-2 ring-pink-400'
                        : 'bg-[#161616]/95 text-neutral-200 hover:text-white hover:bg-[#252525] border-white/20'
                    }`}
                    title="Ver todo o Mapa Mundi (Planisfério Global 100%)"
                    aria-label="Ver todo o Mapa Mundi"
                  >
                    <Globe className={`w-3.5 h-3.5 ${isWorldView ? 'text-white animate-spin-slow' : 'text-emerald-400'}`} />
                    <span>Mundi</span>
                  </button>

                  {/* Focus Target Button (Focar) inside map */}
                  <button
                    onClick={handleRecenter}
                    className="px-2.5 py-1.5 rounded-xl bg-[#161616]/95 hover:bg-[#252525] text-neutral-200 hover:text-white border border-white/20 text-xs font-bold backdrop-blur-md shadow-xl transition-all flex items-center space-x-1.5 cursor-pointer"
                    title="Focar no Alvo (Marco Zero da Detonação)"
                    aria-label="Focar no Alvo"
                  >
                    <Crosshair className="w-3.5 h-3.5 text-rose-500" />
                    <span>Focar</span>
                  </button>

                  {/* Historic Test Sites Toggle */}
                  <button
                    onClick={() => setShowTestSites(!showTestSites)}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all shadow-xl backdrop-blur-md cursor-pointer ${
                      showTestSites
                        ? 'bg-amber-500/25 text-amber-300 border border-amber-500/50 shadow-amber-950/40'
                        : 'bg-[#161616]/95 text-neutral-400 hover:text-white border border-white/20'
                    }`}
                    title={showTestSites ? 'Locais de Testes Ativos no Mapa (Clique para ocultar)' : 'Exibir Locais de Testes Históricos no Mapa'}
                    aria-label="Locais Históricos de Testes"
                  >
                    <Radiation className="w-3.5 h-3.5" />
                  </button>

                  {/* Zoom In & Out Pod inside map */}
                  <div className="bg-[#161616]/95 backdrop-blur-md border border-white/20 rounded-xl p-0.5 shadow-xl flex items-center space-x-0.5">
                    <button
                      onClick={handleZoomIn}
                      className="w-7 h-7 rounded-lg bg-[#222222] hover:bg-gradient-to-r hover:from-rose-600 hover:to-pink-500 text-white flex items-center justify-center transition-all shadow cursor-pointer"
                      title="Ampliar visão (+ Zoom)"
                      aria-label="Ampliar visão"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleZoomOut}
                      className="w-7 h-7 rounded-lg bg-[#222222] hover:bg-gradient-to-r hover:from-rose-600 hover:to-pink-500 text-white flex items-center justify-center transition-all shadow cursor-pointer"
                      title="Diminuir visão (- Zoom)"
                      aria-label="Diminuir visão"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tactical Esri Dark Canvas Status Indicator */}
              {mapTheme === 'tactical' && (
                <div className="absolute bottom-3 left-3 z-20 pointer-events-auto bg-[#121212]/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15 text-[10px] font-mono text-neutral-300 flex items-center gap-2 shadow-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="font-bold text-white">Tático Militar</span>
                  <span className="text-white/20">|</span>
                  <span className="text-emerald-400 font-semibold">Esri Canvas Dark (Alta Precisão • Online)</span>
                </div>
              )}

              {/* O mapa permanece 100% limpo e estendido sem sobreposições inferiores */}
            </div>
          </div>
        </div>

        {/* Dedicated Map Options, Metrics & Physical Dimensions Column (Same size as before, perfectly matched height) */}
        {isOptionsPanelOpen && (
          <div
            className={`lg:col-span-4 xl:col-span-4 2xl:col-span-3 border-l border-white/10 bg-[#121212] p-3 sm:p-4 flex flex-col space-y-3.5 overflow-y-auto min-h-0 h-full ${
              activeTabMobile === 'options' ? 'block' : 'hidden lg:flex'
            }`}
            style={{
              maxHeight:
                mapHeightMode === 'immersive'
                  ? 'calc(82vh + 95px)'
                  : mapHeightMode === 'large'
                  ? '855px'
                  : mapHeightMode === 'standard'
                  ? '735px'
                  : '615px',
            }}
          >
            {/* Header do Painel Lateral */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2 min-w-0">
                <div className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Opções & Métricas
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-300 border border-rose-500/30 flex items-center gap-1 truncate">
                      <MapPin className="w-2.5 h-2.5 text-rose-400 shrink-0" />
                      <span className="truncate">{selectedCity.name}</span>
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-400 truncate mt-0.5">
                    Alvo: <strong className="text-neutral-200">{selectedCity.name}</strong> • {selectedBomb.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#222222] text-red-300 border border-white/15 font-bold">
                  {selectedBomb.yieldDisplay}
                </span>
                <button
                  onClick={() => setIsOptionsPanelOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-[#222222] transition-colors"
                  title="Fechar opções e estender o mapa até a borda direita"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sub-abas de Navegação do Painel */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-[#181818] rounded-xl border border-white/10">
              <button
                onClick={() => setOptionsActiveTab('layers')}
                className={`py-1.5 px-2 text-[11px] font-bold rounded-lg transition-all flex items-center justify-center space-x-1 ${
                  optionsActiveTab === 'layers'
                    ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>Camadas</span>
              </button>
              <button
                onClick={() => setOptionsActiveTab('fallout')}
                className={`py-1.5 px-2 text-[11px] font-bold rounded-lg transition-all flex items-center justify-center space-x-1 ${
                  optionsActiveTab === 'fallout'
                    ? 'bg-amber-500 text-black shadow-sm font-extrabold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Radiation className="w-3 h-3" />
                <span>Fallout</span>
              </button>
              <button
                onClick={() => setOptionsActiveTab('physics')}
                className={`py-1.5 px-2 text-[11px] font-bold rounded-lg transition-all flex items-center justify-center space-x-1 ${
                  optionsActiveTab === 'physics'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Target className="w-3 h-3" />
                <span>Alvo & Física</span>
              </button>
            </div>

            {/* ABA 1: CAMADAS DE IMPACTO FÍSICO (Toggles das 6 camadas + Medição + Métricas Detalhadas) */}
            {optionsActiveTab === 'layers' && (
              <div className="space-y-3 animate-in fade-in duration-150">

                {/* Seletor de Modo de Medição: Raio vs Diâmetro vs Ambos */}
                <div className="bg-[#181818]/90 p-2.5 rounded-xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-neutral-200 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-rose-400" />
                      <span>Modo de Medição:</span>
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400">
                      {dimensionMode === 'both' ? 'Raio & Diâmetro' : dimensionMode === 'radius' ? 'Apenas Raio (R)' : 'Apenas Diâmetro (Ø)'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 p-1 bg-[#141414] rounded-lg border border-white/10">
                    <button
                      onClick={() => setDimensionMode('radius')}
                      className={`py-1.5 text-[11px] font-bold rounded transition-all flex items-center justify-center ${
                        dimensionMode === 'radius'
                          ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Raio (R)
                    </button>
                    <button
                      onClick={() => setDimensionMode('diameter')}
                      className={`py-1.5 text-[11px] font-bold rounded transition-all flex items-center justify-center ${
                        dimensionMode === 'diameter'
                          ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Diâmetro (Ø)
                    </button>
                    <button
                      onClick={() => setDimensionMode('both')}
                      className={`py-1.5 text-[11px] font-bold rounded transition-all flex items-center justify-center ${
                        dimensionMode === 'both'
                          ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Ambos (R & Ø)
                    </button>
                  </div>
                </div>

                {/* Bloco de Detonação e Balanço de Vítimas */}
                <div className="bg-[#181818]/90 p-3 rounded-xl border border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <Flame className="w-3.5 h-3.5 text-rose-400" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Controle de Detonação & Vítimas
                      </span>
                    </div>
                  </div>

                  {/* Status do Alvo (Detonação Exclusiva Dentro do Mapa) */}
                  {!isDetonated ? (
                    <div className="p-2.5 rounded-xl bg-black border border-white/10 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                        <span className="text-neutral-300 font-medium truncate">
                          Cidade Alvo: <strong className="text-white">{selectedCity.name}</strong>
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-amber-300 font-bold px-2 py-0.5 rounded bg-amber-950/40 border border-amber-500/30 shrink-0">
                        {selectedBomb.yieldDisplay}
                      </span>
                    </div>
                  ) : (
                    <div className="p-2 rounded-xl bg-black border border-rose-500/50 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0" />
                        <span className="text-rose-300 font-bold font-mono text-[10px] truncate">
                          ALVO: {selectedCity.name.toUpperCase()} — DETONADA
                        </span>
                      </div>
                      <button
                        onClick={handleResetDetonation}
                        className="px-2 py-0.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-amber-300 hover:text-white border border-white/20 text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer shrink-0"
                      >
                        <RotateCcw className="w-3 h-3 text-amber-400" />
                        <span>Rearmar</span>
                      </button>
                    </div>
                  )}

                  {/* Card de Balanço Geral de Vítimas & Mortes em Tempo Real */}
                  <div className="bg-black p-3.5 rounded-2xl border border-rose-500/40 shadow-lg space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-xl bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-400 shrink-0">
                          <Skull className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-mono tracking-wider text-rose-400 font-extrabold block">
                            Balanço Geral de Vítimas
                          </span>
                          <span className="text-xs font-bold text-white block truncate">
                            {selectedBomb.name} sobre {selectedCity.name}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                        {isDetonated ? `${casualties.mortalityPercentage.toFixed(1)}% letalidade` : 'Aguardando'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 rounded-xl bg-neutral-950 border border-rose-500/40">
                        <span className="text-[10px] text-rose-300/90 block font-semibold">💀 Mortes Estimadas</span>
                        <span className="text-base font-black text-rose-200 font-mono tracking-tight block truncate" title={`Faixa de estimativa: ${casualties.deathsRangeDisplay}`}>
                          {isDetonated ? casualties.deathsRangeDisplay : '—'}
                        </span>
                        <span className="text-[9px] text-neutral-400 block font-mono mt-0.5">
                          {isDetonated ? `Média: ~${formatCasualtyNumber(casualties.totalDeaths)}` : 'Aguardando detonação'}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-neutral-950 border border-amber-500/40">
                        <span className="text-[10px] text-amber-300/90 block font-semibold">🩹 Feridos Graves</span>
                        <span className="text-base font-black text-amber-200 font-mono tracking-tight block truncate" title={`Faixa de feridos: ${casualties.injuriesRangeDisplay}`}>
                          {isDetonated ? casualties.injuriesRangeDisplay : '—'}
                        </span>
                        <span className="text-[9px] text-neutral-400 block font-mono mt-0.5">
                          {isDetonated ? `Média: ~${formatCasualtyNumber(casualties.totalInjuries)}` : 'Aguardando detonação'}
                        </span>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-neutral-950 border border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-300">
                      <span className="text-neutral-400">População sob Impacto Real:</span>
                      <span className="text-white font-bold">
                        {isDetonated ? `${formatCasualtyNumber(casualties.totalAffectedPop)} pessoas` : '—'}
                      </span>
                    </div>

                    {/* Banner de Metodologia e Limitação de Dados */}
                    {isDetonated && (
                      <div className={`p-2.5 rounded-xl border text-[10px] leading-relaxed space-y-1 ${
                        casualties.isUninhabitedOrWater
                          ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                          : casualties.confidenceLevel === 'high'
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                          : 'bg-neutral-900/90 border-white/15 text-neutral-300'
                      }`}>
                        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[9px]">
                          <Info className="w-3 h-3 shrink-0" />
                          <span>{casualties.confidenceLabel}</span>
                        </div>
                        <p className="opacity-90">{casualties.estimationNotes}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Seção: Cartões de Métricas Físicas Detalhadas para Todas as 7 Zonas */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <Layers className="w-3.5 h-3.5 text-rose-400" />
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-bold block">
                        Métricas e Limiares Físicos das 7 Zonas
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-[10px]">
                      <button
                        onClick={() => setAllLayers(true)}
                        className="px-2 py-0.5 rounded bg-[#222222] hover:bg-[#282828] text-neutral-300 hover:text-white border border-white/15 transition-all font-semibold cursor-pointer"
                        title="Ativar todas as 7 zonas no mapa"
                      >
                        Ativar Todas
                      </button>
                      <button
                        onClick={() => setAllLayers(false)}
                        className="px-2 py-0.5 rounded bg-[#222222] hover:bg-[#282828] text-neutral-300 hover:text-white border border-white/15 transition-all font-semibold cursor-pointer"
                        title="Ocultar todas as 7 zonas no mapa"
                      >
                        Ocultar Todas
                      </button>
                    </div>
                  </div>

                  {/* 1. Métrica Bola de Fogo */}
                  <div
                    onMouseEnter={() => setHoveredZoneId('fireball')}
                    onMouseLeave={() => setHoveredZoneId(null)}
                    style={hoveredZoneId === 'fireball' ? { '--zone-glow-color': 'rgba(250, 204, 21, 0.85)' } as React.CSSProperties : undefined}
                    className={`p-3 rounded-xl border space-y-2 shadow-md transition-all duration-300 ${
                      hoveredZoneId === 'fireball'
                        ? 'border-amber-300 ring-2 ring-amber-300 shadow-[0_0_30px_rgba(250,204,21,0.7)] bg-amber-950/60 zone-card-glowing'
                        : visibleLayers.fireball
                        ? 'bg-black border-amber-500/50'
                        : 'border-white/10 opacity-60 bg-black/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${visibleLayers.fireball ? 'bg-amber-400 shadow-sm shadow-amber-400/50' : 'bg-neutral-600'}`} />
                        <span className={`text-xs font-bold ${visibleLayers.fireball ? 'text-amber-300' : 'text-neutral-400'}`}>1. Bola de Fogo Nuclear</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono font-bold text-amber-300">
                          {calculateAreaKm2(effectiveBomb.fireballRadiusM)}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleLayer('fireball')}
                          className={`px-2 py-0.5 rounded-lg border text-[10px] font-mono font-bold flex items-center space-x-1 transition-all cursor-pointer ${
                            visibleLayers.fireball
                              ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 hover:bg-amber-500/30'
                              : 'bg-neutral-900 border-white/15 text-neutral-500 hover:text-neutral-300'
                          }`}
                          title={visibleLayers.fireball ? 'Ocultar zona no mapa' : 'Exibir zona no mapa'}
                          aria-label={visibleLayers.fireball ? 'Ocultar zona no mapa' : 'Exibir zona no mapa'}
                        >
                          {visibleLayers.fireball ? (
                            <>
                              <Eye className="w-3.5 h-3.5 text-amber-400" />
                              <span>Visível</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-neutral-500" />
                              <span>Oculta</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="text-[11px] text-neutral-200 space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span className="text-amber-200/70">Raio / Diâmetro Real:</span>
                        <span className="text-amber-100 font-bold">
                          {formatRadius(effectiveBomb.fireballRadiusM)} / {formatDiameter(effectiveBomb.fireballRadiusM)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-amber-200/70">Temperatura do Sol:</span>
                        <span className="text-amber-300 font-bold">~ 100.000.000 °C</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-amber-100/90 leading-snug space-y-0.5">
                      <div>Temperatura do Sol (~ 100 milhões de °C).</div>
                      <div>Vaporização imediata de qualquer matéria em contato direto.</div>
                      <div>Letalidade 100% absoluta (Plasma).</div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#0c0c0c] border border-amber-500/30 space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between items-center text-amber-200 font-bold">
                        <span className="flex items-center gap-1">
                          <Skull className="w-3 h-3 text-red-400" />
                          Mortes Estimadas:
                        </span>
                        <span>{isDetonated ? `${casualties.zoneEstimates.fireball.fatalitiesRangeDisplay} pessoas` : '—'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-300">
                        <span>População residente na faixa:</span>
                        <span className="text-neutral-100">{isDetonated ? `${formatCasualtyNumber(casualties.zoneEstimates.fireball.populationExposed)} hab` : '—'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-300">
                        <span>Letalidade Física da Zona:</span>
                        <span className="text-amber-400 font-bold">100% Instantânea</span>
                      </div>
                    </div>
                  </div>

                  {/* 2. Métrica Vaporização Imediata */}
                  <div
                    onMouseEnter={() => setHoveredZoneId('vaporization')}
                    onMouseLeave={() => setHoveredZoneId(null)}
                    style={hoveredZoneId === 'vaporization' ? { '--zone-glow-color': 'rgba(251, 146, 60, 0.85)' } as React.CSSProperties : undefined}
                    className={`p-3 rounded-xl border space-y-2 shadow-md transition-all duration-300 ${
                      hoveredZoneId === 'vaporization'
                        ? 'border-orange-300 ring-2 ring-orange-300 shadow-[0_0_30px_rgba(251,146,60,0.7)] bg-orange-950/60 zone-card-glowing'
                        : visibleLayers.vaporization
                        ? 'bg-black border-orange-500/50'
                        : 'border-white/10 opacity-60 bg-black/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${visibleLayers.vaporization ? 'bg-orange-400 shadow-sm shadow-orange-400/50' : 'bg-neutral-600'}`} />
                        <span className={`text-xs font-bold ${visibleLayers.vaporization ? 'text-orange-300' : 'text-neutral-400'}`}>2. Vaporização Imediata</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono font-bold text-orange-300">
                          {calculateAreaKm2(effectiveBomb.vaporizationRadiusM)}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleLayer('vaporization')}
                          className={`px-2 py-0.5 rounded-lg border text-[10px] font-mono font-bold flex items-center space-x-1 transition-all cursor-pointer ${
                            visibleLayers.vaporization
                              ? 'bg-orange-500/20 border-orange-500/60 text-orange-300 hover:bg-orange-500/30'
                              : 'bg-neutral-900 border-white/15 text-neutral-500 hover:text-neutral-300'
                          }`}
                          title={visibleLayers.vaporization ? 'Ocultar zona no mapa' : 'Exibir zona no mapa'}
                          aria-label={visibleLayers.vaporization ? 'Ocultar zona no mapa' : 'Exibir zona no mapa'}
                        >
                          {visibleLayers.vaporization ? (
                            <>
                              <Eye className="w-3.5 h-3.5 text-orange-400" />
                              <span>Visível</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-neutral-500" />
                              <span>Oculta</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="text-[11px] text-neutral-200 space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span className="text-orange-200/70">Raio / Diâmetro Real:</span>
                        <span className="text-orange-100 font-bold">
                          {formatRadius(effectiveBomb.vaporizationRadiusM)} / {formatDiameter(effectiveBomb.vaporizationRadiusM)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-200/70">Radiação Térmica Extrema:</span>
                        <span className="text-orange-300 font-bold">&gt; 100 cal/cm²</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-orange-100/90 leading-snug space-y-0.5">
                      <div>Radiação térmica extrema próximo ao limite da bola de fogo;</div>
                      <div>estruturas de aço, concreto e rochas são vaporizadas ou derretidas.</div>
                      <div>Letalidade 100% imediata (Vaporização e Fusão Térmica).</div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#0c0c0c] border border-orange-500/30 space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between items-center text-orange-200 font-bold">
                        <span className="flex items-center gap-1">
                          <Skull className="w-3 h-3 text-red-400" />
                          Mortes Estimadas:
                        </span>
                        <span>{isDetonated ? `${casualties.zoneEstimates.vaporization.fatalitiesRangeDisplay} pessoas` : '—'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-300">
                        <span>População residente na faixa:</span>
                        <span className="text-neutral-100">{isDetonated ? `${formatCasualtyNumber(casualties.zoneEstimates.vaporization.populationExposed)} hab` : '—'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-300">
                        <span>Letalidade Física da Zona:</span>
                        <span className="text-orange-400 font-bold">100% Instantânea</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. Métrica Carbonização Total */}
                  <div
                    onMouseEnter={() => setHoveredZoneId('carbonization')}
                    onMouseLeave={() => setHoveredZoneId(null)}
                    style={hoveredZoneId === 'carbonization' ? { '--zone-glow-color': 'rgba(239, 68, 68, 0.9)' } as React.CSSProperties : undefined}
                    className={`p-3 rounded-xl border space-y-2 shadow-md ring-1 transition-all duration-300 ${
                      hoveredZoneId === 'carbonization'
                        ? 'border-red-400 ring-2 ring-red-400 shadow-[0_0_30px_rgba(239,68,68,0.85)] bg-red-950/60 zone-card-glowing'
                        : visibleLayers.carbonization
                        ? 'bg-black border-red-500/70 ring-red-500/20'
                        : 'border-white/10 ring-transparent opacity-60 bg-black/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${visibleLayers.carbonization ? 'bg-red-500 shadow-sm shadow-red-600/50' : 'bg-neutral-600'}`} />
                        <span className={`text-xs font-bold ${visibleLayers.carbonization ? 'text-red-300' : 'text-neutral-400'}`}>3. Carbonização Total</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono font-bold text-red-300">
                          {calculateAreaKm2(effectiveBomb.carbonizationRadiusM)}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleLayer('carbonization')}
                          className={`px-2 py-0.5 rounded-lg border text-[10px] font-mono font-bold flex items-center space-x-1 transition-all cursor-pointer ${
                            visibleLayers.carbonization
                              ? 'bg-red-500/20 border-red-500/60 text-red-300 hover:bg-red-500/30'
                              : 'bg-neutral-900 border-white/15 text-neutral-500 hover:text-neutral-300'
                          }`}
                          title={visibleLayers.carbonization ? 'Ocultar zona no mapa' : 'Exibir zona no mapa'}
                          aria-label={visibleLayers.carbonization ? 'Ocultar zona no mapa' : 'Exibir zona no mapa'}
                        >
                          {visibleLayers.carbonization ? (
                            <>
                              <Eye className="w-3.5 h-3.5 text-red-400" />
                              <span>Visível</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-neutral-500" />
                              <span>Oculta</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="text-[11px] text-neutral-200 space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span className="text-red-200/70">Raio / Diâmetro Real:</span>
                        <span className="text-red-100 font-bold">
                          {formatRadius(effectiveBomb.carbonizationRadiusM)} / {formatDiameter(effectiveBomb.carbonizationRadiusM)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-200/70">Ignição Instantânea:</span>
                        <span className="text-red-300 font-bold">&gt; 40 cal/cm²</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-red-100/95 leading-snug space-y-0.5">
                      <div>Ignição instantânea de qualquer material combustível.</div>
                      <div>Vegetação, edifícios e compostos orgânicos viram cinzas antes da onda mecânica.</div>
                      <div>Letalidade extrema: <span className="text-red-400 font-black">100%</span> (Combustão Humana Instantânea)</div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#0c0c0c] border border-red-500/30 space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between items-center text-red-200 font-bold">
                        <span className="flex items-center gap-1">
                          <Skull className="w-3 h-3 text-red-400" />
                          Mortes Estimadas:
                        </span>
                        <span>{isDetonated ? `${casualties.zoneEstimates.carbonization.fatalitiesRangeDisplay} pessoas` : '—'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-300">
                        <span>População residente na faixa:</span>
                        <span className="text-neutral-100">{isDetonated ? `${formatCasualtyNumber(casualties.zoneEstimates.carbonization.populationExposed)} hab` : '—'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-300">
                        <span>Letalidade Física da Zona:</span>
                        <span className="text-red-400 font-bold">100% Instantânea</span>
                      </div>
                    </div>
                  </div>

                  {/* 4. Métrica Onda de Choque Pesada */}
                  <div
                    onMouseEnter={() => setHoveredZoneId('heavy')}
                    onMouseLeave={() => setHoveredZoneId(null)}
                    style={hoveredZoneId === 'heavy' ? { '--zone-glow-color': 'rgba(225, 29, 72, 0.9)' } as React.CSSProperties : undefined}
                    className={`p-3 rounded-xl border space-y-2 shadow-md transition-all duration-300 ${
                      hoveredZoneId === 'heavy'
                        ? 'border-pink-400 ring-2 ring-rose-500 shadow-[0_0_30px_rgba(225,29,72,0.85)] bg-rose-950/60 zone-card-glowing'
                        : visibleLayers.heavy
                        ? 'bg-black border-rose-500/60'
                        : 'border-white/10 opacity-60 bg-black/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${visibleLayers.heavy ? 'bg-gradient-to-r from-rose-600 to-pink-500 shadow-sm shadow-rose-500/50' : 'bg-neutral-600'}`} />
                        <span className={`text-xs font-bold ${visibleLayers.heavy ? 'text-rose-300' : 'text-neutral-400'}`}>4. Onda de Choque Pesada (&gt; 20 psi)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono font-bold text-rose-300">
                          {calculateAreaKm2(effectiveBomb.heavyBlastRadiusM)}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleLayer('heavy')}
                          className={`px-2 py-0.5 rounded-lg border text-[10px] font-mono font-bold flex items-center space-x-1 transition-all cursor-pointer ${
                            visibleLayers.heavy
                              ? 'bg-gradient-to-r from-rose-600 to-pink-500 border-pink-400/60 text-white shadow-sm hover:opacity-95'
                              : 'bg-neutral-900 border-white/15 text-neutral-500 hover:text-neutral-300'
                          }`}
                          title={visibleLayers.heavy ? 'Ocultar zona no mapa' : 'Exibir zona no mapa'}
                          aria-label={visibleLayers.heavy ? 'Ocultar zona no mapa' : 'Exibir zona no mapa'}
                        >
                          {visibleLayers.heavy ? (
                            <>
                              <Eye className="w-3.5 h-3.5 text-white" />
                              <span>Visível</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-neutral-500" />
                              <span>Oculta</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="text-[11px] text-neutral-200 space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span className="text-rose-200/70">Raio / Diâmetro Real:</span>
                        <span className="text-rose-100 font-bold">
                          {formatRadius(effectiveBomb.heavyBlastRadiusM)} / {formatDiameter(effectiveBomb.heavyBlastRadiusM)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-rose-200/70">Sobrepressão e Vento:</span>
                        <span className="text-rose-300 font-bold">&gt; 20 psi • &gt; 1.000 km/h</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-rose-100/90 leading-snug space-y-0.5">
                      <div>Sobrepressão extrema (&gt; 20 psi). Destruição total de edifícios reforçados</div>
                      <div>e estruturas de concreto armado. Ventos superiores a 1.000 km/h.</div>
                      <div>Letalidade severa: 95% – 100% por colapso estrutural massivo.</div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#0c0c0c] border border-rose-500/40 space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between items-center text-rose-200 font-bold">
                        <span className="flex items-center gap-1">
                          <Skull className="w-3 h-3 text-rose-400" />
                          Mortes Estimadas:
                        </span>
                        <span>{isDetonated ? `${casualties.zoneEstimates.heavy.fatalitiesRangeDisplay} pessoas` : '—'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-300">
                        <span>População residente na faixa:</span>
                        <span className="text-neutral-100">{isDetonated ? `${formatCasualtyNumber(casualties.zoneEstimates.heavy.populationExposed)} hab` : '—'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-300">
                        <span>Feridos na faixa:</span>
                        <span className="text-amber-300">{isDetonated ? `${casualties.zoneEstimates.heavy.injuriesRangeDisplay}` : '—'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-300">
                        <span>Letalidade Física Calibrada:</span>
                        <span className="text-rose-400 font-bold">~98% (95% – 100%)</span>
                      </div>
                    </div>
                  </div>

                  {/* 5. Métrica Onda de Choque Moderada */}
                  <div
                    onMouseEnter={() => setHoveredZoneId('moderate')}
                    onMouseLeave={() => setHoveredZoneId(null)}
                    style={hoveredZoneId === 'moderate' ? { '--zone-glow-color': 'rgba(167, 139, 250, 0.9)' } as React.CSSProperties : undefined}
                    className={`p-3 rounded-xl border space-y-2 shadow-md transition-all duration-300 ${
                      hoveredZoneId === 'moderate'
                        ? 'border-purple-300 ring-2 ring-purple-300 shadow-[0_0_30px_rgba(167,139,250,0.8)] bg-purple-950/60 zone-card-glowing'
                        : visibleLayers.moderate
                        ? 'bg-black border-purple-500/50'
                        : 'border-white/10 opacity-60 bg-black/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${visibleLayers.moderate ? 'bg-purple-500 shadow-sm' : 'bg-neutral-600'}`} />
                        <span className={`text-xs font-bold ${visibleLayers.moderate ? 'text-purple-300' : 'text-neutral-400'}`}>5. Onda de Choque Moderada (~ 5 psi)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono font-bold text-purple-300">
                          {calculateAreaKm2(effectiveBomb.moderateBlastRadiusM)}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleLayer('moderate')}
                          className={`px-2 py-0.5 rounded-lg border text-[10px] font-mono font-bold flex items-center space-x-1 transition-all cursor-pointer ${
                            visibleLayers.moderate
                              ? 'bg-purple-500/20 border-purple-500/60 text-purple-300 hover:bg-purple-500/30'
                              : 'bg-neutral-900 border-white/15 text-neutral-500 hover:text-neutral-300'
                          }`}
                          title={visibleLayers.moderate ? 'Ocultar zona no mapa' : 'Exibir zona no mapa'}
                          aria-label={visibleLayers.moderate ? 'Ocultar zona no mapa' : 'Exibir zona no mapa'}
                        >
                          {visibleLayers.moderate ? (
                            <>
                              <Eye className="w-3.5 h-3.5 text-purple-400" />
                              <span>Visível</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-neutral-500" />
                              <span>Oculta</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="text-[11px] text-neutral-200 space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span className="text-purple-200/70">Raio / Diâmetro Real:</span>
                        <span className="text-purple-100 font-bold">
                          {formatRadius(effectiveBomb.moderateBlastRadiusM)} / {formatDiameter(effectiveBomb.moderateBlastRadiusM)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-200/70">Sobrepressão Média:</span>
                        <span className="text-purple-300 font-bold">~ 5 psi (0.35 bar)</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-purple-100/90 leading-snug space-y-0.5">
                      <div>Sobrepressão média (~ 5 psi). Colapso quase total de edifícios</div>
                      <div>residenciais de alvenaria. Danos graves a estruturas pesadas.</div>
                      <div>Mortalidade moderada: 30% – 55% e alto índice de feridos.</div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#0c0c0c] border border-purple-500/30 space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between items-center text-purple-200 font-bold">
                        <span className="flex items-center gap-1">
                          <Skull className="w-3 h-3 text-purple-400" />
                          Mortes Estimadas:
                        </span>
                        <span>{isDetonated ? `${casualties.zoneEstimates.moderate.fatalitiesRangeDisplay} pessoas` : '—'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-300">
                        <span>População residente na faixa:</span>
                        <span className="text-neutral-100">{isDetonated ? `${formatCasualtyNumber(casualties.zoneEstimates.moderate.populationExposed)} hab` : '—'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-300">
                        <span>Feridos na faixa:</span>
                        <span className="text-amber-300">{isDetonated ? `${casualties.zoneEstimates.moderate.injuriesRangeDisplay}` : '—'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-300">
                        <span>Letalidade Física Calibrada:</span>
                        <span className="text-purple-400 font-bold">~45% (30% – 55%)</span>
                      </div>
                    </div>
                  </div>

                  {/* 6. Métrica Raio Térmico */}
                  <div
                    onMouseEnter={() => setHoveredZoneId('thermal')}
                    onMouseLeave={() => setHoveredZoneId(null)}
                    style={hoveredZoneId === 'thermal' ? { '--zone-glow-color': 'rgba(249, 115, 22, 0.9)' } as React.CSSProperties : undefined}
                    className={`p-3 rounded-xl border space-y-2 shadow-md transition-all duration-300 ${
                      hoveredZoneId === 'thermal'
                        ? 'border-orange-300 ring-2 ring-orange-300 shadow-[0_0_30px_rgba(249,115,22,0.8)] bg-orange-950/60 zone-card-glowing'
                        : visibleLayers.thermal
                        ? 'bg-black border-orange-500/50'
                        : 'border-white/10 opacity-60 bg-black/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${visibleLayers.thermal ? 'bg-orange-500 shadow-sm' : 'bg-neutral-600'}`} />
                        <span className={`text-xs font-bold ${visibleLayers.thermal ? 'text-orange-300' : 'text-neutral-400'}`}>6. Raio Térmico (Queimadura de 3º Grau)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono font-bold text-orange-300">
                          {calculateAreaKm2(effectiveBomb.thermalRadiusM)}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleLayer('thermal')}
                          className={`px-2 py-0.5 rounded-lg border text-[10px] font-mono font-bold flex items-center space-x-1 transition-all cursor-pointer ${
                            visibleLayers.thermal
                              ? 'bg-orange-500/20 border-orange-500/60 text-orange-300 hover:bg-orange-500/30'
                              : 'bg-neutral-900 border-white/15 text-neutral-500 hover:text-neutral-300'
                          }`}
                          title={visibleLayers.thermal ? 'Ocultar zona no mapa' : 'Exibir zona no mapa'}
                          aria-label={visibleLayers.thermal ? 'Ocultar zona no mapa' : 'Exibir zona no mapa'}
                        >
                          {visibleLayers.thermal ? (
                            <>
                              <Eye className="w-3.5 h-3.5 text-orange-400" />
                              <span>Visível</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-neutral-500" />
                              <span>Oculta</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="text-[11px] text-neutral-200 space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span className="text-orange-200/70">Raio / Diâmetro Real:</span>
                        <span className="text-orange-100 font-bold">
                          {formatRadius(effectiveBomb.thermalRadiusM)} / {formatDiameter(effectiveBomb.thermalRadiusM)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-200/70">Efeito Biológico:</span>
                        <span className="text-orange-300 font-bold">Queimaduras graves 3º grau</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-orange-100/90 leading-snug space-y-0.5">
                      <div>O pulso de luz e calor causa queimaduras de 3º grau em pele</div>
                      <div>exposta e ignição de roupas e papel a dezenas de quilômetros.</div>
                      <div>Letalidade direta: 8% – 22% (mitigada por abrigo).</div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#0c0c0c] border border-orange-500/30 space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between items-center text-orange-200 font-bold">
                        <span className="flex items-center gap-1">
                          <Skull className="w-3 h-3 text-red-400" />
                          Mortes Estimadas:
                        </span>
                        <span>{isDetonated ? `${casualties.zoneEstimates.thermal.fatalitiesRangeDisplay} pessoas` : '—'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-300">
                        <span>População residente na faixa:</span>
                        <span className="text-neutral-100">{isDetonated ? `${formatCasualtyNumber(casualties.zoneEstimates.thermal.populationExposed)} hab` : '—'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-300">
                        <span>Feridos graves (3º grau):</span>
                        <span className="text-amber-300">{isDetonated ? `${casualties.zoneEstimates.thermal.injuriesRangeDisplay}` : '—'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-300">
                        <span>Letalidade Térmica (Visada Direta):</span>
                        <span className="text-orange-400 font-bold">~15% (8% – 22%)</span>
                      </div>
                    </div>
                  </div>

                  {/* 7. Métrica Onda de Choque Leve */}
                  <div
                    onMouseEnter={() => setHoveredZoneId('light')}
                    onMouseLeave={() => setHoveredZoneId(null)}
                    style={hoveredZoneId === 'light' ? { '--zone-glow-color': 'rgba(148, 163, 184, 0.9)' } as React.CSSProperties : undefined}
                    className={`p-3 rounded-xl border space-y-2 shadow-md transition-all duration-300 ${
                      hoveredZoneId === 'light'
                        ? 'border-slate-200 ring-2 ring-slate-200 shadow-[0_0_30px_rgba(148,163,184,0.8)] bg-slate-900/80 zone-card-glowing'
                        : visibleLayers.light
                        ? 'bg-black border-slate-500/50'
                        : 'border-white/10 opacity-60 bg-black/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${visibleLayers.light ? 'bg-[#737373] shadow-sm' : 'bg-neutral-600'}`} />
                        <span className={`text-xs font-bold ${visibleLayers.light ? 'text-slate-200' : 'text-neutral-400'}`}>7. Onda de Choque Leve (1-2 psi)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono font-bold text-slate-300">
                          {calculateAreaKm2(effectiveBomb.lightBlastRadiusM)}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleLayer('light')}
                          className={`px-2 py-0.5 rounded-lg border text-[10px] font-mono font-bold flex items-center space-x-1 transition-all cursor-pointer ${
                            visibleLayers.light
                              ? 'bg-neutral-500/20 border-neutral-400/60 text-neutral-300 hover:bg-neutral-500/30'
                              : 'bg-neutral-900 border-white/15 text-neutral-500 hover:text-neutral-300'
                          }`}
                          title={visibleLayers.light ? 'Ocultar zona no mapa' : 'Exibir zona no mapa'}
                          aria-label={visibleLayers.light ? 'Ocultar zona no mapa' : 'Exibir zona no mapa'}
                        >
                          {visibleLayers.light ? (
                            <>
                              <Eye className="w-3.5 h-3.5 text-neutral-300" />
                              <span>Visível</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-neutral-500" />
                              <span>Oculta</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="text-[11px] text-neutral-200 space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-300/70">Raio / Diâmetro Real:</span>
                        <span className="text-slate-100 font-bold">
                          {formatRadius(effectiveBomb.lightBlastRadiusM)} / {formatDiameter(effectiveBomb.lightBlastRadiusM)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300/70">Sobrepressão Baixa:</span>
                        <span className="text-slate-200 font-bold">~ 1 a 2 psi (0.07 – 0.14 bar)</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-100/90 leading-snug space-y-0.5">
                      <div>Sobrepressão baixa (~ 1 a 2 psi). Quebra maciça de vidros,</div>
                      <div>estilhaços voando e danos menores a estruturas leves.</div>
                      <div>Letalidade baixa: 0.5% – 3% e ferimentos por fragmentos.</div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#0c0c0c] border border-white/10 space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between items-center text-slate-200 font-bold">
                        <span className="flex items-center gap-1">
                          <Skull className="w-3 h-3 text-red-400" />
                          Mortes Estimadas:
                        </span>
                        <span>{isDetonated ? `${casualties.zoneEstimates.light.fatalitiesRangeDisplay} pessoas` : '—'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-300">
                        <span>População residente na faixa:</span>
                        <span className="text-neutral-100">{isDetonated ? `${formatCasualtyNumber(casualties.zoneEstimates.light.populationExposed)} hab` : '—'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-300">
                        <span>Feridos na faixa:</span>
                        <span className="text-amber-300">{isDetonated ? `${casualties.zoneEstimates.light.injuriesRangeDisplay}` : '—'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-300">
                        <span>Letalidade por Vidros/Fragmentos:</span>
                        <span className="text-slate-300 font-bold">~1.5% (0.5% – 3%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ABA 2: PRECIPITAÇÃO RADIOATIVA (FALLOUT & DISPERSÃO DE VENTO) */}
            {optionsActiveTab === 'fallout' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                {/* Interruptor Master de Fallout */}
                <div className="p-3 rounded-xl bg-black border border-amber-500/50 space-y-2.5 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Radiation className={`w-4 h-4 ${showFallout ? 'text-amber-400 animate-spin-slow' : 'text-neutral-500'}`} />
                      <span className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                        Precipitação Radioativa (Fallout)
                      </span>
                    </div>
                    <button
                      onClick={() => setShowFallout(!showFallout)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all border cursor-pointer ${
                        showFallout
                          ? 'bg-amber-400 text-black border-amber-300 shadow-sm'
                          : 'bg-black text-neutral-400 border-white/20 hover:text-white'
                      }`}
                    >
                      {showFallout ? 'ATIVO NO MAPA' : 'DESLIGADO'}
                    </button>
                  </div>

                  {/* Modo de Detonação */}
                  <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs">
                    <span className="text-neutral-300 text-[11px]">Tipo de Detonação:</span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setBurstType('surface')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                          burstType === 'surface'
                            ? 'bg-amber-500 text-black shadow-sm font-black'
                            : 'bg-[#111111] text-neutral-300 border border-white/10 hover:text-white'
                        }`}
                        title="Detonação na superfície: poeira radioativa e terra aspiradas para a estratosfera"
                      >
                        Superfície (Máx. Fallout)
                      </button>
                      <button
                        onClick={() => setBurstType('air')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                          burstType === 'air'
                            ? 'bg-blue-500 text-white shadow-sm font-black'
                            : 'bg-[#111111] text-neutral-300 border border-white/10 hover:text-white'
                        }`}
                        title="Detonação aérea: reduz contato da bola de fogo com o solo"
                      >
                        Aérea (Otimizada)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Controles Atmosféricos e de Vento */}
                {showFallout && (
                  <div className="p-3 rounded-xl bg-black border border-white/20 space-y-3 shadow-md">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-200 flex items-center gap-1.5">
                        <Wind className="w-3.5 h-3.5 text-amber-400" />
                        Condições Atmosféricas e Vento
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0a0a0a] text-amber-300 border border-amber-500/30">
                        {windSpeedKmh} km/h • {windDirectionDeg}° ({getCompassPoint(windDirectionDeg)})
                      </span>
                    </div>

                    {/* Direção do Vento */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-neutral-200 flex items-center gap-1">
                          <Compass className="w-3 h-3 text-purple-400" />
                          Rumo do Vento (Sotavento):
                        </span>
                        <span className="font-mono text-purple-200 font-bold">
                          {windDirectionDeg}° ({getCompassPoint(windDirectionDeg)})
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="359"
                        step="5"
                        value={windDirectionDeg}
                        onChange={(e) => setWindDirectionDeg(Number(e.target.value))}
                        className="w-full accent-purple-400 h-1.5 bg-[#1a1a1a] rounded-lg cursor-pointer"
                      />
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {WIND_COMPASS_PRESETS.map((p) => (
                          <button
                            key={p.label}
                            onClick={() => setWindDirectionDeg(p.deg)}
                            className={`px-1.5 py-0.5 text-[10px] rounded border transition-all cursor-pointer ${
                              Math.abs(windDirectionDeg - p.deg) < 15
                                ? 'bg-purple-950 border-purple-400 text-purple-200 font-bold shadow-sm'
                                : 'bg-[#0f0f0f] border-white/15 text-neutral-300 hover:text-white'
                            }`}
                          >
                            {p.label} {p.arrow}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Velocidade do Vento */}
                    <div className="space-y-1.5 pt-2 border-t border-white/15">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-neutral-200 flex items-center gap-1">
                          <Navigation className="w-3 h-3 text-amber-400" />
                          Velocidade do Vento:
                        </span>
                        <span className="font-mono text-amber-200 font-bold">
                          {windSpeedKmh} km/h
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="60"
                        step="5"
                        value={windSpeedKmh}
                        onChange={(e) => setWindSpeedKmh(Number(e.target.value))}
                        className="w-full accent-amber-400 h-1.5 bg-[#1a1a1a] rounded-lg cursor-pointer"
                      />
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {WIND_SPEED_PRESETS.map((s) => (
                          <button
                            key={s.speed}
                            onClick={() => setWindSpeedKmh(s.speed)}
                            className={`px-2 py-0.5 text-[10px] rounded border transition-all cursor-pointer ${
                              windSpeedKmh === s.speed
                                ? 'bg-amber-950 border-amber-400 text-amber-200 font-bold shadow-sm'
                                : 'bg-[#0f0f0f] border-white/15 text-neutral-300 hover:text-white'
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Zonas de Dose Radiológica Acumulada */}
                    <div className="pt-2 border-t border-white/15 space-y-1.5">
                      <span className="text-[10px] font-bold text-neutral-200 uppercase tracking-wider block">
                        Contornos de Radiação no Mapa:
                      </span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {FALLOUT_ZONES_CONFIG.map((zone) => {
                          const isVis = visibleFalloutZones[zone.id];
                          const distKm = getCalculatedFalloutLengthKm(
                            zone.id as 'rad1000' | 'rad300' | 'rad100' | 'rad10'
                          );
                          const isHov = hoveredFalloutZoneId === zone.id;

                          const zoneColorClasses: Record<string, { border: string; text: string; subtext: string; glow: string }> = {
                            rad1000: { border: 'border-purple-500/60', text: 'text-purple-200', subtext: 'text-purple-300/80', glow: '#c084fc' },
                            rad300: { border: 'border-red-500/60', text: 'text-red-200', subtext: 'text-red-300/80', glow: '#f87171' },
                            rad100: { border: 'border-orange-500/60', text: 'text-orange-200', subtext: 'text-orange-300/80', glow: '#fb923c' },
                            rad10: { border: 'border-yellow-500/60', text: 'text-yellow-200', subtext: 'text-yellow-300/80', glow: '#fde047' }
                          };
                          const zc = zoneColorClasses[zone.id] || { border: 'border-white/20', text: 'text-white', subtext: 'text-neutral-400', glow: '#ffffff' };

                          return (
                            <button
                              key={zone.id}
                              onClick={() => toggleFalloutZone(zone.id)}
                              onMouseEnter={() => setHoveredFalloutZoneId(zone.id)}
                              onMouseLeave={() => setHoveredFalloutZoneId((prev) => prev === zone.id ? null : prev)}
                              style={{
                                '--zone-glow-color': zc.glow
                              } as React.CSSProperties}
                              className={`p-2 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                                isHov
                                  ? 'zone-card-glowing bg-neutral-900 border-white ring-2 ring-white/50 shadow-lg'
                                  : isVis
                                  ? `bg-black ${zc.border} shadow-sm ring-1 ring-white/10`
                                  : 'bg-black/60 border-white/10 text-neutral-500 opacity-60 hover:opacity-100'
                              }`}
                            >
                              <div className="truncate pr-1">
                                <div className="flex items-center space-x-1.5">
                                  <span
                                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                                    style={{ backgroundColor: zone.color }}
                                  />
                                  <span className={`text-[11px] font-bold truncate ${isVis ? zc.text : 'text-neutral-400'}`}>
                                    {zone.doseDisplay}
                                  </span>
                                </div>
                                <span className={`text-[9px] font-mono block mt-0.5 ${isVis ? zc.subtext : 'text-neutral-500'}`}>
                                  Pluma: ~{distKm} km
                                </span>
                              </div>
                              {isVis ? (
                                <Eye className="w-3.5 h-3.5 text-neutral-200 shrink-0" />
                              ) : (
                                <EyeOff className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Seção de Métricas Detalhadas das 4 Zonas de Precipitação Radioativa */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-[10px] text-neutral-300 uppercase tracking-wider font-bold block">
                    Métricas da Precipitação Radioativa (Fundo Preto & Textos Claros)
                  </span>

                  {/* 1. Zona Letal Imediata (1.000 rad) */}
                  <div
                    onMouseEnter={() => setHoveredFalloutZoneId('rad1000')}
                    onMouseLeave={() => setHoveredFalloutZoneId((prev) => prev === 'rad1000' ? null : prev)}
                    style={{
                      '--zone-glow-color': '#c084fc'
                    } as React.CSSProperties}
                    className={`p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                      hoveredFalloutZoneId === 'rad1000'
                        ? 'zone-card-glowing bg-[#1c0f2a] border-purple-400 ring-2 ring-purple-400 shadow-2xl'
                        : 'bg-black border border-purple-500/60 shadow-md hover:border-purple-400/80'
                    } space-y-2`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                        <span className="text-xs font-bold text-purple-200">1. Zona Letal Imediata (≥ 1.000 rad)</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-purple-200">
                        Pluma: ~{getCalculatedFalloutLengthKm('rad1000')} km
                      </span>
                    </div>
                    <div className="text-[11px] space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span className="text-purple-300/80">Dose Acumulada:</span>
                        <span className="text-purple-100 font-bold">&ge; 1.000 rad (10 Gy)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300/80">Quadro Clínico:</span>
                        <span className="text-purple-200 font-bold">Colapso SNC e Cardiovascular</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-purple-100/90 leading-snug space-y-0.5">
                      <div>Dose maciça (&gt;1.000 rad) nas primeiras horas.</div>
                      <div>Colapso neurológico e vascular fulminante.</div>
                      <div>Morte inevitável em 24 a 72h. <span className="text-purple-300 font-black">Letalidade 100%</span></div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#0c0c0c] border border-purple-500/30 space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between items-center text-purple-200 font-bold">
                        <span className="flex items-center gap-1">
                          <Skull className="w-3 h-3 text-red-400" />
                          Mortes Estimadas:
                        </span>
                        <span className="text-white font-black">{isDetonated ? `~${formatCasualtyNumber(falloutCasualties.zones.rad1000.fatalities)} pessoas` : '— (Aguardando Detonação)'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-purple-200/80">
                        <span>População na Pluma:</span>
                        <span className="text-purple-100">{isDetonated ? `${formatCasualtyNumber(falloutCasualties.zones.rad1000.popExposed)} hab` : '—'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-purple-200/80">
                        <span>Tempo até colapso:</span>
                        <span className="text-purple-100">Poucas horas desabrigado (100% Letal)</span>
                      </div>
                    </div>
                  </div>

                  {/* 2. Síndrome Aguda SAR (300-1000 rad) */}
                  <div
                    onMouseEnter={() => setHoveredFalloutZoneId('rad300')}
                    onMouseLeave={() => setHoveredFalloutZoneId((prev) => prev === 'rad300' ? null : prev)}
                    style={{
                      '--zone-glow-color': '#f87171'
                    } as React.CSSProperties}
                    className={`p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                      hoveredFalloutZoneId === 'rad300'
                        ? 'zone-card-glowing bg-[#280d0d] border-red-400 ring-2 ring-red-400 shadow-2xl'
                        : 'bg-black border border-red-500/60 shadow-md hover:border-red-400/80'
                    } space-y-2`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <span className="text-xs font-bold text-red-200">2. Síndrome Aguda da Radiação (300–1.000 rad)</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-red-200">
                        Pluma: ~{getCalculatedFalloutLengthKm('rad300')} km
                      </span>
                    </div>
                    <div className="text-[11px] space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span className="text-red-300/80">Dose Acumulada:</span>
                        <span className="text-red-100 font-bold">300 a 1.000 rad (3–10 Gy)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-300/80">Quadro Clínico:</span>
                        <span className="text-red-200 font-bold">Falência Gastrointestinal e Medular</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-red-100/90 leading-snug space-y-0.5">
                      <div>Cinzas radioativas densas (300-1.000 rad).</div>
                      <div>Destruição total da medula óssea e colapso imune.</div>
                      <div>Mortalidade 50% a 90% sem terapia intensiva.</div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#0c0c0c] border border-red-500/30 space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between items-center text-red-200 font-bold">
                        <span className="flex items-center gap-1">
                          <Skull className="w-3 h-3 text-red-400" />
                          Mortes Estimadas:
                        </span>
                        <span className="text-white font-black">{isDetonated ? `~${formatCasualtyNumber(falloutCasualties.zones.rad300.fatalities)} pessoas` : '— (Aguardando Detonação)'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-red-200/80">
                        <span>População na Pluma:</span>
                        <span className="text-red-100">{isDetonated ? `${formatCasualtyNumber(falloutCasualties.zones.rad300.popExposed)} hab` : '—'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-red-200/80">
                        <span>Prognóstico Clínico:</span>
                        <span className="text-red-100">{isDetonated ? '75% Fatal sem terapia intensiva' : '—'}</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. Doença da Radiação & Evacuação (100-300 rad) */}
                  <div
                    onMouseEnter={() => setHoveredFalloutZoneId('rad100')}
                    onMouseLeave={() => setHoveredFalloutZoneId((prev) => prev === 'rad100' ? null : prev)}
                    style={{
                      '--zone-glow-color': '#fb923c'
                    } as React.CSSProperties}
                    className={`p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                      hoveredFalloutZoneId === 'rad100'
                        ? 'zone-card-glowing bg-[#2a1407] border-orange-400 ring-2 ring-orange-400 shadow-2xl'
                        : 'bg-black border border-orange-500/60 shadow-md hover:border-orange-400/80'
                    } space-y-2`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                        <span className="text-xs font-bold text-orange-200">3. Doença da Radiação (100–300 rad)</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-orange-200">
                        Pluma: ~{getCalculatedFalloutLengthKm('rad100')} km
                      </span>
                    </div>
                    <div className="text-[11px] space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span className="text-orange-300/80">Dose Acumulada:</span>
                        <span className="text-orange-100 font-bold">100 a 300 rad (1–3 Gy)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-300/80">Ação Obrigatória:</span>
                        <span className="text-orange-200 font-bold">Evacuação e Abrigo Subterrâneo</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-orange-100/90 leading-snug space-y-0.5">
                      <div>Precipitação perigosa (100-300 rad).</div>
                      <div>Queda severa de leucócitos, náuseas e vômitos.</div>
                      <div>Hospitalização e evacuação civil obrigatória.</div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#0c0c0c] border border-orange-500/30 space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between items-center text-orange-200 font-bold">
                        <span className="flex items-center gap-1">
                          <Skull className="w-3 h-3 text-red-400" />
                          Mortes Estimadas:
                        </span>
                        <span className="text-white font-black">{isDetonated ? `~${formatCasualtyNumber(falloutCasualties.zones.rad100.fatalities)} pessoas` : '— (Aguardando Detonação)'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-orange-200/80">
                        <span>Feridos graves na faixa:</span>
                        <span className="text-amber-300">{isDetonated ? `${formatCasualtyNumber(falloutCasualties.zones.rad100.injuries)} pessoas` : '—'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-orange-200/80">
                        <span>População Atingida:</span>
                        <span className="text-orange-100">{isDetonated ? `${formatCasualtyNumber(falloutCasualties.zones.rad100.popExposed)} hab` : '—'}</span>
                      </div>
                    </div>
                  </div>

                  {/* 4. Contaminação Prolongada (10-100 rad) */}
                  <div
                    onMouseEnter={() => setHoveredFalloutZoneId('rad10')}
                    onMouseLeave={() => setHoveredFalloutZoneId((prev) => prev === 'rad10' ? null : prev)}
                    style={{
                      '--zone-glow-color': '#fde047'
                    } as React.CSSProperties}
                    className={`p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                      hoveredFalloutZoneId === 'rad10'
                        ? 'zone-card-glowing bg-[#262007] border-yellow-400 ring-2 ring-yellow-400 shadow-2xl'
                        : 'bg-black border border-yellow-500/60 shadow-md hover:border-yellow-400/80'
                    } space-y-2`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        <span className="text-xs font-bold text-yellow-200">4. Contaminação Prolongada (10–100 rad)</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-yellow-200">
                        Pluma: ~{getCalculatedFalloutLengthKm('rad10')} km
                      </span>
                    </div>
                    <div className="text-[11px] space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span className="text-yellow-300/80">Dose Acumulada:</span>
                        <span className="text-yellow-100 font-bold">10 a 100 rad (0.1–1 Gy)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-300/80">Isótopos Críticos:</span>
                        <span className="text-yellow-200 font-bold">Césio-137 e Estrôncio-90</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-yellow-100/90 leading-snug space-y-0.5">
                      <div>Pluma periférica extensa (10-100 rad).</div>
                      <div>Contaminação prolongada de água, solo e lavouras.</div>
                      <div>Isolamento civil e embargo alimentar prolongado.</div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#0c0c0c] border border-yellow-500/30 space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between items-center text-yellow-200 font-bold">
                        <span className="flex items-center gap-1">
                          <Skull className="w-3 h-3 text-red-400" />
                          Mortes Tardias / Neoplasias:
                        </span>
                        <span className="text-white font-black">{isDetonated ? `~${formatCasualtyNumber(falloutCasualties.zones.rad10.fatalities)} pessoas` : '— (Aguardando Detonação)'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-yellow-200/80">
                        <span>População Monitorada:</span>
                        <span className="text-yellow-100">{isDetonated ? `${formatCasualtyNumber(falloutCasualties.zones.rad10.popExposed)} hab` : '—'}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-yellow-200/80">
                        <span>Medida Sanitária:</span>
                        <span className="text-yellow-100">Embargo Agrícola e Hídrico</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ABA 3: ALVO & FÍSICA ATMOSFÉRICA (Contexto Urbano + Cogumelo Atômico + Comparativo Little Boy) */}
            {optionsActiveTab === 'physics' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                {/* Cartão de Contexto Urbano do Alvo Selecionado */}
                <div className="bg-[#181818]/90 p-3 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span className="text-xs font-extrabold text-white truncate">{selectedCity.name}</span>
                    </div>
                    {selectedCity.isHighlighted && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/50 flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        Destaque
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-neutral-300 space-y-1">
                    <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                      <span>País / Região:</span>
                      <span className="text-neutral-100">{selectedCity.country}</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                      <span>Coordenadas:</span>
                      <span className="text-rose-300">
                        {selectedCity.lat.toFixed(4)}°, {selectedCity.lng.toFixed(4)}°
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                      <span>População Registrada:</span>
                      <span className="text-neutral-100">{selectedCity.populationEstimate}</span>
                    </div>
                    {selectedCity.coreDensityPerKm2 && (
                      <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                        <span>Densidade Urbana Central:</span>
                        <span className="text-neutral-100">{formatCasualtyNumber(selectedCity.coreDensityPerKm2)} hab/km²</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[10px] text-rose-300 font-mono font-bold pt-1 border-t border-white/10">
                      <span>💀 Mortes Estimadas ({selectedBomb.name}):</span>
                      <span className="text-white font-extrabold" title={`Estimativa central: ~${formatCasualtyNumber(casualties.totalDeaths)} mortos`}>
                        {isDetonated ? casualties.deathsRangeDisplay : 'Aguardando Detonação'}
                      </span>
                    </div>
                  </div>

                  {selectedCity.highlightTag && (
                    <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300 space-y-0.5">
                      <div className="font-bold flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3 text-amber-400" />
                        <span>Contexto Estratégico:</span>
                      </div>
                      <p className="text-neutral-200 leading-tight">{selectedCity.highlightTag}</p>
                      {selectedCity.landmark && (
                        <p className="text-[9px] text-neutral-400 pt-0.5">Marco Zero: {selectedCity.landmark}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Dimensões do Cogumelo Atômico */}
                <div className="p-3.5 rounded-xl bg-[#181818]/90 border border-purple-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Cloud className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-bold text-purple-300 uppercase tracking-wide">
                        Cogumelo Atômico
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                      {selectedBomb.mushroomCloudHeightKm.toFixed(1)} km Altura
                    </span>
                  </div>

                  <div className="text-[11px] text-neutral-300 space-y-1 font-mono pt-1">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Altura do Topo:</span>
                      <span className="text-neutral-100 font-bold">{selectedBomb.mushroomCloudHeightKm.toFixed(1)} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Diâmetro do Chapéu:</span>
                      <span className="text-purple-300 font-bold">{selectedBomb.mushroomCloudCapDiameterKm.toFixed(1)} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Raio da Haste (Stem):</span>
                      <span className="text-neutral-200">~{(selectedBomb.mushroomCloudCapDiameterKm * 0.25).toFixed(1)} km</span>
                    </div>
                  </div>

                  {/* Régua de Altitude Atmosférica */}
                  <div className="space-y-1 pt-2 border-t border-white/10">
                    <div className="flex justify-between text-[9px] text-neutral-400 font-mono">
                      <span>Nível do Mar (0 km)</span>
                      <span>Everest (8,8 km)</span>
                      <span>Jatos (11 km)</span>
                    </div>
                    <div className="w-full bg-[#141414] h-3 rounded-full overflow-hidden relative border border-white/10">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 via-red-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, (selectedBomb.mushroomCloudHeightKm / 80) * 100)}%`
                        }}
                      />
                      <div className="absolute top-0 bottom-0 left-[11%] w-0.5 bg-cyan-400/70" title="Monte Everest (8.8 km)" />
                      <div className="absolute top-0 bottom-0 left-[15%] w-0.5 bg-yellow-400/70" title="Voo Comercial (11 km)" />
                      <div className="absolute top-0 bottom-0 left-[19%] w-0.5 bg-purple-400/70" title="Tropopausa (15 km)" />
                    </div>
                    <div className="flex justify-between text-[8px] text-neutral-500 font-mono">
                      <span>0 km</span>
                      <span title="Tropopausa: 12-15 km">Tropo</span>
                      <span>80 km (Meso)</span>
                    </div>
                  </div>

                  <div className="bg-[#1C1C1C] p-2 rounded-lg text-[10px] text-neutral-300 leading-snug border border-white/10">
                    A coluna de convecção atinge <b>{selectedBomb.mushroomCloudHeightKm.toFixed(1)} km</b> de altitude,
                    {selectedBomb.mushroomCloudHeightKm >= 50
                      ? ' furando a estratosfera e atingindo a Mesosfera, gerando perturbações ionosféricas hemisféricas.'
                      : selectedBomb.mushroomCloudHeightKm >= 12
                      ? ' penetrando a Estratosfera, onde as partículas de fissão são dispersas globalmente.'
                      : ' contida dentro da Troposfera, com precipitação radiológica local imediata.'}
                  </div>
                </div>

                {/* Tabela Comparativa de Todas as 12 Armas Atômicas em ${selectedCity.name} */}
                <div className="p-3 rounded-xl bg-[#181818]/90 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Skull className="w-3.5 h-3.5 text-red-400" />
                      <span className="text-xs font-bold text-white uppercase tracking-wide">
                        Simulação de Mortes nas {NUCLEAR_RANKING_BOMBS.length} Armas em {selectedCity.name}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-neutral-400">Clique para testar</span>
                  </div>

                  <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                    {NUCLEAR_RANKING_BOMBS.map((b) => {
                      const bCas = calculateBombCityCasualties(b, selectedCity);
                      const isCurrent = b.id === selectedBomb.id;
                      return (
                        <button
                          key={b.id}
                          onClick={() => handleSelectBomb(b)}
                          className={`w-full p-2 rounded-lg border text-left transition-all flex items-center justify-between ${
                            isCurrent
                              ? 'bg-rose-500/20 border-rose-500/60 text-white shadow-sm ring-1 ring-rose-400/40'
                              : 'bg-[#141414] border-white/10 hover:border-white/20 text-neutral-300 hover:text-white'
                          }`}
                        >
                          <div className="truncate min-w-0 pr-2">
                            <div className="flex items-center gap-1.5 truncate">
                              <span className="font-bold text-xs truncate">{b.name}</span>
                              <span className="text-[10px] font-mono text-rose-300 font-bold shrink-0">({b.yieldDisplay})</span>
                            </div>
                            <div className="text-[10px] font-mono text-rose-400 font-bold flex items-center gap-1 mt-0.5">
                              <Skull className="w-2.5 h-2.5 shrink-0" />
                              <span title={`Estimativa central: ~${formatCasualtyNumber(bCas.totalDeaths)} mortos`}>
                                {bCas.deathsRangeDisplay} mortos
                              </span>
                              <span className="text-neutral-500">•</span>
                              <span className="text-neutral-400 font-normal" title={`Estimativa central: ~${formatCasualtyNumber(bCas.totalInjuries)} feridos`}>
                                {bCas.injuriesRangeDisplay} feridos
                              </span>
                            </div>
                          </div>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-neutral-400 shrink-0">
                            R: {formatRadius(b.lightBlastRadiusM)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Comparativo com Little Boy (Hiroshima) */}
                <div className="p-3 rounded-xl bg-[#181818]/80 border border-white/10 space-y-1.5 font-mono text-[11px]">
                  <span className="text-[10px] text-neutral-300 uppercase tracking-wider block font-bold">
                    Comparativo com Little Boy (15 kt):
                  </span>
                  <div className="grid grid-cols-3 gap-1 pt-1 text-center">
                    <div className="bg-[#141414] p-1.5 rounded border border-white/10">
                      <span className="text-[9px] text-neutral-400 block">Potência</span>
                      <span className="text-white font-bold">{getHiroshimaMultiplier(selectedBomb.yieldKt)}</span>
                    </div>
                    <div className="bg-[#141414] p-1.5 rounded border border-white/10">
                      <span className="text-[9px] text-neutral-400 block">Bola Fogo</span>
                      <span className="text-amber-400 font-bold">{(effectiveBomb.fireballRadiusM / 200).toFixed(1)}×</span>
                    </div>
                    <div className="bg-[#141414] p-1.5 rounded border border-white/10">
                      <span className="text-[9px] text-neutral-400 block">Cogumelo</span>
                      <span className="text-purple-400 font-bold">{(selectedBomb.mushroomCloudHeightKm / 12.0).toFixed(1)}×</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL: TABELA TÉCNICA COMPLETA DE ZONAS DE DESTRUIÇÃO (12 ARMAS CALIBRADAS) */}
      {showBenchmarkModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#141414] border border-white/15 rounded-2xl max-w-6xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#181818] border-b border-white/10 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-[#222222] border border-white/15 text-red-500 shadow-sm">
                  <Table className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-tight">
                    TABELA DE MÉTRICAS FÍSICAS E RELAÇÃO DE ESCALA DE ZONAS DE DESTRUIÇÃO NUCLEARES
                  </h3>
                  <p className="text-xs text-neutral-300 mt-0.5">
                    Referência de Escala: Castle Bravo com Diâmetro de Bola de Fogo de 7,0 km (Raio 3,50 km) • 12 Armas Calibradas
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowBenchmarkModal(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Fechar tabela técnica"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Scrollable */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 bg-[#141414]">
              {/* Parâmetros de Referência Castle Bravo (15 Mt) & Tsar Bomba (50 Mt / 100 Mt) */}
              <div className="bg-[#181818] border border-white/15 rounded-xl p-4 space-y-3">
                <div className="flex items-center space-x-2 text-white font-bold text-xs uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4 text-red-500" />
                  <span>Parâmetros de Referência de Escala (Castle Bravo 15 Mt — Ø Bola de Fogo 7,0 km):</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
                  <div className="bg-[#222222] p-2.5 rounded-lg border border-white/15 text-center">
                    <span className="text-[10px] text-white font-bold block">1º Bola de Fogo</span>
                    <span className="text-xs text-amber-300 font-mono font-black">R: 3,50 km</span>
                    <span className="text-[10px] text-neutral-400 font-mono block">Ø: 7,00 km</span>
                  </div>
                  <div className="bg-[#222222] p-2.5 rounded-lg border border-white/15 text-center">
                    <span className="text-[10px] text-white font-bold block">2º Vaporização</span>
                    <span className="text-xs text-orange-300 font-mono font-black">R: 7,86 km</span>
                    <span className="text-[10px] text-neutral-400 font-mono block">Ø: 15,72 km</span>
                  </div>
                  <div className="bg-[#222222] p-2.5 rounded-lg border border-white/15 text-center">
                    <span className="text-[10px] text-white font-bold block">3º Carbonização</span>
                    <span className="text-xs text-red-400 font-mono font-black">R: 11,10 km</span>
                    <span className="text-[10px] text-neutral-400 font-mono block">Ø: 22,20 km</span>
                  </div>
                  <div className="bg-[#222222] p-2.5 rounded-lg border border-white/15 text-center">
                    <span className="text-[10px] text-white font-bold block">4º Choque Pesado</span>
                    <span className="text-xs text-rose-400 font-mono font-black">R: 10,30 km</span>
                    <span className="text-[10px] text-neutral-400 font-mono block">Ø: 20,60 km (20 psi)</span>
                  </div>
                  <div className="bg-[#222222] p-2.5 rounded-lg border border-white/15 text-center">
                    <span className="text-[10px] text-white font-bold block">5º Choque Moderado</span>
                    <span className="text-xs text-purple-400 font-mono font-black">R: 22,21 km</span>
                    <span className="text-[10px] text-neutral-400 font-mono block">Ø: 44,42 km (5 psi)</span>
                  </div>
                  <div className="bg-[#222222] p-2.5 rounded-lg border border-white/15 text-center">
                    <span className="text-[10px] text-white font-bold block">6º Raio Térmico</span>
                    <span className="text-xs text-amber-400 font-mono font-black">R: 40,09 km</span>
                    <span className="text-[10px] text-neutral-400 font-mono block">Ø: 80,18 km (3º Grau)</span>
                  </div>
                  <div className="bg-[#222222] p-2.5 rounded-lg border border-white/15 text-center">
                    <span className="text-[10px] text-white font-bold block">7º Choque Leve</span>
                    <span className="text-xs text-slate-300 font-mono font-black">R: 58,47 km</span>
                    <span className="text-[10px] text-neutral-400 font-mono block">Ø: 116,94 km (1 psi)</span>
                  </div>
                </div>
              </div>

              {/* Tabela Completa de Impacto por Potência */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-red-500" />
                    <span>Tabela Completa de Impacto por Potência (7 Zonas Calibradas)</span>
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-400">
                    R = Raio • Ø = Diâmetro
                  </span>
                </div>

                <div className="border border-white/15 rounded-xl overflow-x-auto shadow-inner bg-[#161616]">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#1c1c1c] border-b border-white/15 text-[10px] text-white uppercase font-bold">
                      <tr>
                        <th className="p-3 text-white">Arma / Potência</th>
                        <th className="p-3 text-white">1º Bola Fogo</th>
                        <th className="p-3 text-white">2º Vaporização Exterior</th>
                        <th className="p-3 text-white">3º Carbonização Instantânea</th>
                        <th className="p-3 text-white">4º Choque Pesado (20 psi)</th>
                        <th className="p-3 text-white">5º Choque Moderado (5 psi)</th>
                        <th className="p-3 text-white">6º Queimaduras 3º Grau</th>
                        <th className="p-3 text-white">7º Choque Leve (1 psi)</th>
                        <th className="p-3 text-center text-white">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-[11px] bg-[#141414]">
                      {NUCLEAR_RANKING_BOMBS.map((b) => {
                        const isCurrent = b.id === selectedBomb.id;
                        return (
                          <tr
                            key={b.id}
                            className={`hover:bg-[#222222] transition-colors ${
                              isCurrent ? 'bg-red-600/15' : ''
                            }`}
                          >
                            <td className="p-3 font-sans">
                              <div className="font-bold text-white flex items-center gap-1.5">
                                <span>{b.name}</span>
                                {isCurrent && (
                                  <span className="px-1.5 py-0.2 rounded bg-red-600 text-[9px] text-white font-mono font-bold">
                                    Ativa
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-neutral-300 font-mono">
                                {b.yieldDisplay}
                              </span>
                            </td>
                            <td className="p-3 text-white font-mono">
                              <div className="text-white font-semibold">R: {formatRadius(b.fireballRadiusM)}</div>
                              <div className="text-[10px] text-neutral-400">Ø: {formatDiameter(b.fireballRadiusM)}</div>
                            </td>
                            <td className="p-3 text-white font-mono">
                              <div className="text-white font-semibold">R: {formatRadius(b.vaporizationRadiusM)}</div>
                              <div className="text-[10px] text-neutral-400">Ø: {formatDiameter(b.vaporizationRadiusM)}</div>
                            </td>
                            <td className="p-3 text-white font-mono">
                              <div className="text-white font-semibold">R: {formatRadius(b.carbonizationRadiusM)}</div>
                              <div className="text-[10px] text-neutral-400">Ø: {formatDiameter(b.carbonizationRadiusM)}</div>
                            </td>
                            <td className="p-3 text-white font-mono">
                              <div className="text-white font-semibold">R: {formatRadius(b.heavyBlastRadiusM)}</div>
                              <div className="text-[10px] text-neutral-400">Ø: {formatDiameter(b.heavyBlastRadiusM)}</div>
                            </td>
                            <td className="p-3 text-white font-mono">
                              <div className="text-white font-semibold">R: {formatRadius(b.moderateBlastRadiusM)}</div>
                              <div className="text-[10px] text-neutral-400">Ø: {formatDiameter(b.moderateBlastRadiusM)}</div>
                            </td>
                            <td className="p-3 text-white font-mono">
                              <div className="text-white font-semibold">R: {formatRadius(b.thermalRadiusM)}</div>
                              <div className="text-[10px] text-neutral-400">Ø: {formatDiameter(b.thermalRadiusM)}</div>
                            </td>
                            <td className="p-3 text-white font-mono">
                              <div className="text-white font-semibold">R: {formatRadius(b.lightBlastRadiusM)}</div>
                              <div className="text-[10px] text-neutral-400">Ø: {formatDiameter(b.lightBlastRadiusM)}</div>
                            </td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => {
                                  handleSelectBomb(b);
                                  setShowBenchmarkModal(false);
                                }}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  isCurrent
                                    ? 'bg-red-600 text-white cursor-default'
                                    : 'bg-[#222222] hover:bg-red-600 text-white border border-white/15'
                                }`}
                              >
                                {isCurrent ? 'No Mapa' : 'Simular'}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#181818] border-t border-white/10 px-5 py-3 flex items-center justify-between">
              <span className="text-xs text-neutral-300">
                Arma atualmente selecionada:{' '}
                <strong className="text-white">{selectedBomb.name} ({selectedBomb.yieldDisplay})</strong>
              </span>
              <button
                onClick={() => setShowBenchmarkModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#222222] hover:bg-[#282828] border border-white/15 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: INSERIR COORDENADAS MANUAIS DE QUALQUER LUGAR DO MUNDO */}
      {showCoordModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-[#181818]/90 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#141414] border border-white/15 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2 text-white font-bold text-sm">
                <Navigation className="w-4 h-4 text-emerald-400" />
                <span>Definir Coordenadas Geográficas</span>
              </div>
              <button
                onClick={() => setShowCoordModal(false)}
                className="text-neutral-300 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Insira a latitude e longitude de qualquer local ou cidade no mundo para posicionar o Marco Zero com precisão milimétrica.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-200 mb-1">
                  Nome do Local / Cidade (Opcional)
                </label>
                <input
                  type="text"
                  value={coordCityName}
                  onChange={(e) => setCoordCityName(e.target.value)}
                  placeholder="Ex: Minha Cidade, Ilha Remota, Base Naval..."
                  className="w-full bg-[#0D0D0D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-200 mb-1">
                    Latitude (-90 a 90)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={coordLat}
                    onChange={(e) => setCoordLat(e.target.value)}
                    placeholder="Ex: -23.5505"
                    className="w-full bg-[#0D0D0D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-200 mb-1">
                    Longitude (-180 a 180)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={coordLng}
                    onChange={(e) => setCoordLng(e.target.value)}
                    placeholder="Ex: -46.6333"
                    className="w-full bg-[#0D0D0D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-2">
              <button
                onClick={() => setShowCoordModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white bg-[#222222] hover:bg-[#333333] transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleApplyCoordinates}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/30 transition-all flex items-center space-x-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Aplicar Impacto</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default NuclearRankingMapTab;
