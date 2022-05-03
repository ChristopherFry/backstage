import {
  PackageRevision,
  PackageRevisionLifecycle,
  PackageRevisionTask,
} from '../types/PackageRevision';

export const isLatestPublishedRevision = (
  packageRevision: PackageRevision,
): boolean => {
  return (
    packageRevision.spec.lifecycle === PackageRevisionLifecycle.PUBLISHED &&
    !!packageRevision.metadata.labels?.['kpt.dev/latest-revision']
  );
};

export const canCloneOrDeploy = (packageRevision: PackageRevision): boolean => {
  return isLatestPublishedRevision(packageRevision);
};

export const isNotAPublishedRevision = (
  packageRevision: PackageRevision,
): boolean => {
  return packageRevision.spec.lifecycle !== PackageRevisionLifecycle.PUBLISHED;
};

export const getInitTask = (
  description: string,
  keywords: string,
  site: string,
): PackageRevisionTask => {
  const initTask: PackageRevisionTask = {
    type: 'init',
    init: {
      description: description ?? '',
      keywords: keywords
        ? keywords.split(',').map(keyword => keyword.trim())
        : undefined,
      site: site || undefined,
    },
  };

  return initTask;
};

export const getCloneTask = (fullPackageName: string): PackageRevisionTask => {
  const cloneTask: PackageRevisionTask = {
    type: 'clone',
    clone: {
      upstreamRef: {
        upstreamRef: {
          name: fullPackageName,
        },
      },
    },
  };

  return cloneTask;
};

export const getPackageRevisionResource = (
  repositoryName: string,
  packageName: string,
  revision: string,
  lifecycle: PackageRevisionLifecycle,
  tasks: PackageRevisionTask[],
): PackageRevision => {
  const resource: PackageRevision = {
    apiVersion: 'porch.kpt.dev/v1alpha1',
    kind: 'PackageRevision',
    metadata: {
      name: '', // Porch will populate
      namespace: 'default',
    },
    spec: {
      packageName: packageName,
      revision: revision,
      repository: repositoryName,
      lifecycle: lifecycle,
      tasks: tasks,
    },
  };

  return resource;
};

export const sortByPackageNameAndRevisionComparison = (
  packageRevision1: PackageRevision,
  packageRevision2: PackageRevision,
): number => {
  const packageSpec1 = packageRevision1.spec;
  const packageSpec2 = packageRevision2.spec;

  if (packageSpec1.packageName === packageSpec2.packageName) {
    return packageSpec1.revision > packageSpec2.revision ? -1 : 1;
  }

  return packageSpec1.packageName > packageSpec2.packageName ? 1 : -1;
};
