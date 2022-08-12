import { useMutation } from "@apollo/client";
import { useAuthContext } from "contexts/auth";
import { useCartItemsCountContext } from "contexts/cartItemsCount";
import Link from "next/link";
import { useRouter } from "next/router";
import { LOGOUT } from "queries/mutations";
import styled from "styled-components";
import { mq } from "utils";

const NavItem = ({
  text,
  pathname,
  setIsOpen,
}: {
  text: string;
  pathname: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <Link href={pathname}>
    <div
      className="text-start px-4 py-2 active:bg-grey-200"
      onClick={() => setIsOpen(false)}
    >
      {text}
    </div>
  </Link>
);

const AccountUtilBar: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const { setLoggedUser, setToken, token } = useAuthContext();
  const [logout] = useMutation(LOGOUT);
  const { reset } = useCartItemsCountContext();
  const router = useRouter();

  const handleLogout = () => {
    logout().then(() => {
      setToken(null);
      setLoggedUser(null);
      setIsOpen(false);
      reset();
      router.replace("/");
    });
  };

  return (
    <Container isopen={isOpen ? isOpen.toString() : undefined}>
      <NavItem
        text="Account"
        pathname={token ? "/account" : "/login"}
        setIsOpen={setIsOpen}
      />
      <NavItem
        text="Orders"
        pathname={token ? "/orders" : "/login"}
        setIsOpen={setIsOpen}
      />
      {token ? (
        <div
          className="text-start px-4 py-2 active:bg-blue-300"
          onClick={handleLogout}
        >
          Sign Out
        </div>
      ) : (
        <NavItem text="Sign In" pathname="/login" setIsOpen={setIsOpen} />
      )}
    </Container>
  );
};

const Container = styled.div.attrs<{ isopen: string | undefined }>((props) => ({
  className: `${
    props.isopen ? "flex" : "hidden"
  } absolute flex-col border-solid border-[1px] border-grey-300 bg-white z-10 top-full -left-6 font-roboto lg:left-16 lg:right-0 lg:py-4`,
}))<{ isopen: string | undefined }>`
  width: calc(100% + 3rem);
  font-size: 0.7rem;
  @media ${mq.lg} {
    width: auto;
    max-width: 9rem;
    top: calc(100% + 0.2rem);
  }
`;

export default AccountUtilBar;