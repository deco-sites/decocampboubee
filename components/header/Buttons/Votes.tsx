import { useUI } from "../../../sdk/useUI.ts";
import { getAllVotes } from "../../../sdk/useVotes.ts";
import { useEffect } from "preact/compat";
import Icon from "../../ui/Icon.tsx";

const THITRYSECONDS = 30 * 1000;

function Votes() {
  const { total } = useUI();
  useEffect(() => {
    getAllVotes();
  }, []);
  setInterval(getAllVotes, THITRYSECONDS);
  return (
    <div class="relative">
      <Icon id="friends" width={48} height={48} />
      <span class="absolute -top-3 -right-2">{total.value}</span>
    </div>
  );
}

export default Votes;
