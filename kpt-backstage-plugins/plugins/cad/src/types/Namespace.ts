import { KubernetesKeyValueObject } from './KubernetesResource';

export type Namespace = {
  kind: string;
  apiVersion: string;
  metadata: NamespaceMetadata;
};

export type NamespaceMetadata = {
  name: string;
  labels?: KubernetesKeyValueObject;
  annotations?: KubernetesKeyValueObject;
};
