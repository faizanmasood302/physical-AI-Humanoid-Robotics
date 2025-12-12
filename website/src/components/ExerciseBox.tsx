import React from 'react';
import clsx from 'clsx';
import styles from './ExerciseBox.module.css';

interface ExerciseBoxProps {
  title: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  duration?: number;
  children: React.ReactNode;
}

const ExerciseBox: React.FC<ExerciseBoxProps> = ({
  title,
  difficulty = 'intermediate',
  duration,
  children
}) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'beginner':
        return 'var(--ifm-color-education-secondary)';
      case 'intermediate':
        return 'var(--ifm-color-education-warning)';
      case 'advanced':
        return 'var(--ifm-color-education-caution)';
      case 'expert':
        return 'var(--ifm-color-education-caution)';
      default:
        return 'var(--ifm-color-education-warning)';
    }
  };

  return (
    <div className={clsx('alert', 'alert--secondary', styles.exerciseBox)}>
      <div className={styles.exerciseHeader}>
        <h3 className={styles.exerciseTitle}>
          <span className={styles.exerciseIcon}>📝</span> {title}
        </h3>
        <div className={styles.exerciseMeta}>
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
              ⏱️ {duration} min
            </span>
          )}
        </div>
      </div>
      <div className={styles.exerciseContent}>
        {children}
      </div>
    </div>
  );
};

export default ExerciseBox;