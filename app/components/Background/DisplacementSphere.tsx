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

const DisplacementSphere: React.FC = (props) => {
  const { theme } = useTheme();
  const rgbBackground = theme === 'light' ? '250 250 250' : '17 17 17';

  const width = useRef<number>(window.innerWidth);
  const height = useRef<number>(window.innerHeight);
  const start = useRef<number>(Date.now());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef<Vector2>(new Vector2(0.8, 0.5));
  const renderer = useRef<WebGLRenderer | null>(null);
  const camera = useRef<PerspectiveCamera | null>(null);
  const scene = useRef<Scene | null>(null);
  const lights = useRef<(DirectionalLight | AmbientLight)[] | null>(null);
  const uniforms = useRef<any>(null);
  const material = useRef<MeshPhongMaterial | null>(null);
  const geometry = useRef<SphereBufferGeometry | null>(null);
  const sphere = useRef<Mesh | null>(null);
  const tweenRef = useRef<any>(null);
  const sphereSpring = useRef<any>(null);
  const prefersReducedMotion = Boolean(usePrefersReducedMotion() && false);
  const isInViewport = useInViewport(canvasRef);

  // Инициализация Three.js сцены
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
        UniformsLib.ambient,
        UniformsLib.lights,
        shader.uniforms,
        { time: { type: 'f', value: 0 } },
      ]);

      shader.uniforms = uniforms.current;
      shader.vertexShader = vertShader;
      shader.fragmentShader = fragShader;
      shader.lights = true;
    };

    geometry.current = new SphereBufferGeometry(32, 128, 128);

    sphere.current = new Mesh(geometry.current, material.current);
    sphere.current.position.z = 0;
    sphere.current.modifier = Math.random();
    scene.current.add(sphere.current);

    return () => {
      if (scene.current) cleanScene(scene.current);
      if (renderer.current) cleanRenderer(renderer.current);
    };
  }, []);

  // Освещение
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

  // Адаптация размера окна
  useEffect(() => {
    const handleResize = () => {
      const canvasHeight = innerHeight();
      const windowWidth = window.innerWidth;
      const fullHeight = canvasHeight + canvasHeight * 0.3;
      canvasRef.current!.style.height = `${fullHeight}px`;
      renderer.current!.setSize(windowWidth, fullHeight);
      camera.current!.aspect = windowWidth / fullHeight;
      camera.current!.updateProjectionMatrix();

      if (prefersReducedMotion) {
        renderer.current!.render(scene.current!, camera.current!);
      }

      if (windowWidth <= media.mobile) {
        sphere.current!.position.set(14, 10, 0);
      } else if (windowWidth <= media.tablet) {
        sphere.current!.position.set(18, 14, 0);
      } else {
        sphere.current!.position.set(22, 16, 0);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReducedMotion]);

  // Движение мыши
  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const { rotation } = sphere.current!;
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

  // Анимация
  useEffect(() => {
    let animation: number;

    const animate = () => {
      animation = requestAnimationFrame(animate);

      if (uniforms.current) {
        uniforms.current.time.value = 0.00005 * (Date.now() - start.current);
      }

      sphere.current!.rotation.z += 0.001;
      renderer.current!.render(scene.current!, camera.current!);
    };

    if (!prefersReducedMotion && isInViewport) {
      animate();
    } else {
      renderer.current!.render(scene.current!, camera.current!);
    }

    return () => {
      cancelAnimationFrame(animation);
    };
  }, [isInViewport, prefersReducedMotion]);

  return (
    <Transition appear in onEnter={reflow} timeout={3000} nodeRef={canvasRef}>
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