import { ConfigMap } from '../../../../../../types/ConfigMap';
import { KubernetesResource } from '../../../../../../types/KubernetesResource';
import { Metadata } from '../StructuredMetadata';

export const getConfigMapStructuredMetadata = (
  resource: KubernetesResource,
): Metadata => {
  const configMap = resource as ConfigMap;

  return {
    data: configMap.data,
  };
};
