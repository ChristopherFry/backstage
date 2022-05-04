import { Link } from '@backstage/core-components';
import { useRouteRef } from '@backstage/core-plugin-api';
import React from 'react';
import { packageRouteRef } from '../../routes';
import { PackageRevision } from '../../types/PackageRevision';
import { Repository } from '../../types/Repository';
import { getPackageDescriptor } from '../../utils/repository';
import { useLinkStyles } from './styles';

type PackageLinkProps = {
  repository: Repository;
  packageRevision: PackageRevision;
  breadcrumb?: boolean;
};

export const PackageLink = ({
  repository,
  packageRevision,
  breadcrumb,
}: PackageLinkProps) => {
  const packageRef = useRouteRef(packageRouteRef);

  const classes = useLinkStyles();
  const className = breadcrumb ? classes.breadcrumb : '';

  const repositoryName = repository.metadata.name;
  const packageName = packageRevision.metadata.name;

  const packageDisplayName = packageRevision.spec.packageName;
  const packageDescriptor = getPackageDescriptor(repository);

  return (
    <Link
      className={className}
      to={packageRef({ repositoryName, packageName })}
    >
      {packageDisplayName} {packageDescriptor}
    </Link>
  );
};
