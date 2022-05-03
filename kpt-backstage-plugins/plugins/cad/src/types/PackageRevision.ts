import { KubernetesKeyValueObject } from './KubernetesResource';

export type PackageRevision = {
  kind: string;
  apiVersion: string;
  metadata: PackageRevisionMetadata;
  spec: PackageRevisionSpec;
};

export type PackageRevisionMetadata = {
  name: string;
  namespace: string;
  creationTimestamp?: string;
  labels?: KubernetesKeyValueObject;
};

export type PackageRevisionSpec = {
  packageName: string;
  repository: string;
  revision: string;
  lifecycle: PackageRevisionLifecycle;
  tasks?: PackageRevisionTask[];
};

export enum PackageRevisionLifecycle {
  DRAFT = 'Draft',
  PROPOSED = 'Proposed',
  PUBLISHED = 'Published',
}

export type PackageRevisionTask = {
  type: string;
  init?: PackageRevisionTaskInit;
  clone?: PackageRevisionTaskClone;
  eval?: PackageRevisionTaskEval;
};

export type PackageRevisionTaskInit = {
  description: string;
  keywords?: string[];
  site?: string;
};

export type PackageRevisionTaskClone = {
  upstreamRef: PackageRevisionTaskCloneUpstreamRef;
};

export type PackageRevisionTaskCloneUpstreamRef = {
  upstreamRef: PackageRevisionTaskCloneUpstreamRefNamedRepository;
};

export type PackageRevisionTaskCloneUpstreamRefNamedRepository = {
  name: string;
};

export type PackageRevisionTaskEval = {
  image: string;
  configMap: PackageRevisionTaskEvalConfigMap;
};

export type PackageRevisionTaskEvalConfigMap = {
  [key: string]: string;
};
