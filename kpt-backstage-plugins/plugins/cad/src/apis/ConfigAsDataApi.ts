import { createApiRef } from '@backstage/core-plugin-api';
import { Function } from '../types/Function';
import { PackageRevision } from '../types/PackageRevision';
import { PackageRevisionResources } from '../types/PackageRevisionResource';
import { ListRepositories, Repository } from '../types/Repository';
import { ListRootSyncs, RootSync } from '../types/RootSync';
import { ListSecrets, Secret } from '../types/Secret';

export type ConfigAsDataApi = {
  getFeatures(): Promise<void>;

  createSecret(secret: Secret): Promise<Secret>;

  getSecret(name: string): Promise<Secret>;

  deleteSecret(name: string, namespace?: string): Promise<void>;

  listSecrets(): Promise<ListSecrets>;

  registerRepository(repository: Repository): Promise<Repository>;

  listRepositories(): Promise<ListRepositories>;

  getRepository(name: string): Promise<Repository>;

  unregisterRepository(repositoryName: string): Promise<void>;

  createPackageRevision(
    packageRevision: PackageRevision,
  ): Promise<PackageRevision>;

  listPackageRevisions(repositoryName?: string): Promise<PackageRevision[]>;

  getPackageRevision(fullPackageName: string): Promise<PackageRevision>;

  replacePackageRevision(
    packageRevision: PackageRevision,
  ): Promise<PackageRevision>;

  approvePackageRevision(
    packageRevision: PackageRevision,
  ): Promise<PackageRevision>;

  deletePackageRevision(fullPackageName: string): Promise<void>;

  replacePackageRevisionResources(
    packageRevisionResources: PackageRevisionResources,
  ): Promise<void>;

  getPackageRevisionResources(
    packageName: string,
  ): Promise<PackageRevisionResources>;

  listCatalogFunctions(): Promise<Function[]>;

  listFunctions(repositoryName?: string): Promise<Function[]>;

  listRootSyncs(): Promise<ListRootSyncs>;

  getRootSync(name: string): Promise<RootSync>;

  createRootSync(sync: RootSync): Promise<RootSync>;

  deleteRootSync(name: string): Promise<void>;
};

export const configAsDataApiRef = createApiRef<ConfigAsDataApi>({
  id: 'plugin.config-as-data.service',
});
