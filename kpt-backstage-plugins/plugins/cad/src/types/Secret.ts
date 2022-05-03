import { KubernetesKeyValueObject } from './KubernetesResource';

export type ListSecrets = {
  kind: string;
  apiVersion: string;
  items: Secret[];
};

export type Secret = {
  kind: string;
  apiVersion: string;
  metadata: SecretMetadata;
  type: string;
  data: KubernetesKeyValueObject;
};

export type SecretMetadata = {
  name: string;
  namespace: string;
  labels?: KubernetesKeyValueObject;
  annotations?: KubernetesKeyValueObject;
};
