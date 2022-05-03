import { Function } from '../types/Function';
import { groupBy } from 'lodash';

type GroupFunctionsByName = {
  [key: string]: Function[];
};

export const getFunctionNameAndTagFromImage = (
  fullImageName: string,
): string => {
  const imageNameParts = fullImageName.split('/');
  const functionNameAndTag = imageNameParts[imageNameParts.length - 1];

  return functionNameAndTag;
};

export const getFunctionNameFromImage = (fullImageName: string): string => {
  const functionNameAndTag = getFunctionNameAndTagFromImage(fullImageName);
  const functionName = functionNameAndTag.split(':')[0];

  return functionName;
};

export const getFunctionVersionFromImage = (fullImageName: string): string => {
  const functionNameAndTag = getFunctionNameAndTagFromImage(fullImageName);
  const functionName = functionNameAndTag.split(':')[1];

  return functionName;
};

export const getFunctionName = (fn: Function): string => {
  return getFunctionNameFromImage(fn.spec.image);
};

export const groupFunctionsByName = (
  functions: Function[],
): GroupFunctionsByName => {
  const functionsGroupedByName = groupBy(functions, getFunctionName);
  const sortFunctionsByVersionDesc = (fn1: Function, fn2: Function): number =>
    fn1.spec.image > fn2.spec.image ? -1 : 1;

  Object.keys(functionsGroupedByName).forEach(functionName =>
    functionsGroupedByName[functionName].sort(sortFunctionsByVersionDesc),
  );

  return functionsGroupedByName;
};

export const isMutatorFunction = (kptFunction: Function): boolean => {
  return kptFunction.spec.functionTypes.includes('mutator');
};

export const isValidatorFunction = (kptFunction: Function): boolean => {
  return kptFunction.spec.functionTypes.includes('validator');
};
