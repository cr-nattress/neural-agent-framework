"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PersonaInputPayload, Persona } from "@/types/persona";
import { personaService, authService } from "@/services/serviceFactory";
import { TextBlockInput } from "@/components/persona/TextBlockInput";
import { LinkInput } from "@/components/persona/LinkInput";
import { PersonaReview } from "@/components/persona/PersonaReview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Sparkles, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";

type ViewMode = "form" | "review";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { user, isLoading, signOut } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>("form");
  const [textBlocks, setTextBlocks] = useState<string[]>([""]);
  const [links, setLinks] = useState<string[]>([""]);
  const [persona, setPersona] = useState<Persona | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isHandlingCallback, setIsHandlingCallback] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty blocks and links
    const filteredTextBlocks = textBlocks.filter((block) => block.trim() !== "");
    const filteredLinks = links.filter((link) => link.trim() !== "");

    // Validation
    if (filteredTextBlocks.length === 0 && filteredLinks.length === 0) {
      toast({
        title: "Input Required",
        description: "Please add at least one text block or link",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      console.log("[page.tsx] handleSubmit started");
      console.log("[page.tsx] Text blocks:", filteredTextBlocks);
      console.log("[page.tsx] Links:", filteredLinks);

      const payload: PersonaInputPayload = {
        textBlocks: filteredTextBlocks,
        links: filteredLinks,
      };

      console.log("[page.tsx] About to call personaService.processPersona");
      console.log("[page.tsx] Service instance:", personaService);

      const response = await personaService.processPersona(payload);

      console.log("[page.tsx] Got response from processPersona:", response);

      if (response.success && response.persona) {
        console.log("[page.tsx] Success! Setting persona:", response.persona);
        setPersona(response.persona);
        setViewMode("review");
        toast({
          title: "Persona Created!",
          description: "Review the structured persona data below",
        });
      } else {
        console.error("[page.tsx] Response not successful:", response);
        toast({
          title: "Processing Failed",
          description: response.error || "Failed to process persona data",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("[page.tsx] CATCH block error:", error);
      console.error("[page.tsx] Error message:", error.message);
      console.error("[page.tsx] Error stack:", error.stack);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = async () => {
    if (!persona) return;

    setIsSaving(true);

    try {
      const response = await personaService.savePersona({ persona });

      if (response.success) {
        toast({
          title: "Persona Saved!",
          description: `Persona saved successfully with ID: ${response.persona_id}`,
        });
      } else {
        toast({
          title: "Save Failed",
          description: response.error || "Failed to save persona",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred while saving",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    setViewMode("form");
  };

  const handleReset = () => {
    setTextBlocks([""]);
    setLinks([""]);
    setPersona(null);
    setViewMode("form");
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/auth/login");
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  // Handle OAuth/OTP callback with code parameter
  // Supabase sends the code to the root path instead of /auth/callback
  useEffect(() => {
    const handleAuthCallback = async () => {
      const code = searchParams.get("code");
      const error = searchParams.get("error");

      if (error) {
        const errorDescription = searchParams.get("error_description");
        toast({
          title: "Authentication Error",
          description: errorDescription || "Authentication failed",
          variant: "destructive",
        });
        // Clear the URL after showing error
        window.history.replaceState({}, document.title, "/");
        return;
      }

      if (code && !isHandlingCallback) {
        setIsHandlingCallback(true);
        try {
          const supabase = createClient();

          // For OTP (magic link) flow, we need to verify the token
          // The code parameter is the OTP token that was sent via email
          const { data, error: verifyError } = await supabase.auth.verifyOtp({
            token: code,
            type: "magiclink",
          });

          if (verifyError) {
            console.error("OTP verification error:", verifyError);
            toast({
              title: "Authentication Error",
              description: verifyError.message || "Failed to authenticate",
              variant: "destructive",
            });
            // Clear the URL after showing error
            window.history.replaceState({}, document.title, "/");
          } else {
            // OTP verification successful - the user is now authenticated
            // The useAuth hook will detect the new session and update
            // Clear the URL
            window.history.replaceState({}, document.title, "/");
            toast({
              title: "Signed In",
              description: "Successfully authenticated with magic link",
            });
          }
        } catch (error) {
          console.error("Unexpected auth error:", error);
          toast({
            title: "Error",
            description: "An unexpected error occurred during authentication",
            variant: "destructive",
          });
          window.history.replaceState({}, document.title, "/");
        } finally {
          setIsHandlingCallback(false);
        }
      }
    };

    handleAuthCallback();
  }, [searchParams, isHandlingCallback, router, toast]);

  // Check authentication and redirect if needed
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  // Show loading state while checking authentication or processing callback
  if (isLoading || isHandlingCallback) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">
            {isHandlingCallback ? "Authenticating..." : "Loading..."}
          </p>
        </div>
      </main>
    );
  }

  // Don't render if not authenticated (redirect in useEffect above)
  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 max-w-4xl flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Neural Agent</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {user.email}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-4xl font-bold tracking-tight">Create a Persona</h2>
          <p className="text-lg text-muted-foreground">
            Add text blocks and links about the person you want to model
          </p>
        </div>

        {/* Form View */}
        {viewMode === "form" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create a Persona</CardTitle>
                <CardDescription>
                  Add text blocks and links about the person you want to model
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <TextBlockInput
                  textBlocks={textBlocks}
                  onChange={setTextBlocks}
                />
                <LinkInput links={links} onChange={setLinks} />
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                type="submit"
                size="lg"
                disabled={isProcessing}
                className="flex-1 gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Create Persona
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleReset}
                disabled={isProcessing}
              >
                Reset
              </Button>
            </div>
          </form>
        )}

        {/* Review View */}
        {viewMode === "review" && persona && (
          <PersonaReview
            persona={persona}
            onSave={handleSave}
            onBack={handleBack}
            isSaving={isSaving}
          />
        )}
      </div>
    </main>
  );
}
