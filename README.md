<div align="center" style="text-align: center;">
  <h1 style="border-bottom: none;">Deno Modules</h1>

  <p>Modules for deno</p>
</div>

<hr />

[![MIT License][mit-license-badge]][mit-license-url]

[![CircleCI][circleci-badge]][circleci-url]

> A collection of [deno][] modules written in TypeScript.

## Table of contents <!-- omit in toc -->

- [Pre-requisite](#pre-requisite)
- [Versioning](#versioning)
- [Available modules](#available-modules)
- [License](#license)

## Pre-requisite

- [deno][] >= 0.3.5
- [deno_std][] >= 0.3.4

## Versioning

All modules follows the versioning in [deno][] releases. For example, the `v0.3.0` tag works for [deno][] that tags between the range of `>=v0.3.0 <v0.4.0` but does not guarantee to work for any version out of the range, say `v0.2.6` or `v0.4.0`.

See [denoland/deno_std#how-to-use][] for more details.

## Available modules

- [deep_clone][] - Simple and fast deep cloning
- [normalize_diacritics][] - Remove accents/ diacritics in string

## License

[MIT License](http://motss.mit-license.org/) © Rong Sen Ng

<!-- References -->

[deno]: https://github.com/denoland/deno
[deno_std]: https://github.com/denoland/deno_std
[denoland/deno_std#how-to-use]: https://github.com/denoland/deno_std#how-to-use
[deep_clone]: https://github.com/motss/deno_mod/tree/master/deep_clone
[normalize_diacritics]: https://github.com/motss/deno_mod/tree/master/normalize_diacritics

<!-- Badges -->

[mit-license-badge]: https://flat.badgen.net/badge/license/MIT/blue
[circleci-badge]: https://flat.badgen.net/circleci/github/motss/deno_mod/master?icon=circleci

<!-- Links -->

[mit-license-url]: https://github.com/motss/deno_mod/blob/master/LICENSE
[circleci-url]: https://circleci.com/gh/motss/deno_mod/tree/master
