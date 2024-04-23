import { MatchContext } from "deco/blocks/matcher.ts";

export interface Props {
  /** @title Nome da campanha */
  campaignName: string;
}

export default function Utm({ campaignName }: Props, ctx: MatchContext) {
  const url = new URL(ctx.request.url);
  return url.searchParams.get("utmcampaign") === campaignName;
}
