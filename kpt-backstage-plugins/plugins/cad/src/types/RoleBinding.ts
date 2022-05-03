import { KubernetesKeyValueObject } from './KubernetesResource';

export type RoleBinding = {
  kind: string;
  apiVersion: string;
  metadata: RoleBindingMetadata;
  roleRef: RoleBindingRoleRef;
  subjects: RoleBindingSubject[];
};

export type RoleBindingMetadata = {
  name: string;
  namespace?: string;
  labels?: KubernetesKeyValueObject;
  annotations?: KubernetesKeyValueObject;
};

export type RoleBindingRoleRef = {
  kind: string;
  name: string;
  apiGroup: string;
};

export type RoleBindingSubject = {
  kind: string;
  name: string;
  apiGroup?: string;
};
