import { makeStyles } from '@material-ui/core';
import React, { Fragment } from 'react';
import { RepositorySummary } from '../../../types/RepositorySummary';
import { RepositoryLink } from '../../Links/RepositoryLink';

const useStyles = makeStyles({
  relatedRepository: {
    marginRight: '10px',
    marginTop: 'auto',
  },
});

type RelatedRepositoryContentProps = {
  repositorySummary: RepositorySummary;
};

export const RelatedRepositoryContent = ({
  repositorySummary,
}: RelatedRepositoryContentProps) => {
  const classes = useStyles();

  const renderRelatedRepositoryLinks = (): JSX.Element[] => {
    const links: JSX.Element[] = [];

    if (repositorySummary.downstreamRepositories.length > 0) {
      const numberOfDownstreamRepositories =
        repositorySummary.downstreamRepositories.length;

      const description = `Downstream ${
        numberOfDownstreamRepositories > 1 ? 'Repositories' : 'Repository'
      }`;

      links.push(
        <div key="downstream" className={classes.relatedRepository}>
          {description}:&nbsp;
          {repositorySummary.downstreamRepositories.map(
            (downstreamRepository, index) => (
              <Fragment key={downstreamRepository.metadata.name}>
                <RepositoryLink repository={downstreamRepository} />
                {index !== numberOfDownstreamRepositories - 1 && (
                  <span>, </span>
                )}
              </Fragment>
            ),
          )}
        </div>,
      );
    }

    if (repositorySummary.upstreamRepository) {
      links.push(
        <div key="upstream" className={classes.relatedRepository}>
          Upstream Repository:&nbsp;
          <RepositoryLink repository={repositorySummary.upstreamRepository} />
        </div>,
      );
    }

    return links;
  };

  return <Fragment>{renderRelatedRepositoryLinks()}</Fragment>;
};
