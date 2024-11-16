import { FeatureGrid } from "@/components/features";
import { GetStarted } from "@/components/getstarted";
import { Hero } from "@/components/hero";
import { CalendarIcon, ClockIcon, Pencil2Icon } from "@radix-ui/react-icons";

export default async function IndexPage() {
  return (
    <>
      <Hero
        capsuleText="Free Forever"
        title="Your Prayers, On Time"
        subtitle="Hassle-free scheduling for every salah, directly on your calendar."
        primaryCtaText="Get Started"
        primaryCtaLink="/#get-started"
        secondaryCtaText="Learn More"
        secondaryCtaLink="/#features"
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

      <div id="features" />
      <FeatureGrid
        title="Features"
        subtitle="Tailor the perfect prayer schedule for your needs."
        items={[
          {
            icon: <Pencil2Icon className="h-12 w-12" />,
            title: "Full Flexibility",
            description:
              "Configure preferred calculation methods and Asr preference.",
          },
          {
            icon: <ClockIcon className="h-12 w-12" />,
            title: "Alarms & Event Durations",
            description:
              "Adjust alarm times and prayer event lengths to fit your schedule.",
          },
          {
            icon: <CalendarIcon className="h-12 w-12" />,
            title: "Seamless Calendar Integration",
            description:
              ".ics file sent directly to your email, ready to be added to your calendar.",
          },
        ]}
      />

      <div id="get-started" />
      <GetStarted />
    </>
  );
}
