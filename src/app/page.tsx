
import { getAiRecommendation } from "@/app/actions/ai";
import { HomePageClient } from "@/components/home-page-client";
import { SiteHeader } from "@/components/site-header";
import { getEvents } from "@/lib/mock-data";

export default async function Home() {
  const allEvents = getEvents();
  const featuredEvents = allEvents.filter(e => e.isFeatured);
  const trendingEvents = allEvents.filter(e => e.isTrending);
  const aiRecommendation = await getAiRecommendation();

  return (
    <>
      <SiteHeader />
      <HomePageClient 
        allEvents={allEvents}
        featuredEvents={featuredEvents}
        trendingEvents={trendingEvents}
        aiRecommendation={aiRecommendation}
      />
    </>
  );
}
