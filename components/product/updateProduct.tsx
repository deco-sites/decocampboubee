import { invoke } from "../../runtime.ts";
import Icon from "../ui/Icon.tsx"
import { updateVote, getProductVote } from "../../sdk/useVotes.ts"
import { useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";

export interface Props {
    productId: string;
}

const THITRYSECONDS = 30 * 1000;

function updateProduct({ productId }: Props) {
    const product = useSignal(0);
    const smileCheck = useRef(null);
    const smile = useRef(null);
    const votes = useRef(null);
    
    setInterval(() => getProductVote(productId, product), THITRYSECONDS)

    return (
        <div class="absolute right-0 top-0">
            <button class="relative" onClick={async () => {
                
                const response = await updateVote(productId, product)

                if (response.isUpdate) {
                    smileCheck.current.className = "block"
                    smile.current.className = "hidden"
                    votes.current.className = "absolute block -top-4 right-0"
                }
                
            }}>
                <div ref={smile} class="block">
                    <Icon class="text-gray-400" id="moodSmile" width={48} height={48} />
                </div>
                <div ref={smileCheck} class="hidden">
                    <Icon id="moodCheck" width={48} height={48} />
                </div>
                <span ref={votes} class="absolute hidden -top-4 right-0">{product.value}</span>
            </button>
        </div>
    );
}

export default updateProduct;