import { Nft, WithUser } from "~/utils/types";
import Card from "../Universal/Card";

export default function RelatedItems({
  relatedItems,
}: {
  relatedItems: WithUser<Nft>[];
}) {
  return (
    <section className="related-items grid gap-12 text-center">
      <h2 className="relative  text-3xl tracking-wide md:text-4xl">
        Related Items
        <span className="absolute bottom-[-.3rem] right-[50%] h-[.15rem] w-[20%] max-w-[180px] translate-x-[50%] bg-primary"></span>
      </h2>
      <div
        suppressHydrationWarning={true}
        className="related-cards grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {relatedItems.map((item) => {
          return <Card key={item.id} item={item} />;
        })}
      </div>
    </section>
  );
}
