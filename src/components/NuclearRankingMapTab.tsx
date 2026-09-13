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
  TargetCity
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
  const [activeTabMobile, setActiveTabMobile] = useState<'ranking' | 'map'>('ranking');
  const [visibleLayers, setVisibleLayers] = useState<Record<string, boolean>>({
    fireball: true,
    vaporization: true, // Nova camada de vaporização fora da bola de fogo
    heavy: true,
    thermal: true,
    light: true
  });
  const [dimensionMode, setDimensionMode] = useState<'radius' | 'diameter' | 'both'>('both'); // Opção de ver raio, diâmetro ou ambos
  const [mapTheme, setMapTheme] = useState<'dark' | 'osm'>('dark');

  // Map visibility, layout, and sizing states
  const [isMapMaximized, setIsMapMaximized] = useState<boolean>(false); // Expands map across 100% width (12 cols)
  const [mapHeightMode, setMapHeightMode] = useState<'standard' | 'large' | 'immersive'>('large'); // Default to large height for best map view
  const [isMetricsPanelOpen, setIsMetricsPanelOpen] = useState<boolean>(false); // Right metrics panel toggleable to maximize map width
  const [isBottomLegendCollapsed, setIsBottomLegendCollapsed] = useState<boolean>(false); // Minimizes bottom layer dock for clean map vision

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
      populationEstimate: 'Área Sob Análise Tática'
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
      populationEstimate: 'Coordenadas Customizadas'
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

      circle.bindTooltip(
        `<strong>${layer.name}</strong><br/>${metricLine}<br/>Área: ${calculateAreaKm2(layer.radius)}`,
        {
          direction: 'top',
          className: 'tactical-map-tooltip'
        }
      );

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
      <div style="font-family: sans-serif; font-size: 13px; color: #0f172a; line-height: 1.4;">
        <strong style="font-size: 14px; color: #b91c1c;">🎯 MARCO ZERO (GROUND ZERO)</strong><br/>
        <b>${selectedBomb.name}</b> (${selectedBomb.yieldDisplay})<br/>
        Alvo: <b>${selectedCity.name}</b> (${selectedCity.country})<br/>
        Coordenadas: ${selectedCity.lat.toFixed(4)}°, ${selectedCity.lng.toFixed(4)}°<br/>
        <span style="font-size: 11px; color: #64748b; font-style: italic;">(Dica: Arraste este marcador para reposicionar o alvo)</span>
      </div>
    `);
    group.addLayer(marker);

    // Auto-fit bounds with comfortable padding so the entire affected area (blast + fallout plume) is visible
    const maxBlastRadius = Math.max(
      selectedBomb.fireballRadiusM,
      selectedBomb.vaporizationRadiusM,
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
  }, [isMapMaximized, mapHeightMode, isMetricsPanelOpen, isBottomLegendCollapsed]);

  // Center on Ground Zero helper
  const handleRecenter = () => {
    isWorldViewRef.current = false;
    setIsWorldView(false);
    if (!mapInstanceRef.current) return;
    const maxRadius = Math.max(
      selectedBomb.fireballRadiusM,
      selectedBomb.vaporizationRadiusM,
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

  return (
    <div className="w-full bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden font-sans">
      {/* Header Banner - Tactical Command Style */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800 px-6 py-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-xs font-semibold text-rose-400">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Simulador Tático & Ranking Comparativo</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase font-display flex items-center gap-2.5">
              <span>Escala de Destruição Nuclear</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Ordene as armas atômicas mais célebres da história — da menor ogiva tática portátil à mais colossal
              superbomba de 50 Megatons — e projete os raios físicos de destruição imediata sobre capitais mundiais.
            </p>
          </div>

        </div>

        {/* CIDADES HISTÓRICAS & ESTRATÉGICAS EM DESTAQUE (Washington, Moscou, Hiroshima, Nagasaki, Pequim) */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400">
              <span className="p-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
              </span>
              <span className="uppercase tracking-wider">Cidades em Destaque Histórico & Estratégico</span>
            </div>
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              Alvos capitais e teatros de bombardeio atômico de 1945
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {TARGET_CITIES.map((city) => {
              const isSelected = selectedCity.id === city.id || selectedCity.name === city.name;
              return (
                <button
                  key={city.id}
                  onClick={() => handleSelectCity(city)}
                  className={`p-3 rounded-2xl text-left border transition-all relative overflow-hidden group ${
                    isSelected
                      ? 'bg-gradient-to-b from-rose-500/20 via-slate-900 to-amber-500/10 border-amber-400/90 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/50'
                      : 'bg-slate-900/90 border-slate-800/90 hover:border-slate-700 text-slate-300 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      <span className="text-[9px] font-mono font-bold text-amber-300 bg-amber-500/20 border border-amber-500/40 px-1 rounded">
                        ATIVO
                      </span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <span className="text-base sm:text-lg">
                      {city.id === 'washington'
                        ? '🏛️'
                        : city.id === 'moscow'
                        ? '🔴'
                        : city.id === 'hiroshima' || city.id === 'nagasaki'
                        ? '🕊️'
                        : '🐉'}
                    </span>
                    <div className="min-w-0 pr-6">
                      <span
                        className={`text-xs sm:text-sm font-extrabold block truncate ${
                          isSelected ? 'text-white' : 'text-slate-200'
                        }`}
                      >
                        {city.name}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {city.country}
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] text-amber-300/90 font-medium mt-2 line-clamp-1 border-t border-slate-800/80 pt-1.5">
                    {city.highlightTag || city.landmark}
                  </p>

                  <div className="mt-1 flex items-center justify-between text-[9px] font-mono text-slate-500">
                    <span className="truncate">{city.populationEstimate.split('(')[0]}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* BARRA DE PESQUISA GLOBAL DE QUALQUER CIDADE DO MUNDO + METRÓPOLES + COORDENADAS */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5 pt-2">
            {/* Input de Busca com Geocodificação OpenStreetMap Nominatim */}
            <div className="relative flex-1">
              <div className="flex items-center bg-slate-900/90 border border-slate-700/80 focus-within:border-rose-500 rounded-2xl px-3.5 py-2.5 text-xs transition-all shadow-inner">
                <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder="🔍 Buscar qualquer cidade no mundo (ex: São Paulo, Rio, Paris, Londres, Berlim, Tóquio, Seul, Roma...)"
                  className="bg-transparent text-white placeholder-slate-500 focus:outline-none w-full text-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchOpen(false);
                    }}
                    className="text-slate-400 hover:text-white p-1 ml-1"
                    title="Limpar busca"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                {isSearching && <Loader2 className="w-3.5 h-3.5 text-rose-400 animate-spin ml-1.5" />}
              </div>

              {/* Dropdown de Resultados de Busca Global */}
              {isSearchOpen && (searchResults.length > 0 || isSearching) && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-slate-900/98 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto p-1.5 space-y-1">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between border-b border-slate-800">
                    <span>Resultados da Busca Global ({searchResults.length})</span>
                    <span className="text-rose-400 font-mono text-[10px]">OpenStreetMap & Presets</span>
                  </div>
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleSelectCity(result)}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/90 transition-all flex items-start justify-between gap-3 group"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center space-x-1.5">
                          <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span className="text-xs font-bold text-white group-hover:text-rose-300 transition-colors">
                            {result.name}
                          </span>
                          {result.country && (
                            <span className="text-[11px] text-slate-400">({result.country})</span>
                          )}
                          {result.isHighlighted && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              DESTAQUE
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 truncate pl-5 mt-0.5">
                          {result.description}
                        </p>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 shrink-0 self-center">
                        {result.lat.toFixed(2)}°, {result.lng.toFixed(2)}°
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Menu Dropdown de Metrópoles Mundiais Populares */}
            <div className="relative shrink-0">
              <button
                onClick={() => setIsWorldDropdownOpen(!isWorldDropdownOpen)}
                className="w-full md:w-auto px-3.5 py-2.5 rounded-2xl bg-slate-900 border border-slate-700/80 hover:border-slate-600 text-xs font-medium text-slate-200 hover:text-white flex items-center justify-center space-x-2 transition-all shadow-sm"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Metrópoles Globais</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {isWorldDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-64 bg-slate-900/98 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto p-1.5 space-y-1">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800">
                    Grandes Cidades Mundiais
                  </div>
                  {WORLD_PRESET_CITIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelectCity(c)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${
                        selectedCity.name === c.name
                          ? 'bg-rose-500/20 text-rose-300 font-bold'
                          : 'text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-1.5 truncate">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{c.name}</span>
                        {c.isHighlighted && <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400 shrink-0" />}
                      </div>
                      <span className="text-[10px] text-slate-500 shrink-0 ml-2">{c.country}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Botão de Inserção Manual de Coordenadas */}
            <button
              onClick={() => setShowCoordModal(true)}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-900 border border-slate-700/80 hover:border-slate-600 text-xs font-medium text-slate-200 hover:text-white flex items-center justify-center space-x-1.5 transition-all shrink-0 shadow-sm"
              title="Digitar Latitude e Longitude exatas"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Coordenadas Manuais</span>
            </button>
          </div>

          {/* Dica Interativa de Uso do Mapa */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <Crosshair className="w-3 h-3 text-rose-400 animate-spin-slow" />
              <span>
                <strong>Simulação Global Irrestrita:</strong> Clique em qualquer lugar do mapa ou arraste o marcador 🎯 para detonar em qualquer ponto do planeta.
              </span>
            </span>
            <span className="text-slate-500 font-mono text-[10px]">
              Alvo selecionado: <strong className="text-rose-300">{selectedCity.name}</strong> ({selectedCity.country})
            </span>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex lg:hidden mt-6 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTabMobile('ranking')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-2 ${
              activeTabMobile === 'ranking'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>1. Ranking das Bombas ({NUCLEAR_RANKING_BOMBS.length})</span>
          </button>
          <button
            onClick={() => setActiveTabMobile('map')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-2 ${
              activeTabMobile === 'map'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>2. Simulador no Mapa</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Column Ranking, Right Column Map Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[750px]">
        {/* LEFT COLUMN: Interactive Ranking List (from weakest to strongest) */}
        <div
          className={`${
            isMapMaximized ? 'hidden' : 'lg:col-span-3 xl:col-span-3'
          } border-r border-slate-800/80 bg-slate-900/40 p-4 sm:p-5 space-y-4 overflow-y-auto max-h-[880px] ${
            activeTabMobile === 'ranking' ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                Ordem Crescente de Potência (Yield)
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Da menor à maior arma atômica operacional já construída
              </p>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {NUCLEAR_RANKING_BOMBS.length} Marcos Históricos
            </span>
          </div>

          <div className="space-y-2.5">
            {NUCLEAR_RANKING_BOMBS.map((bomb, index) => {
              const isSelected = selectedBomb.id === bomb.id;
              return (
                <div
                  key={bomb.id}
                  onClick={() => {
                    setSelectedBomb(bomb);
                    if (window.innerWidth < 1024) {
                      setActiveTabMobile('map');
                    }
                  }}
                  className={`group relative p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-850/90 border-rose-500/80 shadow-lg shadow-rose-950/30 ring-1 ring-rose-500/40'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850/60'
                  }`}
                >
                  {/* Position number pill */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2.5">
                      <span
                        className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center font-mono ${
                          isSelected ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors flex items-center gap-2">
                          {bomb.name}
                          <span className="text-[10px] font-mono font-normal px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                            {bomb.year}
                          </span>
                        </h3>
                        <p className="text-[11px] text-slate-400 font-mono">{bomb.code}</p>
                      </div>
                    </div>

                    {/* Yield Highlight Badge */}
                    <div className="text-right shrink-0">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-lg text-xs font-black font-mono tracking-tight border ${bomb.badgeColor}`}
                      >
                        {bomb.yieldDisplay}
                      </span>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                        {getHiroshimaMultiplier(bomb.yieldKt)}
                      </p>
                    </div>
                  </div>

                  {/* Relative yield visual bar */}
                  <div className="mt-3 w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                          : 'bg-slate-600 group-hover:bg-slate-500'
                      }`}
                      style={{
                        width: `${Math.max(
                          4,
                          Math.min(100, (Math.log10(bomb.yieldKt + 1) / Math.log10(50001)) * 100)
                        )}%`
                      }}
                    />
                  </div>

                  {/* Short technical snippet */}
                  <div className="mt-2.5 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate pr-2">{bomb.type}</span>
                    <span className="font-semibold text-rose-400 shrink-0 font-mono">
                      Raio máx: {formatRadius(Math.max(bomb.thermalRadiusM, bomb.lightBlastRadiusM))}
                    </span>
                  </div>

                  {/* Expanded detail if selected */}
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300 space-y-2 bg-slate-900/60 -mx-4 -mb-4 p-4 rounded-b-2xl">
                      <p className="text-slate-300 leading-relaxed text-[11px]">{bomb.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 pt-1 font-mono">
                        <div>
                          <span className="text-slate-500 block">VETOR DE TRANSPORTE:</span>
                          <span className="text-slate-300 font-sans">{bomb.carrier}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">POTÊNCIA EQUIVALENTE:</span>
                          <span className="text-slate-300 font-sans">
                            {bomb.yieldKt >= 1000
                              ? `${(bomb.yieldKt / 1000).toLocaleString()} Milhões de Toneladas TNT`
                              : `${(bomb.yieldKt * 1000).toLocaleString()} Toneladas de TNT`}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Leaflet Map & Right Physical Metrics Panel */}
        <div
          className={`${
            isMapMaximized ? 'lg:col-span-12' : 'lg:col-span-9 xl:col-span-9'
          } flex flex-col bg-slate-950 transition-all duration-300 ${
            activeTabMobile === 'map' ? 'block' : 'hidden lg:flex'
          }`}
        >
          {/* Map Top Bar: City Target Badge, Recenter, Map Style, Size Controls & Maximize */}
          <div className="bg-slate-900/95 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-2.5 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-1.5 font-bold text-white">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>
                  {selectedCity.name} ({selectedCity.country})
                </span>
              </div>
              <span className="hidden sm:inline-block text-slate-400 font-mono text-[11px]">
                [{selectedCity.lat >= 0 ? selectedCity.lat.toFixed(4) + '°N' : Math.abs(selectedCity.lat).toFixed(4) + '°S'},{' '}
                {selectedCity.lng >= 0 ? selectedCity.lng.toFixed(4) + '°E' : Math.abs(selectedCity.lng).toFixed(4) + '°W'}]
              </span>

              {/* Destaque Histórico ou Estratégico Badge */}
              {selectedCity.isHighlighted && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/50 flex items-center gap-1 shadow-sm animate-pulse">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>Destaque: {selectedCity.highlightTag || 'Histórico'}</span>
                </span>
              )}

              {isReverseGeocoding && (
                <span className="text-[10px] text-amber-400 flex items-center gap-1 font-mono">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Geocodificando local...
                </span>
              )}

              {/* In maximized mode, show a quick weapon dropdown right here */}
              {isMapMaximized && (
                <div className="flex items-center space-x-1.5 bg-slate-800/90 px-2.5 py-1 rounded-xl border border-slate-700">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] text-slate-400">Arma:</span>
                  <select
                    value={selectedBomb.id}
                    onChange={(e) => {
                      const found = NUCLEAR_RANKING_BOMBS.find((b) => b.id === e.target.value);
                      if (found) setSelectedBomb(found);
                    }}
                    className="bg-slate-900 text-white font-bold text-xs rounded-lg border border-slate-700 px-2 py-0.5 focus:outline-none focus:border-rose-500 cursor-pointer"
                  >
                    {NUCLEAR_RANKING_BOMBS.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.yieldDisplay})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Map Height Size Toggle (Aumentar Mapa) */}
              <div className="flex items-center space-x-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700 text-[11px]">
                <span className="text-slate-400 px-1 font-medium hidden md:inline">Altura:</span>
                <button
                  onClick={() => setMapHeightMode('standard')}
                  className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                    mapHeightMode === 'standard' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Altura padrão (640px)"
                >
                  Médio
                </button>
                <button
                  onClick={() => setMapHeightMode('large')}
                  className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                    mapHeightMode === 'large' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Altura grande (840px) - Ampla Visão"
                >
                  Grande
                </button>
                <button
                  onClick={() => setMapHeightMode('immersive')}
                  className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                    mapHeightMode === 'immersive' ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Visão Imersiva (85vh da tela)"
                >
                  Imersivo
                </button>
              </div>

              {/* Maximize Map Width (100% Width) */}
              <button
                onClick={() => setIsMapMaximized(!isMapMaximized)}
                className={`px-2.5 py-1 rounded-xl border text-[11px] font-bold transition-all flex items-center space-x-1.5 ${
                  isMapMaximized
                    ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-950/40 ring-1 ring-rose-400'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-750 border-slate-700'
                }`}
                title={isMapMaximized ? 'Restaurar layout padrão com lista' : 'Maximizar mapa para largura total (100%)'}
              >
                {isMapMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span>{isMapMaximized ? 'Restaurar' : 'Maximizar Mapa'}</span>
              </button>

              {/* Physical Metrics Toggle (Dimensões & Física) */}
              <button
                onClick={() => setIsMetricsPanelOpen(!isMetricsPanelOpen)}
                className={`px-2.5 py-1 rounded-xl border text-[11px] font-bold transition-all flex items-center space-x-1.5 ${
                  isMetricsPanelOpen
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-750 border-slate-700'
                }`}
                title="Exibir ou ocultar coluna de métricas físicas (vaporização e nuvem de cogumelo)"
              >
                <Ruler className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Métricas Físicas</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-black ${
                    isMetricsPanelOpen ? 'bg-amber-400 text-slate-950' : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {isMetricsPanelOpen ? 'ON' : 'OFF'}
                </span>
              </button>

              {/* Quick Dimension Mode Selector */}
              <div className="hidden sm:flex items-center space-x-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700 text-[11px]">
                <button
                  onClick={() => setDimensionMode('radius')}
                  className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                    dimensionMode === 'radius' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Exibir em Raio (R)"
                >
                  R
                </button>
                <button
                  onClick={() => setDimensionMode('diameter')}
                  className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                    dimensionMode === 'diameter' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Exibir em Diâmetro (Ø)"
                >
                  Ø
                </button>
                <button
                  onClick={() => setDimensionMode('both')}
                  className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                    dimensionMode === 'both' ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Exibir Raio e Diâmetro simultaneamente"
                >
                  R & Ø
                </button>
              </div>

              {/* Map Theme Toggle */}
              <button
                onClick={() => setMapTheme(mapTheme === 'dark' ? 'osm' : 'dark')}
                className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 text-[11px] transition-all"
                title="Alternar estilo do mapa"
              >
                {mapTheme === 'dark' ? 'Tático' : 'Rua'}
              </button>

              {/* World Map View Button */}
              <button
                onClick={handleViewWorldMap}
                className={`px-2.5 py-1 rounded-xl border text-[11px] font-bold transition-all flex items-center space-x-1.5 ${
                  isWorldView
                    ? 'bg-rose-500 text-white border-rose-400 shadow-md ring-1 ring-rose-400'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-750 border-slate-700'
                }`}
                title="Ver todo o Mapa Mundi (Planisfério Global 100%)"
              >
                <Globe className={`w-3.5 h-3.5 ${isWorldView ? 'text-white animate-spin-slow' : 'text-emerald-400'}`} />
                <span>Mapa Mundi</span>
              </button>

              {/* Recenter / Focus Button */}
              <button
                onClick={handleRecenter}
                className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 text-[11px] transition-all flex items-center space-x-1.5"
                title="Focar no Marco Zero (Alvo da Detonação)"
              >
                <Crosshair className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">Focar Alvo</span>
              </button>
            </div>
          </div>

          {/* Main Workspace: Left = Expanded Leaflet Map Canvas, Right = Collapsible Physical Metrics Panel */}
          <div
            className={`flex flex-col xl:flex-row flex-1 relative transition-all duration-300 ${
              mapHeightMode === 'immersive'
                ? 'min-h-[85vh] h-[85vh]'
                : mapHeightMode === 'large'
                ? 'min-h-[780px] lg:min-h-[840px] xl:min-h-[880px]'
                : 'min-h-[640px] lg:min-h-[680px]'
            }`}
          >
            {/* Leaflet Map Canvas */}
            <div className="relative flex-1 w-full h-full min-h-[580px] bg-slate-950">
              <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

              {/* Tactical Grid Overlay effect */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,6,23,0.6)_100%)] z-10" />

              {/* Float Info Card over Map: Current Weapon stats */}
              <div className="absolute top-3 left-3 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3 shadow-xl max-w-xs text-xs space-y-1.5 pointer-events-auto">
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5">
                  <span className="font-extrabold text-white flex items-center gap-1.5 text-xs">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    {selectedBomb.name}
                  </span>
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    {selectedBomb.yieldDisplay}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">
                      {dimensionMode === 'radius' ? 'Raio Máximo:' : 'Diâmetro Total:'}
                    </span>
                    <span className="text-amber-400 font-bold">{calculateTotalDiameter()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Alvo:</span>
                    <span className="text-slate-200 font-bold truncate ml-1">{selectedCity.name}</span>
                  </div>
                  {selectedCity.country && (
                    <div className="flex justify-between items-center text-[10px] text-slate-400">
                      <span>País / Região:</span>
                      <span className="text-slate-300 truncate ml-1">{selectedCity.country}</span>
                    </div>
                  )}
                  {selectedCity.isHighlighted && (
                    <div className="pt-1 border-t border-slate-800/80 flex items-center gap-1 text-[10px] text-amber-300 font-sans font-semibold">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                      <span className="truncate">{selectedCity.highlightTag}</span>
                    </div>
                  )}
                </div>
                <div className="pt-1 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between font-sans">
                  <span className="flex items-center gap-1 text-rose-300">
                    <Target className="w-3 h-3 text-rose-400" />
                    Arraste o alvo ou clique no mapa
                  </span>
                </div>
              </div>

              {/* Tactical Zoom & Global View Floating Controls */}
              <div className="absolute top-3 right-3 z-20 flex flex-col items-end space-y-2 pointer-events-auto">
                {/* Tactical Zoom Pod */}
                <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-1.5 shadow-2xl flex flex-col items-center space-y-1.5">
                  {/* Zoom In Button */}
                  <button
                    onClick={handleZoomIn}
                    className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-rose-500 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow"
                    title="Ampliar visão (+ Zoom)"
                    aria-label="Ampliar visão"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>

                  {/* Zoom Out Button */}
                  <button
                    onClick={handleZoomOut}
                    className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-rose-500 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow"
                    title="Diminuir visão (- Zoom)"
                    aria-label="Diminuir visão"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>

                  <div className="w-5 h-px bg-slate-700/80 my-0.5" />

                  {/* World Map Planisphere Button */}
                  <button
                    onClick={handleViewWorldMap}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow ${
                      isWorldView
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-950/50 ring-2 ring-rose-400'
                        : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                    title="Ver todo o Mapa Mundi (Planisfério Global 100%)"
                    aria-label="Ver todo o Mapa Mundi"
                  >
                    <Globe className={`w-4 h-4 ${isWorldView ? 'text-white animate-spin-slow' : 'text-emerald-400'}`} />
                  </button>

                  {/* Focus Target Button */}
                  <button
                    onClick={handleRecenter}
                    className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow"
                    title="Focar no Alvo (Marco Zero da Detonação)"
                    aria-label="Focar no Alvo"
                  >
                    <Crosshair className="w-4 h-4 text-rose-400" />
                  </button>
                </div>

                {/* Tactical Zoom Level Badge */}
                <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl px-2.5 py-1 shadow-lg text-[10px] font-mono text-slate-400 flex items-center space-x-1.5">
                  <span className="text-slate-500 uppercase tracking-wider">Visão:</span>
                  <span className="text-amber-400 font-bold">
                    {isWorldView ? 'Global (Mundo)' : `${Math.round(currentZoom)}x`}
                  </span>
                </div>
              </div>

              {/* Global World Map Active Banner */}
              {isWorldView && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-auto max-w-md w-auto px-4 py-2 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-emerald-500/40 text-emerald-300 shadow-2xl flex items-center space-x-2 text-xs">
                  <Globe className="w-4 h-4 text-emerald-400 shrink-0 animate-spin-slow" />
                  <div className="flex-1 leading-tight">
                    <span className="font-bold text-white">Planisfério Global Ativo</span>
                    <span className="text-slate-400 hidden sm:inline"> — Vendo a Terra inteira. Clique em qualquer ponto do globo ou use [+] para aproximar.</span>
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

              {/* Map Legend & Layer Toggles (Bottom floating overlay) */}
              {isBottomLegendCollapsed ? (
                /* Compact minimized floating pill when user wants maximum clear map view */
                <div className="absolute bottom-3 left-3 right-3 z-20 flex justify-center pointer-events-auto">
                  <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-full px-4 py-2 shadow-2xl flex items-center space-x-3 text-xs">
                    <span className="flex items-center gap-1.5 font-bold text-slate-300">
                      <Layers className="w-3.5 h-3.5 text-rose-400" />
                      <span>Camadas Ativas</span>
                    </span>
                    <div className="flex items-center space-x-1.5 border-l border-slate-700 pl-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" title="Bola de Fogo" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" title="Vaporização" />
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" title="Choque Pesado" />
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500" title="Raio Térmico" />
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-400" title="Choque Leve" />
                    </div>
                    {showFallout && (
                      <span className="text-[10px] font-mono font-bold text-amber-400 flex items-center gap-1 border-l border-slate-700 pl-3">
                        <Radiation className="w-3 h-3 animate-spin-slow" />
                        Fallout Ativo ({windSpeedKmh} km/h)
                      </span>
                    )}
                    <button
                      onClick={() => setIsBottomLegendCollapsed(false)}
                      className="ml-2 px-3 py-1 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-[11px] flex items-center gap-1 transition-all shadow"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                      <span>Expandir Controles</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="absolute bottom-3 left-3 right-3 z-20 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-2xl pointer-events-auto space-y-3">
                  {/* Header with Prompt Blast and Fallout Toggles */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-rose-400" />
                        Camadas de Impacto Físico
                      </span>
                    </div>

                    {/* Primary Radioactive Fallout Toggle Button & Minimize Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowFallout(!showFallout)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 border shadow-sm ${
                          showFallout
                            ? 'bg-gradient-to-r from-amber-500/20 to-purple-500/20 border-amber-500/50 text-amber-300 shadow-amber-500/10'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                        }`}
                        title="Alternar camada de precipitação radioativa (fallout)"
                      >
                        <Radiation className={`w-3.5 h-3.5 ${showFallout ? 'text-amber-400 animate-spin-slow' : 'text-slate-500'}`} />
                        <span>Precipitação Radioativa (Fallout)</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-black ${
                            showFallout ? 'bg-amber-400 text-slate-950' : 'bg-slate-700 text-slate-400'
                          }`}
                        >
                          {showFallout ? 'ATIVO' : 'DESLIGADO'}
                        </span>
                      </button>

                      {showFallout && (
                        <button
                          onClick={() => setFalloutPanelOpen(!falloutPanelOpen)}
                          className="p-1.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700 text-xs flex items-center"
                          title={falloutPanelOpen ? 'Recolher controles de vento' : 'Expandir controles de vento'}
                        >
                          {falloutPanelOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      )}

                      {/* Clean Map Vision button: collapse bottom overlay */}
                      <button
                        onClick={() => setIsBottomLegendCollapsed(true)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center space-x-1 transition-all"
                        title="Recolher painel para ter visão 100% limpa do mapa"
                      >
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        <span className="hidden sm:inline">Visão Limpa</span>
                      </button>
                    </div>
                  </div>

                  {/* Fallout Tactical Wind & Simulation Controls (When active) */}
                {showFallout && falloutPanelOpen && (
                  <div className="bg-slate-950/80 border border-amber-500/20 rounded-xl p-3 space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center space-x-2 text-amber-300 font-bold">
                        <Wind className="w-3.5 h-3.5 text-purple-400" />
                        <span>Condições Atmosféricas e Vetor de Dispersão</span>
                      </div>

                      {/* Detonation Altitude Mode: Surface vs Air Burst */}
                      <div className="flex items-center space-x-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-400 px-1 font-medium">Detonação:</span>
                        <button
                          onClick={() => setBurstType('surface')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                            burstType === 'surface'
                              ? 'bg-amber-500 text-slate-950'
                              : 'text-slate-400 hover:text-white'
                          }`}
                          title="Detonação de superfície: a bola de fogo toca o solo, gerando máxima precipitação de poeira radioativa pesada"
                        >
                          Superfície (Máx. Fallout)
                        </button>
                        <button
                          onClick={() => setBurstType('air')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                            burstType === 'air'
                              ? 'bg-blue-500 text-white'
                              : 'text-slate-400 hover:text-white'
                          }`}
                          title="Detonação aérea: maximiza raio de choque; partículas radioativas sobem para a estratosfera com menor contaminação local imediata"
                        >
                          Aérea (Otimizada)
                        </button>
                      </div>
                    </div>

                    {/* Wind Direction Controls: Presets + Range */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 border-t border-slate-800/60 text-xs">
                      {/* Wind Direction */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 flex items-center gap-1">
                            <Compass className="w-3 h-3 text-purple-400" />
                            Rumo do Vento (Pluma a Sotavento):
                          </span>
                          <span className="font-mono text-purple-300 font-bold">
                            {windDirectionDeg}°
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="0"
                            max="359"
                            step="5"
                            value={windDirectionDeg}
                            onChange={(e) => setWindDirectionDeg(Number(e.target.value))}
                            className="w-full accent-purple-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                          />
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {WIND_COMPASS_PRESETS.map((p) => (
                            <button
                              key={p.label}
                              onClick={() => setWindDirectionDeg(p.deg)}
                              className={`px-1.5 py-0.5 text-[10px] rounded border transition-all ${
                                Math.abs(windDirectionDeg - p.deg) < 15
                                  ? 'bg-purple-500/30 border-purple-400 text-purple-200 font-bold'
                                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              {p.label} {p.arrow}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Wind Speed */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 flex items-center gap-1">
                            <Navigation className="w-3 h-3 text-amber-400" />
                            Velocidade do Vento:
                          </span>
                          <span className="font-mono text-amber-300 font-bold">
                            {windSpeedKmh} km/h
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="10"
                            max="60"
                            step="5"
                            value={windSpeedKmh}
                            onChange={(e) => setWindSpeedKmh(Number(e.target.value))}
                            className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                          />
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {WIND_SPEED_PRESETS.map((s) => (
                            <button
                              key={s.speed}
                              onClick={() => setWindSpeedKmh(s.speed)}
                              className={`px-2 py-0.5 text-[10px] rounded border transition-all ${
                                windSpeedKmh === s.speed
                                  ? 'bg-amber-500/30 border-amber-400 text-amber-200 font-bold'
                                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Fallout Dose Contour Toggles */}
                    <div className="pt-2 border-t border-slate-800/60">
                      <div className="text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                        Zonas de Dose Radiológica Acumulada (Contornos de Radiação):
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                        {FALLOUT_ZONES_CONFIG.map((zone) => {
                          const isVis = visibleFalloutZones[zone.id];
                          const distKm = getCalculatedFalloutLengthKm(
                            zone.id as 'rad1000' | 'rad300' | 'rad100' | 'rad10'
                          );
                          return (
                            <button
                              key={zone.id}
                              onClick={() => toggleFalloutZone(zone.id)}
                              className={`p-1.5 rounded-lg border text-left transition-all flex items-center justify-between ${
                                isVis
                                  ? 'bg-slate-900/90 border-slate-700'
                                  : 'bg-slate-950/40 border-slate-800/60 opacity-50'
                              }`}
                            >
                              <div className="truncate pr-1">
                                <div className="flex items-center space-x-1.5">
                                  <span
                                    className="w-2.5 h-2.5 rounded-full shrink-0"
                                    style={{ backgroundColor: zone.color }}
                                  />
                                  <span className="text-[11px] font-bold text-slate-200 truncate">
                                    {zone.doseDisplay}
                                  </span>
                                </div>
                                <span className="text-[9px] text-slate-400 font-mono block">
                                  Pluma: ~{distKm} km
                                </span>
                              </div>
                              {isVis ? (
                                <Eye className="w-3 h-3 text-slate-400 shrink-0" />
                              ) : (
                                <EyeOff className="w-3 h-3 text-slate-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* 5 Prompt Blast Interactive Layer Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2">
                  {/* 1. Fireball */}
                  <button
                    onClick={() => toggleLayer('fireball')}
                    className={`flex items-center justify-between p-2 rounded-xl border text-left transition-all ${
                      visibleLayers.fireball
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                        : 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0 shadow-sm" />
                      <div>
                        <span className="text-xs font-bold block leading-tight">Bola de Fogo</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {dimensionMode === 'radius'
                            ? `R: ${formatRadius(selectedBomb.fireballRadiusM)}`
                            : dimensionMode === 'diameter'
                            ? `Ø: ${formatDiameter(selectedBomb.fireballRadiusM)}`
                            : `R: ${formatRadius(selectedBomb.fireballRadiusM)} • Ø: ${formatDiameter(selectedBomb.fireballRadiusM)}`}
                        </span>
                      </div>
                    </div>
                    {visibleLayers.fireball ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>

                  {/* 2. Vaporization */}
                  <button
                    onClick={() => toggleLayer('vaporization')}
                    className={`flex items-center justify-between p-2 rounded-xl border text-left transition-all ${
                      visibleLayers.vaporization
                        ? 'bg-orange-500/10 border-orange-500/40 text-orange-300'
                        : 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-orange-400 shrink-0 shadow-sm" />
                      <div>
                        <span className="text-xs font-bold block leading-tight">Vaporização</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {dimensionMode === 'radius'
                            ? `R: ${formatRadius(selectedBomb.vaporizationRadiusM)}`
                            : dimensionMode === 'diameter'
                            ? `Ø: ${formatDiameter(selectedBomb.vaporizationRadiusM)}`
                            : `R: ${formatRadius(selectedBomb.vaporizationRadiusM)} • Ø: ${formatDiameter(selectedBomb.vaporizationRadiusM)}`}
                        </span>
                      </div>
                    </div>
                    {visibleLayers.vaporization ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>

                  {/* 3. Heavy Blast */}
                  <button
                    onClick={() => toggleLayer('heavy')}
                    className={`flex items-center justify-between p-2 rounded-xl border text-left transition-all ${
                      visibleLayers.heavy
                        ? 'bg-red-500/10 border-red-500/40 text-red-300'
                        : 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-red-500 shrink-0 shadow-sm" />
                      <div>
                        <span className="text-xs font-bold block leading-tight">Choque Pesado</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {dimensionMode === 'radius'
                            ? `R: ${formatRadius(selectedBomb.heavyBlastRadiusM)}`
                            : dimensionMode === 'diameter'
                            ? `Ø: ${formatDiameter(selectedBomb.heavyBlastRadiusM)}`
                            : `R: ${formatRadius(selectedBomb.heavyBlastRadiusM)} • Ø: ${formatDiameter(selectedBomb.heavyBlastRadiusM)}`}
                        </span>
                      </div>
                    </div>
                    {visibleLayers.heavy ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>

                  {/* 4. Thermal Radiation */}
                  <button
                    onClick={() => toggleLayer('thermal')}
                    className={`flex items-center justify-between p-2 rounded-xl border text-left transition-all ${
                      visibleLayers.thermal
                        ? 'bg-orange-500/10 border-orange-500/40 text-orange-300'
                        : 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-orange-500 shrink-0 shadow-sm" />
                      <div>
                        <span className="text-xs font-bold block leading-tight">Raio Térmico</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {dimensionMode === 'radius'
                            ? `R: ${formatRadius(selectedBomb.thermalRadiusM)}`
                            : dimensionMode === 'diameter'
                            ? `Ø: ${formatDiameter(selectedBomb.thermalRadiusM)}`
                            : `R: ${formatRadius(selectedBomb.thermalRadiusM)} • Ø: ${formatDiameter(selectedBomb.thermalRadiusM)}`}
                        </span>
                      </div>
                    </div>
                    {visibleLayers.thermal ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>

                  {/* 5. Light Blast */}
                  <button
                    onClick={() => toggleLayer('light')}
                    className={`flex items-center justify-between p-2 rounded-xl border text-left transition-all ${
                      visibleLayers.light
                        ? 'bg-slate-400/10 border-slate-500/40 text-slate-300'
                        : 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-slate-400 shrink-0 shadow-sm" />
                      <div>
                        <span className="text-xs font-bold block leading-tight">Choque Leve</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {dimensionMode === 'radius'
                            ? `R: ${formatRadius(selectedBomb.lightBlastRadiusM)}`
                            : dimensionMode === 'diameter'
                            ? `Ø: ${formatDiameter(selectedBomb.lightBlastRadiusM)}`
                            : `R: ${formatRadius(selectedBomb.lightBlastRadiusM)} • Ø: ${formatDiameter(selectedBomb.lightBlastRadiusM)}`}
                        </span>
                      </div>
                    </div>
                    {visibleLayers.light ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              )}
            </div>

            {/* LATERAL DIREITA DO MAPA: MÉTRICAS FÍSICAS, RAIO/DIÂMETRO, VAPORIZAÇÃO & COGUMELO (COLAPSÁVEL PARA MAXIMIZAR MAPA) */}
            {isMetricsPanelOpen && (
              <div className="w-full xl:w-88 2xl:w-96 shrink-0 bg-slate-900/95 border-t xl:border-t-0 xl:border-l border-slate-800 p-4 sm:p-5 flex flex-col space-y-4 max-h-[880px] overflow-y-auto animate-in fade-in slide-in-from-right-4 duration-300">
              {/* Header do Painel Lateral */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400">
                    <Ruler className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Dimensões & Física
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      Métricas calculadas para {selectedBomb.name}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-rose-300 border border-slate-700 font-bold">
                  {selectedBomb.yieldDisplay}
                </span>
              </div>

              {/* Cartão de Contexto Urbano do Alvo Selecionado */}
              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 space-y-2">
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

                <div className="text-[11px] text-slate-300 space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>País / Região:</span>
                    <span className="text-slate-200">{selectedCity.country}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Coordenadas:</span>
                    <span className="text-rose-300">
                      {selectedCity.lat.toFixed(4)}°, {selectedCity.lng.toFixed(4)}°
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>População Estimada:</span>
                    <span className="text-slate-200">{selectedCity.populationEstimate}</span>
                  </div>
                </div>

                {selectedCity.highlightTag && (
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300 space-y-0.5">
                    <div className="font-bold flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3 text-amber-400" />
                      <span>Contexto Estratégico:</span>
                    </div>
                    <p className="text-slate-300 leading-tight">{selectedCity.highlightTag}</p>
                    {selectedCity.landmark && (
                      <p className="text-[9px] text-slate-400 pt-0.5">Marco Zero: {selectedCity.landmark}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Seletor de Modo de Medição: Raio vs Diâmetro vs Ambos */}
              <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-300 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>Modo de Medição:</span>
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    {dimensionMode === 'both' ? 'Raio & Diâmetro' : dimensionMode === 'radius' ? 'Apenas Raio (R)' : 'Apenas Diâmetro (Ø)'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setDimensionMode('radius')}
                    className={`py-1.5 text-[11px] font-bold rounded transition-all flex items-center justify-center ${
                      dimensionMode === 'radius'
                        ? 'bg-rose-500 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Exibir apenas Raio (do centro à borda)"
                  >
                    Raio (R)
                  </button>
                  <button
                    onClick={() => setDimensionMode('diameter')}
                    className={`py-1.5 text-[11px] font-bold rounded transition-all flex items-center justify-center ${
                      dimensionMode === 'diameter'
                        ? 'bg-rose-500 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Exibir apenas Diâmetro (extensão total de ponta a ponta)"
                  >
                    Diâmetro (Ø)
                  </button>
                  <button
                    onClick={() => setDimensionMode('both')}
                    className={`py-1.5 text-[11px] font-bold rounded transition-all flex items-center justify-center ${
                      dimensionMode === 'both'
                        ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Exibir simultaneamente Raio (R) e Diâmetro (Ø)"
                  >
                    Ambos (R & Ø)
                  </button>
                </div>
              </div>

              {/* CARD 1: Bola de Fogo Nuclear (Fireball) */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-2.5 hover:border-amber-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0 shadow-sm shadow-amber-400/50" />
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      Bola de Fogo (Fireball)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                    T &gt; 100M °C
                  </span>
                </div>

                {/* Métricas de Raio e Diâmetro */}
                <div className={`grid ${dimensionMode === 'both' ? 'grid-cols-2' : 'grid-cols-1'} gap-2 pt-1 border-t border-slate-800/60 font-mono`}>
                  {(dimensionMode === 'radius' || dimensionMode === 'both') && (
                    <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Raio (R)</span>
                      <span className="text-sm font-black text-amber-300">
                        {formatRadius(selectedBomb.fireballRadiusM)}
                      </span>
                    </div>
                  )}
                  {(dimensionMode === 'diameter' || dimensionMode === 'both') && (
                    <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Diâmetro (Ø)</span>
                      <span className="text-sm font-black text-amber-300">
                        {formatDiameter(selectedBomb.fireballRadiusM)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-slate-300 space-y-1 font-mono pt-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Área Circular:</span>
                    <span className="text-slate-200 font-bold">{calculateAreaKm2(selectedBomb.fireballRadiusM)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Volume Esférico:</span>
                    <span className="text-slate-200 font-bold">{calculateVolumeKm3(selectedBomb.fireballRadiusM)}</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 leading-relaxed pt-1 border-t border-slate-800/40">
                  Esfera de plasma incandescente onde raios X superaquecem o ar circundante. Qualquer estrutura sólida dentro deste raio é imediatamente volatilizada em plasma.
                </p>
              </div>

              {/* CARD 2: Raio de Vaporização Total Fora da Bola de Fogo */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-orange-500/40 space-y-2.5 hover:border-orange-500/60 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-orange-400 shrink-0 shadow-sm shadow-orange-400/50" />
                    <span className="text-xs font-bold text-orange-300 uppercase tracking-wide flex items-center gap-1.5">
                      <Skull className="w-3.5 h-3.5 text-orange-400" />
                      Raio de Vaporização Total
                    </span>
                  </div>
                  <button
                    onClick={() => toggleLayer('vaporization')}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-all flex items-center gap-1 ${
                      visibleLayers.vaporization
                        ? 'bg-orange-500/20 text-orange-300 border-orange-500/30 font-bold'
                        : 'bg-slate-800 text-slate-500 border-slate-700'
                    }`}
                    title="Alternar visibilidade do círculo no mapa"
                  >
                    {visibleLayers.vaporization ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{visibleLayers.vaporization ? 'No Mapa' : 'Oculto'}</span>
                  </button>
                </div>

                <div className="text-[10px] text-orange-400/90 font-medium">
                  Além da bola de fogo: <b>+{formatRadius(selectedBomb.vaporizationRadiusM - selectedBomb.fireballRadiusM)}</b> (+{Math.round(((selectedBomb.vaporizationRadiusM - selectedBomb.fireballRadiusM) / selectedBomb.fireballRadiusM) * 100)}% de alcance)
                </div>

                {/* Métricas de Raio e Diâmetro de Vaporização */}
                <div className={`grid ${dimensionMode === 'both' ? 'grid-cols-2' : 'grid-cols-1'} gap-2 pt-1 border-t border-slate-800/60 font-mono`}>
                  {(dimensionMode === 'radius' || dimensionMode === 'both') && (
                    <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Raio Vaporização (R)</span>
                      <span className="text-sm font-black text-orange-300">
                        {formatRadius(selectedBomb.vaporizationRadiusM)}
                      </span>
                    </div>
                  )}
                  {(dimensionMode === 'diameter' || dimensionMode === 'both') && (
                    <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Diâmetro Vaporização (Ø)</span>
                      <span className="text-sm font-black text-orange-300">
                        {formatDiameter(selectedBomb.vaporizationRadiusM)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-slate-300 space-y-1 font-mono pt-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Área de Vaporização:</span>
                    <span className="text-slate-200 font-bold">{calculateAreaKm2(selectedBomb.vaporizationRadiusM)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fluxo Térmico Crítico:</span>
                    <span className="text-orange-400 font-bold">&gt; 150 cal/cm²</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 leading-relaxed pt-1 border-t border-slate-800/40">
                  Faixa externa à bola de fogo onde o pulso térmico instantâneo e a radiação direta vaporizam e pirolisam corpos humanos, asfalto, solo e materiais carbonáceos antes mesmo da chegada física da frente de choque mecânica.
                </p>
              </div>

              {/* CARD 3: Altura e Dimensões do Cogumelo Atômico (Mushroom Cloud) */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-purple-500/40 space-y-3 hover:border-purple-500/60 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Cloud className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-xs font-bold text-purple-300 uppercase tracking-wide">
                      3. Cogumelo Atômico
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">
                    {selectedBomb.mushroomCloudHeightKm >= 50
                      ? 'Mesosfera'
                      : selectedBomb.mushroomCloudHeightKm >= 12
                      ? 'Estratosfera'
                      : 'Troposfera'}
                  </span>
                </div>

                {/* Grid com Altura Máx, Diâmetro Cabeça, Raio Haste */}
                <div className="grid grid-cols-3 gap-1.5 font-mono">
                  <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 block truncate">Altura Topo</span>
                    <span className="text-xs font-black text-purple-300">
                      {selectedBomb.mushroomCloudHeightKm.toFixed(1)} km
                    </span>
                  </div>
                  <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 block truncate">Diâm. Chapéu</span>
                    <span className="text-xs font-black text-purple-300">
                      {selectedBomb.mushroomCloudCapDiameterKm.toFixed(1)} km
                    </span>
                  </div>
                  <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 block truncate">Raio Haste</span>
                    <span className="text-xs font-black text-purple-300">
                      {formatRadius(selectedBomb.fallout.cloudStemRadiusM)}
                    </span>
                  </div>
                </div>

                {/* Régua de Altitude Atmosférica */}
                <div className="space-y-1.5 pt-1 border-t border-slate-800/60">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <ArrowUpDown className="w-3 h-3 text-purple-400" />
                      Penetração na Atmosfera:
                    </span>
                    <span className="font-mono font-bold text-purple-300">
                      {selectedBomb.mushroomCloudHeightKm.toFixed(1)} km / 80 km
                    </span>
                  </div>

                  {/* Barra Visual de Altura */}
                  <div className="relative w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500 transition-all duration-500 rounded-full"
                      style={{ width: `${Math.min((selectedBomb.mushroomCloudHeightKm / 80) * 100, 100)}%` }}
                    />
                  </div>

                  {/* Marcadores de Referência */}
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>0 km</span>
                    <span title="Monte Everest: 8.8 km">Everest (8.8k)</span>
                    <span title="Altitude Voo Comercial: 11 km">Voo (11k)</span>
                    <span title="Tropopausa: 12-15 km">Tropo</span>
                    <span>80 km (Meso)</span>
                  </div>
                </div>

                <div className="bg-slate-900/70 p-2 rounded-lg text-[10px] text-slate-400 leading-snug border border-slate-800/60">
                  A coluna de convecção atinge <b>{selectedBomb.mushroomCloudHeightKm.toFixed(1)} km</b> de altitude,
                  {selectedBomb.mushroomCloudHeightKm >= 50
                    ? ' furando a estratosfera e atingindo a Mesosfera, gerando perturbações ionosféricas hemisféricas.'
                    : selectedBomb.mushroomCloudHeightKm >= 12
                    ? ' penetrando a Estratosfera, onde as partículas de fissão são dispersas globalmente.'
                    : ' contida dentro da Troposfera, com precipitação radiológica local imediata.'}
                </div>
              </div>

              {/* CARD 4: Comparativo com Little Boy (Hiroshima) */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 font-mono text-[11px]">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                  Comparativo com Little Boy (15 kt):
                </span>
                <div className="grid grid-cols-3 gap-1 pt-1 text-center">
                  <div className="bg-slate-900 p-1.5 rounded border border-slate-800/80">
                    <span className="text-[9px] text-slate-500 block">Potência</span>
                    <span className="text-white font-bold">{getHiroshimaMultiplier(selectedBomb.yieldKt)}</span>
                  </div>
                  <div className="bg-slate-900 p-1.5 rounded border border-slate-800/80">
                    <span className="text-[9px] text-slate-500 block">Bola Fogo</span>
                    <span className="text-amber-400 font-bold">{(selectedBomb.fireballRadiusM / 180).toFixed(1)}×</span>
                  </div>
                  <div className="bg-slate-900 p-1.5 rounded border border-slate-800/80">
                    <span className="text-[9px] text-slate-500 block">Cogumelo</span>
                    <span className="text-purple-400 font-bold">{(selectedBomb.mushroomCloudHeightKm / 12.0).toFixed(1)}×</span>
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>

          {/* Bottom Analytical Panel: Explanatory Breakdown of Blast Physics & Fallout Science */}
          <div className="bg-slate-900/90 border-t border-slate-800 p-4 sm:p-6 space-y-5">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Info className="w-4 h-4 text-rose-400" />
                <span>Detalhamento dos Efeitos Físicos Imediatos: {selectedBomb.name}</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 text-xs">
                {IMPACT_LAYERS.map((layer) => {
                  let radius = 0;
                  if (layer.id === 'fireball') radius = selectedBomb.fireballRadiusM;
                  if (layer.id === 'vaporization') radius = selectedBomb.vaporizationRadiusM;
                  if (layer.id === 'heavy') radius = selectedBomb.heavyBlastRadiusM;
                  if (layer.id === 'thermal') radius = selectedBomb.thermalRadiusM;
                  if (layer.id === 'light') radius = selectedBomb.lightBlastRadiusM;

                  return (
                    <div
                      key={layer.id}
                      className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white flex items-center gap-1.5 text-xs">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: layer.color }} />
                          {layer.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline font-mono text-[11px] pt-1 border-t border-slate-800/50">
                        <span className="text-slate-400">
                          {dimensionMode === 'radius' ? 'Raio (R):' : dimensionMode === 'diameter' ? 'Diâmetro (Ø):' : 'Raio / Diâm:'}
                        </span>
                        <span className="text-white font-bold">
                          {dimensionMode === 'radius'
                            ? formatRadius(radius)
                            : dimensionMode === 'diameter'
                            ? formatDiameter(radius)
                            : `${formatRadius(radius)} / ${formatDiameter(radius)}`}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline font-mono text-[11px]">
                        <span className="text-slate-400">Área Estimada:</span>
                        <span className="text-slate-300">{calculateAreaKm2(radius)}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                        {layer.effects}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Fallout Analytical Breakdown Card */}
            {selectedBomb.fallout && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/20 via-slate-950 to-purple-950/20 border border-amber-500/30 space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <Radiation className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                      Análise Científica de Precipitação Radioativa (Nuclear Fallout)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                    <span>Vento Simulado: <b className="text-purple-300">{windDirectionDeg}° ({windSpeedKmh} km/h)</b></span>
                    <span>•</span>
                    <span>Modo: <b className="text-amber-300">{burstType === 'surface' ? 'Superfície' : 'Detonação Aérea'}</b></span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 text-xs">
                  {FALLOUT_ZONES_CONFIG.map((zone) => {
                    const distKm = getCalculatedFalloutLengthKm(
                      zone.id as 'rad1000' | 'rad300' | 'rad100' | 'rad10'
                    );
                    return (
                      <div
                        key={zone.id}
                        className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold flex items-center gap-1.5 text-[11px]" style={{ color: zone.color }}>
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: zone.color }} />
                            {zone.name}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                            {zone.doseDisplay}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-slate-300 pt-1 border-t border-slate-800 flex justify-between">
                          <span className="text-slate-400">Alcance Pluma:</span>
                          <span className="font-bold text-amber-300">~{distKm} km</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-snug">
                          {zone.medicalImpact}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 space-y-1 font-sans">
                  <div className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-amber-400" />
                    <span>Como funciona a física da precipitação radioativa:</span>
                  </div>
                  <p>
                    Quando uma ogiva como a <b>{selectedBomb.name}</b> é detonada no nível do solo, a bola de fogo vaporiza milhares de toneladas de solo, rocha e detritos. Esse material sobe com a nuvem de cogumelo, condensa-se com os produtos de fissão altamente radioativos e é transportado pelos ventos atmosféricos.
                    À medida que essas partículas decaem pela regra dos <i>7/10 de Wigner</i> (a cada fator de 7 no tempo, a intensidade de radiação cai por um fator de 10), elas precipitam sobre cidades a sotavento ao longo de centenas de quilômetros.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL: INSERIR COORDENADAS MANUAIS DE QUALQUER LUGAR DO MUNDO */}
      {showCoordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-white font-bold text-sm">
                <Navigation className="w-4 h-4 text-emerald-400" />
                <span>Definir Coordenadas Geográficas</span>
              </div>
              <button
                onClick={() => setShowCoordModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Insira a latitude e longitude de qualquer local ou cidade no mundo para posicionar o Marco Zero com precisão milimétrica.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Nome do Local / Cidade (Opcional)
                </label>
                <input
                  type="text"
                  value={coordCityName}
                  onChange={(e) => setCoordCityName(e.target.value)}
                  placeholder="Ex: Minha Cidade, Ilha Remota, Base Naval..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Latitude (-90 a 90)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={coordLat}
                    onChange={(e) => setCoordLat(e.target.value)}
                    placeholder="Ex: -23.5505"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Longitude (-180 a 180)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={coordLng}
                    onChange={(e) => setCoordLng(e.target.value)}
                    placeholder="Ex: -46.6333"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-2">
              <button
                onClick={() => setShowCoordModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
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
