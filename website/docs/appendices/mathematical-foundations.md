---
title: Appendix A - Mathematical Foundations
sidebar_position: 1
description: Essential mathematical formulas and concepts for Physical AI and Humanoid Robotics
---

# Appendix A: Mathematical Foundations

## Overview

This appendix provides the essential mathematical foundations required for understanding Physical AI and Humanoid Robotics. These mathematical tools are fundamental to modeling, control, perception, and learning in humanoid robotic systems.

## Linear Algebra

### Vectors and Matrices

For representing positions, orientations, and transformations:

$$ \mathbf{v} = \begin{bmatrix} v_x \\ v_y \\ v_z \end{bmatrix}, \quad \mathbf{R} = \begin{bmatrix} r_{11} & r_{12} & r_{13} \\ r_{21} & r_{22} & r_{23} \\ r_{31} & r_{32} & r_{33} \end{bmatrix} $$

### Rotation Matrices

For representing orientations in 3D space:

$$ \mathbf{R} \in SO(3) = \{ \mathbf{R} \in \mathbb{R}^{3 \times 3} : \mathbf{R}^T\mathbf{R} = \mathbf{I}, \det(\mathbf{R}) = 1 \} $$

### Cross Product Matrix

For angular velocity and torque calculations:

$$ \mathbf{v}^\wedge = \begin{bmatrix} 0 & -v_z & v_y \\ v_z & 0 & -v_x \\ -v_y & v_x & 0 \end{bmatrix} $$

## Kinematics

### Forward Kinematics

$$ \mathbf{T}_i = \mathbf{T}_{i-1} \cdot \text{Transform}(q_i, \text{DH-parameters}) $$

### Jacobian Matrix

Relates joint velocities to end-effector velocities:

$$ \mathbf{v} = \mathbf{J}(\mathbf{q}) \cdot \dot{\mathbf{q}} $$

Where $\mathbf{J}$ is the Jacobian matrix.

## Dynamics

### Newton-Euler Equations

For rigid body dynamics:

$$ \mathbf{f} = m\mathbf{a} $$
$$ \mathbf{\tau} = \mathbf{I}\mathbf{\alpha} + \mathbf{\omega} \times (\mathbf{I}\mathbf{\omega}) $$

### Lagrangian Dynamics

For complex multi-body systems:

$$ \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_i}\right) - \frac{\partial L}{\partial q_i} = Q_i $$

Where $L = T - V$ (kinetic minus potential energy).

### Euler-Lagrange for Robotic Systems

$$ \mathbf{M}(\mathbf{q})\ddot{\mathbf{q}} + \mathbf{C}(\mathbf{q},\dot{\mathbf{q}})\dot{\mathbf{q}} + \mathbf{g}(\mathbf{q}) = \boldsymbol{\tau} $$

Where:
- $\mathbf{M}(\mathbf{q})$ is the mass matrix
- $\mathbf{C}(\mathbf{q},\dot{\mathbf{q}})$ represents Coriolis and centrifugal forces
- $\mathbf{g}(\mathbf{q})$ represents gravitational forces
- $\boldsymbol{\tau}$ represents joint torques

## Control Theory

### Linear Systems

$$ \dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\mathbf{u} $$
$$ \mathbf{y} = \mathbf{C}\mathbf{x} + \mathbf{D}\mathbf{u} $$

### PID Controller

$$ u(t) = K_p e(t) + K_i \int_0^t e(\tau) d\tau + K_d \frac{de(t)}{dt} $$

### Linear Quadratic Regulator (LQR)

Minimizes the cost function:

$$ J = \int_0^\infty [\mathbf{x}^T(t)\mathbf{Q}\mathbf{x}(t) + \mathbf{u}^T(t)\mathbf{R}\mathbf{u}(t)] dt $$

Optimal control law: $\mathbf{u} = -\mathbf{K}\mathbf{x}$

## Bipedal Locomotion

### Linear Inverted Pendulum Model (LIPM)

$$ \ddot{\mathbf{x}} = \frac{g}{h}(\mathbf{x} - \mathbf{z}) $$

Where $\mathbf{x}$ is the center of mass position, $\mathbf{z}$ is the Zero Moment Point (ZMP), $h$ is the CoM height.

### Capture Point

$$ \mathbf{x}_{capture} = \mathbf{x}_{CoM} + \sqrt{\frac{h}{g}}\dot{\mathbf{x}}_{CoM} $$

### ZMP Stability Condition

For stable walking, the ZMP must remain within the support polygon:
$$ \mathbf{z}_{min} \leq \mathbf{z} \leq \mathbf{z}_{max} $$

## Probability and Statistics

### Bayes' Rule

$$ P(A|B) = \frac{P(B|A)P(A)}{P(B)} $$

### Gaussian Distribution

$$ \mathcal{N}(\mathbf{x}|\boldsymbol{\mu}, \boldsymbol{\Sigma}) = \frac{1}{\sqrt{(2\pi)^n|\boldsymbol{\Sigma}|}} \exp\left(-\frac{1}{2}(\mathbf{x}-\boldsymbol{\mu})^T\boldsymbol{\Sigma}^{-1}(\mathbf{x}-\boldsymbol{\mu})\right) $$

### Kalman Filter

**Prediction:**
$$ \hat{\mathbf{x}}_{k|k-1} = \mathbf{F}_k\hat{\mathbf{x}}_{k-1|k-1} + \mathbf{B}_k\mathbf{u}_k $$
$$ \mathbf{P}_{k|k-1} = \mathbf{F}_k\mathbf{P}_{k-1|k-1}\mathbf{F}_k^T + \mathbf{Q}_k $$

**Update:**
$$ \mathbf{K}_k = \mathbf{P}_{k|k-1}\mathbf{H}_k^T(\mathbf{H}_k\mathbf{P}_{k|k-1}\mathbf{H}_k^T + \mathbf{R}_k)^{-1} $$
$$ \hat{\mathbf{x}}_{k|k} = \hat{\mathbf{x}}_{k|k-1} + \mathbf{K}_k(\mathbf{z}_k - \mathbf{H}_k\hat{\mathbf{x}}_{k|k-1}) $$
$$ \mathbf{P}_{k|k} = (\mathbf{I} - \mathbf{K}_k\mathbf{H}_k)\mathbf{P}_{k|k-1} $$

## Optimization

### Quadratic Programming

Minimize:
$$ \frac{1}{2}\mathbf{x}^T\mathbf{P}\mathbf{x} + \mathbf{q}^T\mathbf{x} $$

Subject to:
$$ \mathbf{G}\mathbf{x} \leq \mathbf{h} $$
$$ \mathbf{A}\mathbf{x} = \mathbf{b} $$

### Model Predictive Control (MPC)

$$ \min_{\mathbf{U}} \sum_{k=0}^{N-1} \mathbf{x}_k^T\mathbf{Q}\mathbf{x}_k + \mathbf{u}_k^T\mathbf{R}\mathbf{u}_k + \mathbf{x}_N^T\mathbf{P}\mathbf{x}_N $$

Subject to system dynamics and constraints.

## Machine Learning

### Reinforcement Learning

**Bellman Equation:**
$$ V^\pi(s) = \mathbb{E}_\pi\left[ r_t + \gamma V^\pi(s_{t+1}) | s_t = s \right] $$

**Q-Learning Update:**
$$ Q(s,a) \leftarrow Q(s,a) + \alpha[r + \gamma \max_{a'} Q(s',a') - Q(s,a)] $$

### Neural Networks

For function approximation:
$$ \mathbf{y} = \sigma(\mathbf{W}_2 \cdot \sigma(\mathbf{W}_1 \cdot \mathbf{x} + \mathbf{b}_1) + \mathbf{b}_2) $$

## Differential Equations

### State-Space Representation

$$ \dot{\mathbf{x}}(t) = \mathbf{f}(\mathbf{x}(t), \mathbf{u}(t), t) $$
$$ \mathbf{y}(t) = \mathbf{g}(\mathbf{x}(t), \mathbf{u}(t), t) $$

### Numerical Integration (Euler Method)

$$ \mathbf{x}_{k+1} = \mathbf{x}_k + \Delta t \cdot \mathbf{f}(\mathbf{x}_k, \mathbf{u}_k, t_k) $$

## Transformations

### Homogeneous Transformations

$$ \mathbf{T} = \begin{bmatrix} \mathbf{R} & \mathbf{p} \\ \mathbf{0}^T & 1 \end{bmatrix} $$

### Denavit-Hartenberg Parameters

For describing robot kinematics:
$$ \mathbf{T}_i = \begin{bmatrix}
\cos\theta_i & -\sin\theta_i\cos\alpha_i & \sin\theta_i\sin\alpha_i & a_i\cos\theta_i \\
\sin\theta_i & \cos\theta_i\cos\alpha_i & -\cos\theta_i\sin\alpha_i & a_i\sin\theta_i \\
0 & \sin\alpha_i & \cos\alpha_i & d_i \\
0 & 0 & 0 & 1
\end{bmatrix} $$

## Common Mathematical Notations in Robotics

| Symbol | Meaning |
|--------|---------|
| $\mathbf{SO(3)}$ | Special Orthogonal group (rotation matrices) |
| $\mathbf{SE(3)}$ | Special Euclidean group (rigid body transformations) |
| $\mathfrak{se}(3)$ | Lie algebra of SE(3) |
| $\wedge$ | Skew-symmetric matrix operator |
| $\vee$ | Vector reconstruction from skew-symmetric matrix |
| $\text{Ad}(\cdot)$ | Adjoint transformation |
| $\text{ad}(\cdot)$ | Adjoint operator |

## Vector Calculus for Robotics

### Gradient

$$ \nabla f = \begin{bmatrix} \frac{\partial f}{\partial x} \\ \frac{\partial f}{\partial y} \\ \frac{\partial f}{\partial z} \end{bmatrix} $$

### Jacobian (multivariable case)

$$ \mathbf{J} = \frac{\partial \mathbf{f}}{\partial \mathbf{x}} = \begin{bmatrix}
\frac{\partial f_1}{\partial x_1} & \cdots & \frac{\partial f_1}{\partial x_n} \\
\vdots & \ddots & \vdots \\
\frac{\partial f_m}{\partial x_1} & \cdots & \frac{\partial f_m}{\partial x_n}
\end{bmatrix} $$

---
**Next**: [Appendix B: Kinematics Equations](./kinematics-equations.md)