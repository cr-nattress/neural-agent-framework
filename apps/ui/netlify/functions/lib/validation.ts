/**
 * Zod validation schemas for all API endpoints
 */

import { z } from 'zod';

// Input validation schemas
export const PersonaInputSchema = z.object({
  textBlocks: z
    .array(
      z.string()
        .min(1, 'Text block cannot be empty')
        .max(10000, 'Text block exceeds maximum length of 10,000 characters')
        .trim()
    )
    .min(1, 'At least one text block is required')
    .max(50, 'Maximum 50 text blocks allowed'),
  links: z
    .array(
      z.string()
        .url('Invalid URL format')
        .max(2048, 'URL exceeds maximum length of 2,048 characters')
    )
    .max(50, 'Maximum 50 links allowed')
    .optional()
    .default([]),
});

export const ChatRequestSchema = z.object({
  personaId: z
    .string()
    .min(1, 'Persona ID is required')
    .max(100, 'Invalid persona ID'),
  message: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(5000, 'Message exceeds maximum length'),
  conversationHistory: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().min(1).max(5000),
      })
    )
    .optional()
    .default([]),
});

export const SavePersonaSchema = z.object({
  persona: z.object({
    name: z.string().min(1).max(255),
    age: z.number().int().min(0).max(150).optional(),
    occupation: z.string().max(255).optional(),
    background: z.string().min(1).max(10000),
    personality: z.string().min(1).max(5000),
    traits: z.array(z.string().max(100)).max(50),
    interests: z.array(z.string().max(100)).max(50),
    goals: z.array(z.string().max(500)).max(20).optional(),
    challenges: z.array(z.string().max(500)).max(20).optional(),
    communicationStyle: z.string().max(1000).optional(),
    workStyle: z.string().max(1000).optional(),
  }),
});

export const GetPersonaSchema = z.object({
  personaId: z.string().min(1).max(100),
});

// Output validation schemas
export const PersonaResponseSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  age: z.number().int().optional(),
  occupation: z.string().optional(),
  background: z.string(),
  personality: z.string(),
  traits: z.array(z.string()),
  interests: z.array(z.string()),
  goals: z.array(z.string()).optional(),
  challenges: z.array(z.string()).optional(),
  communicationStyle: z.string().optional(),
  workStyle: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z
    .object({
      code: z.string(),
      message: z.string(),
      details: z.any().optional(),
      timestamp: z.string(),
    })
    .optional(),
});

// Type exports
export type PersonaInput = z.infer<typeof PersonaInputSchema>;
export type ChatRequest = z.infer<typeof ChatRequestSchema>;
export type SavePersona = z.infer<typeof SavePersonaSchema>;
export type GetPersona = z.infer<typeof GetPersonaSchema>;
export type PersonaResponse = z.infer<typeof PersonaResponseSchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
