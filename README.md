# Reactool-template

A way to develop tools built on the same pattern using React and Typescript.

Handle url parameters to pass them to tool's arguments using React-Router.

Easily develop new tool forking this template: https://codesandbox.io/s/github/etienne1911/minimal-sandbox

See more about the concept in wiki architecture: [principle]

## Examples

this set built on sandbox pattern demonstrates some usecase.

### Standalone Tools
Each tool defines its own arguments list.

- [csv grapher](https://lfv68.csb.app/): simple graph tool
- [model loader](): 3d model display
- [heighmap generator](): a tool to generate heighmaps from various functions

### Configurator
only serve the purpose of preconfiguring and listing a set of tools.

- [graph monitor](): show various graphes using csvgrapher tool
- [models viewer](): show custom remote models using modelloader tool
- [sample listing](): link to various 3D demo samples
