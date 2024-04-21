import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import type { Platform } from "../apps/site.ts";
import { SendEventOnClick } from "../components/Analytics.tsx";
import AddToCartButton from "../islands/AddToCartButton/vtex.tsx";
import { formatPrice } from "../sdk/format.ts";
import { relative } from "../sdk/url.ts";
import { useOffer } from "../sdk/useOffer.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";

interface Props {
  page: ProductDetailsPage | null;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  platform?: Platform;
}

const WIDTH = 200;
const HEIGHT = 150;
const aspectRatio = `${WIDTH} / ${HEIGHT}`;

export function ErrorFallback({ error }: {error?: Error}) {
  // Is to capture the error in logs!
  console.log(error)
  const IMAGE_URL_BOLO = "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/7795/76495ce7-be7e-4f10-9303-b3fd97335510";
  return <div
  data-deco="view-product"
  class="card card-compact group w-full border lg:p-4"
  >

  <div class="flex flex-row flex-wrap items-start max-md:justify-center md:justify-between rounded-xl min-h-52 gap-4 p-4">
    <figure
      class="relative overflow-hidden flex-shrink-0"
      style={{ aspectRatio, width: WIDTH, height: HEIGHT }}
    >
      {/* Product Images */}
      <a
        href={"/"}
        aria-label="view product"
      >
        <Image
          src={IMAGE_URL_BOLO}
          alt={"Bolo da katz"}
          class="rounded-lg"
          width={WIDTH}
          height={HEIGHT}
          style={{ aspectRatio }}
          sizes="(max-width: 640px) 50vw, 20vw"
          loading={"lazy"}
          decoding="async"
        />
      </a>
    </figure>

    {/* Name/Description */}
    <div class="flex flex-col gap-4 max-w-96">
      <h2
        class="text-base lg:text-lg uppercase"
      >Bolo da katz</h2>

      <p>Esse é um delicioso bolo. Você vai se deliciar com as gosturas que tem petrópolis</p>
      <a
        href={"/cultura"}
        aria-label="view product"
        class="btn btn-primary w-52"
      >
        Para saber mais
      </a>
    </div>
    </div>
</div>
}

export function LoadingFallback() {
    return  ( <div
        data-deco="view-product"
        class="card card-compact group w-full border lg:p-4"
      >
  
        <div class="flex flex-row flex-wrap items-start max-md:justify-center md:justify-between rounded-xl min-h-52 gap-4 p-4">
          <div class="flex justify-start gap-4">
          {/* Product Image */}
          <div
            class="skeleton"
            style={{ aspectRatio, width: WIDTH, height: HEIGHT }}
          >
          </div>
  
          {/* Name/Description */}
          <div class="flex flex-col gap-4 max-md:hidden w-72">
            <h2
              class="skeleton w-full h-7"
            />
  
            <div
              class="skeleton w-full h-4"
            />
          </div>
          
  
          </div>
          <div class="flex flex-col justify-between w-52 px-4 md:border-l min-h-52 h-full">
          {/* Name/Description */}
          <div class="flex flex-col gap-4 md:hidden">
            <h2
              class="skeleton w-full h-7"
            />
  
            <div
              class="skeleton w-full h-4"
            />
          </div>

          {/* Price from/to */}
          <div class="flex gap-2 items-center justify-end font-light">
            <span class="skeleton w-full h-6" />
            <span class="skeleton w-full h-6" />
          </div>
  
          {/* Installments */}
          <span class="skeleton w-full h-6" />

          <div class="skeleton w-full h-12" /> 
          </div>
        </div>
      </div>)
}

function HorizontalProductCard({
  page,
  preload,
  itemListName,
  index,
}: Props) {
    if (!page) {
      return <ErrorFallback />
    }
  const { product }  = page;
  const { url, productID, name, image: images, offers, isVariantOf } = product;
  const id = `product-card-${productID}`;
  const description = product.description || isVariantOf?.description;
  const [front] = images ?? [];
  const { listPrice, price, installments, seller = "1" } = useOffer(offers);
  const relativeUrl = relative(url);



  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList:{ 
        "@type": "BreadcrumbList",
        "itemListElement": [{
        "@type": "ListItem",
        "name": product!.name,
        "item": product!.url ?? "/",
        "position": 1,
        }],
        "numberOfItems": 1
        },
    price,
    listPrice,
  });

  return (
    <div
      id={id}
      data-deco="view-product"
      class="card card-compact group w-full border lg:p-4"
    >
      {/* Add click event to dataLayer */}
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />

      <div class="flex flex-row flex-wrap items-start max-md:justify-center md:justify-between rounded-xl min-h-52 gap-4 p-4">
        <div class="flex justify-start gap-4">
        <figure
          class="relative overflow-hidden"
          style={{ aspectRatio, width: WIDTH, height: HEIGHT }}
        >
          {/* Product Images */}
          <a
            href={relativeUrl}
            aria-label="view product"
          >
            <Image
              src={front.url!}
              alt={front.alternateName}
              class="rounded-lg"
              width={WIDTH}
              height={HEIGHT}
              style={{ aspectRatio }}
              sizes="(max-width: 640px) 50vw, 20vw"
              preload={preload}
              loading={preload ? "eager" : "lazy"}
              decoding="async"
            />
          </a>
        </figure>

        {/* Name/Description */}
        <div class="flex flex-col max-md:hidden">
          <h2
            class="text-base lg:text-lg uppercase"
            dangerouslySetInnerHTML={{ __html: name ?? "" }}
          />

          <div
            class="text-xs line-clamp-2"
            dangerouslySetInnerHTML={{ __html: description ?? "" }}
          />
        </div>
        

        </div>
        <div class="flex flex-col justify-between px-4 md:border-l min-h-52 h-full">
        {/* Name/Description */}
        <div class="flex flex-col md:hidden">
          <h2
            class="text-base lg:text-lg uppercase"
            dangerouslySetInnerHTML={{ __html: name ?? "" }}
          />

          <div
            class="text-xs line-clamp-2"
            dangerouslySetInnerHTML={{ __html: description ?? "" }}
          />
        </div>

        {/* Price from/to */}
        <div class="flex gap-2 items-center justify-end font-light">
          <span class="line-through text-sm">
            {formatPrice(listPrice, offers?.priceCurrency)}
          </span>
          <span>
            {formatPrice(price, offers?.priceCurrency)}
          </span>
        </div>

        {/* Installments */}
        <span class="flex justify-end gap-2 font-light text-sm truncate">
          ou {installments}
        </span>
        <AddToCartButton 
        eventParams={{ items: [eventItem] }}
                    productID={productID}
                    seller={seller} 
                    />
        </div>
      </div>
    </div>
  );
}

export default HorizontalProductCard;
