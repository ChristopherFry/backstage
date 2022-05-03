export type KubernetesResource = {
  kind: string;
  apiVersion: string;
  metadata: KubernetesResourceMetadata;
};

export type KubernetesResourceMetadata = {
  name: string;
  namespace?: string;
  labels?: KubernetesKeyValueObject;
  annotations?: KubernetesKeyValueObject;
};

export type KubernetesKeyValueObject = {
  [key: string]: string;
};
