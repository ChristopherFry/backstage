import { KubernetesKeyValueObject } from './KubernetesResource';

export type Kptfile = {
  kind: string;
  apiVersion: string;
  metadata: KptfileMetadata;
  info: KptfileInfo;
  pipeline: KptfilePipeline;
  upstream?: KptfileUpstream;
};

export type KptfileMetadata = {
  name: string;
  namespace?: string;
  labels?: KubernetesKeyValueObject;
  annotations?: KubernetesKeyValueObject;
};

export type KptfileInfo = {
  description: string;
  keywords: string[];
};

export type KptfilePipeline = {
  mutators?: KptfileFunction[];
  validators?: KptfileFunction[];
};

export type KptfileFunction = {
  image: string;
  configPath?: string;
};

export type KptfileUpstream = {
  git?: KptfileGitUpstream;
};

export type KptfileGitUpstream = {
  repo: string;
  directory: string;
  ref: string;
};
