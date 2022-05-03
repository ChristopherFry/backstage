export type ListRepositories = {
  kind: string;
  apiVersion: string;
  items: Repository[];
};

export type Repository = {
  apiVersion: string;
  kind: string;
  metadata: RepositoryMetadata;
  spec: RepositorySpec;
};

export type RepositoryMetadata = {
  name: string;
  namespace: string;
};

export type RepositorySpec = {
  type: RepositoryType;
  description: string;
  content: RepositoryContent;
  deployment?: boolean;
  git?: RepositoryGitDetails;
  oci?: RepositoryOciDetails;
  upstream?: RepositoryUpstream;
};

export enum RepositoryType {
  GIT = 'git',
  OCI = 'oci',
}

export enum RepositoryContent {
  PACKAGE = 'Package',
  FUNCTION = 'Function',
}

export type RepositoryGitDetails = {
  repo: string;
  branch: string;
  directory: string;
  secretRef?: RepositorySecretRef;
};

export type RepositorySecretRef = {
  name: string;
};

export type RepositoryOciDetails = {
  registry: string;
  secretRef?: RepositorySecretRef;
};

export type RepositoryUpstream = {
  type: RepositoryType;
  git?: RepositoryGitDetails;
  oci?: RepositoryOciDetails;
};
