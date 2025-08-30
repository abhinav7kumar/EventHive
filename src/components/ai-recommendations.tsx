import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function AiRecommendations({ recommendation }: { recommendation: string }) {
  if (!recommendation) {
    return null;
  }

  return (
    <section className="mb-16">
        <Card className="bg-accent/20 border-accent/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-accent"/>
                    <span>Recommended For You</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-accent-foreground/80">{recommendation}</p>
            </CardContent>
        </Card>
    </section>
  )
}
