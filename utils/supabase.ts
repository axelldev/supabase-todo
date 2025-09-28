/**
 * Supabase Client Configuration
 *
 * This module provides a properly configured Supabase client instance
 * following best practices for React Native applications.
 *
 * Features:
 * - Singleton pattern for client instance
 * - Proper error handling and logging
 * - Session management and refresh
 * - Type-safe configuration
 */

import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { AppState, AppStateStatus } from "react-native";

import type { Database } from "../types/supabase";
import { getSupabaseConfig } from "./config";

// Global client instance
let supabaseInstance: SupabaseClient<Database> | null = null;

/**
 * Creates and configures a new Supabase client instance
 * @returns Configured Supabase client
 */
function createSupabaseClient(): SupabaseClient<Database> {
  try {
    const config = getSupabaseConfig();

    const client = createClient<Database>(config.url, config.anonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
        // Add flow type for better debugging
        flowType: "pkce",
      },
      // Global configuration
      global: {
        headers: {
          "X-Client-Info": "supabase-todo@1.0.0",
        },
      },
      // Database configuration
      db: {
        schema: "public",
      },
      // Real-time configuration
      realtime: {
        params: {
          eventsPerSecond: 2,
        },
      },
    });

    if (config.debug) {
      console.log("Supabase client created successfully");
    }

    return client;
  } catch (error) {
    console.error("Failed to create Supabase client:", error);
    throw error;
  }
}

/**
 * Returns the singleton Supabase client instance
 * Creates a new instance if one doesn't exist
 */
export function getSupabaseClient(): SupabaseClient<Database> {
  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient();
    setupAppStateListener();
  }
  return supabaseInstance;
}

/**
 * Sets up app state listener for session management
 */
function setupAppStateListener(): void {
  if (!supabaseInstance) return;

  const handleAppStateChange = async (state: AppStateStatus) => {
    if (state === "active" && supabaseInstance) {
      try {
        await supabaseInstance.auth.startAutoRefresh();
        console.log("Session refreshed successfully");
      } catch (error) {
        console.error("Error refreshing session:", error);
      }
    }
  };

  AppState.addEventListener("change", handleAppStateChange);
}

/**
 * Main Supabase client instance (singleton)
 * Use this throughout your application
 */
export const supabase = getSupabaseClient();

/**
 * Type exports for convenience
 */
export type { Database } from "../types/supabase";
export type SupabaseClientType = SupabaseClient<Database>;
