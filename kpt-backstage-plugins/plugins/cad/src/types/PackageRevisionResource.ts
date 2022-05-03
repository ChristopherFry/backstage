export type PackageRevisionResources = {
  apiVersion: string;
  kind: string;
  metadata: PackageRevisionResourcesMetadata;
  spec: PackageRevisionResourcesSpec;
};

export type PackageRevisionResourcesMetadata = {
  name: string;
  namespace: string;
};

export type PackageRevisionResourcesSpec = {
  resources: PackageRevisionResourcesMap;
};

export type PackageRevisionResourcesMap = {
  [key: string]: string;
};
