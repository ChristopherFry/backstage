import React from 'react';
import { getApplyReplacementsStructuredMetadata } from './FirstClassViewers/StructuredMetadata/resources/applyReplacements';
import { getConfigMapStructuredMetadata } from './FirstClassViewers/StructuredMetadata/resources/configMap';
import { getKptfileStructuredMetadata } from './FirstClassViewers/StructuredMetadata/resources/kptfile';
import { getResourceQuotaStructuredMetadata } from './FirstClassViewers/StructuredMetadata/resources/resourceQuota';
import { getRoleStructuredMetadata } from './FirstClassViewers/StructuredMetadata/resources/role';
import { getRoleBindingStructuredMetadata } from './FirstClassViewers/StructuredMetadata/resources/roleBinding';
import { StructuredMetadata } from './FirstClassViewers/StructuredMetadata/StructuredMetadata';

type FirstClassViewerSelectorProps = {
  apiVersion: string;
  kind: string;
  yaml: string;
};

export const FirstClassViewerSelector = ({
  apiVersion,
  kind,
  yaml,
}: FirstClassViewerSelectorProps) => {
  const groupVersionKind = `${apiVersion}/${kind}`;

  switch (groupVersionKind) {
    case 'fn.kpt.dev/v1alpha1/ApplyReplacements':
      return (
        <StructuredMetadata
          yaml={yaml}
          getCustomMetadata={getApplyReplacementsStructuredMetadata}
        />
      );

    case 'kpt.dev/v1/Kptfile':
      return (
        <StructuredMetadata
          yaml={yaml}
          getCustomMetadata={getKptfileStructuredMetadata}
        />
      );

    case 'rbac.authorization.k8s.io/v1/Role':
      return (
        <StructuredMetadata
          yaml={yaml}
          getCustomMetadata={getRoleStructuredMetadata}
        />
      );

    case 'rbac.authorization.k8s.io/v1/RoleBinding':
      return (
        <StructuredMetadata
          yaml={yaml}
          getCustomMetadata={getRoleBindingStructuredMetadata}
        />
      );

    case 'v1/ConfigMap':
      return (
        <StructuredMetadata
          yaml={yaml}
          getCustomMetadata={getConfigMapStructuredMetadata}
        />
      );

    case 'v1/Namespace':
      return <StructuredMetadata yaml={yaml} />;

    case 'v1/ServiceAccount':
      return <StructuredMetadata yaml={yaml} />;

    case 'v1/ResourceQuota':
      return (
        <StructuredMetadata
          yaml={yaml}
          getCustomMetadata={getResourceQuotaStructuredMetadata}
        />
      );

    default:
  }

  return <StructuredMetadata yaml={yaml} />;
};
