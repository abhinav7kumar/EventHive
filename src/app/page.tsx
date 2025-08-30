import { getAiRecommendation } from '@/app/actions/ai';
import { HomePageClient } from '@/components/home-page-client';
import { getEvents, getFeaturedEvents, getTrendingEvents } from '@/lib/mock-data';

export default async function Home() {
  const allEvents = getEvents();
  const featuredEvents = getFeaturedEvents();
  const trendingEvents = getTrendingEvents();
  const aiRecommendation = await getAiRecommendation();

  return (
    <HomePageClient
      allEvents={allEvents}
      featuredEvents={featuredEvents}
      trendingEvents={trendingEvents}
      aiRecommendation={aiRecommendation}
    />
  );
}
