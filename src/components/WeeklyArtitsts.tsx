const WeeklyArtists = () => {
  return (
    <section className="mb-32 md:mb-40">
      <h2 className="mb-6 text-center text-5xl text-white">
        <span className="border-b-4 border-primary">Artists</span> Of The{" "}
        <span className="text-primary">Week</span>
      </h2>
      <ul className="honeycomb" lang="es">
        <li className="honeycomb-cell">
          <img className="honeycomb-cell__image" src="/nft-1.jpg" />
          <div className="honeycomb-cell__title">CryptoKittyQ</div>
        </li>
        <li className="honeycomb-cell">
          <img className="honeycomb-cell__image" src="/nft-1.jpg" />
          <div className="honeycomb-cell__title">RoboRarity</div>
        </li>
        <li className="honeycomb-cell">
          <img className="honeycomb-cell__image" src="/nft-1.jpg" />
          <div className="honeycomb-cell__title">PixelPeng</div>
        </li>
        <li className="honeycomb-cell">
          <img className="honeycomb-cell__image" src="/nft-1.jpg" />
          <div className="honeycomb-cell__title">MysticMant</div>
        </li>
        <li className="honeycomb-cell">
          <img className="honeycomb-cell__image" src="/nft-1.jpg" />
          <div className="honeycomb-cell__title">
            GalacticGaz<small>No vidrio</small>
          </div>
        </li>
        <li className="honeycomb-cell">
          <img className="honeycomb-cell__image" src="/nft-1.jpg" />
          <div className="honeycomb-cell__title">
            ElecEag<small>1 de repuesto</small>
          </div>
        </li>
        <li className="honeycomb-cell">
          <img className="honeycomb-cell__image" src="/nft-1.jpg" />
          <div className="honeycomb-cell__title">NeonNar</div>
        </li>
        <li className="honeycomb-cell honeycomb__placeholder"></li>
      </ul>
    </section>
  );
};

export default WeeklyArtists;
