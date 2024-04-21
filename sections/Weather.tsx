import type { Temperature } from "apps/weather/loaders/temperature.ts";
import BannerCarousel, {
  Props as BannerCarouselProps,
} from "../components/ui/BannerCarousel.tsx";

export interface Props {
  temperature: Temperature | null;
  /**
   * @format html
   */
  text: string;

  banners?: BannerCarouselProps;
}

function Weather({ temperature, text, banners }: Props) {
  return (
    <div class="container flex flex-col gap-4">
      <span class="uppercase">
        {`Temperatura em graus celsius: ${
          temperature?.celsius.toLocaleString("pt-BR")
        }`}
      </span>
      <div dangerouslySetInnerHTML={{ __html: text }} />
      {banners && <BannerCarousel {...banners} />}
    </div>
  );
}

export default Weather;
