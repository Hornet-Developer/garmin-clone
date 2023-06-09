import Image from "next/image";
import Link from "next/link";
import Hamburger from "./hamburger";
import { BottomSection, Container, TopSection } from "./styles";
import ActionsSection from "./actions-section";
import { CategoryType } from "types";
import Nav from "./nav";
import { useToggleNav } from "contexts/toggle-nav";

const Logo = () => {
  const { isOpen, closeNav } = useToggleNav();

  return (
    <Link href="/">
      <div
        className="z-10 absolute top-0 w-[130px] h-12 cursor-pointer lg:top-3 lg:w-[180px] xl:relative xl:top-0"
        onClick={() => {
          isOpen && closeNav();
        }}
      >
        <Image src="/logo.svg" layout="fill" />
      </div>
    </Link>
  );
};

const Header = ({ categories }: { categories?: CategoryType[] }) => (
  <Container>
    <TopSection>
      <div className="relative w-full flex flex-col items-center justify-center xl:flex-row xl:justify-between">
        <Hamburger />
        <Logo />
        <Nav categories={categories} />
        <ActionsSection />
      </div>
    </TopSection>
    <BottomSection>
      <Link href="/">
        <div className="text-center uppercase cursor-pointer leading-5">
          free ground shipping on orders $25 and up. free 2nd-day shipping on
          most orders $499 and up.*
        </div>
      </Link>
    </BottomSection>
  </Container>
);

export default Header;
