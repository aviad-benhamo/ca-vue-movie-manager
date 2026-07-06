# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Created `SECURITY.md` with vulnerability reporting policy.
- Created `.env.example` as a template for local environment configuration.

### Changed
- Replaced hardcoded OMDB API key with `import.meta.env.VITE_OMDB_API_KEY` in `src/services/movie.service.js`.
- Updated `.gitignore` to explicitly ignore local `.env` configuration files.
