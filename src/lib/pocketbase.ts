import PocketBase from "pocketbase";
import { writable } from "svelte/store";

export const pb = new PocketBase("http://okuluws.de:6969/");
export const current_user = writable(pb.authStore.model);
pb.authStore.onChange(() => {
    current_user.set(pb.authStore.model);
});
