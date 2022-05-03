import { ConfigAsDataApi } from '../apis';
import {
  Repository,
  RepositoryGitDetails,
  RepositoryOciDetails,
  RepositoryUpstream,
} from '../types/Repository';
import { RepositorySummary } from '../types/RepositorySummary';
import { isBlueprintRepository } from './repository';

type RepositoryDetails = RepositoryUpstream;

export const listRepositorySummaries = async (
  api: ConfigAsDataApi,
): Promise<RepositorySummary[]> => {
  const { items: repositories } = await api.listRepositories();

  const repositorySummaries: RepositorySummary[] = repositories.map(
    repository => ({ repository: repository, downstreamRepositories: [] }),
  );

  const gitRepoString = (git?: RepositoryGitDetails): string =>
    git ? `${git.repo}:${git.branch}:${git.directory}` : '';
  const ociRepoString = (oci?: RepositoryOciDetails): string =>
    oci ? oci.registry : '';
  const getRepoString = (repoDetails: RepositoryDetails) =>
    `${repoDetails.type}:${gitRepoString(repoDetails.git)}:${ociRepoString(
      repoDetails.oci,
    )}`;

  for (const repositorySummary of repositorySummaries) {
    const repository = repositorySummary.repository;

    if (repository.spec.upstream) {
      repositorySummary.upstreamRepository = repositories.find(
        r =>
          repository.spec.upstream &&
          getRepoString(r.spec) === getRepoString(repository.spec.upstream),
      );
    }

    if (isBlueprintRepository(repository)) {
      repositorySummary.downstreamRepositories = repositories.filter(
        r =>
          r.spec.upstream &&
          getRepoString(r.spec.upstream) === getRepoString(repository.spec),
      );
    }
  }

  return repositorySummaries;
};

export const getRepositorySummary = async (
  api: ConfigAsDataApi,
  name: string,
): Promise<RepositorySummary> => {
  const repositorySummaries = await listRepositorySummaries(api);
  const repositorySummary = repositorySummaries.find(
    summary => summary.repository.metadata.name === name,
  );

  if (!repositorySummary) {
    throw new Error(`Repository ${name} does not exist`);
  }

  return repositorySummary;
};

export const fitlerRepositorySummary = (
  repositorySummaries: RepositorySummary[],
  repositoryFilter: (repository: Repository) => boolean,
): RepositorySummary[] => {
  return repositorySummaries.filter(summary =>
    repositoryFilter(summary.repository),
  );
};
