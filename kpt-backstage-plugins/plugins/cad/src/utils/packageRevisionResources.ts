import { load } from 'js-yaml';
import { KubernetesResource } from '../types/KubernetesResource';
import {
  PackageRevisionResources,
  PackageRevisionResourcesMap,
} from '../types/PackageRevisionResource';
import { getResourcesFromMultiResourceYaml } from './yaml';

export type PackageResource = {
  id: string;
  kind: string;
  name: string;
  namespace?: string;
  yaml: string;
  filename: string;
  resourceIndex: number;
};

export const getPackageRevisionResourcesResource = (
  fullPackageName: string,
  resourcesMap: PackageRevisionResourcesMap,
): PackageRevisionResources => {
  const packageRevisionResources: PackageRevisionResources = {
    apiVersion: 'porch.kpt.dev/v1alpha1',
    kind: 'PackageRevisionResources',
    metadata: {
      name: fullPackageName,
      namespace: 'default',
    },
    spec: {
      resources: resourcesMap,
    },
  };

  return packageRevisionResources;
};

export const getPackageResourcesFromResourcesMap = (
  resourcesMap: PackageRevisionResourcesMap,
): PackageResource[] => {
  const yamlFileEntries = Object.entries(resourcesMap).filter(
    file => file[0].endsWith('.yaml') || file[0] === 'Kptfile',
  );

  const resources = yamlFileEntries.map(([filename, multiResourceYaml]) => {
    const resourcesYaml = getResourcesFromMultiResourceYaml(multiResourceYaml);

    return resourcesYaml.map((resourceYaml, index) => {
      const k8sResource = load(resourceYaml) as KubernetesResource;

      const uniqueId = `${k8sResource.kind}:${
        k8sResource.metadata.namespace ?? ''
      }:${k8sResource.metadata.name}`;

      return {
        id: uniqueId,
        filename: filename,
        kind: k8sResource.kind,
        name: k8sResource.metadata.name,
        namespace: k8sResource.metadata.namespace,
        yaml: resourceYaml,
        resourceIndex: index,
      };
    });
  });

  return resources.flat();
};
