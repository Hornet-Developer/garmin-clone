import Link from "next/link";
import { FeaturedType } from "types";

const Featured: React.FC<{ featured: FeaturedType }> = ({ featured }) => {
  return (
    <Link href="/">
      <article className="py-8"></article>
    </Link>
  );
};

export default Featured;
