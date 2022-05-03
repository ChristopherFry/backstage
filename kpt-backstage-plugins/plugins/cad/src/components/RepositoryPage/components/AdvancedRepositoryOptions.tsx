import { useApi, useRouteRef } from '@backstage/core-plugin-api';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { configAsDataApiRef } from '../../../apis';
import { rootRouteRef } from '../../../routes';

export const AdvancedRepositoryOptions = () => {
  const { repositoryName } = useParams();
  const api = useApi(configAsDataApiRef);

  const repositoriesRef = useRouteRef(rootRouteRef);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const openUnregisterRepositoryDialog = (): void => {
    setOpen(true);
  };

  const closeUnregisterRepositoryDialog = (): void => {
    setOpen(false);
  };

  const executeUnregisterRepository = async (): Promise<void> => {
    await api.unregisterRepository(repositoryName);
    navigate(repositoriesRef());
  };

  return (
    <Fragment>
      <Dialog open={open} onClose={closeUnregisterRepositoryDialog}>
        <DialogTitle>Unregister repository</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to unregister this repository?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeUnregisterRepositoryDialog}>
            Cancel
          </Button>
          <Button color="primary" onClick={executeUnregisterRepository}>
            Unregister
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        color="secondary"
        variant="contained"
        onClick={openUnregisterRepositoryDialog}
      >
        Unregister Repository
      </Button>
    </Fragment>
  );
};
