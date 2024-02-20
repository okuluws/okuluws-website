<script lang="ts">
    import MyWindow from "$lib/MyWindow.svelte";

    let route: string = "";
    let response: Response;
    let post_body: string;
    let headers: string;
</script>
<MyWindow display_text={"API Test"}>
    <input type="text" placeholder="Route" bind:value={route}>
    <input type="text" placeholder="Headers" bind:value={headers}>
    <br/>
    <button class="hover:bg-slate-300" on:click={async () => response = await fetch(route)}>Send Get</button>
    <br/>
    <input type="text" placeholder="POST Data" bind:value={post_body}>
    <br>
    <button class="hover:bg-slate-300" on:click={async () => response = await fetch(route, { method: "POST", body: post_body})}>Send Post</button>
    <br/>
    Status: {response?.status ?? ""}
</MyWindow> 