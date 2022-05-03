import { KubernetesResource } from '../../../../../../types/KubernetesResource';
import { ResourceQuota } from '../../../../../../types/ResourceQuota';
import { Metadata } from '../StructuredMetadata';

export const getResourceQuotaStructuredMetadata = (
  resource: KubernetesResource,
): Metadata => {
  const resourceQuota = resource as ResourceQuota;

  return {
    'Resource Limits': resourceQuota.spec.hard,
  };
};
