'use client';

import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import {
  Vector2,
  sRGBEncoding,
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  DirectionalLight,
  AmbientLight,
  UniformsUtils,
  UniformsLib,
  MeshPhongMaterial,
  SphereBufferGeometry,
  Mesh,
} from 'three';
import { spring, value } from 'popmotion';
import innerHeight from 'ios-inner-height';
import vertShader from './sphereVertShader';
import fragShader from './sphereFragShader';
import { Transition } from 'react-transition-group';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useInViewport } from '../../hooks/useInViewport';
import { reflow } from '../../utils/transition';
import { media, rgbToThreeColor } from '../../utils/style';
import { cleanScene, removeLights, cleanRenderer } from '../../utils/three';
import { useTheme } from '../Theme/ThemeProvider';

interface CustomMesh extends Mesh {
  modifier?: number;
}

const DisplacementSphere: React.FC = (props) => {
  const { theme } = useTheme();
  const rgbBackground = theme === 'light' ? '250 250 250' : '17 17 17';

  const width = useRef<number>(0);
  const height = useRef<number>(0);
  const start = useRef<number>(Date.now());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<Vector2>(new Vector2(0.8, 0.5));
  const renderer = useRef<WebGLRenderer | null>(null);
  const camera = useRef<PerspectiveCamera | null>(null);
  const scene = useRef<Scene | null>(null);
  const lights = useRef<(DirectionalLight | AmbientLight)[] | null>(null);
  const uniforms = useRef<any>(null);
  const material = useRef<MeshPhongMaterial | null>(null);
  const geometry = useRef<SphereBufferGeometry | null>(null);
  const sphere = useRef<CustomMesh | null>(null);
  const tweenRef = useRef<any>(null);
  const sphereSpring = useRef<any>(null);
  const prefersReducedMotion = Boolean(usePrefersReducedMotion() && false);
  const isInViewport = useInViewport(canvasRef as React.RefObject<Element>);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      width.current = window.innerWidth;
      height.current = window.innerHeight;
    }
    
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    renderer.current = new WebGLRenderer({
      canvas: canvasRef.current,
      powerPreference: 'high-performance',
    });
    renderer.current.setSize(width.current, height.current);
    renderer.current.setPixelRatio(1);
    renderer.current.outputEncoding = sRGBEncoding;

    camera.current = new PerspectiveCamera(
      55,
      width.current / height.current,
      0.1,
      200
    );
    camera.current.position.z = 52;

    scene.current = new Scene();

    material.current = new MeshPhongMaterial();
    material.current.onBeforeCompile = (shader) => {
      uniforms.current = UniformsUtils.merge([
        UniformsLib.lights,
        shader.uniforms,
        { time: { type: 'f', value: 0 } },
      ]);
    
      shader.uniforms = uniforms.current;
      shader.vertexShader = vertShader;
      shader.fragmentShader = fragShader;
    };

    geometry.current = new SphereBufferGeometry(32, 128, 128);

    sphere.current = new Mesh(geometry.current!, material.current!) as CustomMesh;
    sphere.current.position.z = 0;
    sphere.current.modifier = Math.random();
    scene.current.add(sphere.current);

    return () => {
      if (scene.current) cleanScene(scene.current);
      if (renderer.current) cleanRenderer(renderer.current);
    };
  }, []);

  useEffect(() => {
    const updateThemeColor = () => {
      if (!uniforms.current) return;
  
      // Получаем текущий цвет анимации из шейдера (пример)
      const time = uniforms.current.time.value;
      const red = Math.round(120 + Math.sin(time) * 50);
      const green = Math.round(200 + Math.cos(time) * 50);
      const blue = Math.round(255);
  
      const newColor = `rgb(${red}, ${green}, ${blue})`;
  
      // Обновляем theme-color
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', newColor);
    };
  
    const interval = setInterval(updateThemeColor, 500);
  
    return () => clearInterval(interval);
  }, []);
  

  useEffect(() => {
    const dirLight = new DirectionalLight(rgbToThreeColor('250 250 250'), 0.6);
    const ambientLight = new AmbientLight(
      rgbToThreeColor('250 250 250'),
      theme === 'light' ? 0.8 : 0.1
    );

    dirLight.position.set(100, 100, 200);

    lights.current = [dirLight, ambientLight];
    scene.current!.background = rgbToThreeColor(rgbBackground);
    lights.current.forEach((light) => scene.current?.add(light));

    return () => {
      if (lights.current) removeLights(lights.current);
    };
  }, [theme, rgbBackground]);

  useEffect(() => {
    const handleResize = () => {
      const canvasHeight = innerHeight();
      const windowWidth = window.innerWidth;
      const fullHeight = canvasHeight + canvasHeight * 0.3;
      if (canvasRef.current && renderer.current && camera.current && sphere.current) {
        canvasRef.current.style.height = `${fullHeight}px`;
        renderer.current.setSize(windowWidth, fullHeight);
        camera.current.aspect = windowWidth / fullHeight;
        camera.current.updateProjectionMatrix();

        if (prefersReducedMotion) {
          renderer.current.render(scene.current!, camera.current!);
        }

        if (windowWidth <= media.mobile) {
          sphere.current.position.set(14, 10, 0);
        } else if (windowWidth <= media.tablet) {
          sphere.current.position.set(18, 14, 0);
        } else {
          sphere.current.position.set(22, 16, 0);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (!sphere.current) return;
      const { rotation } = sphere.current;
      const position = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      };

      if (!sphereSpring.current) {
        sphereSpring.current = value(rotation.toArray(), (values: number[]) =>
          rotation.set(values[0], values[1], sphere.current!.rotation.z)
        );
      }

      tweenRef.current = spring({
        from: sphereSpring.current.get(),
        to: [position.y / 2, position.x / 2],
        stiffness: 30,
        damping: 20,
        velocity: sphereSpring.current.getVelocity(),
        mass: 2,
        restSpeed: 0.0001,
      }).start(sphereSpring.current);
    };

    if (!prefersReducedMotion && isInViewport) {
      window.addEventListener('mousemove', onMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (tweenRef.current) tweenRef.current.stop();
    };
  }, [isInViewport, prefersReducedMotion]);

  useEffect(() => {
    let animation: number;

    const animate = () => {
      animation = requestAnimationFrame(animate);

      if (uniforms.current) {
        uniforms.current.time.value = 0.00005 * (Date.now() - start.current);
      }

      if (sphere.current && renderer.current && camera.current && scene.current) {
        sphere.current.rotation.z += 0.001;
        renderer.current.render(scene.current, camera.current);
      }
    };

    if (!prefersReducedMotion && isInViewport) {
      animate();
    } else {
      if (renderer.current && camera.current && scene.current) {
        renderer.current.render(scene.current, camera.current);
      }
    }

    return () => {
      cancelAnimationFrame(animation);
    };
  }, [isInViewport, prefersReducedMotion]);

  return (
    <Transition
  appear
  in
  nodeRef={canvasRef}
  onEnter={(isAppearing: boolean) => {
    if (canvasRef.current) {
      reflow(canvasRef.current);
    }
  }}
  timeout={3000}
>
  {(status) => (
    <canvas
      aria-hidden
      ref={canvasRef}
      className={classNames(
        'displacement-sphere',
        `displacement-sphere--${status}`
      )}
      {...props}
    />
  )}
</Transition>
  );
};

export default DisplacementSphere;