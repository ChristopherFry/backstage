import { KubernetesKeyValueObject } from './KubernetesResource';

export type ResourceQuota = {
  kind: string;
  apiVersion: string;
  metadata: ResourceQuotaMetadata;
  spec: ResourceQuotaSpec;
};

export type ResourceQuotaMetadata = {
  name: string;
  namespace?: string;
  labels?: KubernetesKeyValueObject;
  annotations?: KubernetesKeyValueObject;
};

export type ResourceQuotaSpec = {
  hard?: ResourceQuotaSpecHard;
};

export type ResourceQuotaSpecHard = {
  'requests.cpu'?: string;
  'requests.memory'?: string;
  'limits.cpu'?: string;
  'limits.memory'?: string;
  cpu?: string;
  memory?: string;
};
