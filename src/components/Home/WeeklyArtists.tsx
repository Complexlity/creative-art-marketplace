import Image from "next/image";
import Link from "next/link";
import { Nft, NftUser, WithUser } from "~/utils/types";

type ReduceReturnType =
  NftUser[][]
const WeeklyArtists = ({nfts: nftsData}: {nfts: WithUser<Nft>[]}) => {

  if (!nftsData) return null;

  const nftsDataUsers = nftsData.reduce<ReduceReturnType>((acc, curr) => {
    let currUser = curr.users;
    for (let i = 0; i < acc.length + 1; i++) {
      let currentItem = acc[i];
      if (!currentItem || currentItem.length === 0) {
        acc.push([currUser]);
        break;
      } else {
        let currentUser = currentItem[0]!;
        if (currentUser.user_id === currUser.user_id) {
          acc[i] = [...currentItem, currentUser];
          break;
        }
        continue;
      }
    }
    return acc.sort((a, b) => b.length - a.length).slice(0, 5);
  }, []);



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
        {nftsDataUsers.map((item, index) => {
          let curr = item[0]!
          const [firstName, LastName] = curr.username.split(" ");
          return (
            <Link href={`artists/${curr.user_url}`
        } >

            <li key={index} className="hover:cursor-pointer honeycomb-cell">
              <Image
                alt={`${curr.username} Profile Image`}
                className="honeycomb-cell__image w-full object-contain"
                src={curr.imageUrl}
                width={100}
                height={100}

              />
              <div className="honeycomb-cell__title">
                {firstName}
                <small> {LastName}</small>
              </div>
              </li>
              </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default WeeklyArtists;
