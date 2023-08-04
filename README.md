# stage_ui

Module, which contains common parts for stage projects on React.

## Versioning

1. Following SemVer

**NOTE**
Because there can be different versions developed at the same time and some of the changes require splitting them into separate "chunks" (ie PRs) there is an "extra" versioning added - `-dev{issueid}`, this denotes given version to be development version with `{issueid}` being the ID of an issue this version is addressing. i.e [`v2.0.0-dev64`](https://github.com/forward3d/query_panel/pull/68)

2. Auto-tagged and published using GH Action

## Development

#### How to publish

1. [Deal with the prerequisites](https://github.com/forward3d/handbook/blob/master/development/github-packages/index.md#npmrc-configuration)

2. in one console install the required packages and build the lib :

  ```console
  yarn install
  yarn build
  yarn publish 
  ```

#### How to install

1. Run in the console of project, where you want to add stage_ui library:

  ```console
  yarn add @forward3d/stage_ui 
  ```
