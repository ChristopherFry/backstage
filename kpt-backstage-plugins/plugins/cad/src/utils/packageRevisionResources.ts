import {
  PackageRevisionResources,
  PackageRevisionResourcesMap,
} from '../types/PackageRevisionResource';

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
