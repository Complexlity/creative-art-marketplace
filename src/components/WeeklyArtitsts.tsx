import Image from 'next/image'
import nftImage from '../../public/nft-1.jpg'
import { useNftsDataContext } from '~/utils/DataContext';

const WeeklyArtists = () => {
  const people = useNftsDataContext().peopleData.slice(0, 5)

  return (
    <section className="mb-32 md:mb-40 px-1">
      <header className='tracking-wide mb-8'>
        <h2 className=" text-center text-4xl md:text-5xl text-white">
        <span className="relative">Artists
        <hr className="absolute w-full top-[100%] sm:top-[calc(100%+2px)] left-1/2 right-1/2 translate-x-[-50%] bg-primary md:p-[.07rem] p-[.06rem]" />
        </span> Of The{" "}
        <span className=" text-primary">Week</span>
      </h2>
      </header>
      <ul className="honeycomb" lang="es">
        {people.map((item, index) => {
          const [firstName, LastName] = item.name.split(' ')
          return <li key={index} className="honeycomb-cell">
          <Image alt={`${item.name} Profile Image`} className="honeycomb-cell__image" src={item.image}/>
          <div className="honeycomb-cell__title">
              {firstName}<small> {LastName}</small>
          </div>
        </li>
        })}
       
      </ul>
    </section>
  );
};

export default WeeklyArtists;
