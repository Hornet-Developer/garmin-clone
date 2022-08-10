import { Fragment } from "react";

const PrivateRoute: React.FC<{
  children: React.ReactNode;
  errorMessage?: string;
  token?: string | null;
  cartIdCookie?: string | null;
}> = ({ children, errorMessage, cartIdCookie, token }) => {
  if ((!token && !cartIdCookie) || errorMessage)
    return (
      <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
        <h2 className="tracking-wide text-xl">
          {errorMessage || "Forbidden Request"}
        </h2>
      </div>
    );
  return <Fragment>{children}</Fragment>;
};

export default PrivateRoute;
