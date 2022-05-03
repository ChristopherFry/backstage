export type KubernetesStatus = {
  apiVersion: string;
  kind: string;
  code: number;
  message: string;
  reason: string;
  status: string;
};
