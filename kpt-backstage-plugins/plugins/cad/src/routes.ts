import { createRouteRef, createSubRouteRef } from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'config-as-data',
});

export const registerRepositoryRouteRef = createSubRouteRef({
  id: 'register-repository',
  path: '/repositories/register',
  parent: rootRouteRef,
});

export const repositoryRouteRef = createSubRouteRef({
  id: 'named-repository',
  path: '/repositories/:repositoryName',
  parent: rootRouteRef,
});

export const addPackageRouteRef = createSubRouteRef({
  id: 'add-package',
  path: '/repositories/:repositoryName/packages/add',
  parent: rootRouteRef,
});

export const packageRouteRef = createSubRouteRef({
  id: 'named-package',
  path: '/repositories/:repositoryName/packages/:packageName',
  parent: rootRouteRef,
});

export const deployPackageRouteRef = createSubRouteRef({
  id: 'deploy-package',
  path: '/repositories/:repositoryName/packages/:packageName/deploy',
  parent: rootRouteRef,
});

export const editPackageRouteRef = createSubRouteRef({
  id: 'edit-package',
  path: '/repositories/:repositoryName/packages/:packageName/edit',
  parent: rootRouteRef,
});
