import { KubernetesResource } from '../../../../../../types/KubernetesResource';
import { RoleBinding } from '../../../../../../types/RoleBinding';
import { Metadata } from '../StructuredMetadata';

export const getRoleBindingStructuredMetadata = (
  resource: KubernetesResource,
): Metadata => {
  const roleBinding = resource as RoleBinding;

  const customMetadata: Metadata = {};

  for (const [index, subject] of roleBinding.subjects.entries()) {
    const name =
      roleBinding.subjects.length > 1
        ? `Role Binding ${index + 1}`
        : 'Role Binding';
    customMetadata[name] = [
      `${roleBinding.roleRef.kind}: ${roleBinding.roleRef.name}`,
      `${subject.kind}: ${subject.name}`,
    ];
  }

  return customMetadata;
};
