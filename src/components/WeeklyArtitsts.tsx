import Image from 'next/image'
import nftImage from '../../public/nft-1.jpg'
import { useNftsDataContext } from '~/utils/DataContext';

const WeeklyArtists = () => {
  const people = useNftsDataContext().peopleData.slice(0, 5)

  return (
    <section className="mb-32 md:mb-40">
      <h2 className=" text-center text-4xl md:text-5xl text-white">
        <span className="relative">Artists
        <hr className="absolute w-full  left-1/2 right-1/2 translate-x-[-50%] bg-primary md:p-[.1rem] p-[.06rem]" />
        </span> Of The{" "}
        <span className=" text-primary">Week</span>
      </h2>
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
        {/* <li className="honeycomb-cell">
          <Image alt="Artist Profile Image" className="honeycomb-cell__image" src={nftImage}/>
          <div className="honeycomb-cell__title">CryptoKittyQ</div>
        </li>
        <li className="honeycomb-cell">
          <Image alt="Artist Profile Image" className="honeycomb-cell__image" src={nftImage}/>
          <div className="honeycomb-cell__title">RoboRarity</div>
        </li>
        <li className="honeycomb-cell">
          <Image alt="Artist Profile Image" className="honeycomb-cell__image" src={nftImage}/>
          <div className="honeycomb-cell__title">
            GalacticGaz<small>No vidrio</small>
          </div>
        </li>
        <li className="honeycomb-cell">
          <Image alt="Artist Profile Image" className="honeycomb-cell__image" src={nftImage}/>
          <div className="honeycomb-cell__title">
            ElecEag<small>1 de repuesto</small>
          </div>
        </li>
        <li className="honeycomb-cell">
          <Image alt="Artist Profile Image" className="honeycomb-cell__image" src={nftImage}/>
          <div className="honeycomb-cell__title">NeonNar</div>
        </li>
        <li className="honeycomb-cell honeycomb__placeholder"></li> */}
      </ul>
    </section>
  );
};

export default WeeklyArtists;
