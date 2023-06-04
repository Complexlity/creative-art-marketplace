const Subscribe = () => {
  return (
    <section className="items-center gap-4 md:grid md:grid-cols-2">
      <div className="hidden md:grid">
        <div className="grid grid-cols-3">
          <img
            className="five rounded-lg stack ml-32  w-48 rotate-[50deg] opacity-[60%] "
            src="/nft-1.jpg"
            alt=""
          />
            <img
              className="one rounded-lg stack  -ml-32 w-48 rotate-[-50deg] opacity-[60%]"
              src="/nft-1.jpg"
              alt=""
            />
          <img
            className="four rounded-lg stack z-5 ml-20 w-48 rotate-[20deg] opacity-[80%] "
            src="/nft-1.jpg"
            alt=""
          />
          <img className="three rounded-lg stack z-10 w-48" src="/nft-1.jpg" alt="" />
          <img
            className="two rounded-lg stack z-5 -ml-20 w-48 rotate-[-20deg] opacity-[80%]"
            src="/nft-1.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="space-y-6 text-center text-white md:text-start z-50">
        <h2 className="mx-auto max-w-[24ch]  text-4xl font-bold md:m-0">
          Subscribe And <span className="text-primary">get our Updates </span>{" "}
          Every Week
        </h2>
        <p className="mx-auto max-w-[60ch] md:m-0 md:max-w-[50ch] md:text-start">
          We have a blog related to NFT so we can share thoughts and routines on
          our blog which is updated weekly
        </p>
        <div className="md:flex md:max-w-[50ch] ">
          <input
            type="text"
            placeholder="Enter your e-mail"
            className="input-bordered input mb-6 w-full max-w-xs bg-slate-700 text-white focus:outline-primary md:rounded-r-none"
          />
          <button className="mx-auto block rounded-lg bg-primary px-11 py-3 font-bold text-gray-800 md:inline md:h-12 md:rounded-l-none ">
            Subscribe
          </button>
        </div>
      </div>

      <div className="">
        <div className="image1 relative flex justify-center text-4xl md:hidden">
          <img
            className="relative left-[70px] aspect-square w-[50%] rotate-[-30deg] rounded-xl object-cover object-top md:-ml-8"
            src="/nft-1.jpg"
            alt=""
          />
          <img
            className="relative top-[50px] z-10 aspect-square w-5/12 rounded-lg object-cover object-top "
            src="/nft-1.jpg"
            alt=""
          />
          <img
            className="relative left-[-70px]  aspect-square w-[50%] rotate-[30deg] rounded-xl object-cover object-top md:-ml-8"
            src="/nft-1.jpg"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default Subscribe