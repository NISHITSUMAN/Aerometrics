import { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import { indianCities, getAQIColor, CityData } from '@/data/cityData';
import * as THREE from 'three';

interface Globe3DProps {
  onCityClick?: (city: CityData) => void;
  autoRotate?: boolean;
}

const Globe3D = ({ onCityClick, autoRotate = true }: Globe3DProps) => {
  const globeEl = useRef<any>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!globeEl.current) return;

    const globe = globeEl.current;

    // Set initial camera position
    globe.pointOfView({ lat: 20, lng: 78, altitude: 2.5 }, 0);

    // Configure controls
    const controls = globe.controls();
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = true;
    controls.minDistance = 200;
    controls.maxDistance = 500;

    // Add atmosphere glow
    const scene = globe.scene();
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        coefficient: { value: 0.5 },
        power: { value: 3.5 },
        glowColor: { value: new THREE.Color(0x4d9fff) },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float coefficient;
        uniform float power;
        uniform vec3 glowColor;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float intensity = pow(coefficient + dot(vNormal, vec3(0, 0, 1.0)), power);
          gl_FragColor = vec4(glowColor, 1.0) * intensity;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    const atmosphereGeometry = new THREE.SphereGeometry(101, 64, 64);
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

  }, [autoRotate]);

  const pointsData = indianCities.map(city => ({
    ...city,
    size: 0.5,
    color: getAQIColor(city.aqi),
  }));

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={pointsData}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={0.01}
        pointRadius="size"
        pointsMerge={false}
        pointLabel={(d: any) => `
          <div style="
            background: rgba(10, 14, 26, 0.95);
            padding: 12px 16px;
            border-radius: 8px;
            border: 1px solid ${d.color};
            color: white;
            font-family: Inter, sans-serif;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          ">
            <div style="font-weight: bold; font-size: 16px; margin-bottom: 4px;">${d.city}</div>
            <div style="font-size: 14px; color: #00d9ff; margin-bottom: 2px;">AQI: ${d.aqi}</div>
            <div style="font-size: 12px; color: #aaa;">Main Pollutant: ${d.mainPollutant || 'N/A'}</div>
            <div style="font-size: 12px; color: ${d.color}; margin-top: 4px; font-weight: 600;">
              ${d.aqi <= 50 ? 'Good' : d.aqi <= 100 ? 'Moderate' : d.aqi <= 150 ? 'Unhealthy for Sensitive' : d.aqi <= 200 ? 'Unhealthy' : d.aqi <= 300 ? 'Very Unhealthy' : 'Hazardous'}
            </div>
          </div>
        `}
        onPointClick={(point: any) => {
          if (onCityClick) {
            onCityClick(point as CityData);
          }
          if (globeEl.current) {
            globeEl.current.pointOfView(
              { lat: point.lat, lng: point.lng, altitude: 1.5 },
              1000
            );
          }
        }}
        atmosphereColor="#4d9fff"
        atmosphereAltitude={0.15}
      />
    </div>
  );
};

export default Globe3D;
