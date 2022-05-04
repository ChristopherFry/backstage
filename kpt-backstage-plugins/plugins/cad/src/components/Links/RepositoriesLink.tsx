import { Link } from '@backstage/core-components';
import { useRouteRef } from '@backstage/core-plugin-api';
import React from 'react';
import { rootRouteRef } from '../../routes';
import { useLinkStyles } from './styles';

type RepositoriesLinkProps = {
  breadcrumb?: boolean;
};

export const RepositoriesLink = ({ breadcrumb }: RepositoriesLinkProps) => {
  const repositoriesRef = useRouteRef(rootRouteRef);

  const classes = useLinkStyles();
  const className = breadcrumb ? classes.breadcrumb : '';

  return (
    <Link className={className} to={repositoriesRef()}>
      Repositories
    </Link>
  );
};
