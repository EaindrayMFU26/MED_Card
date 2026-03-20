/**
 * Custom Hook: useChecklistProgress
 * Calculates progress from checklist items
 * DRY: Used in multiple screens to avoid duplicate logic
 */

import { useMemo } from 'react';
import { PROGRESS } from '../../core/constants/appConstants';

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

interface ChecklistMetrics {
  completedCount: number;
  totalCount: number;
  progress: number;
  isComplete: boolean;
}

/**
 * Calculate checklist progress metrics
 * @param checklist Array of checklist items
 * @returns Progress metrics
 */
export const useChecklistProgress = (checklist: ChecklistItem[]): ChecklistMetrics => {
  return useMemo(() => {
    const completedCount = checklist.filter((item) => item.checked).length;
    const totalCount = Math.max(checklist.length, PROGRESS.minChecklistCount);
    const progress = Math.min(completedCount / totalCount, PROGRESS.maxValue);

    return {
      completedCount,
      totalCount,
      progress,
      isComplete: progress === PROGRESS.maxValue,
    };
  }, [checklist]);
};
