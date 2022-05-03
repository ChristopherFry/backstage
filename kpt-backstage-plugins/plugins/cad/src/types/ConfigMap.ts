import { KubernetesKeyValueObject } from './KubernetesResource';

export type ConfigMap = {
  kind: string;
  apiVersion: string;
  metadata: ConfigMapMetadata;
  data: KubernetesKeyValueObject;
};

export type ConfigMapMetadata = {
  name: string;
  namespace?: string;
  labels?: KubernetesKeyValueObject;
  annotations?: KubernetesKeyValueObject;
};
