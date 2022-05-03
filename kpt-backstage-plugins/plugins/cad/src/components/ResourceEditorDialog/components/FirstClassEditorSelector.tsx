import { Typography } from '@material-ui/core';
import React from 'react';
import { PackageRevisionResourcesMap } from '../../../types/PackageRevisionResource';
import { ConfigMapEditor } from './FirstClassEditors/ConfigMapEditor';
import { KptfileEditor } from './FirstClassEditors/KptfileEditor';
import { NamespaceEditor } from './FirstClassEditors/NamespaceEditor';
import { ResourceQuotaEditor } from './FirstClassEditors/ResourceQuotaEditor';
import { RoleBindingEditor } from './FirstClassEditors/RoleBindingEditor';
import { RoleEditor } from './FirstClassEditors/RoleEditor';
import { ServiceAccountEditor } from './FirstClassEditors/ServiceAccountEditor';

type OnUpdatedYamlFn = (yaml: string) => void;

type FirstClassEditorSelectorProps = {
  apiVersion: string;
  kind: string;
  yaml: string;
  onUpdatedYaml: OnUpdatedYamlFn;
  packageResources: PackageRevisionResourcesMap;
};

export const FirstClassEditorSelector = ({
  apiVersion,
  kind,
  yaml,
  onUpdatedYaml,
  packageResources,
}: FirstClassEditorSelectorProps) => {
  const groupVersionKind = `${apiVersion}/${kind}`;

  switch (groupVersionKind) {
    case 'kpt.dev/v1/Kptfile':
      return (
        <KptfileEditor
          yaml={yaml}
          onUpdatedYaml={onUpdatedYaml}
          packageResources={packageResources}
        />
      );

    case 'rbac.authorization.k8s.io/v1/Role':
      return <RoleEditor yaml={yaml} onUpdatedYaml={onUpdatedYaml} />;

    case 'rbac.authorization.k8s.io/v1/RoleBinding':
      return (
        <RoleBindingEditor
          yaml={yaml}
          onUpdatedYaml={onUpdatedYaml}
          packageResources={packageResources}
        />
      );

    case 'v1/ConfigMap':
      return <ConfigMapEditor yaml={yaml} onUpdatedYaml={onUpdatedYaml} />;

    case 'v1/Namespace':
      return <NamespaceEditor yaml={yaml} onUpdatedYaml={onUpdatedYaml} />;

    case 'v1/ResourceQuota':
      return <ResourceQuotaEditor yaml={yaml} onUpdatedYaml={onUpdatedYaml} />;

    case 'v1/ServiceAccount':
      return <ServiceAccountEditor yaml={yaml} onUpdatedYaml={onUpdatedYaml} />;

    default:
  }

  return (
    <div>
      <Typography>
        A first class editor could not be found for {kind}. Use the YAML VIEW to
        update the resource's YAML directly.
      </Typography>
    </div>
  );
};
