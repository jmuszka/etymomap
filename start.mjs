// start.mjs
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('ts-node/esm', pathToFileURL('./'));

// Dynamically import your TypeScript entry point
try {
    await import('./src/index.ts');
} catch (error) {
    console.error('Error importing index.ts:', error);
}

