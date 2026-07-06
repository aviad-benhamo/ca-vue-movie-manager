# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-07-06

### Added
- Created `SECURITY.md` with vulnerability reporting policy.
- Created `.env.example` as a template for local environment configuration.
- Created `LICENSE` file with MIT license.
- Created `.gitattributes` with standard text normalization rules.
- Created `.editorconfig` with project formatting settings.
- Created `.nvmrc` to specify Node version `20.19.0`.
- Added application screenshots to `assets/screenshots/` (`movie-list.png`, `movie-edit.png`) to document the UI.

### Changed
- Replaced hardcoded OMDB API key with `import.meta.env.VITE_OMDB_API_KEY` in `src/services/movie.service.js`.
- Updated `.gitignore` to explicitly ignore local `.env` configuration files.
- Moved `vuejs-movie-manager-exercise.md` to `docs/exercise.md` to clean up the repository root.
- Compressed the default movie poster fallback `src/assets/images/default.png` from 1.43 MB to ~73 KB (resizing it to 200x300px).
