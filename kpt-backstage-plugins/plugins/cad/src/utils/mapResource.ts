import { load } from 'js-yaml';
import { KubernetesResource } from '../types/KubernetesResource';
import { PackageRevisionResourcesMap } from '../types/PackageRevisionResource';
import { getResourcesFromMultiResourceYaml } from './yaml';

export type PackageResource = {
  id: string;
  filename: string;
  kind: string;
  name: string;
  namespace?: string;
  yaml: string;
  resourceIndex: number;
};

export const getKubernetesMapResourcesList = (
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
