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
import PwbXiphoidAnimation from './animations/animation_pwb_xiphoid';
import PwbAsisAnimation from './animations/animation_pwb_asis';
import PwbThighAnimation from './animations/animation_pwb_thigh';
import DeepWaterRunningAnimation from './animations/animation_deep_water_running';

// Spinal Pathologies Animations
import HerniatedDiscDecompressionAnimation from './animations/animation_herniated_disc_decompression';
import SpondylolisthesisCoreAnimation from './animations/animation_spondylolisthesis_core';
import ScoliosisDerotationAnimation from './animations/animation_scoliosis_derotation';
import KyphosisExtensionAnimation from './animations/animation_kyphosis_extension';
import LordosisWallSitAnimation from './animations/animation_lordosis_wall_sit';

// Phase 4 - Upper/Lower Limb & Fractures
import WolffsLawAnimation from './animations/animation_wolffs_law';
import SpiralFractureWarningAnimation from './animations/animation_spiral_fracture_warning';
import ThrAbductionAnimation from './animations/animation_thr_abduction';
import TkrHydrostaticPressureAnimation from './animations/animation_tkr_hydrostatic_pressure';
import PerthesContainmentAnimation from './animations/animation_perthes_containment';
import GenuValgumAnimation from './animations/animation_genu_valgum';
import PesPlanusAnimation from './animations/animation_pes_planus';
import PesCavusAnimation from './animations/animation_pes_cavus';
import AnkleSprainEarlyAnimation from './animations/animation_ankle_sprain_early';
import AnkleSprainAdvancedAnimation from './animations/animation_ankle_sprain_advanced';
import ShoulderHighFiveWarningAnimation from './animations/animation_shoulder_high_five_warning';
import RotatorCuffAaromAnimation from './animations/animation_rotator_cuff_aarom';
import RomIncreaseAnimation from './animations/animation_rom_increase';

// Phase 5 - Neurology
import DualTaskingCvaAnimation from './animations/animation_dual_tasking_cva';
import SciRehabAnimation from './animations/animation_sci_rehab';
import ColdNerveConductionAnimation from './animations/animation_cold_nerve_conduction';
import AutonomicDysreflexiaAnimation from './animations/animation_autonomic_dysreflexia';
import AdTriggersAnimation from './animations/animation_ad_triggers';
import EpilepsyRiskManagementAnimation from './animations/animation_epilepsy_risk_management';
import FlickerVertigoAnimation from './animations/animation_flicker_vertigo';
import VenousPoolingAnimation from './animations/animation_venous_pooling';
import HydrostaticGSuitAnimation from './animations/animation_hydrostatic_g_suit';
import PotsAerobicVerticalAnimation from './animations/animation_pots_aerobic_vertical';

// Phase 6 - Physiology
// Cardio
import BloodShiftAnimation from './animations/animation_blood_shift';
import FrankStarlingAnimation from './animations/animation_frank_starling';
import HemodynamicChangesAnimation from './animations/animation_hemodynamic_changes';
import ChfRiskAnimation from './animations/animation_chf_risk';
import ChfStableAnimation from './animations/animation_chf_stable';
// Respiratory
import HydrostaticCorsetAnimation from './animations/animation_hydrostatic_corset';
import LungComplianceAnimation from './animations/animation_lung_compliance';
import VitalCapacityAnimation from './animations/animation_vital_capacity';
import PulmonaryEdemaAnimation from './animations/animation_pulmonary_edema';
// Renal & Metabolic
import ImmersionDiuresisAnimation from './animations/animation_immersion_diuresis';
import AnpReleaseAnimation from './animations/animation_anp_release';
import AdhSuppressionAnimation from './animations/animation_adh_suppression';
import RaasSuppressionAnimation from './animations/animation_raas_suppression';
import DehydrationRiskAnimation from './animations/animation_dehydration_risk';
import OrthostaticHypotensionAnimation from './animations/animation_orthostatic_hypotension';
import DiabetesProtocolAnimation from './animations/animation_diabetes_protocol';
import VasodilationInsulinAnimation from './animations/animation_vasodilation_insulin';
import HypoglycemiaRiskAnimation from './animations/animation_hypoglycemia_risk';

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
  'animation_pwb_xiphoid': PwbXiphoidAnimation,
  'animation_pwb_asis': PwbAsisAnimation,
  'animation_pwb_thigh': PwbThighAnimation,
  'animation_deep_water_running': DeepWaterRunningAnimation,

  'animation_herniated_disc_decompression': HerniatedDiscDecompressionAnimation,
  'animation_spondylolisthesis_core': SpondylolisthesisCoreAnimation,
  'animation_scoliosis_derotation': ScoliosisDerotationAnimation,
  'animation_kyphosis_extension': KyphosisExtensionAnimation,
  'animation_lordosis_wall_sit': LordosisWallSitAnimation,

  // Phase 4
  'animation_wolffs_law': WolffsLawAnimation,
  'animation_spiral_fracture_warning': SpiralFractureWarningAnimation,
  'animation_thr_abduction': ThrAbductionAnimation,
  'animation_tkr_hydrostatic_pressure': TkrHydrostaticPressureAnimation,
  'animation_perthes_containment': PerthesContainmentAnimation,
  'animation_genu_valgum': GenuValgumAnimation,
  'animation_pes_planus': PesPlanusAnimation,
  'animation_pes_cavus': PesCavusAnimation,
  'animation_ankle_sprain_early': AnkleSprainEarlyAnimation,
  'animation_ankle_sprain_advanced': AnkleSprainAdvancedAnimation,
  'animation_shoulder_high_five_warning': ShoulderHighFiveWarningAnimation,
  'animation_rotator_cuff_aarom': RotatorCuffAaromAnimation,
  'animation_rom_increase': RomIncreaseAnimation,

  // Phase 5
  'animation_dual_tasking_cva': DualTaskingCvaAnimation,
  'animation_sci_rehab': SciRehabAnimation,
  'animation_cold_nerve_conduction': ColdNerveConductionAnimation,
  'animation_autonomic_dysreflexia': AutonomicDysreflexiaAnimation,
  'animation_ad_triggers': AdTriggersAnimation,
  'animation_epilepsy_risk_management': EpilepsyRiskManagementAnimation,
  'animation_flicker_vertigo': FlickerVertigoAnimation,
  'animation_venous_pooling': VenousPoolingAnimation,
  'animation_hydrostatic_g_suit': HydrostaticGSuitAnimation,
  'animation_pots_aerobic_vertical': PotsAerobicVerticalAnimation,

  // Phase 6 - Cardio
  'animation_blood_shift': BloodShiftAnimation,
  'animation_frank_starling': FrankStarlingAnimation,
  'animation_hemodynamic_changes': HemodynamicChangesAnimation,
  'animation_chf_risk': ChfRiskAnimation,
  'animation_chf_stable': ChfStableAnimation,
  // Phase 6 - Respiratory
  'animation_hydrostatic_corset': HydrostaticCorsetAnimation,
  'animation_lung_compliance': LungComplianceAnimation,
  'animation_vital_capacity': VitalCapacityAnimation,
  'animation_pulmonary_edema': PulmonaryEdemaAnimation,
  // Phase 6 - Renal & Metabolic
  'animation_immersion_diuresis': ImmersionDiuresisAnimation,
  'animation_anp_release': AnpReleaseAnimation,
  'animation_adh_suppression': AdhSuppressionAnimation,
  'animation_raas_suppression': RaasSuppressionAnimation,
  'animation_dehydration_risk': DehydrationRiskAnimation,
  'animation_orthostatic_hypotension': OrthostaticHypotensionAnimation,
  'animation_diabetes_protocol': DiabetesProtocolAnimation,
  'animation_vasodilation_insulin': VasodilationInsulinAnimation,
  'animation_hypoglycemia_risk': HypoglycemiaRiskAnimation,
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
