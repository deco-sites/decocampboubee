import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

export interface Image {
    image: ImageWidget;
    alt: string;
    width: number;
    height: number;
    
}

export interface Props {
   images: Image[];
   /** 
    * @hide
    */
   maxLength: 3;
}

function PartialImageGallery({ images, maxLength }: Props) {
    return (
        <div class="container flex flex-col gap-4 items-center">
            <div class="flex gap-4 justify-between flex-wrap w-full">
           {images.slice(0, maxLength).map(({image, ...rest}) => <Image class="rounded-2xl" src={image} {...rest}  />) }
            </div>

           {maxLength < images.length && <button class="btn btn-primary w-52" {...usePartialSection({props: {maxLength: maxLength + 1  } })}>Ver mais +</button> }
        </div>
    );
}

export default PartialImageGallery;