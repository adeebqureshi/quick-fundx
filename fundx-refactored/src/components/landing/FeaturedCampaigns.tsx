import { Link } from "react-router-dom";
import { ArrowRight, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useCampaigns } from "@/hooks/useCampaigns";

const fallbackCampaigns = [
  {
    id: "demo-healthcare",
    title: "Community Healthcare Fund",
    description: "Help local clinics buy critical diagnostic equipment and reach underserved families.",
    category: "Healthcare",
    targetAmount: "2500000",
    raisedAmount: "1425000",
    images: [],
    deadline: new Date(Date.now() + 45 * 864e5).toISOString(),
    featured: true,
    creator: { id: "demo", name: "Quick Fundx Foundation" },
  },
  {
    id: "demo-startup",
    title: "Solar Micro-grid Startup",
    description: "Back a renewable energy startup bringing reliable power to rural businesses.",
    category: "Startup Investment",
    targetAmount: "5000000",
    raisedAmount: "3120000",
    images: [],
    deadline: new Date(Date.now() + 30 * 864e5).toISOString(),
    featured: true,
    creator: { id: "demo", name: "GreenGrid Labs" },
  },
];

const formatCurrency = (value: string) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(value));

const FeaturedCampaigns = () => {
  const { data, isLoading, isError } = useCampaigns("page=1&limit=3&sort=trending&status=LIVE");
  const campaigns = data?.items?.length ? data.items : fallbackCampaigns;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Crowdfunding Marketplace</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">Fund ideas that move communities forward</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl">Live API-backed campaigns support donations, investments, moderation, updates, and secure payment provider hand-offs.</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/register">Start a campaign <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>

        {isError && <p className="text-sm text-muted-foreground mb-4">Showing curated campaigns while the API is unavailable.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((campaign) => {
            const percent = Math.min(100, Math.round((Number(campaign.raisedAmount) / Number(campaign.targetAmount)) * 100));
            return (
              <article key={campaign.id} className="rounded-2xl border border-border/60 bg-card/90 p-6 shadow-card hover:shadow-card-hover transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{campaign.category}</span>
                      {campaign.featured && <span className="text-xs text-muted-foreground">Featured</span>}
                    </div>
                    <h3 className="font-display text-lg font-semibold text-card-foreground mt-3">{campaign.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{campaign.description}</p>
                    <div className="mt-5 space-y-2">
                      <Progress value={percent} />
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-card-foreground">{formatCurrency(campaign.raisedAmount)} raised</span>
                        <span className="text-muted-foreground">{percent}% of {formatCurrency(campaign.targetAmount)}</span>
                      </div>
                    </div>
                    {isLoading && <p className="text-xs text-muted-foreground mt-3">Refreshing campaign data…</p>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCampaigns;
