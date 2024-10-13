// start.mjs
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('ts-node/esm', pathToFileURL('./'));

// Dynamically import your TypeScript entry point
import('./src/index.ts');

