---
title: Appendix B - Kinematics Equations
sidebar_position: 2
description: Comprehensive collection of kinematics equations for robotic systems
---

# Appendix B: Kinematics Equations

## Overview

This appendix provides a comprehensive collection of kinematics equations essential for understanding and analyzing robotic systems, particularly humanoid robots. Kinematics deals with the motion of mechanical systems without considering the forces that cause the motion.

## Basic Kinematic Definitions

### Position Vector

The position of a point P relative to a reference frame:

$$ \mathbf{p} = \begin{bmatrix} x \\ y \\ z \end{bmatrix} $$

### Velocity Vector

First derivative of position with respect to time:

$$ \mathbf{v} = \frac{d\mathbf{p}}{dt} = \dot{\mathbf{p}} = \begin{bmatrix} \dot{x} \\ \dot{y} \\ \dot{z} \end{bmatrix} $$

### Acceleration Vector

Second derivative of position with respect to time:

$$ \mathbf{a} = \frac{d^2\mathbf{p}}{dt^2} = \ddot{\mathbf{p}} = \begin{bmatrix} \ddot{x} \\ \ddot{y} \\ \ddot{z} \end{bmatrix} $$

## Rotation Representations

### Rotation Matrix Properties

For any rotation matrix $\mathbf{R} \in SO(3)$:
- Orthogonality: $\mathbf{R}^T\mathbf{R} = \mathbf{R}\mathbf{R}^T = \mathbf{I}$
- Determinant: $\det(\mathbf{R}) = 1$
- Inverse: $\mathbf{R}^{-1} = \mathbf{R}^T$

### Common Rotation Matrices

#### Rotation about X-axis by angle $\alpha$:

$$ \mathbf{R}_x(\alpha) = \begin{bmatrix}
1 & 0 & 0 \\
0 & \cos\alpha & -\sin\alpha \\
0 & \sin\alpha & \cos\alpha
\end{bmatrix} $$

#### Rotation about Y-axis by angle $\beta$:

$$ \mathbf{R}_y(\beta) = \begin{bmatrix}
\cos\beta & 0 & \sin\beta \\
0 & 1 & 0 \\
-\sin\beta & 0 & \cos\beta
\end{bmatrix} $$

#### Rotation about Z-axis by angle $\gamma$:

$$ \mathbf{R}_z(\gamma) = \begin{bmatrix}
\cos\gamma & -\sin\gamma & 0 \\
\sin\gamma & \cos\gamma & 0 \\
0 & 0 & 1
\end{bmatrix} $$

### Euler Angles

#### ZYX Euler Angles (Roll-Pitch-Yaw):

$$ \mathbf{R}_{ZYX}(\phi, \theta, \psi) = \mathbf{R}_z(\psi)\mathbf{R}_y(\theta)\mathbf{R}_x(\phi) $$

$$ = \begin{bmatrix}
\cos\theta\cos\psi & \sin\phi\sin\theta\cos\psi - \cos\phi\sin\psi & \cos\phi\sin\theta\cos\psi + \sin\phi\sin\psi \\
\cos\theta\sin\psi & \sin\phi\sin\theta\sin\psi + \cos\phi\cos\psi & \cos\phi\sin\theta\sin\psi - \sin\phi\cos\psi \\
-\sin\theta & \sin\phi\cos\theta & \cos\phi\cos\theta
\end{bmatrix} $$

### Quaternions

A unit quaternion representing rotation by angle $\theta$ about axis $\mathbf{u} = [u_x, u_y, u_z]^T$:

$$ \mathbf{q} = \begin{bmatrix} q_w \\ q_x \\ q_y \\ q_z \end{bmatrix} = \begin{bmatrix} \cos(\theta/2) \\ u_x\sin(\theta/2) \\ u_y\sin(\theta/2) \\ u_z\sin(\theta/2) \end{bmatrix} $$

### Quaternion to Rotation Matrix

$$ \mathbf{R} = \begin{bmatrix}
1 - 2(q_y^2 + q_z^2) & 2(q_xq_y - q_zq_w) & 2(q_xq_z + q_yq_w) \\
2(q_xq_y + q_zq_w) & 1 - 2(q_x^2 + q_z^2) & 2(q_yq_z - q_xq_w) \\
2(q_xq_z - q_yq_w) & 2(q_yq_z + q_xq_w) & 1 - 2(q_x^2 + q_y^2)
\end{bmatrix} $$

## Homogeneous Transformations

### 4x4 Transformation Matrix

$$ \mathbf{T} = \begin{bmatrix} \mathbf{R} & \mathbf{p} \\ \mathbf{0}^T & 1 \end{bmatrix} = \begin{bmatrix}
r_{11} & r_{12} & r_{13} & p_x \\
r_{21} & r_{22} & r_{23} & p_y \\
r_{31} & r_{32} & r_{33} & p_z \\
0 & 0 & 0 & 1
\end{bmatrix} $$

### Point Transformation

Transforming a point from frame B to frame A:

$$ \begin{bmatrix} \mathbf{p}_A \\ 1 \end{bmatrix} = \mathbf{T}_{AB} \begin{bmatrix} \mathbf{p}_B \\ 1 \end{bmatrix} $$

## Forward Kinematics

### Denavit-Hartenberg (DH) Parameters

For each joint $i$, define four parameters:
- $a_i$: link length (distance along $x_i$ from $z_{i-1}$ to $z_i$)
- $\alpha_i$: link twist (angle from $z_{i-1}$ to $z_i$ about $x_i$)
- $d_i$: link offset (distance along $z_{i-1}$ from $x_{i-1}$ to $x_i$)
- $\theta_i$: joint angle (angle from $x_{i-1}$ to $x_i$ about $z_{i-1}$)

### DH Transformation Matrix

$$ \mathbf{T}_i = \begin{bmatrix}
\cos\theta_i & -\sin\theta_i\cos\alpha_i & \sin\theta_i\sin\alpha_i & a_i\cos\theta_i \\
\sin\theta_i & \cos\theta_i\cos\alpha_i & -\cos\theta_i\sin\alpha_i & a_i\sin\theta_i \\
0 & \sin\alpha_i & \cos\alpha_i & d_i \\
0 & 0 & 0 & 1
\end{bmatrix} $$

### Forward Kinematics Solution

$$ \mathbf{T}_{0n} = \mathbf{T}_1(\theta_1)\mathbf{T}_2(\theta_2) \cdots \mathbf{T}_n(\theta_n) $$

## Inverse Kinematics

### Geometric Approach

For simple manipulators, use geometric relationships to solve for joint angles.

### Analytical Approach

For specific manipulator geometries, derive closed-form solutions.

### Numerical Approach

Using the Jacobian matrix to iteratively solve:

$$ \Delta\boldsymbol{\theta} = \mathbf{J}^{-1}(\mathbf{x}) \Delta\mathbf{x} $$

## Jacobian Matrix

### Geometric Jacobian

$$ \mathbf{J} = \begin{bmatrix} \mathbf{J}_v \\ \mathbf{J}_\omega \end{bmatrix} $$

Where:
- $\mathbf{J}_v$ relates joint velocities to linear velocity
- $\mathbf{J}_\omega$ relates joint velocities to angular velocity

### Linear Velocity Component

$$ \mathbf{J}_{v,i} = \begin{cases}
\mathbf{z}_{i-1} \times (\mathbf{p}_e - \mathbf{p}_{i-1}) & \text{for revolute joints} \\
\mathbf{z}_{i-1} & \text{for prismatic joints}
\end{cases} $$

### Angular Velocity Component

$$ \mathbf{J}_{\omega,i} = \begin{cases}
\mathbf{z}_{i-1} & \text{for revolute joints} \\
\mathbf{0} & \text{for prismatic joints}
\end{cases} $$

## Velocity and Acceleration Analysis

### Velocity Relationship

$$ \mathbf{v}_e = \mathbf{J}(\boldsymbol{\theta})\dot{\boldsymbol{\theta}} $$

### Acceleration Relationship

$$ \mathbf{a}_e = \mathbf{J}(\boldsymbol{\theta})\ddot{\boldsymbol{\theta}} + \dot{\mathbf{J}}(\boldsymbol{\theta}, \dot{\boldsymbol{\theta}})\dot{\boldsymbol{\theta}} $$

Where $\dot{\mathbf{J}}$ is the Jacobian derivative:

$$ \dot{\mathbf{J}} = \sum_{i=1}^{n} \frac{\partial \mathbf{J}}{\partial \theta_i} \dot{\theta}_i $$

## Humanoid Robot Specific Kinematics

### Humanoid Kinematic Chain

For humanoid robots, the kinematic structure typically includes:
- 6 DOF legs (for bipedal locomotion)
- 6-7 DOF arms (for manipulation)
- 3-6 DOF torso (for balance and posture)
- 2-3 DOF head (for vision and interaction)

### Foot and Hand Frames

For humanoid robots, special attention is given to:
- **Foot Center Frame**: For balance and locomotion control
- **Hand Frame**: For manipulation and grasping

### Center of Mass (CoM) Kinematics

$$ \mathbf{p}_{CoM} = \frac{1}{M} \sum_{i=1}^{n} m_i \mathbf{p}_i $$

Where $M = \sum_{i=1}^{n} m_i$ is the total mass.

### Zero Moment Point (ZMP)

$$ \text{ZMP}_x = x_{CoM} - \frac{g}{\ddot{z}_{CoM} + g}(z_{CoM} - z_{support}) $$

## Differential Motion

### Differential Transform

$$ \Delta\mathbf{T} = \mathbf{T}' - \mathbf{T} = \begin{bmatrix} \Delta\mathbf{R} & \Delta\mathbf{p} \\ \mathbf{0}^T & 0 \end{bmatrix} $$

### Screw Motion

For small motions, the differential transformation can be represented as:

$$ \mathbf{d} = \begin{bmatrix} \boldsymbol{\omega} \\ \mathbf{v} \end{bmatrix} $$

Where $\boldsymbol{\omega}$ is the angular velocity and $\mathbf{v}$ is the linear velocity.

## Manipulability Measures

### Manipulability Ellipsoid

The manipulability measure is given by:

$$ w = \sqrt{\det(\mathbf{J}\mathbf{J}^T)} $$

### Condition Number

$$ \kappa = \frac{\sigma_{max}}{\sigma_{min}} $$

Where $\sigma_{max}$ and $\sigma_{min}$ are the maximum and minimum singular values of the Jacobian.

## Kinematic Constraints

### Closed-loop Constraints

For mechanisms with closed loops:

$$ \mathbf{f}(\boldsymbol{\theta}) = \mathbf{0} $$

### Velocity Constraints

$$ \mathbf{A}(\boldsymbol{\theta})\dot{\boldsymbol{\theta}} = \mathbf{0} $$

## Redundant Manipulators

For redundant manipulators where $n > 6$:

### Null Space Projection

$$ \dot{\boldsymbol{\theta}} = \mathbf{J}^+\dot{\mathbf{x}} + (\mathbf{I} - \mathbf{J}^+\mathbf{J})\boldsymbol{\nu} $$

Where $\mathbf{J}^+$ is the pseudoinverse and $\boldsymbol{\nu}$ represents motion in the null space.

## Jacobian Transpose for Redundant Systems

For optimization in null space:

$$ \dot{\boldsymbol{\theta}} = \mathbf{J}^T(\mathbf{J}\mathbf{J}^T)^{-1}\dot{\mathbf{x}} + (\mathbf{I} - \mathbf{J}^T(\mathbf{J}\mathbf{J}^T)^{-1}\mathbf{J})\mathbf{k} $$

Where $\mathbf{k}$ is a vector that optimizes some secondary objective.

## Applications in Humanoid Robotics

### Balance Control

Kinematic equations are crucial for:
- Center of Mass tracking
- Zero Moment Point control
- Foot placement strategies
- Posture optimization

### Walking Pattern Generation

Kinematic constraints determine:
- Leg trajectory planning
- Footstep planning
- Joint limit avoidance
- Singularity avoidance

---
**Previous**: [Appendix A: Mathematical Foundations](./mathematical-foundations.md)