/**
 * Supabase Configuration Validation
 * Provides runtime validation and type-safe access to environment variables
 */

interface SupabaseConfig {
  url: string;
  anonKey: string;
  debug: boolean;
}

class ConfigError extends Error {
  constructor(message: string) {
    super(`Supabase Config Error: ${message}`);
    this.name = "ConfigError";
  }
}

/**
 * Validates and returns Supabase configuration
 * Throws ConfigError if required environment variables are missing or invalid
 */
export function getSupabaseConfig(): SupabaseConfig {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
  const debug = process.env.EXPO_PUBLIC_SUPABASE_DEBUG === "true";

  // Validate required environment variables
  if (!url) {
    throw new ConfigError(
      "EXPO_PUBLIC_SUPABASE_URL is required. Please check your .env file."
    );
  }

  if (!anonKey) {
    throw new ConfigError(
      "EXPO_PUBLIC_SUPABASE_ANON_KEY is required. Please check your .env file."
    );
  }

  // Validate URL format
  try {
    new URL(url);
  } catch {
    throw new ConfigError(
      `EXPO_PUBLIC_SUPABASE_URL must be a valid URL. Received: ${url}`
    );
  }

  // Validate URL is Supabase URL
  if (!url.includes("supabase.co") && !url.includes("localhost")) {
    console.warn(
      "Warning: EXPO_PUBLIC_SUPABASE_URL does not appear to be a Supabase URL"
    );
  }

  // Validate anon key format (basic check)
  if (anonKey.length < 50) {
    console.warn(
      "Warning: EXPO_PUBLIC_SUPABASE_ANON_KEY appears to be too short"
    );
  }

  if (debug) {
    console.log("Supabase configuration loaded successfully:", {
      url: url.replace(/\/\/.*\./, "//*****."),
      anonKeyLength: anonKey.length,
      debug,
    });
  }

  return {
    url,
    anonKey,
    debug,
  };
}
