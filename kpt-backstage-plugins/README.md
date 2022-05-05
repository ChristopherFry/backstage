# Kpt Backstage Plugins

This repository contains the Kpt Backstage Plugins. The plugins can be installed
into an existing Backstage Application following the READMEs for each plugin.
For development and testing, the plugins can also be executed with the example
Backstage Application in this repository.

The primary plugin is [Configuration as Data Plugin](plugins/cad) which powers
the WYSIWYG Configuration GUI over GitOps using [kpt.dev](https://kpt.dev/) and
its new Package Orchestrator,
[porch](https://github.com/GoogleContainerTools/kpt/tree/main/porch).

_New to Kpt?_

Kpt is a git-native, schema-aware, extensible client-side tool for packaging,
customizing, validating, and applying Kubernetes resources. Read
[kpt.dev](https://kpt.dev/) to learn more.

_New to Backstage?_

Backstage is an open platform for building developer portals. Watch
[What is Backstage? (Explainer Video) on YouTube](https://www.youtube.com/watch?v=85TQEpNCaU0)
and read [backstage.io](https://backstage.io) to learn more.

## Quick Start

### Prerequisites

To use the Backstage Application in this repository, you will need:

- [Node.js](https://nodejs.org/)
  [Active LTS Release](https://nodejs.org/en/about/releases/) installed
- [yarn](https://classic.yarnpkg.com/en/docs/install) installed
- [git](https://github.com/git-guides/install-git) installed
- [Porch (Package Orchestration Server)](https://github.com/GoogleContainerTools/kpt/tree/main/porch)
  installed on a
  [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine)
  cluster
- The latest
  [Config Management Operator manifest](https://cloud.google.com/anthos-config-management/docs/downloads)
  applied to the cluster

### Clone Repository

```
git clone https://github.com/christopherfry/backstage.git kpt-backstage-plugins
cd kpt-backstage-plugins
```

### Install Dependencies

```
yarn install
```

### Running the Backstage Application

```
yarn dev
```
