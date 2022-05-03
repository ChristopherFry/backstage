import { KubeConfig } from '@kubernetes/client-node';
import { ClusterLocatorMethodType } from './config';

export const getKubernetesConfig = (
  clusterLocatorMethodType: ClusterLocatorMethodType,
): KubeConfig => {
  const kubeConfig = new KubeConfig();

  switch (clusterLocatorMethodType) {
    case ClusterLocatorMethodType.IN_CLUSTER:
      kubeConfig.loadFromCluster();
      break;
    case ClusterLocatorMethodType.CURRENT_CONTEXT:
      kubeConfig.loadFromDefault();
      break;
    default:
      throw new Error(
        `Unknown cluster locator method type, ${clusterLocatorMethodType}`,
      );
  }

  return kubeConfig;
};
