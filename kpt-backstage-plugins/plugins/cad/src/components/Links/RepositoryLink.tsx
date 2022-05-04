import { Link } from '@backstage/core-components';
import { useRouteRef } from '@backstage/core-plugin-api';
import React from 'react';
import { repositoryRouteRef } from '../../routes';
import { Repository } from '../../types/Repository';
import { getRepositoryTitle } from '../../utils/repository';
import { useLinkStyles } from './styles';

type RepositoryLinkProps = {
  repository: Repository;
  breadcrumb?: boolean;
  stopPropagation?: boolean;
};

export const RepositoryLink = ({
  repository,
  breadcrumb,
  stopPropagation,
}: RepositoryLinkProps) => {
  const repositoryRef = useRouteRef(repositoryRouteRef);

  const classes = useLinkStyles();
  const className = breadcrumb ? classes.breadcrumb : '';

  const repositoryName = repository.metadata.name;

  return (
    <Link
      className={className}
      onClick={e => {
        if (stopPropagation) {
          e.stopPropagation();
        }
      }}
      to={repositoryRef({ repositoryName })}
    >
      {getRepositoryTitle(repository)}
    </Link>
  );
};
