# TASK-01-01-06: Implement Mock Persona Service

---

## Metadata
- **Task ID:** TASK-01-01-06
- **Story:** [STORY-01-01: Mock Service Infrastructure](../stories/STORY-01-01-mock-services.md)
- **Epic:** [EPIC-01: Frontend with Mock Data](../epics/EPIC-01-frontend-mock.md)
- **Priority:** P0 - Critical
- **Status:** Ready to Start
- **Effort Estimate:** M (4-6 hours)
- **Dependencies:** TASK-01-01-04 (TypeScript types), TASK-01-01-05 (Service interface)

---

## Description
Create a mock implementation of the persona service that simulates backend API calls with realistic delays and returns structured persona data. This enables frontend development without requiring the actual backend.

---

## AI-Executable Prompt

```
Create a mock persona service implementation at:
apps/ui/services/mock/mockPersonaService.ts

Requirements:
1. Import IPersonaService interface from services/persona.service.ts
2. Import types from types/persona.ts
3. Create delay utility function (if not in lib/utils.ts)
4. Implement all methods from IPersonaService:
   - processPersona(input: PersonaInputPayload): Promise<ProcessPersonaResponse>
   - savePersona(payload: SavePersonaPayload): Promise<SavePersonaResponse>
   - getPersona(id: string): Promise<GetPersonaResponse>
   - listPersonas(): Promise<Persona[]>

Implementation details:
- Add realistic delays (1000-2000ms for processPersona, 500-1000ms for others)
- Return mock structured persona data based on input
- Generate unique IDs for saved personas
- Simulate success and error scenarios
- Include metadata in responses

The mock service should feel like a real API with:
- Asynchronous delays
- Realistic response structure
- Proper error handling
- TypeScript type safety
```

---

## Code Template

### File: `apps/ui/services/mock/mockPersonaService.ts`

```typescript
import { IPersonaService } from '../persona.service';
import {
  PersonaInputPayload,
  ProcessPersonaResponse,
  SavePersonaPayload,
  SavePersonaResponse,
  GetPersonaRequest,
  GetPersonaResponse,
  Persona,
} from '@/types/persona';
import { delay } from '@/lib/utils';
import { mockPersonas } from './data/personas';

/**
 * Mock implementation of persona service
 * Simulates backend API calls with realistic delays
 */
export const mockPersonaService: IPersonaService = {
  /**
   * Process raw input and return structured persona
   * Simulates OpenAI processing with 1.5-2s delay
   */
  async processPersona(input: PersonaInputPayload): Promise<ProcessPersonaResponse> {
    // Simulate network delay
    await delay(1500 + Math.random() * 500);

    try {
      // Generate mock persona based on input
      const mockPersona: Persona = {
        name: extractNameFromText(input.textBlocks) || 'John Doe',
        age: 30 + Math.floor(Math.random() * 20),
        occupation: 'Professional',
        background: generateBackground(input.textBlocks),
        traits: ['analytical', 'creative', 'detail-oriented', 'collaborative'],
        interests: ['technology', 'innovation', 'learning', 'problem-solving'],
        skills: extractSkills(input.textBlocks),
        values: ['integrity', 'excellence', 'continuous improvement'],
        communication_style: 'Clear and concise',
        personality_type: 'INTJ',
        goals: ['Professional growth', 'Impact-driven work'],
        challenges: ['Work-life balance', 'Staying current with technology'],
        relationships: [],
        metadata: {
          created_at: new Date().toISOString(),
          source_text_blocks: input.textBlocks.length,
          source_links: input.links.length,
        },
        raw_data: input,
      };

      return {
        success: true,
        persona: mockPersona,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to process persona data',
      };
    }
  },

  /**
   * Save persona to storage
   * Simulates Supabase save with 500-800ms delay
   */
  async savePersona(payload: SavePersonaPayload): Promise<SavePersonaResponse> {
    await delay(500 + Math.random() * 300);

    try {
      // Generate unique ID
      const personaId = `persona_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Simulate storage
      console.log('[MOCK] Saving persona:', personaId);

      return {
        success: true,
        persona_id: personaId,
        storage_path: `personas/${personaId}.json`,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to save persona',
      };
    }
  },

  /**
   * Retrieve persona by ID
   * Simulates Supabase retrieval with 300-500ms delay
   */
  async getPersona(id: string): Promise<GetPersonaResponse> {
    await delay(300 + Math.random() * 200);

    try {
      // Try to find in mock data
      const persona = mockPersonas.find((p) => p.id === id);

      if (!persona) {
        return {
          success: false,
          error: `Persona not found: ${id}`,
        };
      }

      return {
        success: true,
        persona,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to retrieve persona',
      };
    }
  },

  /**
   * List all personas
   * Simulates Supabase query with 400-600ms delay
   */
  async listPersonas(): Promise<Persona[]> {
    await delay(400 + Math.random() * 200);
    return mockPersonas;
  },
};

// Helper functions for generating mock data

function extractNameFromText(textBlocks: string[]): string | null {
  // Simple name extraction (can be enhanced)
  for (const block of textBlocks) {
    const nameMatch = block.match(/(?:name is|I'm|I am)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
    if (nameMatch) {
      return nameMatch[1];
    }
  }
  return null;
}

function generateBackground(textBlocks: string[]): string {
  // Combine first 200 chars of each block
  return textBlocks
    .map((block) => block.substring(0, 200))
    .join(' ')
    .substring(0, 500) || 'Background information extracted from provided text blocks.';
}

function extractSkills(textBlocks: string[]): string[] {
  const commonSkills = [
    'Communication',
    'Problem Solving',
    'Leadership',
    'Teamwork',
    'Analytical Thinking',
    'Project Management',
  ];

  // Return random subset of skills
  const count = 3 + Math.floor(Math.random() * 3);
  return commonSkills.slice(0, count);
}
```

### File: `apps/ui/lib/utils.ts` (add delay function)

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utility function to simulate async delay
 * @param ms Milliseconds to delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

---

## Acceptance Criteria
- [ ] mockPersonaService.ts created in services/mock/
- [ ] Implements IPersonaService interface
- [ ] All methods have realistic delays (500-2000ms)
- [ ] processPersona returns structured persona based on input
- [ ] savePersona generates unique ID
- [ ] getPersona retrieves from mock data array
- [ ] listPersonas returns all mock personas
- [ ] Error scenarios handled (persona not found, etc.)
- [ ] TypeScript types correct (no type errors)
- [ ] Helper functions for data generation implemented

---

## Validation Steps

1. **Import test:**
   ```typescript
   import { mockPersonaService } from '@/services/mock/mockPersonaService';
   ```

2. **Test processPersona:**
   ```typescript
   const result = await mockPersonaService.processPersona({
     textBlocks: ['I am Sarah, a UX designer...'],
     links: ['https://example.com'],
   });
   console.log(result); // Should return ProcessPersonaResponse
   ```

3. **Test savePersona:**
   ```typescript
   const saveResult = await mockPersonaService.savePersona({
     persona: result.persona!,
   });
   console.log(saveResult); // Should return persona_id
   ```

4. **Test getPersona:**
   ```typescript
   const getResult = await mockPersonaService.getPersona('persona_001');
   console.log(getResult); // Should return persona or error
   ```

5. **Test listPersonas:**
   ```typescript
   const personas = await mockPersonaService.listPersonas();
   console.log(personas.length); // Should return array of personas
   ```

6. **Test delays:**
   - Verify each method takes appropriate time to complete
   - Should feel like real API call

---

## Testing Checklist

### Unit Tests (if implementing)
- [ ] processPersona returns valid Persona object
- [ ] savePersona generates unique IDs
- [ ] getPersona finds existing persona
- [ ] getPersona returns error for non-existent ID
- [ ] listPersonas returns array

### Manual Tests
- [ ] Call each method in browser console
- [ ] Verify delays feel realistic
- [ ] Check TypeScript autocomplete works
- [ ] Verify error messages user-friendly

---

## Common Issues & Solutions

### Issue: TypeScript errors on interface implementation
**Solution:** Ensure all interface methods are implemented with correct signatures

### Issue: Delays too fast/slow
**Solution:** Adjust delay ranges to feel realistic (not instant, not too slow)

### Issue: Mock data doesn't match real schema
**Solution:** Reference types/persona.ts for correct structure

---

## Dependencies
- TASK-01-01-04 (TypeScript types defined)
- TASK-01-01-05 (Service interface created)
- TASK-01-01-07 (Mock data fixtures) - can be done in parallel

---

## Outputs
- Mock persona service fully implemented
- All interface methods working
- Realistic delays simulated
- Ready for frontend component integration

---

**Created:** 2025-11-04
**Estimated Time:** 4-6 hours
**Actual Time:** ___ (to be filled on completion)
