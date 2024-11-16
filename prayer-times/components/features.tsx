import Image from "next/image";

export function FeatureGridItem(props: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
      <div className="flex h-[180px] flex-col rounded-md p-6 gap-4">
        {props.icon}
        <div className="space-y-2">
          <h3 className="font-bold">{props.title}</h3>
          <p className="text-sm text-muted-foreground">{props.description}</p>
        </div>
      </div>
    </div>
  );
}

export function FeatureGrid(props: {
  title: string;
  subtitle: string;
  items: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
}) {
  return (
    <section id="features" className="container mx-auto px-6 space-y-6 py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">{props.title}</h2>
        <p className="max-w-[85%] text-muted-foreground sm:text-lg">
          {props.subtitle}
        </p>
      </div>

      <div className="mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4">
        <div className="flex flex-col gap-4">
          {props.items.map((item, index) => (
            <FeatureGridItem key={index} {...item} />
          ))}
        </div>
        <div className="relative">
          <Image
            src="/demo.png"
            fill={true}
            alt="Demo Calendar"
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex justify-center "></div>
    </section>
  );
}
