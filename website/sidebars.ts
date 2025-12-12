import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  textbookSidebar: [
    {
      type: 'category',
      label: 'Chapters',
      items: [
        'chapters/chapter-1-introduction',
        'chapters/chapter-2-fundamentals',
        'chapters/chapter-3-humanoid-fundamentals',
        'chapters/chapter-4-sensing-perception',
        'chapters/chapter-5-control-systems',
        'chapters/chapter-6-locomotion-control',
        'chapters/chapter-7-ai-algorithms',
      ],
    },
    {
      type: 'category',
      label: 'Exercises',
      items: [
        'exercises/exercise-1',
        'exercises/exercise-2',
        'exercises/exercise-3',
        'exercises/exercise-4',
      ],
    },
    {
      type: 'category',
      label: 'Projects',
      items: [
        'projects/project-1',
        'projects/project-2',
      ],
    },
    {
      type: 'category',
      label: 'Appendices',
      items: [
        'appendices/mathematical-foundations',
        'appendices/kinematics-equations',
      ],
    },
  ],
};

export default sidebars;
