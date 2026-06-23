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

// Clinical New Animations
import ShoulderBuoyancySupport from './animations/ShoulderBuoyancySupport';
import GateControl from './animations/GateControl';

import GammaLoopHeat from './animations/GammaLoopHeat';
import SpasticityGamma from './animations/SpasticityGamma';
import PainReliefMovement from './animations/PainReliefMovement';
import UhthoffMS from './animations/UhthoffMS';

// PWB Animations
import PwbC7Animation from './animations/animation_pwb_c7';

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
  
  // Clinical additions
  'animation_shoulder_buoyancy_support': ShoulderBuoyancySupport,
  'animation_gate_control': GateControl,

  'animation_gamma_loop_heat': GammaLoopHeat,
  'animation_spasticity_gamma': SpasticityGamma,
  'animation_pain_relief_movement': PainReliefMovement,
  'animation_uhthoff_ms': UhthoffMS,

  'animation_pwb_c7': PwbC7Animation,
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
