export default function HeroHeader({ children }: {children: React.ReactNode}) {
    return (
      <header className="border-b-2 border-white pb-24 pt-12 lg:pt-20">
        <h1 className="text-center text-5xl text-white md:text-6xl">
          {children}
        </h1>
      </header>
    );
  }
  