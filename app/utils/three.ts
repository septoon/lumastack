import { Scene, Object3D, Material, WebGLRenderer, Light } from 'three';

/**
 * Clean up a scene's materials and geometry
 */
export const cleanScene = (scene: Scene): void => {
  scene.traverse((object: Object3D) => {
    if (!('isMesh' in object)) return;

    const mesh = object as THREE.Mesh;

    // Dispose geometry
    if (mesh.geometry) {
      mesh.geometry.dispose();
    }

    // Dispose materials
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach(cleanMaterial);
    } else if (mesh.material) {
      cleanMaterial(mesh.material);
    }
  });
};

/**
 * Clean up and dispose of a material
 */
export const cleanMaterial = (material: Material): void => {
  material.dispose();

  for (const key in material) {
    const value = (material as any)[key];
    if (value && typeof value === 'object' && 'minFilter' in value) {
      value.dispose();
    }
  }
};

/**
 * Clean up and dispose of a renderer
 */
export const cleanRenderer = (renderer: WebGLRenderer): void => {
  renderer.dispose();
  renderer.forceContextLoss();
  // Nullifying the reference is optional in TypeScript
  (renderer as any) = null;
};

/**
 * Clean up lights by removing them from their parent
 */
export const removeLights = (lights: Light[]): void => {
  lights.forEach((light) => {
    if (light.parent) {
      light.parent.remove(light);
    }
  });
};

/**
 * A reasonable default pixel ratio
 */
export const renderPixelRatio = 2;