import { Kptfile, KptfileFunction } from '../../../../../../types/Kptfile';
import { KubernetesResource } from '../../../../../../types/KubernetesResource';
import { getFunctionNameAndTagFromImage } from '../../../../../../utils/function';
import { Metadata } from '../StructuredMetadata';

const getKptFunctionDescription = (fn: KptfileFunction): string => {
  const functionNameAndTag = getFunctionNameAndTagFromImage(fn.image);

  if (fn.configPath) {
    return `${functionNameAndTag}, ${fn.configPath} config`;
  }

  return functionNameAndTag;
};

export const getKptFileStructuredMetadata = (
  resource: KubernetesResource,
): Metadata => {
  const kptFile = resource as Kptfile;

  return {
    description: kptFile.info.description,
    keywords: kptFile.info.keywords,
    upstream: kptFile.upstream?.git
      ? `${kptFile.upstream.git.repo}/${kptFile.upstream.git.directory}@${kptFile.upstream?.git?.ref}`
      : '',
    mutators: kptFile.pipeline?.mutators?.map(getKptFunctionDescription),
    validators: kptFile.pipeline?.validators?.map(getKptFunctionDescription),
  };
};
