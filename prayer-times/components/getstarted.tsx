import PrayerTimesForm from "./prayertimesform";

export function GetStarted() {
  return (
    <section
      id="get-started"
      className="container px-6 mx-auto space-y-6 py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">Get Started</h2>
        <p className="max-w-[85%] text-muted-foreground sm:text-lg">
          Customize Your Settings to Begin.
        </p>
      </div>
      <PrayerTimesForm />
    </section>
  );
}
