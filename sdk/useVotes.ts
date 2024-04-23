import { invoke } from "../runtime.ts";
import { useUI } from "./useUI.ts"
import type { Signal } from "@preact/signals"

const { total } = useUI();

export const updateVote = async (productId: string, signal: Signal<number>) => {
    const response = await invoke({
        key: "site/loaders/actions/addProductVote.ts",
        props: { productId }
    })

    if ("status" in response) {
        return { isUpdate: false }
    }
    signal.value = response.product
    total.value = response.total
    return  { isUpdate: true, productValue: response.product  }
}

export const getProductVote = async (productId: string, signal: Signal<number>) => {
    const response = await invoke({
        key: "site/loaders/actions/getProductVote.ts",
        props: { productId }
    })

    if ("status" in response) {
        return { isUpdate: false }
    }

    signal.value = response.product
    return { isUpdate: true, productValue: response.product  }
}

export const getAllVotes = async () => {
    const response = await invoke({
        key: "site/loaders/actions/getAllVotes.ts"
    })

    total.value = response.total
}