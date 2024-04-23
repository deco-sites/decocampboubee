import type { AppContext } from "../../apps/site.ts";

export type ResponseLoader = {
  "total": number;
} | {
  status: number;
  message: string;
};

export default async function loader(
  _props: unknown,
  _req: Request,
  _ctx: AppContext,
): Promise<ResponseLoader> {
  const options = {
    method: "GET",
    headers: new Headers({
      "x-api-key": "7795",
    }),
  };

  const response = await fetch("https://camp-api.deco.cx/events", options).then(
    (
      res,
    ) => res.json(),
  );

  return {
    "total": response.total,
  };
}
