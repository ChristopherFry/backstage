import { Content, Header, Page, Progress } from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import useAsync from 'react-use/lib/useAsync';
import { configAsDataApiRef } from '../../apis';
import {
  addPackageRouteRef,
  deployPackageRouteRef,
  editPackageRouteRef,
  packageRouteRef,
  registerRepositoryRouteRef,
  repositoryRouteRef,
} from '../../routes';
import { AddPackagePage } from '../AddPackagePage';
import { PackageRevisionPage } from '../PackageRevisionPage';
import { PackageRevisionPageMode } from '../PackageRevisionPage/PackageRevisionPage';
import { RegisterRepositoryPage } from '../RegisterRepositoryPage';
import { RepositoryListPage } from '../RepositoryListPage';
import { RepositoryPage } from '../RepositoryPage';

export const LandingPage = () => {
  const api = useApi(configAsDataApiRef);

  const { loading, error } = useAsync(() => api.getFeatures(), []);

  const getContent = (): JSX.Element => {
    if (loading) {
      return <Progress />;
    } else if (error) {
      return <Alert severity="error">{error.message}</Alert>;
    }

    return (
      <Routes>
        <Route path="/" element={<RepositoryListPage />} />
        <Route
          path={registerRepositoryRouteRef.path}
          element={<RegisterRepositoryPage />}
        />
        <Route path={repositoryRouteRef.path} element={<RepositoryPage />} />
        <Route path={addPackageRouteRef.path} element={<AddPackagePage />} />
        <Route
          path={packageRouteRef.path}
          element={<PackageRevisionPage mode={PackageRevisionPageMode.VIEW} />}
        />
        <Route path={deployPackageRouteRef.path} element={<AddPackagePage />} />
        <Route
          path={editPackageRouteRef.path}
          element={<PackageRevisionPage mode={PackageRevisionPageMode.EDIT} />}
        />
      </Routes>
    );
  };

  return (
    <Page themeId="tool">
      <Header title="Configuration as Data" />
      <Content>{getContent()}</Content>
    </Page>
  );
};
