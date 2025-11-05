/**
 * Supabase Client Configuration and Storage Operations
 * EPIC-07: Supabase Storage Integration
 *
 * Handles all Supabase blob storage operations for persona data
 */

import { createClient } from '@supabase/supabase-js';
import { getEnvironmentConfig } from './env';
import { StorageError, NotFoundError } from './errors';
import { logger } from './logger';
import type { Persona } from './types';
import { nanoid } from 'nanoid';

const BUCKET_NAME = 'personas';
const METADATA_SUFFIX = '.meta.json';

/**
 * Metadata stored with persona
 */
export interface PersonaMetadata {
  persona_id: string;
  created_at: string;
  updated_at: string;
  source_text_blocks: number;
  source_links: number;
  file_size: number;
  checksum?: string;
}

/**
 * Initialize Supabase client
 */
function getSupabaseClient() {
  const config = getEnvironmentConfig();

  return createClient(
    config.supabaseUrl,
    config.supabaseServiceRoleKey, // Use service role for backend operations
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

/**
 * Generate unique persona ID
 */
export function generatePersonaId(): string {
  return nanoid(21); // 21-character nanoid
}

/**
 * Save persona to Supabase blob storage
 */
export async function savePersona(persona: Persona): Promise<{ personaId: string; metadata: PersonaMetadata }> {
  const supabase = getSupabaseClient();
  const personaId = persona.id || generatePersonaId();

  try {
    logger.debug('Saving persona to Supabase', { personaId });

    // Prepare persona data
    const personaData = {
      ...persona,
      id: personaId,
      metadata: {
        ...persona.metadata,
        created_at: new Date().toISOString(),
      },
    };

    // Convert to JSON
    const personaJson = JSON.stringify(personaData, null, 2);
    const fileSize = Buffer.byteLength(personaJson, 'utf-8');

    // Create metadata
    const metadata: PersonaMetadata = {
      persona_id: personaId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      source_text_blocks: persona.metadata.source_text_blocks,
      source_links: persona.metadata.source_links,
      file_size: fileSize,
    };

    // Upload persona JSON
    const personaPath = `${personaId}.json`;
    logger.debug('Uploading persona file', { personaPath, fileSize });

    const personaResponse = await supabase.storage
      .from(BUCKET_NAME)
      .upload(personaPath, Buffer.from(personaJson), {
        contentType: 'application/json',
        upsert: false, // Don't overwrite if exists
      });

    if (personaResponse.error) {
      throw new StorageError(`Failed to upload persona: ${personaResponse.error.message}`, {
        storageError: personaResponse.error,
      });
    }

    // Upload metadata
    const metadataPath = `${personaId}${METADATA_SUFFIX}`;
    logger.debug('Uploading metadata file', { metadataPath });

    const metadataResponse = await supabase.storage
      .from(BUCKET_NAME)
      .upload(metadataPath, Buffer.from(JSON.stringify(metadata, null, 2)), {
        contentType: 'application/json',
        upsert: false,
      });

    if (metadataResponse.error) {
      // Clean up persona if metadata upload fails
      await supabase.storage.from(BUCKET_NAME).remove([personaPath]);
      throw new StorageError(`Failed to upload metadata: ${metadataResponse.error.message}`, {
        storageError: metadataResponse.error,
      });
    }

    logger.info('Persona saved successfully', {
      personaId,
      fileSize,
      textBlocksCount: persona.metadata.source_text_blocks,
      linksCount: persona.metadata.source_links,
    });

    return { personaId, metadata };
  } catch (error) {
    if (error instanceof StorageError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new StorageError(`Error saving persona: ${error.message}`, {
        originalError: error.name,
      });
    }

    throw new StorageError('Unknown error while saving persona');
  }
}

/**
 * Get persona from Supabase by ID
 */
export async function getPersona(personaId: string): Promise<Persona> {
  const supabase = getSupabaseClient();

  try {
    logger.debug('Retrieving persona from Supabase', { personaId });

    const personaPath = `${personaId}.json`;

    const response = await supabase.storage
      .from(BUCKET_NAME)
      .download(personaPath);

    if (response.error) {
      if (response.error.message.includes('not found')) {
        throw new NotFoundError(`Persona with ID "${personaId}" not found`);
      }
      throw new StorageError(`Failed to retrieve persona: ${response.error.message}`, {
        storageError: response.error,
      });
    }

    if (!response.data) {
      throw new NotFoundError(`Persona with ID "${personaId}" not found`);
    }

    // Parse JSON
    const text = await response.data.text();
    const persona = JSON.parse(text) as Persona;

    logger.info('Persona retrieved successfully', { personaId, personaName: persona.name });

    return persona;
  } catch (error) {
    if (error instanceof StorageError || error instanceof NotFoundError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new StorageError(`Error retrieving persona: ${error.message}`, {
        originalError: error.name,
      });
    }

    throw new StorageError('Unknown error while retrieving persona');
  }
}

/**
 * Get persona metadata
 */
export async function getPersonaMetadata(personaId: string): Promise<PersonaMetadata> {
  const supabase = getSupabaseClient();

  try {
    logger.debug('Retrieving persona metadata', { personaId });

    const metadataPath = `${personaId}${METADATA_SUFFIX}`;

    const response = await supabase.storage
      .from(BUCKET_NAME)
      .download(metadataPath);

    if (response.error) {
      if (response.error.message.includes('not found')) {
        throw new NotFoundError(`Metadata for persona "${personaId}" not found`);
      }
      throw new StorageError(`Failed to retrieve metadata: ${response.error.message}`);
    }

    if (!response.data) {
      throw new NotFoundError(`Metadata for persona "${personaId}" not found`);
    }

    const text = await response.data.text();
    const metadata = JSON.parse(text) as PersonaMetadata;

    return metadata;
  } catch (error) {
    if (error instanceof StorageError || error instanceof NotFoundError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new StorageError(`Error retrieving metadata: ${error.message}`);
    }

    throw new StorageError('Unknown error while retrieving metadata');
  }
}

/**
 * List all personas with pagination
 */
export async function listPersonas(
  limit: number = 20,
  offset: number = 0
): Promise<{
  personas: Array<{ id: string; name: string; created_at: string }>;
  total: number;
}> {
  const supabase = getSupabaseClient();

  try {
    logger.debug('Listing personas', { limit, offset });

    const response = await supabase.storage
      .from(BUCKET_NAME)
      .list('', {
        limit: limit + offset + 10, // Get extra to account for metadata files
        offset: 0,
      });

    if (response.error) {
      throw new StorageError(`Failed to list personas: ${response.error.message}`);
    }

    if (!response.data) {
      return { personas: [], total: 0 };
    }

    // Filter only persona files (not metadata), extract unique IDs
    const personaIds = new Set<string>();
    const personaMap = new Map<string, { created_at: string }>();

    for (const file of response.data) {
      if (file.name.endsWith(METADATA_SUFFIX)) {
        const id = file.name.replace(METADATA_SUFFIX, '');
        personaIds.add(id);
        personaMap.set(id, {
          created_at: file.created_at,
        });
      }
    }

    // Get persona data for the IDs
    const personas: Array<{ id: string; name: string; created_at: string }> = [];

    for (const id of Array.from(personaIds).slice(offset, offset + limit)) {
      try {
        const persona = await getPersona(id);
        const metadata = personaMap.get(id);

        personas.push({
          id,
          name: persona.name,
          created_at: metadata?.created_at || new Date().toISOString(),
        });
      } catch (error) {
        logger.warn(`Failed to load persona ${id}`, error instanceof Error ? error : null);
      }
    }

    logger.info('Personas listed successfully', {
      count: personas.length,
      total: personaIds.size,
    });

    return {
      personas,
      total: personaIds.size,
    };
  } catch (error) {
    if (error instanceof StorageError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new StorageError(`Error listing personas: ${error.message}`);
    }

    throw new StorageError('Unknown error while listing personas');
  }
}

/**
 * Delete persona
 */
export async function deletePersona(personaId: string): Promise<void> {
  const supabase = getSupabaseClient();

  try {
    logger.debug('Deleting persona', { personaId });

    const personaPath = `${personaId}.json`;
    const metadataPath = `${personaId}${METADATA_SUFFIX}`;

    // Delete both files
    const response = await supabase.storage
      .from(BUCKET_NAME)
      .remove([personaPath, metadataPath]);

    if (response.error) {
      throw new StorageError(`Failed to delete persona: ${response.error.message}`);
    }

    logger.info('Persona deleted successfully', { personaId });
  } catch (error) {
    if (error instanceof StorageError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new StorageError(`Error deleting persona: ${error.message}`);
    }

    throw new StorageError('Unknown error while deleting persona');
  }
}
