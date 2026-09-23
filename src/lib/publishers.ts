/**
 * Publisher data access helpers.
 *
 * This module reads publisher records from the local SQLite database during
 * Astro build-time data fetching and maps them to the app-facing Publisher type.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Retrieves all publishers sorted alphabetically by name.
 *
 * @param db - Database connection used to query the publishers table.
 * @returns A promise that resolves to every publisher in the app-facing format.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({ id: publishers.id, name: publishers.name })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({ id: row.id, name: row.name }));
}
