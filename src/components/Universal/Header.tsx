export default function Header({ children }: {children: React.ReactNode}) {
    return (
      <header className="border-b-2 border-white pb-5 lg:pt-5 pt-2 sm:pt-0">
        <h1 className="text-center text-3xl text-white lg:text-6xl">
          {children}
        </h1>
      </header>
    );
  }
