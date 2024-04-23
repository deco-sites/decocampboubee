import type { AppContext } from "../../apps/site.ts";

export interface Props {
  productId: string;
}

export type ResponseLoader = {
  "total": number;
  "product": number;
} | {
  status: number;
  message: string;
};

export default async function loader(
  { productId }: Props,
  _req: Request,
  _ctx: AppContext,
): Promise<ResponseLoader> {
  if (!productId) {
    return { status: 400, message: "productId-undefined" };
  }

  const options = {
    method: "POST",
    headers: new Headers({
      "x-api-key": "7795",
      accept: "application/json",
      "content-type": "application/json",
    }),
    body: JSON.stringify({ productId }),
  };

  const response = await fetch("https://camp-api.deco.cx/event", options).then((
    res,
  ) => res.json());

  return {
    "total": response.total,
    "product": response.product,
  };
}
