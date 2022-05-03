import { Table, TableColumn } from '@backstage/core-components';
import { useRouteRef } from '@backstage/core-plugin-api';
import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { repositoryRouteRef } from '../../../routes';
import { Repository, RepositoryContent } from '../../../types/Repository';
import { RepositorySummary } from '../../../types/RepositorySummary';
import { getRepositoryTitle } from '../../../utils/repository';
import { RepositoryLink } from '../../Links';

type RepositoriesTableProps = {
  title: string;
  repositories: RepositorySummary[];
  repositoryContent: RepositoryContent;
};

type RepositoryRow = {
  id: string;
  title: string;
  description: string;
  name: string;
  blueprint?: Repository;
};

const getTableColumns = (
  repositoryContent: RepositoryContent,
): TableColumn<RepositoryRow>[] => {
  const columns: TableColumn<RepositoryRow>[] = [
    { title: 'Title', field: 'title' },
    { title: 'Description', field: 'description' },
  ];

  if (repositoryContent === RepositoryContent.PACKAGE) {
    const createLink = (repository: Repository) => (
      <RepositoryLink repository={repository} stopPropagation />
    );

    const renderBlueprintColumn = (row: RepositoryRow) =>
      row.blueprint ? createLink(row.blueprint) : <Fragment />;

    columns.push({
      title: 'Blueprint Repository',
      render: renderBlueprintColumn,
    });
  }

  return columns;
};

const mapToRepositoryRow = (
  repositorySummary: RepositorySummary,
): RepositoryRow => {
  const repository = repositorySummary.repository;
  const blueprint = repositorySummary.upstreamRepository;

  return {
    id: repository.metadata.name,
    title: getRepositoryTitle(repository),
    description: repository.spec.description,
    blueprint: blueprint,
    name: repository.metadata.name,
  };
};

export const RepositoriesTable = ({
  title,
  repositories,
  repositoryContent,
}: RepositoriesTableProps) => {
  const navigate = useNavigate();

  const repositoryRef = useRouteRef(repositoryRouteRef);

  const columns = getTableColumns(repositoryContent);
  const data = repositories.map(mapToRepositoryRow);

  return (
    <div>
      <Table<RepositoryRow>
        title={title}
        options={{ search: false, paging: false }}
        columns={columns}
        data={data}
        onRowClick={(_, repositoryRow) => {
          if (repositoryRow) {
            navigate(repositoryRef({ repositoryName: repositoryRow.name }));
          }
        }}
      />
    </div>
  );
};
