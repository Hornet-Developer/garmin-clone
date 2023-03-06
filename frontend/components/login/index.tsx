import { useMutation } from "@apollo/client";
import FullScreenLoading from "components/loading/full-screen";
import { useAuthContext } from "contexts/auth";
import { useCartItemsCountContext } from "contexts/cartItemsCount";
import Link from "next/link";
import { useRouter } from "next/router";
import { LOGIN } from "queries/mutations";
import { useRef } from "react";
import styled from "styled-components";
import ErrorMessage from "../error-handler/error-message";
import { removeCookieSession, setCookieSession } from "utils/cookieSession";

const Login = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [login, { loading, error }] = useMutation(LOGIN);
  const { setLoggedUser, setToken, setCartId, cartId } = useAuthContext();
  const { setQuantity } = useCartItemsCountContext();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({
      variables: { username: ref.current?.value, cartId },
    })
      .then((response) => {
        if (response.data?.login?.token) {
          const data = response.data.login;
          setCookieSession({
            name: "refresh_token",
            value: data.token,
            expiresIn: data.expiresIn,
          });
          if (cartId) removeCookieSession("cartId");
          setToken(data.token);
          setCartId(data.user.cartId);
          setLoggedUser(data.user);
          setQuantity(data.totalQuantity);
          router.replace("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      {loading && <FullScreenLoading />}
      <h1 className="tracking-[0.2em] text-center font-black text-lg pb-4 uppercase">
        account
      </h1>
      <p className="text-center text-sm tracking-wider pb-4">
        Sign in to your Garmin account to manage your profile and get help with
        your products.
      </p>
      <div>
        <form
          className="p-4 pb-0 w-full max-w-md m-auto h-[309.141px]"
          onSubmit={(event) => handleSubmit(event)}
        >
          {error && <ErrorMessage message={error.message} />}
          <div className="w-full mb-6">
            <label className="text-[0.9rem] tracking-black block mb-1">
              username
            </label>
            <input
              type="text"
              className="border-solid border-[1px] border-grey-300 w-full h-10 focus:border-[2px] focus:outline-0 pl-4 text-sm"
              ref={ref}
            />
          </div>
          <input
            type="submit"
            className="border-solid border-[1px] border-blue-200 w-full h-10 bg-blue-300 mb-6 text-white cursor-pointer"
            value="SIGN IN"
          />
        </form>
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/signup">
            <span className="text-blue-200">Create One</span>
          </Link>
        </p>
      </div>
    </Container>
  );
};

const Container = styled.section.attrs({
  className: "font-opensans",
})`
  width: calc(100% - 40px);
  max-width: 720px;
  margin: auto;
  padding: 59px 0 44px;
`;

export default Login;
