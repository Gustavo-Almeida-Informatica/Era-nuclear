import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  NUCLEAR_RANKING_BOMBS,
  TARGET_CITIES,
  WORLD_PRESET_CITIES,
  IMPACT_LAYERS,
  FALLOUT_ZONES_CONFIG,
  computeFalloutContourCoordinates,
  NuclearBombRanking,
  TargetCity,
  calculateBombCityCasualties,
  formatCasualtyNumber,
  BombCasualtySummary,
  ZoneCasualtyEstimate
} from '../data/nuclearRankingData';
import {
  ShieldAlert,
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
  ZoomOut
} from 'lucide-react';

export const NuclearRankingMapTab: React.FC = () => {
  const [selectedBomb, setSelectedBomb] = useState<NuclearBombRanking>(NUCLEAR_RANKING_BOMBS[1]); // Default Little Boy
  const [selectedCity, setSelectedCity] = useState<TargetCity>(TARGET_CITIES[0]); // Default Washington

  // Modelo analítico de estimativa de mortes e vítimas em tempo real
  const casualties = calculateBombCityCasualties(selectedBomb, selectedCity);
  const [activeTabMobile, setActiveTabMobile] = useState<'map' | 'options'>('map');
  const [visibleLayers, setVisibleLayers] = useState<Record<string, boolean>>({
    fireball: true,
    vaporization: true,
    carbonization: true, // Zona de carbonização humana instantânea
    heavy: true,
    thermal: true,
    light: true
  });
  const [dimensionMode, setDimensionMode] = useState<'radius' | 'diameter' | 'both'>('both'); // Opção de ver raio, diâmetro ou ambos
  const [mapTheme, setMapTheme] = useState<'dark' | 'osm'>('dark');

  // Map visibility, layout, and sizing states
  const [isMapMaximized, setIsMapMaximized] = useState<boolean>(false); // Expands map across 100% width (12 cols)
  const [mapHeightMode, setMapHeightMode] = useState<'compact' | 'standard' | 'large' | 'immersive'>('compact'); // Default to compact (500px) so all options fit on screen without scrolling
  const [isOptionsPanelOpen, setIsOptionsPanelOpen] = useState<boolean>(true); // Right lateral options & layers panel visible by default side-by-side
  const [optionsActiveTab, setOptionsActiveTab] = useState<'layers' | 'fallout' | 'physics'>('layers'); // Active tab inside right options panel

  // Compass helper function
  const getCompassPoint = (deg: number) => {
    const directions = ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO'];
    const index = Math.round(((deg % 360) / 45)) % 8;
    return directions[index];
  };

  // Helper to toggle all 6 blast layers at once
  const setAllLayers = (enable: boolean) => {
    setVisibleLayers({
      fireball: enable,
      vaporization: enable,
      carbonization: enable,
      heavy: enable,
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
  const [showCoordModal, setShowCoordModal] = useState(false);
  const [coordLat, setCoordLat] = useState('');
  const [coordLng, setCoordLng] = useState('');
  const [coordCityName, setCoordCityName] = useState('');
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);

  // Ref to hold the latest handleMapClick without re-instantiating the map
  const onMapClickRef = useRef<(lat: number, lng: number) => void>(() => {});

  // Fallout Visualization State
  const [showFallout, setShowFallout] = useState<boolean>(true); // Default enabled so user sees the new feature immediately
  const [windDirectionDeg, setWindDirectionDeg] = useState<number>(65); // 65° = ENE
  const [windSpeedKmh, setWindSpeedKmh] = useState<number>(25); // 25 km/h
  const [burstType, setBurstType] = useState<'surface' | 'air'>('surface');
  const [visibleFalloutZones, setVisibleFalloutZones] = useState<Record<string, boolean>>({
    rad1000: true,
    rad300: true,
    rad100: true,
    rad10: true
  });
  const [falloutPanelOpen, setFalloutPanelOpen] = useState<boolean>(true);

  // Zoom level & World Map View state
  const [currentZoom, setCurrentZoom] = useState<number>(12);
  const [isWorldView, setIsWorldView] = useState<boolean>(false);
  const isWorldViewRef = useRef<boolean>(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const circlesLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

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
      selectedBomb.fireballRadiusM,
      selectedBomb.vaporizationRadiusM,
      selectedBomb.carbonizationRadiusM,
      selectedBomb.heavyBlastRadiusM,
      selectedBomb.thermalRadiusM,
      selectedBomb.lightBlastRadiusM
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
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  // Switch to whole World Map (Planisfério Global)
  const handleViewWorldMap = () => {
    if (!mapInstanceRef.current) return;
    isWorldViewRef.current = true;
    setIsWorldView(true);
    try {
      const worldBounds = L.latLngBounds(L.latLng(-60, -170), L.latLng(75, 180));
      mapInstanceRef.current.fitBounds(worldBounds, {
        padding: [20, 20],
        animate: true
      });
    } catch {
      mapInstanceRef.current.setView([20, 0], 2, { animate: true });
    }
  };

  // Handle click or drag on the map to set Ground Zero anywhere in the world
  const handleMapClick = (lat: number, lng: number) => {
    const latStr = lat >= 0 ? `${lat.toFixed(4)}°N` : `${Math.abs(lat).toFixed(4)}°S`;
    const lngStr = lng >= 0 ? `${lng.toFixed(4)}°E` : `${Math.abs(lng).toFixed(4)}°W`;
    const customCity: TargetCity = {
      id: `coord-${lat.toFixed(4)}-${lng.toFixed(4)}`,
      name: 'Local no Mapa',
      country: `${latStr}, ${lngStr}`,
      lat,
      lng,
      description: 'Ponto de impacto definido diretamente no mapa interativo.',
      populationEstimate: 'Área Sob Análise Tática',
      urbanPopulation: 1200000,
      metroPopulation: 2500000,
      coreDensityPerKm2: 3800,
      metroDensityPerKm2: 950
    };

    setSelectedCity(customCity);
    setIsReverseGeocoding(true);

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=11`)
      .then((res) => res.json())
      .then((data) => {
        if (data && (data.address || data.name)) {
          const addr = data.address || {};
          const detectedName =
            addr.city ||
            addr.town ||
            addr.village ||
            addr.municipality ||
            addr.county ||
            addr.state ||
            data.name ||
            'Local Selecionado';
          const detectedCountry = addr.country || '';
          setSelectedCity((prev) => {
            if (Math.abs(prev.lat - lat) < 0.001 && Math.abs(prev.lng - lng) < 0.001) {
              return {
                ...prev,
                name: detectedName,
                country: detectedCountry ? `${detectedCountry} (${latStr}, ${lngStr})` : prev.country,
                description: data.display_name
                  ? `Identificado via OpenStreetMap: ${data.display_name}`
                  : prev.description
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
              return {
                id: `osm-${item.place_id || idx}`,
                name: name.trim(),
                country: country ? `${country}` : '',
                lat: parseFloat(item.lat),
                lng: parseFloat(item.lon),
                description: item.display_name,
                populationEstimate: 'Área Urbana Global'
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
    const customCity: TargetCity = {
      id: `coord-${Date.now()}`,
      name: coordCityName.trim() || 'Ponto Informado',
      country: `[${parsedLat.toFixed(4)}°, ${parsedLng.toFixed(4)}°]`,
      lat: parsedLat,
      lng: parsedLng,
      description: 'Coordenadas inseridas manualmente pelo usuário.',
      populationEstimate: 'Coordenadas Customizadas',
      urbanPopulation: 1200000,
      metroPopulation: 2500000,
      coreDensityPerKm2: 3800,
      metroDensityPerKm2: 950
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
        maxZoom: 19,
        zoomDelta: 1,
        zoomSnap: 0.5,
        worldCopyJump: true,
        zoomControl: false,
        attributionControl: false
      });

      // Attribution
      L.control
        .attribution({ position: 'bottomright' })
        .addAttribution('&copy; OpenStreetMap &copy; CARTO')
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

      // Attach map click listener to place Ground Zero anywhere on Earth
      map.on('click', (e: L.LeafletMouseEvent) => {
        onMapClickRef.current(e.latlng.lat, e.latlng.lng);
      });

      const tileUrl =
        mapTheme === 'dark'
          ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

      const tileLayer = L.tileLayer(tileUrl, {
        minZoom: 1,
        maxZoom: 19,
        subdomains: 'abcd',
        noWrap: false
      }).addTo(map);

      tileLayerRef.current = tileLayer;

      // Group for blast circles
      const circlesGroup = L.layerGroup().addTo(map);
      circlesLayerGroupRef.current = circlesGroup;

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer if theme changes
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    mapInstanceRef.current.removeLayer(tileLayerRef.current);
    const tileUrl =
      mapTheme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const newTileLayer = L.tileLayer(tileUrl, {
      minZoom: 1,
      maxZoom: 19,
      subdomains: 'abcd',
      noWrap: false
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newTileLayer;
  }, [mapTheme]);

  // Update blast circles, fallout plumes, and center whenever configuration changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = circlesLayerGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();

    const center: [number, number] = [selectedCity.lat, selectedCity.lng];
    const allFalloutPoints: [number, number][] = [];

    // 1. Draw Radioactive Fallout Polygons (rendered under prompt blast circles)
    if (showFallout && selectedBomb.fallout) {
      const speedScale = Math.pow(windSpeedKmh / 25, 0.65);
      const burstScale = burstType === 'air' ? 0.35 : 1.0;
      const widthScale = Math.pow(25 / windSpeedKmh, 0.3);

      // Draw zones in reverse order: rad10 (outermost) first, down to rad1000 (innermost)
      const orderedZones = [...FALLOUT_ZONES_CONFIG].reverse();

      orderedZones.forEach((zone) => {
        if (!visibleFalloutZones[zone.id]) return;

        const contour = selectedBomb.fallout.surfaceContours[zone.id as keyof typeof selectedBomb.fallout.surfaceContours];
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

        const poly = L.polygon(pts, {
          color: zone.color,
          fillColor: zone.fillColor,
          fillOpacity: burstType === 'air' ? zone.fillOpacity * 0.6 : zone.fillOpacity,
          weight: zone.strokeWeight,
          dashArray: zone.id === 'rad10' ? '4, 4' : undefined
        });

        poly.bindTooltip(
          `<div style="font-family: ui-sans-serif, system-ui, sans-serif; font-size: 11px; line-height: 1.4; color: #f8fafc; min-width: 190px;">
            <div style="font-weight: 800; color: ${zone.color}; font-size: 12px; margin-bottom: 3px;">☢️ ${zone.name}</div>
            <div>Dose Acumulada: <b>${zone.doseDisplay}</b></div>
            <div>Alcance a Sotavento: <b>${lenKm.toFixed(1)} km</b></div>
            <div>Largura Máxima: <b>${(wKm * 2).toFixed(1)} km</b></div>
            <div style="margin-top: 4px; color: #cbd5e1; font-size: 10px; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 3px;">
              ${zone.medicalImpact}
            </div>
          </div>`,
          { sticky: true }
        );

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
      windLine.bindTooltip(`🌬️ Vetor de Vento: ${windDirectionDeg}° (${windSpeedKmh} km/h) • Direção da Precipitação`, {
        sticky: true
      });
      group.addLayer(windLine);
    }

    // 2. Prompt Blast Layers
    const layersToDraw = [
      {
        id: 'thermal',
        radius: selectedBomb.thermalRadiusM,
        color: '#F97316',
        fillColor: '#F97316',
        fillOpacity: 0.16,
        weight: 1.8,
        dashArray: '4, 4',
        name: 'Raio Térmico (Queimaduras 3º Grau)'
      },
      {
        id: 'light',
        radius: selectedBomb.lightBlastRadiusM,
        color: '#94A3B8',
        fillColor: '#94A3B8',
        fillOpacity: 0.12,
        weight: 1.5,
        dashArray: '6, 6',
        name: 'Onda de Choque Leve (1 psi - Estilhaços)'
      },
      {
        id: 'carbonization',
        radius: selectedBomb.carbonizationRadiusM,
        color: '#DC2626',
        fillColor: '#DC2626',
        fillOpacity: 0.32,
        weight: 2.4,
        dashArray: '5, 3',
        name: 'Zona de Carbonização (Pessoas Carbonizadas Instantaneamente)'
      },
      {
        id: 'heavy',
        radius: selectedBomb.heavyBlastRadiusM,
        color: '#EF4444',
        fillColor: '#EF4444',
        fillOpacity: 0.28,
        weight: 2.2,
        name: 'Onda de Choque Pesada (20 psi - Colapso Estrutural)'
      },
      {
        id: 'vaporization',
        radius: selectedBomb.vaporizationRadiusM,
        color: '#FB923C',
        fillColor: '#FB923C',
        fillOpacity: 0.38,
        weight: 2.2,
        dashArray: '3, 3',
        name: 'Zona de Vaporização Fora da Bola de Fogo (Desintegração Instantânea)'
      },
      {
        id: 'fireball',
        radius: selectedBomb.fireballRadiusM,
        color: '#FACC15',
        fillColor: '#FACC15',
        fillOpacity: 0.58,
        weight: 2.6,
        name: 'Bola de Fogo Nuclear (Plasma & Radiação Pura)'
      }
    ];

    // Sort so larger circles render behind smaller ones
    const sortedLayers = [...layersToDraw].sort((a, b) => b.radius - a.radius);

    sortedLayers.forEach((layer) => {
      if (!visibleLayers[layer.id]) return;

      const circle = L.circle(center, {
        radius: layer.radius,
        color: layer.color,
        fillColor: layer.fillColor,
        fillOpacity: layer.fillOpacity,
        weight: layer.weight,
        dashArray: layer.dashArray
      });

      const radiusStr = formatRadius(layer.radius);
      const diamStr = formatDiameter(layer.radius);
      let metricLine = '';
      if (dimensionMode === 'radius') {
        metricLine = `Raio (R): <b>${radiusStr}</b>`;
      } else if (dimensionMode === 'diameter') {
        metricLine = `Diâmetro (Ø): <b>${diamStr}</b>`;
      } else {
        metricLine = `Raio: <b>${radiusStr}</b> • Diâmetro: <b>${diamStr}</b>`;
      }

      let tooltipExtra = '';
      if (layer.id === 'carbonization') {
        tooltipExtra = `<br/><span style="color: #FCA5A5; font-size: 11px;">⚠️ Fluxo térmico direto (>25–35 cal/cm²). Qualquer ser humano ao ar livre é instantaneamente carbonizado e calcinado até os ossos antes da onda mecânica. Roupas entram em combustão imediata. Letalidade 100%.</span>`;
      }

      const zoneEst = casualties.zoneEstimates[layer.id as keyof typeof casualties.zoneEstimates];
      const casualtyInfo = zoneEst
        ? `<div style="margin-top: 5px; padding-top: 5px; border-top: 1px dashed rgba(255,255,255,0.25); text-align: left;">
            <div style="color: #f87171; font-weight: 800; font-size: 12px;">💀 Mortes Estimadas Nesta Zona: ${formatCasualtyNumber(zoneEst.fatalities)} pessoas</div>
            <div style="color: #cbd5e1; font-size: 10px;">👥 População da Faixa: ${formatCasualtyNumber(zoneEst.populationExposed)} hab • Letalidade: ${(zoneEst.fatalityRate * 100).toFixed(0)}%</div>
            <div style="color: #fda4af; font-size: 10px; font-weight: 700;">🌐 Mortes Totais em ${selectedCity.name}: ${formatCasualtyNumber(casualties.totalDeaths)} mortos</div>
          </div>`
        : '';

      circle.bindTooltip(
        `<strong>${layer.name}</strong><br/>${metricLine}<br/>Área: ${calculateAreaKm2(layer.radius)}${tooltipExtra}${casualtyInfo}`,
        {
          direction: 'top',
          className: 'tactical-map-tooltip'
        }
      );

      if (zoneEst) {
        circle.bindPopup(`
          <div style="font-family: sans-serif; font-size: 12px; color: #0f172a; line-height: 1.4; min-width: 230px;">
            <strong style="font-size: 13px; color: #b91c1c;">${layer.name}</strong><br/>
            <span style="color: #64748b; font-size: 11px;">${IMPACT_LAYERS.find((il) => il.id === layer.id)?.subtitle || ''}</span>
            <hr style="margin: 6px 0; border: none; border-top: 1px solid #e2e8f0;"/>
            <div>${metricLine}</div>
            <div>Área Acumulada: <b>${calculateAreaKm2(layer.radius)}</b></div>
            <div style="margin-top: 6px; padding: 6px 8px; background: #fee2e2; border-radius: 6px; border: 1px solid #fca5a5;">
              <div style="color: #991b1b; font-weight: bold; font-size: 12px;">💀 Mortes Nesta Faixa: ${formatCasualtyNumber(zoneEst.fatalities)} pessoas</div>
              <div style="color: #b45309; font-size: 11px;">🩹 Feridos na Faixa: ${formatCasualtyNumber(zoneEst.injuries)} pessoas</div>
              <div style="color: #475569; font-size: 11px;">👥 População Residente: ${formatCasualtyNumber(zoneEst.populationExposed)} hab</div>
              <div style="color: #b91c1c; font-size: 11px; font-weight: bold;">Taxa de Letalidade: ${(zoneEst.fatalityRate * 100).toFixed(0)}%</div>
            </div>
            <div style="margin-top: 6px; font-size: 11px; color: #475569;">
              💀 Mortes Totais da Bomba em <b>${selectedCity.name}</b>: <b style="color: #b91c1c;">${formatCasualtyNumber(casualties.totalDeaths)} mortos</b>
            </div>
          </div>
        `);
      }

      group.addLayer(circle);
    });

    // Custom tactical marker at Ground Zero (draggable to any position)
    const groundZeroIcon = L.divIcon({
      className: 'ground-zero-marker',
      html: `
        <div class="relative flex items-center justify-center w-8 h-8 cursor-grab active:cursor-grabbing">
          <div class="absolute w-8 h-8 rounded-full bg-rose-500/40 animate-ping"></div>
          <div class="absolute w-5 h-5 rounded-full border border-rose-400"></div>
          <div class="absolute w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-white shadow-lg"></div>
          <div class="w-1.5 h-1.5 rounded-full bg-amber-300"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const marker = L.marker(center, { icon: groundZeroIcon, draggable: true });
    marker.on('dragend', (e) => {
      const newPos = (e.target as L.Marker).getLatLng();
      onMapClickRef.current(newPos.lat, newPos.lng);
    });
    marker.bindPopup(`
      <div style="font-family: sans-serif; font-size: 12px; color: #0f172a; line-height: 1.4; min-width: 240px;">
        <strong style="font-size: 14px; color: #b91c1c;">🎯 MARCO ZERO (GROUND ZERO)</strong><br/>
        <b>${selectedBomb.name}</b> (${selectedBomb.yieldDisplay})<br/>
        Alvo: <b>${selectedCity.name}</b> (${selectedCity.country})<br/>
        Coordenadas: ${selectedCity.lat.toFixed(4)}°, ${selectedCity.lng.toFixed(4)}°<br/>
        <div style="margin-top: 6px; padding: 6px 8px; background: #fee2e2; border-radius: 6px; border: 1px solid #fca5a5;">
          <div style="font-size: 13px; font-weight: 800; color: #991b1b;">
            💀 Mortes Totais Estimadas: ${formatCasualtyNumber(casualties.totalDeaths)}
          </div>
          <div style="font-size: 11px; font-weight: bold; color: #b45309;">
            🩹 Feridos Graves: ${formatCasualtyNumber(casualties.totalInjuries)}
          </div>
          <div style="font-size: 11px; color: #475569;">
            👥 População sob Efeito: ${formatCasualtyNumber(casualties.totalAffectedPop)}
          </div>
          <div style="font-size: 10px; color: #7f1d1d; font-weight: bold; margin-top: 2px;">
            Letalidade Global na Área: ${casualties.mortalityPercentage.toFixed(1)}%
          </div>
        </div>
        <div style="margin-top: 6px; font-size: 10px; color: #64748b; font-style: italic;">
          (Dica: Arraste este marcador para reposicionar o alvo)
        </div>
      </div>
    `);
    group.addLayer(marker);

    // Auto-fit bounds with comfortable padding so the entire affected area (blast + fallout plume) is visible
    const maxBlastRadius = Math.max(
      selectedBomb.fireballRadiusM,
      selectedBomb.vaporizationRadiusM,
      selectedBomb.carbonizationRadiusM,
      selectedBomb.heavyBlastRadiusM,
      selectedBomb.thermalRadiusM,
      selectedBomb.lightBlastRadiusM
    );

    // Auto-fit bounds unless the user is in whole World Map view
    if (!isWorldViewRef.current) {
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
          maxZoom: 15
        });
      } catch (err) {
        console.warn('Map fitBounds warning:', err);
      }
    }
  }, [
    selectedBomb,
    selectedCity,
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
          const maxRadius = Math.max(
            selectedBomb.fireballRadiusM,
            selectedBomb.vaporizationRadiusM,
            selectedBomb.carbonizationRadiusM,
            selectedBomb.heavyBlastRadiusM,
            selectedBomb.thermalRadiusM,
            selectedBomb.lightBlastRadiusM
          );
          try {
            const safeBounds = getBoundsForRadius(selectedCity.lat, selectedCity.lng, maxRadius * 1.15);
            mapInstanceRef.current.fitBounds(safeBounds, {
              padding: [30, 30],
              animate: false
            });
          } catch (e) {
            // Ignore error
          }
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [activeTabMobile, selectedBomb, selectedCity]);

  // Invalidate Leaflet map size whenever layout, maximize, height or panel state changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      const timer = setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isMapMaximized, mapHeightMode, isOptionsPanelOpen]);

  // Maximize and Options toggle handlers ensuring instant full-width Leaflet invalidateSize
  const handleToggleMaximize = () => {
    const next = !isMapMaximized;
    setIsMapMaximized(next);
    if (next) {
      setIsOptionsPanelOpen(false);
    }
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
    const maxRadius = Math.max(
      selectedBomb.fireballRadiusM,
      selectedBomb.vaporizationRadiusM,
      selectedBomb.carbonizationRadiusM,
      selectedBomb.heavyBlastRadiusM,
      selectedBomb.thermalRadiusM,
      selectedBomb.lightBlastRadiusM
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
          Math.max(selectedBomb.fireballRadiusM / 1000, 0.2)
        );
      }
      const safeBounds = getCombinedBounds(selectedCity.lat, selectedCity.lng, maxRadius, falloutPts);
      mapInstanceRef.current.fitBounds(safeBounds, {
        padding: [40, 40],
        animate: true
      });
    } catch (err) {
      console.warn('Map handleRecenter warning:', err);
    }
  };

  // Dynamic height class ensuring all controls and map fit inside screen viewport
  const getContainerHeightClass = () => {
    if (mapHeightMode === 'immersive') return 'h-[82vh] max-h-[82vh] min-h-[480px]';
    if (mapHeightMode === 'large') return 'h-[760px] max-h-[760px] min-h-[480px]';
    if (mapHeightMode === 'standard') return 'h-[620px] max-h-[620px] min-h-[440px]';
    return 'h-[500px] max-h-[500px] min-h-[420px]'; // compact zero-scroll default
  };

  return (
    <div className="w-full bg-[#0D0D0D] text-white rounded-2xl border border-white/10 shadow-2xl overflow-hidden font-sans">
      {/* Sleek Compact Tactical Command Bar */}
      <div className="bg-[#141414] border-b border-white/10 px-3 py-2.5 sm:px-5 sm:py-3">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-2.5">
          {/* Left: Title, Shield Badge & Selected Bomb Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="p-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 shrink-0">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-xs sm:text-sm font-black tracking-tight text-white uppercase font-display flex items-center gap-1.5">
              <span>Escala de Destruição Nuclear</span>
            </h2>
            <span className="hidden sm:inline text-neutral-500">•</span>
            {/* Active weapon quick pill */}
            <div className="flex items-center space-x-1.5 bg-[#222222] px-2 py-0.5 rounded-lg border border-white/15 text-[11px]">
              <Flame className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="font-bold text-white truncate max-w-[140px] sm:max-w-none">{selectedBomb.name}</span>
              <span className="font-mono text-rose-300 font-bold">({selectedBomb.yieldDisplay})</span>
            </div>

            {/* Total Deaths in Target City Badge */}
            <div className="flex items-center space-x-1.5 bg-rose-950/70 px-2.5 py-0.5 rounded-lg border border-rose-500/50 text-[11px] shadow-sm">
              <Skull className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="font-bold text-rose-200">
                Mortes em {selectedCity.name}: <span className="font-mono text-white font-black">{formatCasualtyNumber(casualties.totalDeaths)}</span>
              </span>
            </div>
          </div>

          {/* Center/Right: Target City Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold text-neutral-300 uppercase mr-0.5 hidden lg:inline">Alvo:</span>
            {TARGET_CITIES.map((city) => {
              const isSelected = selectedCity.id === city.id || selectedCity.name === city.name;
              return (
                <button
                  key={city.id}
                  onClick={() => handleSelectCity(city)}
                  className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1 border ${
                    isSelected
                      ? 'bg-rose-500 text-white border-rose-400 shadow-sm'
                      : 'bg-[#222222] text-neutral-200 hover:text-white hover:bg-[#282828] border-white/15'
                  }`}
                  title={`${city.name} (${city.country}) - ${city.highlightTag || 'Alvo'}`}
                >
                  <MapPin className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-rose-400'}`} />
                  <span>{city.name}</span>
                </button>
              );
            })}

            {/* Quick Search Input with Dropdown */}
            <div className="relative">
              <div className="flex items-center bg-[#222222] border border-white/15 focus-within:border-rose-500 rounded-lg px-2.5 py-1 text-xs transition-all">
                <Search className="w-3 h-3 text-neutral-300 shrink-0 mr-1.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder="Buscar qualquer cidade..."
                  className="bg-transparent text-white placeholder-neutral-500 focus:outline-none w-32 sm:w-40 text-[11px]"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchOpen(false);
                    }}
                    className="text-neutral-300 hover:text-white p-0.5 ml-1"
                    title="Limpar busca"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
                {isSearching && <Loader2 className="w-3 h-3 text-rose-400 animate-spin ml-1" />}
              </div>

              {/* Search results dropdown */}
              {isSearchOpen && (searchResults.length > 0 || isSearching) && (
                <div className="absolute top-full right-0 mt-1 bg-[#161616]/98 backdrop-blur-md border border-white/15 rounded-xl shadow-2xl z-50 w-72 sm:w-80 max-h-72 overflow-y-auto p-1.5 space-y-1">
                  <div className="px-2.5 py-1 text-[10px] uppercase font-bold text-neutral-300 flex items-center justify-between border-b border-white/10">
                    <span>Resultados da Busca ({searchResults.length})</span>
                    <span className="text-rose-400 font-mono text-[9px]">OpenStreetMap</span>
                  </div>
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleSelectCity(result)}
                      className="w-full text-left p-2 rounded-lg hover:bg-[#222222] transition-all flex items-start justify-between gap-2 group"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center space-x-1.5">
                          <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                          <span className="text-xs font-bold text-white group-hover:text-rose-300 truncate">
                            {result.name}
                          </span>
                          {result.country && (
                            <span className="text-[10px] text-neutral-300">({result.country})</span>
                          )}
                        </div>
                        <p className="text-[10px] text-neutral-400 truncate pl-4.5 mt-0.5">
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

            {/* Metrópoles Populares Dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => setIsWorldDropdownOpen(!isWorldDropdownOpen)}
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
              onClick={() => setShowCoordModal(true)}
              className="px-2 py-1 rounded-lg bg-[#222222] border border-white/15 hover:border-white/20 text-xs font-medium text-neutral-200 hover:text-white flex items-center space-x-1 transition-all shrink-0"
              title="Digitar Latitude e Longitude exatas"
            >
              <Navigation className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">Coordenadas</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs (Mapa e Opções & Métricas) */}
        <div className="flex lg:hidden mt-2 bg-[#222222] p-1 rounded-lg border border-white/15">
          <button
            onClick={() => setActiveTabMobile('map')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all flex items-center justify-center space-x-1.5 ${
              activeTabMobile === 'map'
                ? 'bg-rose-500 text-white shadow-sm'
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
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2. Opções & Métricas</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Center Map (Extended) and Right Column Options & Fallout */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Interactive Leaflet Map Canvas (Extended to occupy the left ranking space) */}
        <div
          className={`${
            isMapMaximized || !isOptionsPanelOpen
              ? 'col-span-12 w-full border-r-0'
              : 'lg:col-span-8 xl:col-span-8 2xl:col-span-9 border-r border-white/10'
          } flex flex-col bg-[#0A0A0A] transition-all duration-300 ${
            activeTabMobile === 'map' ? 'block' : 'hidden lg:flex'
          }`}
        >
          {/* Map Top Bar: City Target Badge, Recenter, Map Style, Size Controls & Maximize */}
          <div className="bg-[#161616]/95 border-b border-white/10 px-3 py-2 sm:px-4 sm:py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <div className="flex items-center space-x-1.5 font-bold text-white">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span className="truncate max-w-[150px] sm:max-w-none">
                  {selectedCity.name} ({selectedCity.country})
                </span>
              </div>
              <span className="hidden xl:inline-block text-neutral-300 font-mono text-[10px]">
                [{selectedCity.lat >= 0 ? selectedCity.lat.toFixed(3) + '°N' : Math.abs(selectedCity.lat).toFixed(3) + '°S'},{' '}
                {selectedCity.lng >= 0 ? selectedCity.lng.toFixed(3) + '°E' : Math.abs(selectedCity.lng).toFixed(3) + '°W'}]
              </span>

              {/* Destaque Histórico ou Estratégico Badge */}
              {selectedCity.isHighlighted && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/50 flex items-center gap-1 shadow-sm">
                  <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                  <span className="hidden sm:inline">{selectedCity.highlightTag || 'Histórico'}</span>
                </span>
              )}

              {/* Vítimas Totais Estimadas Badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-950/70 border border-rose-500/50 text-rose-300 shadow-sm">
                <Skull className="w-3 h-3 text-rose-400 shrink-0" />
                <span className="text-[11px] font-bold">
                  Mortes Totais: <span className="font-mono text-white font-black">{formatCasualtyNumber(casualties.totalDeaths)}</span>
                </span>
                <span className="hidden md:inline text-[9px] text-rose-300/80 font-mono">
                  • 🩹 {formatCasualtyNumber(casualties.totalInjuries)} feridos
                </span>
              </div>

              {isReverseGeocoding && (
                <span className="text-[10px] text-amber-400 flex items-center gap-1 font-mono">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Localizando...
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {/* Map Height Size Toggle (Compacto / Médio / Grande) */}
              <div className="flex items-center space-x-0.5 bg-[#222222] p-0.5 rounded-lg border border-white/15 text-[11px]">
                <button
                  onClick={() => setMapHeightMode('compact')}
                  className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                    mapHeightMode === 'compact' ? 'bg-rose-500 text-white shadow-sm' : 'text-neutral-300 hover:text-white'
                  }`}
                  title="Altura compacta (520px) - Visão sem rolagem vertical"
                >
                  Compacto
                </button>
                <button
                  onClick={() => setMapHeightMode('standard')}
                  className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                    mapHeightMode === 'standard' ? 'bg-rose-500 text-white' : 'text-neutral-300 hover:text-white'
                  }`}
                  title="Altura padrão (640px)"
                >
                  Médio
                </button>
                <button
                  onClick={() => setMapHeightMode('large')}
                  className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                    mapHeightMode === 'large' ? 'bg-rose-500 text-white shadow-sm' : 'text-neutral-300 hover:text-white'
                  }`}
                  title="Altura grande (780px) - Ampla Visão"
                >
                  Grande
                </button>
              </div>

              {/* Toggle Options Column (Opções / Métricas à Direita) */}
              <button
                onClick={handleToggleOptions}
                className={`px-2 py-1 rounded-lg border text-[11px] font-bold transition-all flex items-center space-x-1 ${
                  isOptionsPanelOpen
                    ? 'bg-rose-500 text-white border-rose-400 shadow-sm'
                    : 'bg-[#222222] text-neutral-200 hover:text-white hover:bg-[#282828] border-white/15'
                }`}
                title={isOptionsPanelOpen ? 'Ocultar painel lateral e estender mapa até a borda' : 'Exibir painel lateral com opções, métricas e fallout'}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Opções</span>
                <span
                  className={`text-[9px] px-1 py-0.2 rounded font-mono font-black ${
                    isOptionsPanelOpen ? 'bg-white text-rose-600' : 'bg-[#333333] text-neutral-300'
                  }`}
                >
                  {isOptionsPanelOpen ? 'ON' : 'OFF'}
                </span>
              </button>

              {/* Maximize Map Width (100% Width) */}
              <button
                onClick={handleToggleMaximize}
                className={`px-2 py-1 rounded-lg border text-[11px] font-bold transition-all flex items-center space-x-1 ${
                  isMapMaximized
                    ? 'bg-rose-500 text-white border-rose-400 shadow-sm ring-1 ring-rose-300'
                    : 'bg-[#222222] text-neutral-200 hover:text-white hover:bg-[#282828] border-white/15'
                }`}
                title={isMapMaximized ? 'Restaurar layout padrão com ranking' : 'Maximizar mapa removendo coluna lateral esquerda'}
              >
                {isMapMaximized ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                <span className="hidden sm:inline">{isMapMaximized ? 'Restaurar' : 'Maximizar'}</span>
              </button>

              {/* Quick Dimension Mode Selector */}
              <div className="hidden xl:flex items-center space-x-0.5 bg-[#222222] p-0.5 rounded-lg border border-white/15 text-[11px]">
                <button
                  onClick={() => setDimensionMode('radius')}
                  className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                    dimensionMode === 'radius' ? 'bg-rose-500 text-white' : 'text-neutral-300 hover:text-white'
                  }`}
                  title="Exibir em Raio (R)"
                >
                  R
                </button>
                <button
                  onClick={() => setDimensionMode('diameter')}
                  className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                    dimensionMode === 'diameter' ? 'bg-rose-500 text-white' : 'text-neutral-300 hover:text-white'
                  }`}
                  title="Exibir em Diâmetro (Ø)"
                >
                  Ø
                </button>
                <button
                  onClick={() => setDimensionMode('both')}
                  className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                    dimensionMode === 'both' ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white' : 'text-neutral-300 hover:text-white'
                  }`}
                  title="Exibir Raio e Diâmetro simultaneamente"
                >
                  R&Ø
                </button>
              </div>

              {/* Map Theme Toggle */}
              <button
                onClick={() => setMapTheme(mapTheme === 'dark' ? 'osm' : 'dark')}
                className="px-2 py-1 rounded-lg bg-[#222222] text-neutral-200 hover:text-white hover:bg-[#333333] border border-white/15 text-[11px] transition-all"
                title="Alternar estilo do mapa"
              >
                {mapTheme === 'dark' ? 'Tático' : 'Rua'}
              </button>

              {/* World Map View Button */}
              <button
                onClick={handleViewWorldMap}
                className={`px-2 py-1 rounded-lg border text-[11px] font-bold transition-all flex items-center space-x-1 ${
                  isWorldView
                    ? 'bg-rose-500 text-white border-rose-400 shadow-sm'
                    : 'bg-[#222222] text-neutral-200 hover:text-white hover:bg-[#282828] border-white/15'
                }`}
                title="Ver todo o Mapa Mundi (Planisfério Global 100%)"
              >
                <Globe className={`w-3 h-3 ${isWorldView ? 'text-white animate-spin-slow' : 'text-emerald-400'}`} />
                <span className="hidden sm:inline">Mundi</span>
              </button>

              {/* Recenter / Focus Button */}
              <button
                onClick={handleRecenter}
                className="px-2 py-1 rounded-lg bg-[#222222] text-neutral-200 hover:text-white hover:bg-[#282828] border border-white/15 text-[11px] transition-all flex items-center space-x-1"
                title="Focar no Marco Zero (Alvo da Detonação)"
              >
                <Crosshair className="w-3 h-3 text-rose-400" />
                <span className="hidden sm:inline">Focar</span>
              </button>
            </div>
          </div>

          {/* Escolher Bomba: Selector Bar with Quick Dropdown and Interactive Pills */}
          <div className="bg-[#161616]/95 border-b border-white/10 px-2.5 sm:px-3 py-1.5 flex items-center gap-2.5 overflow-x-auto no-scrollbar z-10">
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-400 uppercase tracking-wider shrink-0">
              <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
              <span>Escolher Bomba:</span>
            </div>

            {/* Quick Dropdown for direct selection */}
            <div className="shrink-0">
              <select
                value={selectedBomb.id}
                onChange={(e) => {
                  const found = NUCLEAR_RANKING_BOMBS.find((b) => b.id === e.target.value);
                  if (found) setSelectedBomb(found);
                }}
                className="bg-[#222222] text-white text-xs font-bold px-2 py-1 rounded-lg border border-white/15 focus:outline-none focus:border-rose-500 cursor-pointer"
                title="Selecionar arma atômica diretamente do menu"
              >
                {NUCLEAR_RANKING_BOMBS.map((b, idx) => {
                  const bCas = calculateBombCityCasualties(b, selectedCity);
                  return (
                    <option key={b.id} value={b.id} className="bg-[#181818] text-white">
                      #{idx + 1} - {b.name} ({b.yieldDisplay}) • ~{formatCasualtyNumber(bCas.totalDeaths)} mortes
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Interactive Weapon Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
              {NUCLEAR_RANKING_BOMBS.map((b, idx) => {
                const isSelected = selectedBomb.id === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBomb(b)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 transition-all flex items-center space-x-1.5 border cursor-pointer ${
                      isSelected
                        ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/30 ring-1 ring-rose-300'
                        : 'bg-[#222222] hover:bg-[#282828] text-neutral-200 hover:text-white border-white/15'
                    }`}
                    title={`${b.name} (${b.yieldDisplay}) - 💀 ~${formatCasualtyNumber(calculateBombCityCasualties(b, selectedCity).totalDeaths)} mortes em ${selectedCity.name}`}
                  >
                    <span className="text-[10px] opacity-70 font-mono">#{idx + 1}</span>
                    <span className="whitespace-nowrap">{b.name}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                        isSelected ? 'bg-black/30 text-rose-100 font-black' : 'bg-[#141414] text-rose-400'
                      }`}
                    >
                      {b.yieldDisplay}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Leaflet Map Canvas Container */}
          <div className={`relative w-full ${getContainerHeightClass()} bg-[#0D0D0D] overflow-hidden`}>
            {/* Inner Leaflet Mount */}
            <div className="relative w-full h-full bg-[#080808]">
              <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

              {/* Float Info Card over Map: Current Weapon stats */}
              <div className="absolute top-3 left-3 z-20 bg-[#161616]/90 backdrop-blur-md border border-white/15 rounded-2xl p-3 shadow-xl max-w-xs text-xs space-y-1.5 pointer-events-auto">
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1.5">
                  <span className="font-extrabold text-white flex items-center gap-1.5 text-xs">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    {selectedBomb.name}
                  </span>
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    {selectedBomb.yieldDisplay}
                  </span>
                </div>
                <div className="text-[11px] text-neutral-200 space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span className="text-neutral-300">
                      {dimensionMode === 'radius' ? 'Raio Máximo:' : 'Diâmetro Total:'}
                    </span>
                    <span className="text-amber-400 font-bold">{calculateTotalDiameter()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-300">Alvo:</span>
                    <span className="text-neutral-100 font-bold truncate ml-1">{selectedCity.name}</span>
                  </div>
                  {selectedCity.country && (
                    <div className="flex justify-between items-center text-[10px] text-neutral-300">
                      <span>País / Região:</span>
                      <span className="text-neutral-200 truncate ml-1">{selectedCity.country}</span>
                    </div>
                  )}
                  {selectedCity.isHighlighted && (
                    <div className="pt-1 border-t border-white/10 flex items-center gap-1 text-[10px] text-amber-300 font-sans font-semibold">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                      <span className="truncate">{selectedCity.highlightTag}</span>
                    </div>
                  )}
                </div>
                <div className="pt-1 border-t border-white/10 text-[10px] text-neutral-300 flex items-center justify-between font-sans">
                  <span className="flex items-center gap-1 text-rose-300">
                    <Target className="w-3 h-3 text-rose-400" />
                    Arraste o alvo ou clique no mapa
                  </span>
                </div>
              </div>

              {/* Tactical Zoom & Global View Floating Controls */}
              <div className="absolute top-3 right-3 z-20 flex flex-col items-end space-y-2 pointer-events-auto">
                {/* Tactical Zoom Pod */}
                <div className="bg-[#161616]/90 backdrop-blur-md border border-white/15 rounded-2xl p-1.5 shadow-2xl flex flex-col items-center space-y-1.5">
                  {/* Zoom In Button */}
                  <button
                    onClick={handleZoomIn}
                    className="w-8 h-8 rounded-xl bg-[#222222] hover:bg-rose-500 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow"
                    title="Ampliar visão (+ Zoom)"
                    aria-label="Ampliar visão"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>

                  {/* Zoom Out Button */}
                  <button
                    onClick={handleZoomOut}
                    className="w-8 h-8 rounded-xl bg-[#222222] hover:bg-rose-500 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow"
                    title="Diminuir visão (- Zoom)"
                    aria-label="Diminuir visão"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>

                  <div className="w-5 h-px bg-[#303030]/80 my-0.5" />

                  {/* World Map Planisphere Button */}
                  <button
                    onClick={handleViewWorldMap}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow ${
                      isWorldView
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-950/50 ring-2 ring-rose-400'
                        : 'bg-[#222222] text-neutral-200 hover:text-white hover:bg-[#333333]'
                    }`}
                    title="Ver todo o Mapa Mundi (Planisfério Global 100%)"
                    aria-label="Ver todo o Mapa Mundi"
                  >
                    <Globe className={`w-4 h-4 ${isWorldView ? 'text-white animate-spin-slow' : 'text-emerald-400'}`} />
                  </button>

                  {/* Focus Target Button */}
                  <button
                    onClick={handleRecenter}
                    className="w-8 h-8 rounded-xl bg-[#222222] hover:bg-[#333333] text-neutral-200 hover:text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow"
                    title="Focar no Alvo (Marco Zero da Detonação)"
                    aria-label="Focar no Alvo"
                  >
                    <Crosshair className="w-4 h-4 text-rose-400" />
                  </button>
                </div>

                {/* Tactical Zoom Level Badge */}
                <div className="bg-[#161616]/90 backdrop-blur-md border border-white/10 rounded-xl px-2.5 py-1 shadow-lg text-[10px] font-mono text-neutral-300 flex items-center space-x-1.5">
                  <span className="text-neutral-400 uppercase tracking-wider">Visão:</span>
                  <span className="text-amber-400 font-bold">
                    {isWorldView ? 'Global (Mundo)' : `${Math.round(currentZoom)}x`}
                  </span>
                </div>
              </div>

              {/* Global World Map Active Banner */}
              {isWorldView && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-auto max-w-md w-auto px-4 py-2 rounded-2xl bg-[#161616]/95 backdrop-blur-md border border-emerald-500/40 text-emerald-300 shadow-2xl flex items-center space-x-2 text-xs">
                  <Globe className="w-4 h-4 text-emerald-400 shrink-0 animate-spin-slow" />
                  <div className="flex-1 leading-tight">
                    <span className="font-bold text-white">Planisfério Global Ativo</span>
                    <span className="text-neutral-300 hidden sm:inline"> — Vendo a Terra inteira. Clique em qualquer ponto do globo ou use [+] para aproximar.</span>
                  </div>
                  <button
                    onClick={handleRecenter}
                    className="ml-2 px-2.5 py-0.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px] flex items-center gap-1 transition-all shrink-0"
                  >
                    <Crosshair className="w-3 h-3" />
                    <span>Focar Alvo</span>
                  </button>
                </div>
              )}

              {/* O mapa permanece 100% limpo e estendido sem sobreposições inferiores */}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN / OVERLAY: Dedicated Map Options, Metrics & Physical Dimensions */}
        {isOptionsPanelOpen && (
          <div
            className={`${
              isMapMaximized
                ? 'absolute top-0 right-0 bottom-0 z-30 w-full sm:w-[460px] max-w-full bg-[#121212]/98 backdrop-blur-xl border-l border-white/15 shadow-2xl animate-in slide-in-from-right duration-200'
                : 'lg:col-span-4 xl:col-span-4 2xl:col-span-3 border-l border-white/10 bg-[#121212] animate-in fade-in duration-200'
            } p-3 sm:p-4 flex flex-col space-y-3.5 overflow-y-auto ${getContainerHeightClass()} ${
              activeTabMobile === 'options' ? 'block' : 'hidden lg:flex'
            }`}
          >
            {/* Header do Painel Lateral */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Opções & Métricas
                  </h4>
                  <p className="text-[10px] text-neutral-400">
                    Controles e dados físicos de {selectedBomb.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#222222] text-rose-300 border border-white/15 font-bold">
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
                    ? 'bg-rose-500 text-white shadow-sm'
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
                          ? 'bg-rose-500 text-white shadow'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Raio (R)
                    </button>
                    <button
                      onClick={() => setDimensionMode('diameter')}
                      className={`py-1.5 text-[11px] font-bold rounded transition-all flex items-center justify-center ${
                        dimensionMode === 'diameter'
                          ? 'bg-rose-500 text-white shadow'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Diâmetro (Ø)
                    </button>
                    <button
                      onClick={() => setDimensionMode('both')}
                      className={`py-1.5 text-[11px] font-bold rounded transition-all flex items-center justify-center ${
                        dimensionMode === 'both'
                          ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Ambos (R & Ø)
                    </button>
                  </div>
                </div>

                {/* Bloco de Camadas de Impacto Físico (com ativação em lote) */}
                <div className="bg-[#181818]/90 p-3 rounded-xl border border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <Layers className="w-3.5 h-3.5 text-rose-400" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Camadas de Impacto
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-[10px]">
                      <button
                        onClick={() => setAllLayers(true)}
                        className="px-2 py-0.5 rounded bg-[#222222] hover:bg-[#282828] text-neutral-300 hover:text-white border border-white/15 transition-all font-semibold"
                      >
                        Ativar Todas
                      </button>
                      <button
                        onClick={() => setAllLayers(false)}
                        className="px-2 py-0.5 rounded bg-[#222222] hover:bg-[#282828] text-neutral-300 hover:text-white border border-white/15 transition-all font-semibold"
                      >
                        Ocultar Todas
                      </button>
                    </div>
                  </div>

                  {/* Card de Balanço Geral de Vítimas & Mortes em Tempo Real */}
                  <div className="bg-gradient-to-br from-rose-950/50 via-[#181818] to-black/70 p-3.5 rounded-2xl border border-rose-500/40 shadow-lg space-y-2.5">
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
                        {casualties.mortalityPercentage.toFixed(1)}% letalidade
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/30">
                        <span className="text-[10px] text-rose-300/90 block font-semibold">💀 Mortes Totais</span>
                        <span className="text-lg font-black text-rose-300 font-mono tracking-tight block">
                          {formatCasualtyNumber(casualties.totalDeaths)}
                        </span>
                        <span className="text-[9px] text-neutral-400 block font-mono">
                          Óbitos em {selectedCity.name}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30">
                        <span className="text-[10px] text-amber-300/90 block font-semibold">🩹 Feridos Graves</span>
                        <span className="text-lg font-black text-amber-300 font-mono tracking-tight block">
                          {formatCasualtyNumber(casualties.totalInjuries)}
                        </span>
                        <span className="text-[9px] text-neutral-400 block font-mono">
                          Trauma e queimaduras
                        </span>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-300">
                      <span className="text-neutral-400">População sob Impacto:</span>
                      <span className="text-white font-bold">{formatCasualtyNumber(casualties.totalAffectedPop)} pessoas</span>
                    </div>
                  </div>

                  {/* As 6 Camadas de Impacto Físico (Interactive Toggles com Mortes por Zona) */}
                  <div className="space-y-1.5">
                    {/* 1. Bola de Fogo */}
                    <button
                      onClick={() => toggleLayer('fireball')}
                      className={`w-full p-2 rounded-xl border text-left transition-all flex items-center justify-between ${
                        visibleLayers.fireball
                          ? 'bg-amber-500/10 border-amber-500/50 text-amber-300 shadow-sm'
                          : 'bg-[#141414] border-white/10 text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0 shadow-sm shadow-amber-400/50" />
                        <div className="truncate">
                          <span className="font-bold block text-xs truncate">Bola de Fogo (Plasma)</span>
                          <span className="text-[10px] text-neutral-400 font-mono block">
                            {dimensionMode === 'radius'
                              ? `Raio: ${formatRadius(selectedBomb.fireballRadiusM)}`
                              : dimensionMode === 'diameter'
                              ? `Diâmetro: ${formatDiameter(selectedBomb.fireballRadiusM)}`
                              : `R: ${formatRadius(selectedBomb.fireballRadiusM)} • Ø: ${formatDiameter(selectedBomb.fireballRadiusM)}`}
                          </span>
                          <span className="text-[10px] text-rose-400 font-mono font-bold flex items-center gap-1 mt-0.5">
                            <Skull className="w-2.5 h-2.5" />
                            <span>{formatCasualtyNumber(casualties.zoneEstimates.fireball.fatalities)} mortes</span>
                            <span className="text-neutral-500">•</span>
                            <span className="text-neutral-400 font-normal">100% letal</span>
                          </span>
                        </div>
                      </div>
                      {visibleLayers.fireball ? <Eye className="w-4 h-4 text-amber-400 shrink-0" /> : <EyeOff className="w-4 h-4 text-neutral-600 shrink-0" />}
                    </button>

                    {/* 2. Vaporização */}
                    <button
                      onClick={() => toggleLayer('vaporization')}
                      className={`w-full p-2 rounded-xl border text-left transition-all flex items-center justify-between ${
                        visibleLayers.vaporization
                          ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-300 shadow-sm'
                          : 'bg-[#141414] border-white/10 text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <span className="w-3 h-3 rounded-full bg-yellow-400 shrink-0 shadow-sm shadow-yellow-400/50" />
                        <div className="truncate">
                          <span className="font-bold block text-xs truncate">Zona de Vaporização Total</span>
                          <span className="text-[10px] text-neutral-400 font-mono block">
                            {dimensionMode === 'radius'
                              ? `Raio: ${formatRadius(selectedBomb.vaporizationRadiusM)}`
                              : dimensionMode === 'diameter'
                              ? `Diâmetro: ${formatDiameter(selectedBomb.vaporizationRadiusM)}`
                              : `R: ${formatRadius(selectedBomb.vaporizationRadiusM)} • Ø: ${formatDiameter(selectedBomb.vaporizationRadiusM)}`}
                          </span>
                          <span className="text-[10px] text-rose-400 font-mono font-bold flex items-center gap-1 mt-0.5">
                            <Skull className="w-2.5 h-2.5" />
                            <span>{formatCasualtyNumber(casualties.zoneEstimates.vaporization.fatalities)} mortes</span>
                            <span className="text-neutral-500">•</span>
                            <span className="text-neutral-400 font-normal">99% letal</span>
                          </span>
                        </div>
                      </div>
                      {visibleLayers.vaporization ? <Eye className="w-4 h-4 text-yellow-400 shrink-0" /> : <EyeOff className="w-4 h-4 text-neutral-600 shrink-0" />}
                    </button>

                    {/* 3. Carbonização */}
                    <button
                      onClick={() => toggleLayer('carbonization')}
                      className={`w-full p-2 rounded-xl border text-left transition-all flex items-center justify-between ${
                        visibleLayers.carbonization
                          ? 'bg-rose-600/15 border-rose-500/60 text-rose-300 shadow-sm ring-1 ring-rose-500/30'
                          : 'bg-[#141414] border-white/10 text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <span className="w-3 h-3 rounded-full bg-rose-600 shrink-0 shadow-sm shadow-rose-600/50" />
                        <div className="truncate">
                          <span className="font-bold block text-xs truncate">Zona de Carbonização Humana</span>
                          <span className="text-[10px] text-neutral-400 font-mono block">
                            {dimensionMode === 'radius'
                              ? `Raio: ${formatRadius(selectedBomb.carbonizationRadiusM)}`
                              : dimensionMode === 'diameter'
                              ? `Diâmetro: ${formatDiameter(selectedBomb.carbonizationRadiusM)}`
                              : `R: ${formatRadius(selectedBomb.carbonizationRadiusM)} • Ø: ${formatDiameter(selectedBomb.carbonizationRadiusM)}`}
                          </span>
                          <span className="text-[10px] text-rose-400 font-mono font-bold flex items-center gap-1 mt-0.5">
                            <Skull className="w-2.5 h-2.5" />
                            <span>{formatCasualtyNumber(casualties.zoneEstimates.carbonization.fatalities)} mortes</span>
                            <span className="text-neutral-500">•</span>
                            <span className="text-neutral-400 font-normal">95% letal</span>
                          </span>
                        </div>
                      </div>
                      {visibleLayers.carbonization ? <Eye className="w-4 h-4 text-rose-400 shrink-0" /> : <EyeOff className="w-4 h-4 text-neutral-600 shrink-0" />}
                    </button>

                    {/* 4. Choque Pesado */}
                    <button
                      onClick={() => toggleLayer('heavy')}
                      className={`w-full p-2 rounded-xl border text-left transition-all flex items-center justify-between ${
                        visibleLayers.heavy
                          ? 'bg-red-500/10 border-red-500/50 text-red-300 shadow-sm'
                          : 'bg-[#141414] border-white/10 text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <span className="w-3 h-3 rounded-full bg-red-500 shrink-0 shadow-sm" />
                        <div className="truncate">
                          <span className="font-bold block text-xs truncate">Choque Pesado (20 psi)</span>
                          <span className="text-[10px] text-neutral-400 font-mono block">
                            {dimensionMode === 'radius'
                              ? `Raio: ${formatRadius(selectedBomb.heavyBlastRadiusM)}`
                              : dimensionMode === 'diameter'
                              ? `Diâmetro: ${formatDiameter(selectedBomb.heavyBlastRadiusM)}`
                              : `R: ${formatRadius(selectedBomb.heavyBlastRadiusM)} • Ø: ${formatDiameter(selectedBomb.heavyBlastRadiusM)}`}
                          </span>
                          <span className="text-[10px] text-rose-400 font-mono font-bold flex items-center gap-1 mt-0.5">
                            <Skull className="w-2.5 h-2.5" />
                            <span>{formatCasualtyNumber(casualties.zoneEstimates.heavy.fatalities)} mortes</span>
                            <span className="text-neutral-500">•</span>
                            <span className="text-neutral-400 font-normal">85% letal</span>
                          </span>
                        </div>
                      </div>
                      {visibleLayers.heavy ? <Eye className="w-4 h-4 text-red-400 shrink-0" /> : <EyeOff className="w-4 h-4 text-neutral-600 shrink-0" />}
                    </button>

                    {/* 5. Raio Térmico */}
                    <button
                      onClick={() => toggleLayer('thermal')}
                      className={`w-full p-2 rounded-xl border text-left transition-all flex items-center justify-between ${
                        visibleLayers.thermal
                          ? 'bg-orange-500/10 border-orange-500/50 text-orange-300 shadow-sm'
                          : 'bg-[#141414] border-white/10 text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <span className="w-3 h-3 rounded-full bg-orange-500 shrink-0 shadow-sm" />
                        <div className="truncate">
                          <span className="font-bold block text-xs truncate">Raio Térmico (Queimaduras 3º Grau)</span>
                          <span className="text-[10px] text-neutral-400 font-mono block">
                            {dimensionMode === 'radius'
                              ? `Raio: ${formatRadius(selectedBomb.thermalRadiusM)}`
                              : dimensionMode === 'diameter'
                              ? `Diâmetro: ${formatDiameter(selectedBomb.thermalRadiusM)}`
                              : `R: ${formatRadius(selectedBomb.thermalRadiusM)} • Ø: ${formatDiameter(selectedBomb.thermalRadiusM)}`}
                          </span>
                          <span className="text-[10px] text-rose-400 font-mono font-bold flex items-center gap-1 mt-0.5">
                            <Skull className="w-2.5 h-2.5" />
                            <span>{formatCasualtyNumber(casualties.zoneEstimates.thermal.fatalities)} mortes</span>
                            <span className="text-neutral-500">•</span>
                            <span className="text-neutral-400 font-normal">50% letal</span>
                          </span>
                        </div>
                      </div>
                      {visibleLayers.thermal ? <Eye className="w-4 h-4 text-orange-400 shrink-0" /> : <EyeOff className="w-4 h-4 text-neutral-600 shrink-0" />}
                    </button>

                    {/* 6. Choque Leve */}
                    <button
                      onClick={() => toggleLayer('light')}
                      className={`w-full p-2 rounded-xl border text-left transition-all flex items-center justify-between ${
                        visibleLayers.light
                          ? 'bg-white/10 border-white/30 text-neutral-200 shadow-sm'
                          : 'bg-[#141414] border-white/10 text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <span className="w-3 h-3 rounded-full bg-[#737373] shrink-0 shadow-sm" />
                        <div className="truncate">
                          <span className="font-bold block text-xs truncate">Choque Leve (1 psi)</span>
                          <span className="text-[10px] text-neutral-400 font-mono block">
                            {dimensionMode === 'radius'
                              ? `Raio: ${formatRadius(selectedBomb.lightBlastRadiusM)}`
                              : dimensionMode === 'diameter'
                              ? `Diâmetro: ${formatDiameter(selectedBomb.lightBlastRadiusM)}`
                              : `R: ${formatRadius(selectedBomb.lightBlastRadiusM)} • Ø: ${formatDiameter(selectedBomb.lightBlastRadiusM)}`}
                          </span>
                          <span className="text-[10px] text-rose-400 font-mono font-bold flex items-center gap-1 mt-0.5">
                            <Skull className="w-2.5 h-2.5" />
                            <span>{formatCasualtyNumber(casualties.zoneEstimates.light.fatalities)} mortes</span>
                            <span className="text-neutral-500">•</span>
                            <span className="text-neutral-400 font-normal">8% letal</span>
                          </span>
                        </div>
                      </div>
                      {visibleLayers.light ? <Eye className="w-4 h-4 text-neutral-300 shrink-0" /> : <EyeOff className="w-4 h-4 text-neutral-600 shrink-0" />}
                    </button>
                  </div>
                </div>

                {/* Seção: Cartões de Métricas Físicas Detalhadas para Todas as 6 Camadas */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-bold block">
                    Métricas e Limiares Físicos das Camadas
                  </span>

                  {/* 1. Métrica Bola de Fogo */}
                  <div className="p-3 rounded-xl bg-[#181818]/90 border border-amber-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <span className="text-xs font-bold text-amber-300">1. Bola de Fogo Nuclear</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-amber-400">
                        {calculateAreaKm2(selectedBomb.fireballRadiusM)}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-300 space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Raio / Diâmetro:</span>
                        <span className="text-neutral-100 font-bold">
                          {formatRadius(selectedBomb.fireballRadiusM)} / {formatDiameter(selectedBomb.fireballRadiusM)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Temperatura Interna:</span>
                        <span className="text-amber-300 font-bold">&gt; 100.000.000 °C</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-400 leading-tight">
                      Plasma nuclear incandescente gerado nos microssegundos iniciais. Tudo dentro desta esfera é desintegrado ao nível atômico.
                    </p>
                    <div className="p-2 rounded-lg bg-black/40 border border-white/10 space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between items-center text-rose-300 font-bold">
                        <span className="flex items-center gap-1">
                          <Skull className="w-3 h-3 text-rose-400" />
                          Mortes Nesta Zona:
                        </span>
                        <span>{formatCasualtyNumber(casualties.zoneEstimates.fireball.fatalities)} pessoas</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-400">
                        <span>População residente na faixa:</span>
                        <span className="text-neutral-200">{formatCasualtyNumber(casualties.zoneEstimates.fireball.populationExposed)} hab</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-400">
                        <span>Letalidade Física da Zona:</span>
                        <span className="text-rose-400 font-bold">100% Instantânea</span>
                      </div>
                    </div>
                  </div>

                  {/* 2. Métrica Vaporização */}
                  <div className="p-3 rounded-xl bg-[#181818]/90 border border-yellow-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        <span className="text-xs font-bold text-yellow-300">2. Raio de Vaporização Total</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-yellow-400">
                        {calculateAreaKm2(selectedBomb.vaporizationRadiusM)}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-300 space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Raio / Diâmetro:</span>
                        <span className="text-neutral-100 font-bold">
                          {formatRadius(selectedBomb.vaporizationRadiusM)} / {formatDiameter(selectedBomb.vaporizationRadiusM)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Fluxo Térmico Crítico:</span>
                        <span className="text-yellow-300 font-bold">&gt; 150 cal/cm²</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-400 leading-tight">
                      Zona onde aço estrutural, pedras e concreto se liquefazem ou evaporam antes da passagem da onda de choque mecânica.
                    </p>
                    <div className="p-2 rounded-lg bg-black/40 border border-white/10 space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between items-center text-rose-300 font-bold">
                        <span className="flex items-center gap-1">
                          <Skull className="w-3 h-3 text-rose-400" />
                          Mortes Nesta Zona:
                        </span>
                        <span>{formatCasualtyNumber(casualties.zoneEstimates.vaporization.fatalities)} pessoas</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-400">
                        <span>População residente na faixa:</span>
                        <span className="text-neutral-200">{formatCasualtyNumber(casualties.zoneEstimates.vaporization.populationExposed)} hab</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-400">
                        <span>Letalidade Física da Zona:</span>
                        <span className="text-rose-400 font-bold">99% Instantânea</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. Métrica Carbonização */}
                  <div className="p-3 rounded-xl bg-[#181818]/90 border border-rose-500/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                        <span className="text-xs font-bold text-rose-300">3. Zona de Carbonização Humana</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-rose-400">
                        {calculateAreaKm2(selectedBomb.carbonizationRadiusM)}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-300 space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Raio / Diâmetro:</span>
                        <span className="text-neutral-100 font-bold">
                          {formatRadius(selectedBomb.carbonizationRadiusM)} / {formatDiameter(selectedBomb.carbonizationRadiusM)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Fluxo Térmico Incidente:</span>
                        <span className="text-rose-400 font-bold">&gt; 25-35 cal/cm²</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-400 leading-tight">
                      Seres humanos expostos ao ar livre sofrem carbonização instantânea e calcinação térmica em menos de 0,1 segundo. Roupas entram em combustão imediata.
                    </p>
                    <div className="p-2 rounded-lg bg-black/40 border border-white/10 space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between items-center text-rose-300 font-bold">
                        <span className="flex items-center gap-1">
                          <Skull className="w-3 h-3 text-rose-400" />
                          Mortes Nesta Zona:
                        </span>
                        <span>{formatCasualtyNumber(casualties.zoneEstimates.carbonization.fatalities)} pessoas</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-400">
                        <span>População residente na faixa:</span>
                        <span className="text-neutral-200">{formatCasualtyNumber(casualties.zoneEstimates.carbonization.populationExposed)} hab</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-400">
                        <span>Letalidade Física da Zona:</span>
                        <span className="text-rose-400 font-bold">95%</span>
                      </div>
                    </div>
                  </div>

                  {/* 4. Métrica Choque Pesado */}
                  <div className="p-3 rounded-xl bg-[#181818]/90 border border-red-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <span className="text-xs font-bold text-red-300">4. Choque Pesado (20 psi)</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-red-400">
                        {calculateAreaKm2(selectedBomb.heavyBlastRadiusM)}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-300 space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Raio / Diâmetro:</span>
                        <span className="text-neutral-100 font-bold">
                          {formatRadius(selectedBomb.heavyBlastRadiusM)} / {formatDiameter(selectedBomb.heavyBlastRadiusM)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Sobrepressão e Vento:</span>
                        <span className="text-red-400 font-bold">20 psi • &gt; 800 km/h</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-400 leading-tight">
                      Demolição total de edifícios de concreto armado, pontes e estruturas industriais blindadas. Índice de mortalidade próximo de 100%.
                    </p>
                    <div className="p-2 rounded-lg bg-black/40 border border-white/10 space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between items-center text-rose-300 font-bold">
                        <span className="flex items-center gap-1">
                          <Skull className="w-3 h-3 text-rose-400" />
                          Mortes Nesta Zona:
                        </span>
                        <span>{formatCasualtyNumber(casualties.zoneEstimates.heavy.fatalities)} pessoas</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-400">
                        <span>População residente na faixa:</span>
                        <span className="text-neutral-200">{formatCasualtyNumber(casualties.zoneEstimates.heavy.populationExposed)} hab</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-400">
                        <span>Feridos graves na faixa:</span>
                        <span className="text-amber-300">{formatCasualtyNumber(casualties.zoneEstimates.heavy.injuries)} feridos</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-400">
                        <span>Letalidade Física da Zona:</span>
                        <span className="text-rose-400 font-bold">85%</span>
                      </div>
                    </div>
                  </div>

                  {/* 5. Métrica Raio Térmico */}
                  <div className="p-3 rounded-xl bg-[#181818]/90 border border-orange-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                        <span className="text-xs font-bold text-orange-300">5. Raio Térmico (Queimaduras 3º Grau)</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-orange-400">
                        {calculateAreaKm2(selectedBomb.thermalRadiusM)}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-300 space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Raio / Diâmetro:</span>
                        <span className="text-neutral-100 font-bold">
                          {formatRadius(selectedBomb.thermalRadiusM)} / {formatDiameter(selectedBomb.thermalRadiusM)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Efeito Biológico:</span>
                        <span className="text-orange-400 font-bold">Necrose dérmica completa</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-400 leading-tight">
                      Queimaduras graves de 3º grau em toda a pele desprotegida, destruindo terminações nervosas. Ignição espontânea de madeira e combustíveis leves (tempestades de fogo).
                    </p>
                    <div className="p-2 rounded-lg bg-black/40 border border-white/10 space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between items-center text-rose-300 font-bold">
                        <span className="flex items-center gap-1">
                          <Skull className="w-3 h-3 text-rose-400" />
                          Mortes Nesta Zona:
                        </span>
                        <span>{formatCasualtyNumber(casualties.zoneEstimates.thermal.fatalities)} pessoas</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-400">
                        <span>População residente na faixa:</span>
                        <span className="text-neutral-200">{formatCasualtyNumber(casualties.zoneEstimates.thermal.populationExposed)} hab</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-400">
                        <span>Feridos graves com queimaduras 3º grau:</span>
                        <span className="text-amber-300">{formatCasualtyNumber(casualties.zoneEstimates.thermal.injuries)} feridos</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-400">
                        <span>Letalidade Física da Zona:</span>
                        <span className="text-rose-400 font-bold">50%</span>
                      </div>
                    </div>
                  </div>

                  {/* 6. Métrica Choque Leve */}
                  <div className="p-3 rounded-xl bg-[#181818]/90 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#737373]" />
                        <span className="text-xs font-bold text-neutral-200">6. Choque Leve (1 psi)</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-neutral-300">
                        {calculateAreaKm2(selectedBomb.lightBlastRadiusM)}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-300 space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Raio / Diâmetro:</span>
                        <span className="text-neutral-100 font-bold">
                          {formatRadius(selectedBomb.lightBlastRadiusM)} / {formatDiameter(selectedBomb.lightBlastRadiusM)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Efeito Mecânico:</span>
                        <span className="text-neutral-200 font-bold">1 psi (0.07 bar)</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-400 leading-tight">
                      Quebra massiva de janelas residenciais e portas de vidro a quilômetros de distância, produzindo projéteis perfurantes de alta velocidade que ferem civis em massa.
                    </p>
                    <div className="p-2 rounded-lg bg-black/40 border border-white/10 space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between items-center text-rose-300 font-bold">
                        <span className="flex items-center gap-1">
                          <Skull className="w-3 h-3 text-rose-400" />
                          Mortes Nesta Zona:
                        </span>
                        <span>{formatCasualtyNumber(casualties.zoneEstimates.light.fatalities)} pessoas</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-400">
                        <span>População residente na faixa:</span>
                        <span className="text-neutral-200">{formatCasualtyNumber(casualties.zoneEstimates.light.populationExposed)} hab</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-400">
                        <span>Feridos por estilhaços e vidros:</span>
                        <span className="text-amber-300">{formatCasualtyNumber(casualties.zoneEstimates.light.injuries)} feridos</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-400">
                        <span>Letalidade Física da Zona:</span>
                        <span className="text-neutral-300 font-bold">8%</span>
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
                <div className="p-3 rounded-xl bg-[#181818]/90 border border-amber-500/40 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Radiation className={`w-4 h-4 ${showFallout ? 'text-amber-400 animate-spin-slow' : 'text-neutral-500'}`} />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Precipitação Radioativa (Fallout)
                      </span>
                    </div>
                    <button
                      onClick={() => setShowFallout(!showFallout)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all border ${
                        showFallout
                          ? 'bg-amber-400 text-black border-amber-300 shadow-sm'
                          : 'bg-[#222222] text-neutral-400 border-white/10'
                      }`}
                    >
                      {showFallout ? 'ATIVO NO MAPA' : 'DESLIGADO'}
                    </button>
                  </div>

                  {/* Modo de Detonação */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-neutral-400 text-[11px]">Tipo de Detonação:</span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setBurstType('surface')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                          burstType === 'surface'
                            ? 'bg-amber-500 text-black shadow-sm'
                            : 'bg-[#222222] text-neutral-400 hover:text-white'
                        }`}
                        title="Detonação na superfície: a bola de fogo toca o solo, aspirando terra e rocha para formar poeira radioativa letal"
                      >
                        Superfície (Máx. Fallout)
                      </button>
                      <button
                        onClick={() => setBurstType('air')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                          burstType === 'air'
                            ? 'bg-blue-500 text-white shadow-sm'
                            : 'bg-[#222222] text-neutral-400 hover:text-white'
                        }`}
                        title="Detonação aérea: maximiza choque e reduz contato com o solo"
                      >
                        Aérea (Otimizada)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Controles Atmosféricos e de Vento */}
                {showFallout && (
                  <div className="p-3 rounded-xl bg-[#181818]/90 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-300 flex items-center gap-1.5">
                        <Wind className="w-3.5 h-3.5 text-amber-400" />
                        Condições Atmosféricas e Vento
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141414] text-amber-300 border border-white/10">
                        {windSpeedKmh} km/h • {windDirectionDeg}° ({getCompassPoint(windDirectionDeg)})
                      </span>
                    </div>

                    {/* Direção do Vento */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-neutral-300 flex items-center gap-1">
                          <Compass className="w-3 h-3 text-purple-400" />
                          Rumo do Vento (Pluma a Sotavento):
                        </span>
                        <span className="font-mono text-purple-300 font-bold">
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
                        className="w-full accent-purple-500 h-1.5 bg-[#222222] rounded-lg cursor-pointer"
                      />
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {WIND_COMPASS_PRESETS.map((p) => (
                          <button
                            key={p.label}
                            onClick={() => setWindDirectionDeg(p.deg)}
                            className={`px-1.5 py-0.5 text-[10px] rounded border transition-all ${
                              Math.abs(windDirectionDeg - p.deg) < 15
                                ? 'bg-purple-500/30 border-purple-400 text-purple-200 font-bold'
                                : 'bg-[#141414] border-white/10 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {p.label} {p.arrow}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Velocidade do Vento */}
                    <div className="space-y-1.5 pt-2 border-t border-white/10">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-neutral-300 flex items-center gap-1">
                          <Navigation className="w-3 h-3 text-amber-400" />
                          Velocidade do Vento:
                        </span>
                        <span className="font-mono text-amber-300 font-bold">
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
                        className="w-full accent-amber-500 h-1.5 bg-[#222222] rounded-lg cursor-pointer"
                      />
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {WIND_SPEED_PRESETS.map((s) => (
                          <button
                            key={s.speed}
                            onClick={() => setWindSpeedKmh(s.speed)}
                            className={`px-2 py-0.5 text-[10px] rounded border transition-all ${
                              windSpeedKmh === s.speed
                                ? 'bg-amber-500/30 border-amber-400 text-amber-200 font-bold'
                                : 'bg-[#141414] border-white/10 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Zonas de Dose Radiológica Acumulada */}
                    <div className="pt-2 border-t border-white/10 space-y-1.5">
                      <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider block">
                        Contornos de Radiação no Mapa:
                      </span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {FALLOUT_ZONES_CONFIG.map((zone) => {
                          const isVis = visibleFalloutZones[zone.id];
                          const distKm = getCalculatedFalloutLengthKm(
                            zone.id as 'rad1000' | 'rad300' | 'rad100' | 'rad10'
                          );
                          return (
                            <button
                              key={zone.id}
                              onClick={() => toggleFalloutZone(zone.id)}
                              className={`p-2 rounded-xl border text-left transition-all flex items-center justify-between ${
                                isVis
                                  ? 'bg-[#1A1A1A] border-white/20 text-white shadow-sm'
                                  : 'bg-[#141414] border-white/10 text-neutral-500 opacity-50'
                              }`}
                            >
                              <div className="truncate pr-1">
                                <div className="flex items-center space-x-1.5">
                                  <span
                                    className="w-2.5 h-2.5 rounded-full shrink-0"
                                    style={{ backgroundColor: zone.color }}
                                  />
                                  <span className="text-[11px] font-bold text-neutral-100 truncate">
                                    {zone.doseDisplay}
                                  </span>
                                </div>
                                <span className="text-[9px] text-neutral-400 font-mono block mt-0.5">
                                  Pluma: ~{distKm} km
                                </span>
                              </div>
                              {isVis ? (
                                <Eye className="w-3.5 h-3.5 text-neutral-300 shrink-0" />
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

                {/* Fallout Analytical Breakdown Card */}
                {selectedBomb.fallout && (
                  <div className="p-3 rounded-xl bg-[#181818]/90 border border-amber-500/30 space-y-2 font-mono text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-300 flex items-center gap-1.5 text-xs">
                        <Radiation className="w-3.5 h-3.5 text-amber-400" />
                        Comprimentos da Pluma
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        {windSpeedKmh} km/h • {windDirectionDeg}°
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px]">
                      <div className="bg-[#141414] p-1.5 rounded border border-white/10">
                        <span className="text-neutral-400 block">Dose Letal (1000 rad):</span>
                        <span className="text-purple-300 font-bold">~{getCalculatedFalloutLengthKm('rad1000')} km</span>
                      </div>
                      <div className="bg-[#141414] p-1.5 rounded border border-white/10">
                        <span className="text-neutral-400 block">Dose Severa (300 rad):</span>
                        <span className="text-rose-400 font-bold">~{getCalculatedFalloutLengthKm('rad300')} km</span>
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#1A1A1A] border border-white/10 text-[10px] text-neutral-300 font-sans leading-relaxed">
                      Decaimento pela <i>Regra 7/10 de Wigner</i>: a cada fator de 7 no tempo após a detonação (7h, 49h, 2 semanas), a dose radioativa cai por um fator de 10.
                    </div>
                  </div>
                )}
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
                      <span>💀 Mortes Totais com {selectedBomb.name}:</span>
                      <span className="text-white font-extrabold">{formatCasualtyNumber(casualties.totalDeaths)}</span>
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
                        className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-500 rounded-full transition-all duration-500"
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
                      <Skull className="w-3.5 h-3.5 text-rose-400" />
                      <span className="text-xs font-bold text-white uppercase tracking-wide">
                        Simulação de Mortes nas 12 Armas em ${selectedCity.name}
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
                          onClick={() => setSelectedBomb(b)}
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
                              <span>{formatCasualtyNumber(bCas.totalDeaths)} mortos</span>
                              <span className="text-neutral-500">•</span>
                              <span className="text-neutral-400 font-normal">{formatCasualtyNumber(bCas.totalInjuries)} feridos</span>
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
                      <span className="text-amber-400 font-bold">{(selectedBomb.fireballRadiusM / 180).toFixed(1)}×</span>
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

      {/* MODAL: INSERIR COORDENADAS MANUAIS DE QUALQUER LUGAR DO MUNDO */}
      {showCoordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#181818]/90 backdrop-blur-sm animate-in fade-in duration-200">
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
                  className="w-full bg-[#0D0D0D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
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
                    className="w-full bg-[#0D0D0D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 font-mono"
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
                    className="w-full bg-[#0D0D0D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 font-mono"
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
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/30 transition-all flex items-center space-x-1.5"
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
