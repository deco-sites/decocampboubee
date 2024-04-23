import Icon from "../ui/Icon.tsx";
import { getProductVote, updateVote } from "../../sdk/useVotes.ts";
import { useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { sendEvent } from "../../sdk/analytics.tsx";
import { Bounce, toast, ToastContainer } from 'react-toastify';

export interface Props {
  productId: string;
}

const THITRYSECONDS = 30 * 1000;

function updateProduct({ productId }: Props) {
  const product = useSignal(0);
  const smileCheck = useRef(null);
  const smile = useRef(null);
  const votes = useRef(null);

  setInterval(() => getProductVote(productId, product), THITRYSECONDS);
  const notify = () => toast.success('Obrigado por votar!');

  return (
    <div class="absolute right-0 top-4">
      <button
        class="relative"
        onClick={async () => {
          const response = await updateVote(productId, product);

          if (response.isUpdate) {
            sendEvent({ name: "post_score", params: { character: productId, score: 1 } })
            notify()
            smileCheck.current.className = "block";
            smile.current.className = "hidden";
            votes.current.className = "absolute block -top-4 right-0";
          }
        }}
      >
        <div ref={smile} class="block">
          <Icon class="text-gray-400" id="moodSmile" width={48} height={48} />
        </div>
        <div ref={smileCheck} class="hidden">
          <Icon id="moodCheck" width={48} height={48} />
        </div>
        <span ref={votes} class="absolute hidden -top-4 right-0">
          {product.value}
        </span>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </button>
    </div>
  );
}

export default updateProduct;
