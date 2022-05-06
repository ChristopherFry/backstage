import { KubernetesKeyValueObject } from './KubernetesResource';

export type ApplyReplacement = {
  kind: string;
  apiVersion: string;
  metadata: ApplyReplacementMetadata;
  replacements: ApplyReplacementReplacement[];
};

export type ApplyReplacementMetadata = {
  name: string;
  labels?: KubernetesKeyValueObject;
  annotations?: KubernetesKeyValueObject;
};

export type ApplyReplacementReplacement = {
  source: ReplacementSource;
  targets: ReplacementTarget[];
};

export type ReplacementSource = ReplacementResourceSelector & {
  fieldPath?: string;
};

export type ReplacementTarget = {
  select: ReplacementResourceSelector;
  fieldPaths: string[];
  options?: ReplacementOptions;
};

export type ReplacementResourceSelector = {
  kind?: string;
  name?: string;
};

export type ReplacementOptions = {
  delimiter?: string;
  index?: number;
};
