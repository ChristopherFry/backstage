export const createMultiResourceYaml = (resourcesYaml: string[]): string => {
  return resourcesYaml.join('\n---\n');
};

export const getResourcesFromMultiResourceYaml = (
  multiResourceYaml: string,
): string[] => {
  return multiResourceYaml.split('\n---\n');
};
