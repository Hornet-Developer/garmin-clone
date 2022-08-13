import { useMutation } from "@apollo/client";
import ErrorMessage from "components/error-handler/error-message";
import FullScreenLoading from "components/loading/full-screen";
import { useAuthContext } from "contexts/auth";
import { useCartItemsCountContext } from "contexts/cartItemsCount";
import Link from "next/link";
import { useRouter } from "next/router";
import { SIGNUP } from "queries/mutations";
import { useRef, useState } from "react";
import styled from "styled-components";

const Signup = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [termsChecked, setTermsChecked] = useState(false);
  const [signup, { loading, error }] = useMutation(SIGNUP);
  const { setLoggedUser, setToken } = useAuthContext();
  const { setQuantity } = useCartItemsCountContext();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signup({
      variables: { username: ref.current?.value },
    })
      .then((response) => {
        setToken(response.data.signup?.refresh_token);
        setLoggedUser(response.data.signup?.user);
        setQuantity(response.data.signup?.totalQuantity);
        router.replace("/");
      })
      .catch(() => {});
  };

  return (
    <Container>
      {loading && <FullScreenLoading />}
      <h1 className="tracking-[0.2em] text-center font-black text-lg pb-4 uppercase m-auto">
        garmine | account | create
      </h1>
      <form
        className="py-4 w-full max-w-xs m-auto h-[309.141px]"
        onSubmit={(event) => handleSubmit(event)}
      >
        <p className="text-start text-sm tracking-wider pb-4">
          Please complete the fields below:
        </p>
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
        <div className="mt-12">
          <div className="flex items-center mb-4">
            <input
              className="w-3 h-3"
              id="terms"
              type="checkbox"
              checked={termsChecked}
              onChange={() => setTermsChecked(!termsChecked)}
            />
            <label htmlFor="terms" className="ml-2 text-xs">
              <span>I have read and agree to the</span>{" "}
              <span className="text-blue-200 cursor-pointer underline hover:no-underline">
                Terms of Use.
              </span>
              .
            </label>
          </div>
          <SubmitBtn termschecked={termsChecked ? "termsChecked" : undefined} />
        </div>
      </form>
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

const SubmitBtn = styled.input.attrs<{ termschecked?: string }>((props) => ({
  ...props,
  type: "submit",
  value: "CREATE ACCOUNT",
  disabled: props.termschecked ? false : true,
  className: `border-solid border-[1px] border-blue-200 w-full h-10 bg-blue-300 mb-6 text-white cursor-pointer ${
    props.termschecked ? "opacity-100" : "opacity-20"
  }`,
}))<{ termschecked?: string }>`
  transition: all 0.2s ease-in-out;
`;

export default Signup;
