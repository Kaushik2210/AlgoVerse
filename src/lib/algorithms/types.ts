export interface VisualizerStep<T> {
  state: T;
  narration: string;
  /** 1-indexed line number in the accompanying code panel to highlight */
  highlightedLine?: number;
  stats?: Record<string, number | string>;
}

export type StepSequence<T> = VisualizerStep<T>[];
