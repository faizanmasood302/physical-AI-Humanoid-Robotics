import React from 'react';
import clsx from 'clsx';
import styles from './ProjectBox.module.css';

interface ProjectBoxProps {
  title: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  duration?: number; // in hours
  children: React.ReactNode;
}

const ProjectBox: React.FC<ProjectBoxProps> = ({
  title,
  difficulty = 'advanced',
  duration,
  children
}) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'beginner':
        return 'var(--ifm-color-education-accent)';
      case 'intermediate':
        return 'var(--ifm-color-education-warning)';
      case 'advanced':
        return 'var(--ifm-color-education-caution)';
      case 'expert':
        return 'var(--ifm-color-education-caution)';
      default:
        return 'var(--ifm-color-education-caution)';
    }
  };

  return (
    <div className={clsx('alert', 'alert--success', styles.projectBox)}>
      <div className={styles.projectHeader}>
        <h3 className={styles.projectTitle}>
          <span className={styles.projectIcon}>🏗️</span> {title}
        </h3>
        <div className={styles.projectMeta}>
          {difficulty && (
            <span
              className={styles.difficultyTag}
              style={{ backgroundColor: getDifficultyColor() }}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          )}
          {duration && (
            <span className={styles.durationTag}>
              ⏱️ {duration} hrs
            </span>
          )}
        </div>
      </div>
      <div className={styles.projectContent}>
        {children}
      </div>
    </div>
  );
};

export default ProjectBox;