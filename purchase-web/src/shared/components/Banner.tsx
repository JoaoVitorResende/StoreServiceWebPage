interface BannerProps {
  title: string;
  subtitle: string;
}

export function Banner({ title, subtitle }: BannerProps) {
  return (
    <section className="rounded-xl bg-linear-to-r from-navy to-action px-8 py-12 text-white">
      <h1 className="text-4xl font-extrabold md:text-5xl">{title}</h1>
      <p className="mt-2 text-lg">{subtitle}</p>
    </section>
  );
}