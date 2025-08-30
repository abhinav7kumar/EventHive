'use server';

import { recommendEventsBasedOnUserPreferences } from "@/ai/flows/recommend-events-based-on-user-preferences";
import { getEvents } from "@/lib/mock-data";

export async function getAiRecommendation(): Promise<string> {
    try {
        const availableEvents = getEvents().map(e => ({ title: e.title, category: e.category, shortDescription: e.shortDescription }));
        const userPreferences = 'I am interested in technology conferences and indie music festivals. I recently attended a modern art exhibit.';

        const result = await recommendEventsBasedOnUserPreferences({
            userPreferences,
            availableEvents: JSON.stringify(availableEvents),
        });

        return result.recommendedEvents;
    } catch (error) {
        console.error('Error getting AI recommendation:', error);
        return '';
    }
}
