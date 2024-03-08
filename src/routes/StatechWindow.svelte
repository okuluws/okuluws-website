<script lang="ts">
    import MyWindow from "$lib/MyWindow.svelte";
    import { pb } from "$lib/pocketbase";
    import { onDestroy, onMount } from "svelte";


    let power: number;
    let unsubscribe: () => void;
    onMount(async () => {
        power = (await pb.collection("global_data").getOne("qkbqsqko22kaa3z")).data.power

        unsubscribe = await pb.collection("global_data").subscribe("qkbqsqko22kaa3z", async ({ record }) => {
            power = record.data.power;
        });
    });

    onDestroy(() => {
        unsubscribe?.();
    });
</script>
<MyWindow auto_width={true} auto_height={true} display_text={"Statech"}>
    Current Power: {power}
</MyWindow>