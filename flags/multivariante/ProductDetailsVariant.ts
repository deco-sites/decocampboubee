import type { ProductDetailsPage } from "apps/commerce/types.ts";
import { MultivariateFlag } from "deco/blocks/flag.ts";
import multivariate, {
  MultivariateProps,
} from "apps/website/utils/multivariate.ts";
export { onBeforeResolveProps } from "apps/website/utils/multivariate.ts";

export default function ProductDetailsVariant(
  props: MultivariateProps<ProductDetailsPage | null>,
): MultivariateFlag<ProductDetailsPage | null> {
  return multivariate(props);
}
