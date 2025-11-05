/**
 * usePersona Hook
 * Fetch and cache persona data
 */

import { useState, useEffect } from "react";
import { Persona } from "@/types/persona";
import { personaService } from "@/services/serviceFactory";

interface UsePersonaReturn {
  persona: Persona | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePersona(personaId: string | null): UsePersonaReturn {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPersona = async () => {
    if (!personaId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await personaService.getPersona(personaId);

      if (response.success && response.persona) {
        setPersona(response.persona);
      } else {
        setError(response.error || "Failed to load persona");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersona();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personaId]);

  return {
    persona,
    loading,
    error,
    refetch: fetchPersona,
  };
}
