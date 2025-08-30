'use server';
/**
 * @fileOverview Recommends events based on user preferences.
 *
 * - recommendEventsBasedOnUserPreferences - A function that recommends events based on user preferences.
 * - RecommendEventsBasedOnUserPreferencesInput - The input type for the recommendEventsBasedOnUserPreferences function.
 * - RecommendEventsBasedOnUserPreferencesOutput - The return type for the recommendEventsBasedOnUserPreferences function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendEventsBasedOnUserPreferencesInputSchema = z.object({
  userPreferences: z
    .string()
    .describe('The user preferences and browsing history.'),
  availableEvents: z
    .string()
    .describe('The available events to recommend from.'),
});
export type RecommendEventsBasedOnUserPreferencesInput = z.infer<
  typeof RecommendEventsBasedOnUserPreferencesInputSchema
>;

const RecommendEventsBasedOnUserPreferencesOutputSchema = z.object({
  recommendedEvents: z
    .string()
    .describe('The recommended events based on user preferences.'),
});
export type RecommendEventsBasedOnUserPreferencesOutput = z.infer<
  typeof RecommendEventsBasedOnUserPreferencesOutputSchema
>;

export async function recommendEventsBasedOnUserPreferences(
  input: RecommendEventsBasedOnUserPreferencesInput
): Promise<RecommendEventsBasedOnUserPreferencesOutput> {
  return recommendEventsBasedOnUserPreferencesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendEventsBasedOnUserPreferencesPrompt',
  input: {
    schema: RecommendEventsBasedOnUserPreferencesInputSchema,
  },
  output: {
    schema: RecommendEventsBasedOnUserPreferencesOutputSchema,
  },
  prompt: `You are an expert event recommendation system.

  Based on the user's preferences and browsing history, recommend the most relevant events from the available events.

  User Preferences: {{{userPreferences}}}
  Available Events: {{{availableEvents}}}

  Recommend the events that are most likely to interest the user.
  `,
});

const recommendEventsBasedOnUserPreferencesFlow = ai.defineFlow(
  {
    name: 'recommendEventsBasedOnUserPreferencesFlow',
    inputSchema: RecommendEventsBasedOnUserPreferencesInputSchema,
    outputSchema: RecommendEventsBasedOnUserPreferencesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
