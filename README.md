# EtymoMap

A historical geolinguistic atlas for visualizing the evolution of natural language over time and space.

[![Palate](https://img.shields.io/badge/palate-v2026.09.14-blue)](https://github.com/jmuszka/palate)
[![Larynx](https://img.shields.io/badge/larynx-v2026.09.14-green)](https://github.com/jmuszka/larynx)
[![React](https://img.shields.io/badge/react-19-61dafb)](https://react.dev)
[![Vite](https://img.shields.io/badge/vite-8-646cff)](https://vite.dev)
[![Go](https://img.shields.io/badge/go-1.26-00add8)](https://go.dev)
[![Live](https://img.shields.io/badge/live-etymomap.com-orange)](https://etymomap.com)

## About the EtymoMap Project

EtymoMap is a historical geolinguistic atlas for visualizing the evolution of natural language over time and space.

Palate is the atlas client for rendering spatial-temporal visualizations in the browser, while Larynx is the linguistics API server responsible for interfacing with the graph database containing semantic relations between words and their ancestors, phonetic metadata, phylogenetic family trees, and historical geospatial data from peer-reviewed academic sources.

Through Palate, one can interface with tools to view a language's geographic influence over time, explore Sprachbund diffusion areas and other means of interlingual convergence, visualize a word's etymology tree (structured as a directed acyclic graph) and trace its phylogenetic heritage, and more. By unifying these spatial, temporal, and genealogical layers into a single interface, EtymoMap provides a rich, contextual framework for comparative linguistics and historical anthropology. Future plans include richer cross-language analysis, demonstrating sound-law changes, and features leveraging computational linguistics.

Language is not a mere means of communication: it encapsulates entire cultures, dictates worldviews, and influences modes of thought, with measurable effects spanning everyday human interaction, international diplomacy, artistic expression, and philosophical inquiry. EtymoMap's purpose is to open a window onto the cross section of one of the most intricate abstract structures in our universe and democratize access to the most profound apparatus and driving force of the human experience lying right on our tongues.

I created this digital atlas to express my intersecting interests in language, history, formal structures, and digital cartography. One of the reasons I love making educational tools is not purely for the pedagogical purpose of imparting knowledge onto others, but also as a medium to share my passions and to gain a more rigorous understanding of the topics I find intrinsically fascinating.

Building EtymoMap served as an excellent vessel to deepen my understanding of theoretical linguistics and its subfields while pushing me to solve complex engineering challenges in spatial graph indexing and real-time visualization. I would encourage anyone fascinated by a subject as multifaceted as linguistics to build a multi-domain tool such as this one - it is a powerful way to indulge your inner obsessions while making knowledge more accessible to those around you.

## Assumptions & Methodology

**Data modelling.** The semantic relations between words (i.e. direct inheritance, borrowing, derivation, doublets, etc.) come from Wiktionary's etymology entries. Wiktionary is open-source and decentralized: built from the bottom up by volunteer contributors; it describes how words are used and where they come from rather than prescribing how they should be. It is a vast and comprehensive repository, both in breadth and depth, with the caveat that individual relationships or attributions, especially for reconstructed proto-languages, may be contested, incomplete, or reflect community consensus rather than academic authority.

**Heatmap computation.** The map simulates a word's diffusion over time and space. The word's immediate ancestors are the hottest regions, as these are the languages that most closely and directly influenced it. Walking up the ancestry tree simulates stepping further back in time, while descending from each ancestor into its sister languages and their descendants (breadth) simulates how the word's forms diffused across geography. More distant ancestors are included as well: the regions of their descendants suggest where the word may have spread its influence. Heat intensity is normalized per word, so shades are only meaningful relative to the word being viewed.

**Visualization.** The etymology tree shows direct inheritance, borrowings, and structural relations (affixes and compounds), with lateral links such as doublets drawn distinctly. The family chart is a phylogenetic pie chart of the word's hierarchical language family composition. Hovering over a family on the chart highlights where that subfamily appears on the map.

**Map rendering.** Language regions, from academic sources, represent approximate native and historical areas rather than precise historical borders; regions for reconstructed or ancient languages are necessarily inferred. Polygon boundaries are smoothed for legibility and visual appeal, and the fitted view may crop outliers so the densest majority of the word's influence stays in frame.

## Repository Structure

EtymoMap is a monorepo composed of two git submodules:

| Directory | Project | Role |
|-----------|---------|------|
| [`larynx/`](larynx) | [Larynx](https://github.com/jmuszka/larynx) | Linguistics API server (Go + Chi) over the graph database |
| [`palate/`](palate) | [Palate](https://github.com/jmuszka/palate) | Atlas client (React + Vite + MapLibre) |

Both are pinned to release tag `v2026.09.14`. See their respective READMEs for full documentation:

- [Larynx README](larynx/README.md) — API endpoints, authentication, caching, environment variables
- [Palate README](palate/README.md) — features, routes, data sources, environment variables

## Cloning

Clone with submodules:

```bash
git clone --recurse-submodules https://github.com/jmuszka/etymomap.git
cd etymomap
```

If you already cloned without them:

```bash
git submodule update --init --recursive
```

## Running Locally

### Larynx (backend API)

Prerequisites: Go 1.26+, Docker & Docker Compose, an OpenAI-compatible API key (for the history endpoint), and a Neo4j database dump (`neo4j.dump`).

```bash
cd larynx

# Configure environment
cp .env.example .env
# Edit .env: NEO4J_PASSWORD, BEARER_TOKENS, AI_API_KEY, ADMIN_JWT_SECRET, ...

# Start services
cp docker-compose.yml.example docker-compose.yml
# Edit the Neo4j volume mount path in docker-compose.yml
docker compose up -d

# Restore the Neo4j database
docker compose exec neo4j neo4j-admin database restore neo4j --from-path=/data/neo4j.dump

# Run
go run .
```

The server listens on port `8080` by default. See the [Larynx README](larynx/README.md) for full environment variable reference and Swagger docs.

### Palate (atlas client)

Prerequisites: [Bun](https://bun.sh) and a running Larynx instance.

```bash
cd palate

# Install dependencies
bun install

# Configure the backend URL
cp .env.example .env
# Set VITE_SERVER_URL to your Larynx instance and VITE_BEARER_TOKEN to an approved token

# Start the dev server
bun run dev
```

The dev server starts at `http://localhost:5173` with HMR enabled. See the [Palate README](palate/README.md) for build, lint, and test commands.

## Updating Submodules

The submodules are pinned to release tags. To advance one to a newer tag:

```bash
# Update the submodule to a new tag or commit
cd larynx   # or palate
git fetch --tags
git checkout <tag>
cd ..

# Record the change in the monorepo
git add larynx   # or palate
git commit -m "bump: larynx to <tag>"
```

To track the latest commit on each submodule's default branch instead, use `git submodule update --remote`.
