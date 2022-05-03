import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import { load } from 'js-yaml';
import React, { Fragment, useEffect, useState } from 'react';
import { KubernetesResource } from '../../types/KubernetesResource';
import { PackageRevisionResourcesMap } from '../../types/PackageRevisionResource';
import { YamlViewer } from '../Controls';
import { FirstClassEditorSelector } from './components/FirstClassEditorSelector';

type OnSaveYamlFn = (yaml: string) => void;

type ResourceEditorProps = {
  open: boolean;
  onClose: () => void;
  yaml: string;
  onSaveYaml: OnSaveYamlFn;
  packageResources: PackageRevisionResourcesMap;
};

const useStyles = makeStyles({
  container: {
    width: '600px',
    minHeight: '300px',
    maxHeight: '50vh',
    marginBottom: '10px',
    overflowY: 'scroll',
  },
});

export const ResourceEditorDialog = ({
  open,
  onClose,
  yaml,
  onSaveYaml,
  packageResources,
}: ResourceEditorProps) => {
  const classes = useStyles();

  const [showYamlView, setShowYamlView] = useState<boolean>(false);
  const [latestYaml, setLatestYaml] = useState<string>('');

  const resourceYaml = load(yaml) as KubernetesResource;

  const resourceApiVersion = resourceYaml && resourceYaml.apiVersion;
  const kind = resourceYaml && resourceYaml.kind;

  useEffect(() => {
    if (open) {
      // Reset the state of the dialog anytime it is opened
      setLatestYaml(yaml);
      setShowYamlView(false);
    }
  }, [open, yaml]);

  const toggleView = (): void => {
    setShowYamlView(!showYamlView);
  };

  const handleUpdatedYaml = (updatedYaml: string): void => {
    setLatestYaml(updatedYaml);
  };

  const onSave = (): void => {
    onSaveYaml(latestYaml);
    onClose();
  };

  const onDialogClose = (): void => {
    onClose();
  };

  const latestYamlHeight = (latestYaml.split('\n').length + 1) * 18;
  const title = resourceYaml?.metadata
    ? `${resourceYaml.kind} ${resourceYaml?.metadata.name}`
    : 'New Resource';

  return (
    <Dialog open={open} onClose={onDialogClose} maxWidth="lg">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Fragment>
          <div
            className={classes.container}
            style={{ height: `${latestYamlHeight}px` }}
          >
            {!showYamlView ? (
              <FirstClassEditorSelector
                apiVersion={resourceApiVersion}
                kind={kind}
                yaml={latestYaml}
                packageResources={packageResources}
                onUpdatedYaml={handleUpdatedYaml}
              />
            ) : (
              <YamlViewer
                value={latestYaml}
                allowEdit
                onUpdatedValue={handleUpdatedYaml}
              />
            )}
          </div>
          <Button variant="text" color="primary" onClick={toggleView}>
            Show {showYamlView ? 'Formatted View' : 'YAML View'}
          </Button>
        </Fragment>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onDialogClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
