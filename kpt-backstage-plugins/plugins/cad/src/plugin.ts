import {
  createApiFactory,
  createPlugin,
  createRoutableExtension,
  discoveryApiRef,
  fetchApiRef,
  googleAuthApiRef,
} from '@backstage/core-plugin-api';
import { configAsDataApiRef, PorchRestAPI } from './apis';
import { rootRouteRef } from './routes';

export const cadPlugin = createPlugin({
  id: 'config-as-data',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: configAsDataApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        fetchApi: fetchApiRef,
        googleAuthApi: googleAuthApiRef,
      },
      factory: ({ discoveryApi, fetchApi, googleAuthApi }) =>
        new PorchRestAPI(discoveryApi, fetchApi, googleAuthApi),
    }),
  ],
});

export const CadPage = cadPlugin.provide(
  createRoutableExtension({
    name: 'config-as-data',
    component: () =>
      import('./components/LandingPage').then(m => m.LandingPage),
    mountPoint: rootRouteRef,
  }),
);
