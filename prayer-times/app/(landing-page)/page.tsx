// import { FeatureGrid } from "@/components/features";
import { Hero } from "@/components/hero";
// import { PricingGrid } from "@/components/pricing";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ComponentIcon, Users } from "lucide-react";

export default async function IndexPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Hero
        capsuleText="Free Forever"
        title="Your Prayers, On Time"
        subtitle="Hassle-free scheduling for every salah, directly on your calendar."
        primaryCtaText="Get Started"
        primaryCtaLink=""
        secondaryCtaText="GitHub"
        secondaryCtaLink="https://github.com/faseehirfan/prayerTimes"
        credits={
          <>
            Made by{" "}
            <a
              href="https://faseehirfan.com"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Faseeh Irfan
            </a>
          </>
        }
      />
    </div>
  );
}
