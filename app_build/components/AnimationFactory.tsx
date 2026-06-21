"use client";
import React from 'react';

import ArchimedesVectors from './animations/ArchimedesVectors';
import InteractivePressureSimulator from './animations/InteractivePressureSimulator';
import DragEquation from './animations/DragEquation';
import MetacentricTorque from './animations/MetacentricTorque';
import FallbackAnimation from './animations/FallbackAnimation';

interface Props {
  triggerId?: string;
}

const animationRegistry: Record<string, React.ComponentType<any>> = {
  'animation_archimedes_vectors': ArchimedesVectors,
  'animation_pascal_law': InteractivePressureSimulator,
  'animation_drag_equation': DragEquation,
  'animation_metacentric_torque': MetacentricTorque,
};

export default function AnimationFactory({ triggerId }: Props) {
  if (!triggerId) return null;

  const Component = animationRegistry[triggerId];

  if (Component) {
    return (
      <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden">
        <Component />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden">
      <FallbackAnimation triggerId={triggerId} />
    </div>
  );
}
