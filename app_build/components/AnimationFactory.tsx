"use client";
import React from 'react';

import ArchimedesVectors from './animations/ArchimedesVectors';
import InteractivePressureSimulator from './animations/InteractivePressureSimulator';
import DragEquation from './animations/DragEquation';
import MetacentricTorque from './animations/MetacentricTorque';
import FallbackAnimation from './animations/FallbackAnimation';
import CGCBBalanceImage from './animations/CGCBBalanceImage';

// New imports for Unit 1
import EdemaReduction from './animations/EdemaReduction';
import RespiratoryEffort from './animations/RespiratoryEffort';
import DensityComparison from './animations/DensityComparison';
import WaterVsLand from './animations/WaterVsLand';
import TurbulentGliding from './animations/TurbulentGliding';
import QuizTime from './animations/QuizTime';

interface Props {
  triggerId?: string;
}

const animationRegistry: Record<string, React.ComponentType<any>> = {
  'animation_archimedes_vectors': ArchimedesVectors,
  'animation_pascal_law': InteractivePressureSimulator,
  'animation_drag_equation': DragEquation,
  'animation_metacentric_torque': MetacentricTorque,
  'image_cg_cb_balance': CGCBBalanceImage,
  
  // Unit 1 additions
  'animation_edema_reduction': EdemaReduction,
  'animation_respiratory_effort': RespiratoryEffort,
  'animation_density_comparison': DensityComparison,
  'animation_water_vs_land': WaterVsLand,
  'animation_turbulent_gliding': TurbulentGliding,
  'animation_quiz_time': QuizTime,
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
