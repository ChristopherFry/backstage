import {
  Repository,
  RepositoryContent,
  RepositoryGitDetails,
  RepositoryOciDetails,
  RepositorySecretRef,
  RepositoryType,
  RepositoryUpstream,
} from '../types/Repository';

export const isFunctionRepository = (repository: Repository): boolean => {
  return repository.spec.content === RepositoryContent.FUNCTION;
};

export const isPackageRepository = (repository: Repository): boolean => {
  return repository.spec.content === RepositoryContent.PACKAGE;
};

export const isBlueprintRepository = (repository: Repository): boolean => {
  return isPackageRepository(repository) && !repository.spec.deployment;
};

export const isDeploymentRepository = (repository: Repository): boolean => {
  return isPackageRepository(repository) && !!repository.spec.deployment;
};

export const getPackageDescriptor = (repository: Repository): string => {
  if (isBlueprintRepository(repository)) return 'Blueprint';
  if (isDeploymentRepository(repository)) return 'Deployment';
  if (isFunctionRepository(repository)) return 'Function';

  return 'Unknown';
};

export const getRepositoryTitle = (repository: Repository): string => {
  return repository.metadata.name;
};

export const getRepositoryResource = (
  name: string,
  description: string,
  content: RepositoryContent,
  git?: RepositoryGitDetails,
  oci?: RepositoryOciDetails,
  upstream?: RepositoryUpstream,
  isDeployment?: boolean,
): Repository => {
  const namespace = 'default';

  const type = git ? RepositoryType.GIT : RepositoryType.OCI;
  const deployment = isDeployment ? true : undefined;

  const resource: Repository = {
    apiVersion: 'config.porch.kpt.dev/v1alpha1',
    kind: 'Repository',
    metadata: {
      name,
      namespace,
    },
    spec: {
      description,
      content,
      type,
      git,
      oci,
      deployment,
      upstream,
    },
  };

  return resource;
};

export const getRepositoryGitDetails = (
  repo: string,
  branch: string,
  directory: string,
  secretRef: RepositorySecretRef | undefined,
): RepositoryGitDetails => {
  const gitDetails: RepositoryGitDetails = {
    repo,
    branch,
    directory,
    secretRef,
  };

  return gitDetails;
};

export const getRepositoryOciDetails = (
  registry: string,
  secretRef: RepositorySecretRef | undefined,
): RepositoryOciDetails => {
  const ociDetails: RepositoryOciDetails = {
    registry,
    secretRef,
  };

  return ociDetails;
};

export const getSecretRef = (secretName: string): RepositorySecretRef => {
  const secretRef: RepositorySecretRef = {
    name: secretName,
  };

  return secretRef;
};
