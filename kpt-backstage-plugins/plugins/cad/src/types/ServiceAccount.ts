import { KubernetesKeyValueObject } from './KubernetesResource';

export type ServiceAccount = {
  kind: string;
  apiVersion: string;
  metadata: ServiceAccountMetadata;
};

export type ServiceAccountMetadata = {
  name: string;
  namespace?: string;
  labels?: KubernetesKeyValueObject;
  annotations?: KubernetesKeyValueObject;
};
