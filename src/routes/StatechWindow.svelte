<script lang="ts">
    import MyWindow from "$lib/MyWindow.svelte";
    import { pb } from "$lib/pocketbase";
    import { onDestroy, onMount } from "svelte";


    let power: number;
    let unsubscribe: () => void;
    onMount(async () => {
        unsubscribe = await pb.collection("global_data").subscribe("*", async ({ record }) => {
            power = JSON.parse(record.data).power
        });
    });

    onDestroy(() => {
        unsubscribe()
    });
</script>
<MyWindow display_text={"Statech"}>
    Current Power: {power}
</MyWindow>