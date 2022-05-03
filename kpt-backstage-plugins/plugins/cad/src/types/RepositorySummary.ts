import { Repository } from './Repository';

export type RepositorySummary = {
  repository: Repository;
  upstreamRepository?: Repository;
  downstreamRepositories: Repository[];
};
