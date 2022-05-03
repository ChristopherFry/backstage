export type Function = {
  apiVersion: string;
  kind: string;
  metadata: FunctionMetadata;
  spec: FunctionSpec;
};

export type FunctionMetadata = {
  name: string;
  namespace?: string;
  creationTimestamp?: string;
};

export type FunctionSpec = {
  description: string;
  documentationUrl?: string;
  functionTypes: string[];
  keywords: string[];
  image: string;
  repositoryRef: FunctionRepositoryRef;
};

export type FunctionRepositoryRef = {
  name: string;
};
