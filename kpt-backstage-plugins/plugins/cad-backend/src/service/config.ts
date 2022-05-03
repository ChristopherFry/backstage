import { Config } from '@backstage/config';

export enum ClusterLocatorMethodType {
  CURRENT_CONTEXT = 'current-context',
  IN_CLUSTER = 'in-cluster',
}

export enum ClusterLocatorAuthProvider {
  CURRENT_CONTEXT = 'current-context',
  GOOGLE = 'google',
}

export const getClusterLocatorMethodType = (
  config: Config,
): ClusterLocatorMethodType => {
  const methodType = config.getString('clusterLocatorMethod.type');

  if (!Object.values(ClusterLocatorAuthProvider)) {
    throw new Error(`Unknown clusterLocatorMethod.type, ${methodType}`);
  }

  return methodType as ClusterLocatorMethodType;
};

export const getClusterLocatorMethodAuthProvider = (
  config: Config,
): ClusterLocatorAuthProvider => {
  const authProvider = config.getString('clusterLocatorMethod.authProvider');

  if (!Object.values(ClusterLocatorAuthProvider)) {
    throw new Error(
      `Unknown clusterLocatorMethod.authProvider, ${authProvider}`,
    );
  }

  return authProvider as ClusterLocatorAuthProvider;
};
