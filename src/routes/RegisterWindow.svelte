<script lang="ts">
    import MyWindow from "$lib/MyWindow.svelte";
    import { pb } from "$lib/pocketbase";

    let password: string;
    let username: string;

    async function register() {
        await pb.collection("users").create({username, password, passwordConfirm: password});
    }
</script>

<MyWindow auto_width={true} auto_height={true} display_text={"Register"}>
    [insert info]
    <br>
    <input placeholder="Username" type="text" bind:value={username}/>
    <input placeholder="Password" type="password" bind:value={password}/>
    <br>
    <button class="hover:bg-slate-300 underline" on:click={register}>Create Account</button>
</MyWindow>