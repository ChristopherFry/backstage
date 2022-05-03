import { Table, TableColumn } from '@backstage/core-components';
import React from 'react';
import { Function } from '../../../types/Function';
import { formatCreationTimestamp } from '../../../utils/formatDate';
import { groupFunctionsByName } from '../../../utils/function';

type FunctionsTableProps = {
  title: string;
  functions: Function[];
  showLatestVersionOnly: boolean;
};

type FunctionRow = {
  id: string;
  name: string;
  functionName: string;
  version: string;
  created: string;
};

const getTableColumns = (
  showLatestVersionOnly: boolean,
): TableColumn<FunctionRow>[] => {
  const columns: TableColumn<FunctionRow>[] = [
    { title: 'Name', field: 'functionName' },
    {
      title: showLatestVersionOnly ? 'Latest Version' : 'Version',
      field: 'version',
    },
    { title: 'Created', field: 'created' },
  ];

  return columns;
};

const getFunctionsList = (
  functions: Function[],
  showLatestVersionOnly: boolean,
): Function[] => {
  if (!showLatestVersionOnly) return functions;

  const functionsByName = groupFunctionsByName(functions);
  return Object.values(functionsByName)
    .map(fn => fn[0])
    .flat();
};

const mapToFunctionRow = (oneFunction: Function): FunctionRow => {
  const [_repositoryName, functionName, version] =
    oneFunction.metadata.name.split(':');

  return {
    id: oneFunction.metadata.name,
    name: oneFunction.metadata.name,
    functionName: functionName,
    version: version,
    created: formatCreationTimestamp(oneFunction.metadata.creationTimestamp),
  };
};

const compareFunctionRows = (
  functionRow1: FunctionRow,
  functionRow2: FunctionRow,
): number => {
  if (functionRow1.functionName === functionRow2.functionName) {
    return functionRow1.version > functionRow2.version ? -1 : 1;
  }

  return functionRow1.functionName > functionRow2.functionName ? 1 : -1;
};

export const FunctionsTable = ({
  title,
  functions,
  showLatestVersionOnly,
}: FunctionsTableProps) => {
  const columns = getTableColumns(showLatestVersionOnly);

  const functionsList = getFunctionsList(functions, showLatestVersionOnly);

  const data = functionsList.map(mapToFunctionRow).sort(compareFunctionRows);

  return (
    <Table
      title={title}
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
    />
  );
};
