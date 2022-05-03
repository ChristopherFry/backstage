import { StructuredMetadataTable } from '@backstage/core-components';
import { load } from 'js-yaml';
import React from 'react';
import { KubernetesResource } from '../../../../../types/KubernetesResource';

export type Metadata = {
  [key: string]: any;
};

type StructuredMetadataProps = {
  yaml: string;
  getCustomMetadata?: (resource: KubernetesResource) => Metadata;
};

export const StructuredMetadata = ({
  yaml,
  getCustomMetadata,
}: StructuredMetadataProps) => {
  const resource = load(yaml) as KubernetesResource;

  const baseMetadata = {
    name: resource.metadata.name,
    namespace: resource.metadata.namespace,
    kind: resource.kind,
    labels: resource.metadata.labels,
    annotations: resource.metadata.annotations,
  };

  const customMetadata = getCustomMetadata ? getCustomMetadata(resource) : {};

  const completeMetadata: Metadata = {
    ...baseMetadata,
    ...customMetadata,
  };

  Object.keys(completeMetadata).forEach(key => {
    if (completeMetadata[key] === undefined || completeMetadata[key] === '') {
      delete completeMetadata[key];
    }
    if (
      !Array.isArray(completeMetadata[key]) &&
      typeof completeMetadata[key] === 'object'
    ) {
      completeMetadata[key] = Object.entries(completeMetadata[key]).map(
        ([thisKey, value]) => `${thisKey} = ${value}`,
      );
    }
  });

  return <StructuredMetadataTable metadata={completeMetadata} />;
};
