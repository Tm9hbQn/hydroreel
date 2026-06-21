# Walkthrough: Metacentric Torque & Amputations Simulation

## What was done
1. **Interactive UI Update (`MetacentricTorque.tsx`)**: Replaced the abstract "boat" animation with an interactive human body simulation representing the torso, head, and four limbs.
2. **Physics Engine Implementation**: 
   - Assigned arbitrary mass and buoyancy values to each limb and the torso/head.
   - Implemented real-time calculation of the **Center of Gravity (CG)** and **Center of Buoyancy (CB)** based on which limbs are active.
   - Calculated the expected rotational angle (`Metacentric Torque`) to align the CG vertically below the CB.
3. **Interactive Controls**: Added 4 checkboxes allowing users to toggle Left Arm, Right Arm, Left Leg, and Right Leg amputations interactively.
4. **Visual Indicators**: Rendered the exact position of the CG and CB in real-time, highlighting the torque line connecting them to visually demonstrate why the body rotates.
5. **Memory Bank Updates**: Compressed the oldest event into `changelog.md` and updated the `activeContext.md` sliding window to record this development step, adhering to the Decoupling Hard Invariant.

## Why it was done
The user requested an interactive way to mark multiple limb amputations and see the resulting effect on the Center of Gravity and Center of Buoyancy. This perfectly aligns with the project's goal of "Bite-Sized Learning" with interactive, physics-based UI elements, helping hydrotherapy professionals visualize the complex forces affecting a patient in water.

## What needs to be checked
1. **Visual Accuracy**: Toggle various combinations of amputations and observe how the body rotates. (e.g., toggling off the right arm should rotate the body counter-clockwise as the left side becomes heavier).
2. **Responsiveness**: Ensure the checkboxes and the animated elements render smoothly across mobile and desktop breakpoints.
3. **Medical Context**: While the exact mass/buoyancy values are approximations for simulation, verify if the direction and proportion of the tilt align with clinical expectations.
