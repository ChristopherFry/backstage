import { SelectItem } from '@backstage/core-components';
import { Button, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import usePrevious from 'react-use/lib/usePrevious';
import { Function } from '../../../../../../types/Function';
import {
  getFunctionNameAndTagFromImage,
  getFunctionNameFromImage,
  getFunctionVersionFromImage,
  groupFunctionsByName,
} from '../../../../../../utils/function';
import { PackageResource } from '../../../../../../utils/packageRevisionResources';
import { Autocomplete } from '../../../../../Controls/Autocomplete';
import { Select } from '../../../../../Controls/Select';
import {
  EditorAccordion,
  OnAccordionChange,
} from '../../Controls/EditorAccordion';
import { useEditorStyles } from '../../styles';
import { KptfileFunctionView } from '../KptfileEditor';

type OnUpdatedKptFunction = (
  originalFunctin: KptfileFunctionView,
  updatedFunction?: KptfileFunctionView,
) => void;

type kptFunctionEditorProps = {
  title: string;
  expanded: boolean;
  onChange: OnAccordionChange;
  kptFunction: KptfileFunctionView;
  onUpdatedKptFunction: OnUpdatedKptFunction;
  allKptFunctions: Function[];
  packageResources: PackageResource[];
};

export const KptFunctionEditorAccordion = ({
  title,
  expanded,
  onChange,
  kptFunction,
  onUpdatedKptFunction,
  allKptFunctions,
  packageResources,
}: kptFunctionEditorProps) => {
  const CUSTOM_IMAGE = 'Use custom image';

  const functionConfigSelectItems: SelectItem[] = packageResources
    .map(resource => ({
      label: `${resource.kind}: ${resource.name}`,
      value: resource.filename,
    }))
    .sort((item1, item2) => (item1.label > item2.label ? 1 : -1));
  functionConfigSelectItems.unshift({ label: 'none', value: 'none' });

  if (
    kptFunction.configPath &&
    !functionConfigSelectItems.find(
      item => item.value === kptFunction.configPath,
    )
  ) {
    functionConfigSelectItems.push({
      label: `${kptFunction.configPath} (config map not found)`,
      value: kptFunction.configPath,
    });
  }

  const [state, setState] = useState<KptfileFunctionView>(kptFunction);
  const [functionNameSelected, setFunctionNameSelected] = useState<string>(
    kptFunction.image ? CUSTOM_IMAGE : '',
  );
  const previousFunctionNameSelected = usePrevious(functionNameSelected);

  const [functionVersionSelected, setFunctionVersionSelected] =
    useState<string>('');
  const [customImageName, setCustomImageName] = useState<string>(
    kptFunction.image,
  );
  const [functionNames, setFunctionNames] = useState<string[]>([]);
  const [functionVersions, setFunctionVersions] = useState<string[]>([]);
  const [configPathSelected, setConfigPathSelected] = useState<string>(
    kptFunction.configPath || 'none',
  );

  const classes = useEditorStyles();
  const allKptFunctionsGroupedByName = useMemo(
    () => groupFunctionsByName(allKptFunctions),
    [allKptFunctions],
  );

  const stateImage = useRef(state.image);

  useEffect(() => {
    const allFunctionNames = Object.keys(allKptFunctionsGroupedByName);

    setFunctionNames(allFunctionNames);

    if (stateImage.current) {
      const fnName = getFunctionNameFromImage(stateImage.current);
      const fnVersion = getFunctionVersionFromImage(stateImage.current);

      if (allFunctionNames.includes(fnName)) {
        const allFunctionVersionsForFunction = allKptFunctionsGroupedByName[
          fnName
        ].map(fn => getFunctionVersionFromImage(fn.spec.image));

        if (allFunctionVersionsForFunction.includes(fnVersion)) {
          setFunctionNameSelected(fnName);
          setFunctionVersionSelected(fnVersion);
        }
      }
    }
  }, [allKptFunctionsGroupedByName]);

  useEffect(() => {
    let imageValue = customImageName;

    if (functionNameSelected && functionNameSelected !== CUSTOM_IMAGE) {
      const selectedFunction = (
        allKptFunctionsGroupedByName[functionNameSelected] ?? []
      ).find(
        fn =>
          getFunctionVersionFromImage(fn.spec.image) ===
          functionVersionSelected,
      );

      if (selectedFunction) {
        imageValue = selectedFunction.spec.image;
      }
    }

    setState(s => ({ ...s, image: imageValue }));
  }, [
    customImageName,
    functionNameSelected,
    functionVersionSelected,
    allKptFunctionsGroupedByName,
  ]);

  useEffect(() => {
    const versions = (
      allKptFunctionsGroupedByName[functionNameSelected] ?? []
    ).map(fn => getFunctionVersionFromImage(fn.spec.image));

    setFunctionVersions(versions);

    if (
      functionNameSelected !== previousFunctionNameSelected &&
      previousFunctionNameSelected !== CUSTOM_IMAGE
    ) {
      setFunctionVersionSelected(versions.length > 0 ? versions[0] : '');
    }
  }, [
    functionNameSelected,
    allKptFunctionsGroupedByName,
    previousFunctionNameSelected,
  ]);

  useEffect(() => {
    const configPath =
      configPathSelected && configPathSelected !== 'none'
        ? configPathSelected
        : undefined;
    setState(s => ({ ...s, configPath }));
  }, [configPathSelected]);

  useEffect(() => {
    if (kptFunction !== state) {
      onUpdatedKptFunction(kptFunction, state);
    }
  }, [state, kptFunction, onUpdatedKptFunction]);

  const updateFunctionName = useCallback(
    (functionName: string): void => setFunctionNameSelected(functionName),
    [],
  );
  const updateFunctionVersion = useCallback(
    (version: string): void => setFunctionVersionSelected(version),
    [],
  );

  const description = state.image
    ? getFunctionNameAndTagFromImage(state.image)
    : 'none';

  return (
    <EditorAccordion
      title={title}
      description={description}
      expanded={expanded}
      onChange={onChange}
    >
      <Fragment>
        <div className={classes.multiControlRow}>
          <Autocomplete
            label="Function Name"
            options={functionNames}
            onInputChange={updateFunctionName}
            value={functionNameSelected}
          />
          {functionVersions.length > 0 ? (
            <Autocomplete
              label="Version"
              options={functionVersions}
              onInputChange={updateFunctionVersion}
              value={functionVersionSelected}
            />
          ) : (
            <TextField
              label="Version"
              variant="outlined"
              disabled
              fullWidth
              value="Not applicable"
            />
          )}
        </div>
        {functionNameSelected === CUSTOM_IMAGE && (
          <TextField
            label="Image"
            variant="outlined"
            value={customImageName}
            onChange={e => setCustomImageName(e.target.value as string)}
            fullWidth
          />
        )}
        <Select
          label="Function Config"
          selected={configPathSelected}
          items={functionConfigSelectItems}
          onChange={value => setConfigPathSelected(value)}
        />

        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => onUpdatedKptFunction(kptFunction, undefined)}
        >
          Delete
        </Button>
      </Fragment>
    </EditorAccordion>
  );
};