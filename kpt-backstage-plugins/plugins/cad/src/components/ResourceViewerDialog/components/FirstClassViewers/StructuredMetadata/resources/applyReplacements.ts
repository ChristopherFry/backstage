import { KubernetesResource } from '../../../../../../types/KubernetesResource';
import { Metadata } from '../StructuredMetadata';

export const getApplyReplacementsStructuredMetadata = (
  resource: KubernetesResource,
): Metadata => {
  const applyReplacements = resource as any;

  const customMetadata: Metadata = {};

  for (const [index, replacement] of applyReplacements.replacements.entries()) {
    const name =
      applyReplacements.replacements.length > 1
        ? `Replacement ${index + 1}`
        : 'Replacement';

    const targetDetails = replacement.targets.map(
      (target: any) =>
        `Target: ${target.select.kind} ${
          target.select.name
        } ${target.fieldPaths.join(', ')}`,
    );

    customMetadata[name] = [
      `Source: ${replacement.source.kind} ${replacement.source.name} ${replacement.source.fieldPath}`,
      ...targetDetails,
    ];
  }

  return customMetadata;
};
