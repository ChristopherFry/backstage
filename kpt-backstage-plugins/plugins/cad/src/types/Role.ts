import { KubernetesKeyValueObject } from './KubernetesResource';

export type Role = {
  kind: string;
  apiVersion: string;
  metadata: RoleMetadata;
  rules: RoleRule[];
};

export type RoleMetadata = {
  name: string;
  namespace?: string;
  labels?: KubernetesKeyValueObject;
  annotations?: KubernetesKeyValueObject;
};

export type RoleRule = {
  apiGroups?: string[];
  resources?: string[];
  verbs?: string[];
};
