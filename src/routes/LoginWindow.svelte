<script lang="ts">
    import MyWindow from "$lib/MyWindow.svelte";
    import { current_user, pb } from "$lib/pocketbase";

    let password: string;
    let username: string;

    async function login(){
        pb.collection("users").authWithPassword(username, password);
    }

    async function logout(){
        pb.authStore.clear();
    }
</script>

<MyWindow display_text={"Login"}>
    {#if $current_user}
        Currently logged in as {$current_user?.username}
        <button class="hover:bg-slate-300 underline text-xs" on:click={logout}>logout?</button> 
    {:else}
        Not logged in
    {/if}
    <br>
    <input placeholder="Username" type="text" bind:value={username}/>
    <input placeholder="Password" type="password" bind:value={password}/>
    <br>
    <button class="hover:bg-slate-300 underline" on:click={login}>Login</button>
</MyWindow>