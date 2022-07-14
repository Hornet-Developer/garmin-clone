import { graphql } from "msw";
import { fashionNews, products } from "./mocks";

export const handlers = [
  graphql.query("GetFashionNews", (_req, res, ctx) => {
    return res(
      ctx.data({
        fashionNews,
      })
    );
  }),
  graphql.query("GetProducts", (_req, res, ctx) => {
    return res(
      ctx.data({
        products,
      })
    );
  }),
];
