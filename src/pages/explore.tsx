import Footer from "~/components/General/Footer";
import NavBar from "~/components/General/NavBar";
import Header  from "~/components/General/Header";
import CardsContainer from "~/components/Explore/CardsContainer"

const Explore = () => {
  return (
    <div className="main">
      <div className="mx-auto max-w-[1200px] px-4 text-white md:px-8">
        <NavBar />
        <Header>Explore</Header>
        <CardsContainer  />
        <Footer />
      </div>
    </div>
  );
};


export default Explore;
