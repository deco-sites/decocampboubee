import type { Product } from "apps/commerce/types.ts";
import { MultivariateFlag } from "deco/blocks/flag.ts";
import multivariate, {
  MultivariateProps,
} from "apps/website/utils/multivariate.ts";
export { onBeforeResolveProps } from "apps/website/utils/multivariate.ts";

export default function ProductListVariant(
  props: MultivariateProps<Product[] | null>,
): MultivariateFlag<Product[] | null> {
  return multivariate(props);
}
