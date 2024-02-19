<script lang="ts">
    import MyWindow from "$lib/MyWindow.svelte";

    let route: string = "";
    let response: Response;
</script>
<MyWindow display_text={"API Test"}>
    <input type="text" placeholder="Route" bind:value={route}>
    <button class="hover:bg-slate-300" on:click={async () => response = await fetch(route)}>Send Get</button>
    <br/>
    Status: {response?.status ?? ""}
</MyWindow> 