import { KubernetesKeyValueObject } from './KubernetesResource';

export type ListRootSyncs = {
  kind: string;
  apiVersion: string;
  items: RootSync[];
};

export type RootSync = {
  apiVersion: string;
  kind: string;
  metadata: RootSyncMetadata;
  spec: RootSyncSpec;
  status?: RootSyncStatus;
};

export type RootSyncMetadata = {
  name: string;
  namespace: string;
  labels?: KubernetesKeyValueObject;
  annotations?: KubernetesKeyValueObject;
};

export type RootSyncSpec = {
  sourceFormat: string;
  git: RootSyncGit;
};

export type RootSyncGit = {
  repo: string;
  dir: string;
  revision?: string;
  branch: string;
  auth?: string;
  secretRef?: RootSyncSecretRef;
};

export type RootSyncSecretRef = {
  name: string;
};

export type RootSyncStatus = {
  conditions: RootSyncStatusCondition[];
  source: RootSyncStatusSource;
  sync: RootSyncStatusSync;
  rendering: RootSyncStatusRendering;
};

export type RootSyncStatusSource = {
  errors?: SyncError[];
  commit: string;
};

export type RootSyncStatusSync = {
  errors?: SyncError[];
  commit: string;
};
export type RootSyncStatusRendering = {
  errors?: SyncError[];
  commit: string;
};

export enum SyncConditionType {
  STALLED = 'Stalled',
  RECONCILING = 'Reconciling',
  SYNCING = 'Syncing',
}

export enum SyncConditionStatus {
  TRUE = 'True',
  FALSE = 'False',
}

export type SyncStatusConditionErrorSummary = {
  totalCount?: number;
};

export type RootSyncStatusCondition = {
  message: string;
  status: string;
  type: string;
  reason: string;
  errors?: SyncError[];
  errorSummary?: SyncStatusConditionErrorSummary;
};

export type SyncError = {
  code: string;
  errorMessage: string;
};
