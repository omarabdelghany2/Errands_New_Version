import { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import errandsLogo from '@/assets/errands-logo-transparent.png';

// Animated 3D Logo Component
function AnimatedLogo() {
  const logoGroupRef = useRef<THREE.Group>(null);
  const logo1Ref = useRef<THREE.Mesh>(null);
  const logo2Ref = useRef<THREE.Mesh>(null);
  const logo3Ref = useRef<THREE.Mesh>(null);
  const scrollRotationRef = useRef(0);

  // Load the logo texture
  const texture = useLoader(THREE.TextureLoader, errandsLogo);

  // Custom shader material to make white/light backgrounds transparent
  const customMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: texture },
        opacity: { value: 0.9 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float opacity;
        varying vec2 vUv;

        void main() {
          vec4 texColor = texture2D(tDiffuse, vUv);

          // Calculate brightness
          float brightness = (texColor.r + texColor.g + texColor.b) / 3.0;

          // Make white/light colors transparent
          float alpha = 1.0 - smoothstep(0.8, 0.95, brightness);

          // Keep the original alpha channel
          alpha *= texColor.a;

          gl_FragColor = vec4(texColor.rgb, alpha * opacity);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false
    });
  }, [texture]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollY / Math.max(maxScroll, 1);

      // Update rotation based on scroll
      scrollRotationRef.current = scrollProgress * Math.PI * 4; // 4 full rotations
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate the logo
  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (logoGroupRef.current) {
      // Apply scroll-based rotation to the entire group
      logoGroupRef.current.rotation.y = scrollRotationRef.current;
      logoGroupRef.current.rotation.x = Math.sin(scrollRotationRef.current * 0.5) * 0.2;

      // Add subtle floating animation
      logoGroupRef.current.position.y = Math.sin(time * 0.5) * 0.3;
    }

    // Individual layer animations for depth
    if (logo1Ref.current) {
      logo1Ref.current.position.z = Math.sin(time * 0.3) * 0.1;
    }
    if (logo2Ref.current) {
      logo2Ref.current.position.z = Math.sin(time * 0.3 + 1) * 0.15;
    }
    if (logo3Ref.current) {
      logo3Ref.current.position.z = Math.sin(time * 0.3 + 2) * 0.1;
    }
  });

  return (
    <group ref={logoGroupRef}>
      {/* Main logo layer with full color */}
      <mesh ref={logo1Ref} position={[0, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <primitive object={customMaterial.clone()} attach="material" />
      </mesh>

      {/* Second layer - slightly behind with glow effect */}
      <mesh ref={logo2Ref} position={[0, 0, -0.3]}>
        <planeGeometry args={[4.2, 4.2]} />
        <shaderMaterial
          uniforms={{
            tDiffuse: { value: texture },
            opacity: { value: 0.4 },
            glowColor: { value: new THREE.Color('#6366f1') }
          }}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform sampler2D tDiffuse;
            uniform float opacity;
            uniform vec3 glowColor;
            varying vec2 vUv;

            void main() {
              vec4 texColor = texture2D(tDiffuse, vUv);
              float brightness = (texColor.r + texColor.g + texColor.b) / 3.0;
              float alpha = 1.0 - smoothstep(0.8, 0.95, brightness);
              alpha *= texColor.a;

              vec3 finalColor = mix(texColor.rgb, glowColor, 0.3);
              gl_FragColor = vec4(finalColor, alpha * opacity);
            }
          `}
          transparent={true}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Third layer - even further back for depth */}
      <mesh ref={logo3Ref} position={[0, 0, -0.6]}>
        <planeGeometry args={[4.4, 4.4]} />
        <shaderMaterial
          uniforms={{
            tDiffuse: { value: texture },
            opacity: { value: 0.2 },
            glowColor: { value: new THREE.Color('#8b5cf6') }
          }}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform sampler2D tDiffuse;
            uniform float opacity;
            uniform vec3 glowColor;
            varying vec2 vUv;

            void main() {
              vec4 texColor = texture2D(tDiffuse, vUv);
              float brightness = (texColor.r + texColor.g + texColor.b) / 3.0;
              float alpha = 1.0 - smoothstep(0.8, 0.95, brightness);
              alpha *= texColor.a;

              vec3 finalColor = mix(texColor.rgb, glowColor, 0.5);
              gl_FragColor = vec4(finalColor, alpha * opacity);
            }
          `}
          transparent={true}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Ambient light */}
      <ambientLight intensity={0.8} />

      {/* Point lights for better illumination */}
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, -5, 3]} intensity={0.8} color="#6366f1" />
      <pointLight position={[0, 0, 5]} intensity={1} color="#8b5cf6" />
    </group>
  );
}

// Main 3D Background Component
export default function ScrollingBackground3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <AnimatedLogo />
      </Canvas>
    </div>
  );
}
