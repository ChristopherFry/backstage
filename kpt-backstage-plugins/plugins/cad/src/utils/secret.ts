import { KubernetesKeyValueObject } from '../types/KubernetesResource';
import { Secret } from '../types/Secret';

export const getBasicAuthSecret = (
  name: string,
  username: string,
  password: string,
): Secret => {
  const basicAuthSecret = {
    apiVersion: 'v1',
    kind: 'Secret',
    metadata: {
      name: name,
      namespace: 'default',
    },
    type: 'kubernetes.io/basic-auth',
    data: {
      username: btoa(username),
      password: btoa(password),
    },
  };

  return basicAuthSecret;
};

export const getOpagueSecret = (
  name: string,
  namespace: string,
  data: KubernetesKeyValueObject,
): Secret => {
  const basicOpagueSecret = {
    apiVersion: 'v1',
    kind: 'Secret',
    metadata: {
      name: name,
      namespace: namespace,
    },
    type: 'Opaque',
    data: data,
  };

  return basicOpagueSecret;
};

export const isBasicAuthSecret = (secret: Secret): boolean => {
  return secret.type === 'kubernetes.io/basic-auth';
};
