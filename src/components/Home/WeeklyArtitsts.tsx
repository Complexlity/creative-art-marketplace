import Image from "next/image";
import { useNftsDataContext } from "~/contexts/legacy_NftsDataContext";

const WeeklyArtists = () => {
  const people = useNftsDataContext().peopleData.slice(0, 5);

  return (
    <section className="mb-32 px-1 md:mb-40">
      <header className="mb-8 tracking-wide">
        <h2 className=" text-center text-4xl text-white md:text-5xl">
          <span className="relative">
            Artists
            <hr className="absolute left-1/2 right-1/2 top-[100%] w-full translate-x-[-50%] bg-primary p-[.06rem] sm:top-[calc(100%+2px)] md:p-[.07rem]" />
          </span>{" "}
          Of The <span className=" text-primary">Week</span>
        </h2>
      </header>
      <ul className="honeycomb" lang="es">
        {people.map((item, index) => {
          const [firstName, LastName] = item.name.split(" ");
          return (
            <li key={index} className="honeycomb-cell">
              <Image
                alt={`${item.name} Profile Image`}
                className="honeycomb-cell__image"
                src={item.image}
              />
              <div className="honeycomb-cell__title">
                {firstName}
                <small> {LastName}</small>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default WeeklyArtists;
