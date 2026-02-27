#!/usr/bin/env node

import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import pg from 'pg';

const {Client} = pg;
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is required');
  process.exit(1);
}

const sql = await readFile(
  resolve(process.cwd(), 'scripts/sql/admin_setup.sql'),
  'utf8'
);

const client = new Client({
  connectionString,
  ssl: {rejectUnauthorized: false}
});

try {
  await client.connect();
  await client.query(sql);
  console.log('Supabase schema applied successfully.');
} catch (error) {
  console.error('Failed to apply schema:', error.message);
  process.exit(1);
} finally {
  await client.end();
}
