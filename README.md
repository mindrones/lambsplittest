## Purpose

Used to test the recent work on Lamb split into modules.

## Rollup issue

Used to report this Rollup issue at https://github.com/rollup/rollup/issues/2672

### Repro

- `git clone https://github.com/mindrones/lambsplittest`
- `npm  i`
- `npm run build`
- check the builds in build/

### Expected Behavior

Builds should contain only used functions.

### Actual Behaviour

Some of the builds contain apparenty unused functions.

For example I don't understand why I'm finding `var union = unionBy(identity);` in `build/mapper.mjs`, as `union` is not referenced anywhere in `src/mapper.js` or in code used by `mapWith` and `getKey`.

`build/mapper_manually_tree_shaked.mjs` is a working version of the same build but manually tree-shaked, removing the unused parts: [here you can see what I removed](https://github.com/mindrones/lambsplittest/commit/eab0c363c3c74b5daa6305076246142a49ec2265#diff-f2bcbbcdf9d5cd9056836539ea6d9bdd).

As you can see I also tried to build with the options `treeshake: {propertyReadSideEffects: false}` and `treeshake: {pureExternalModules: true}`, with no luck.
