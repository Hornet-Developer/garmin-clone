import { FetchResult, useMutation } from "@apollo/client";
import client from "apollo-client";
import Layout from "components/layout";
import Login from "components/login";
import { useAuthContext } from "contexts/auth";
import { GetServerSideProps, NextPage } from "next";
import { CATEGORIES } from "queries";
import { LOGIN, LOGOUT, REFRESH_TOKEN } from "queries/mutations";
import { useRef } from "react";
import { CategoryType } from "types";
import { fetchToken } from "utils/helpers";

const LoginPage: NextPage<{
  categories?: CategoryType[];
}> = ({ categories }) => {
  return (
    <Layout title="Garmin International | Login Page" categories={categories}>
      <Login />
    </Layout>
  );
};

// const LoginPage = ({ rt, user }: { rt: any; user: any }) => {
//   const ref = useRef<HTMLInputElement | null>(null);
//   const [login] = useMutation(LOGIN);
//   const [refreshToken] = useMutation(REFRESH_TOKEN);
//   const { loggedUser, setLoggedUser, token, setToken } = useAuthContext();

//   const [logout] = useMutation(LOGOUT);

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     login({ variables: { username: ref.current?.value } }).then(
//       (data: FetchResult<any, Record<string, any>, Record<string, any>>) => {
//         setToken(data.data.login?.refresh_token);
//         setLoggedUser(data.data.login?.user);
//       }
//     );
//   };

//   return (
//     <div className="flex flex-col gap-12 justify-center items-center w-full h-[100vh]">
//       {loggedUser && <h1 className="text-7xl">{loggedUser?.username}</h1>}
//       <form
//         className="flex flex-col justify-center items-center gap-4"
//         onSubmit={(event) => handleSubmit(event)}
//       >
//         <input
//           type="text"
//           className="w-[200px] h-[50px] border-2 border-solid border-grey-500"
//           ref={ref}
//           name="username"
//         />
//         <input
//           type="submit"
//           className="px-10 py-5 bg-blue-200"
//           title="Submit"
//         />
//       </form>
//       <button
//         className="px-10 py-5 bg-blue-200"
//         onClick={() => {
//           refreshToken({
//             context: {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             },
//           })
//             .then((data) => console.log(data))
//             .catch((err) => console.log(err.message));
//         }}
//       >
//         REFRESH
//       </button>
//       <button
//         className="px-10 py-5 bg-blue-200"
//         onClick={() =>
//           logout().then(() => {
//             setToken(null);
//             setLoggedUser(null);
//           })
//         }
//       >
//         LOGOUT
//       </button>
//     </div>
//   );
// };
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { refreshToken, user, expires_in } = await fetchToken(
    req.headers.cookie
  );

  const categoriesResponse = await client.query({
    query: CATEGORIES,
    variables: { hasSeries: false, hasCoverImgsList: false },
  });

  return {
    props: {
      categories: categoriesResponse.data.categories,
      refreshToken,
      user,
      expires_in,
    },
  };
};

export default LoginPage;
