import { KubernetesResource } from '../../../../../../types/KubernetesResource';
import { Role } from '../../../../../../types/Role';
import { Metadata } from '../StructuredMetadata';

export const getRoleStructuredMetadata = (
  resource: KubernetesResource,
): Metadata => {
  const role = resource as Role;

  const customMetadata: Metadata = {};

  for (const [index, rule] of role.rules.entries()) {
    const name = role.rules.length > 1 ? `Rule ${index + 1}` : 'Rule';
    customMetadata[name] = [];

    const describeRuleArray = (label: string, array: string[]): string =>
      `${label}: ${array.join(', ')}`;

    if (rule.apiGroups) {
      customMetadata[name].push(
        describeRuleArray(`API Groups`, rule.apiGroups),
      );
    }

    if (rule.resources) {
      customMetadata[name].push(describeRuleArray('Resources', rule.resources));
    }

    if (rule.verbs) {
      customMetadata[name].push(describeRuleArray('Verbs', rule.verbs));
    }
  }

  return customMetadata;
};
