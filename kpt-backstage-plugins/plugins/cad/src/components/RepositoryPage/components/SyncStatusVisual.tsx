import {
  StatusError,
  StatusOK,
  StatusPending,
  StatusWarning,
} from '@backstage/core-components';
import React, { Fragment } from 'react';
import { SyncStatus, SyncStatusState } from '../../../utils/configSync';

type SyncStatusVisualProps = {
  syncStatus: SyncStatus | undefined | null;
};

export const SyncStatusVisual = ({ syncStatus }: SyncStatusVisualProps) => {
  if (syncStatus) {
    switch (syncStatus.state) {
      case SyncStatusState.SYNCED:
        return (
          <Fragment>
            <StatusOK />
            {syncStatus.state}
          </Fragment>
        );
      case SyncStatusState.RECONCILING:
      case SyncStatusState.PENDING:
        return (
          <Fragment>
            <StatusPending />
            {syncStatus.state}
          </Fragment>
        );
      case SyncStatusState.STALLED:
      case SyncStatusState.ERROR:
        return (
          <Fragment>
            <StatusError />
            {syncStatus.state}
          </Fragment>
        );
      default:
    }
  }

  if (syncStatus === null) {
    return (
      <Fragment>
        <StatusWarning />
        Not installed
      </Fragment>
    );
  }

  return <Fragment />;
};
