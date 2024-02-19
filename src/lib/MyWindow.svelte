<script lang="ts">
    import SVG_close from "$lib/svg/close-svgrepo-com (1).svelte";
    import SVG_minimize from "$lib/svg/minus-svgrepo-com.svelte";
    import SVG_normalize from "$lib/svg/plus-large-svgrepo-com.svelte";

    
    export let left = 100;
	export let top = 100;
	
	let moving = false;
	
    let last_touch_x: number;
    let last_touch_y: number;

	function onMouseDown() {
		moving = true;
	}

    function onTouchStart(e: TouchEvent) {
        moving = true;
        last_touch_x = e.touches[0].pageX;
        last_touch_y = e.touches[0].pageY;
    }
	
	function onMouseMove(e: MouseEvent) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;
		}
	}

    function onTouchMove(e: TouchEvent) {
        if (moving) {
            left += e.touches[0].pageX - last_touch_x;
            top += e.touches[0].pageY - last_touch_y;
        }

        last_touch_x = e.touches[0].pageX;
        last_touch_y = e.touches[0].pageY;
    }
	
	function onMouseUp() {
		moving = false;
	}


    export let display_state: "open" | "minimized" | "closed" = "open";
    export let display_text: string = "Unnamed Window";

</script>

{#if display_state == "open" || display_state == "minimized"}
<div class="absolute border" style="left: {left}px; top: {top}px;">
    <div class="h-6 flex justify-between bg-gray-100">
        <button class="h-full w-36 hover:bg-slate-300 select-none text-left grow overflow-hidden" on:mousedown={onMouseDown} on:touchstart={onTouchStart}>
            {display_text}
        </button>
        <button class="h-full w-8 hover:bg-slate-300 flex justify-center items-center"  on:click={() => {display_state = "minimized"}}>
            <div class="w-5 h-5">
                <SVG_minimize/>
            </div>
        </button>
        <button class="h-full w-8 hover:bg-slate-300 flex justify-center items-center"  on:click={() => {display_state = "open"}}>
            <div class="w-5 h-5">
                <SVG_normalize/>
            </div>
        </button>
        <button class="h-full w-8 hover:bg-slate-300 flex justify-center items-center" on:click={() => {display_state = "closed"}}>
            <div class="w-4 h-4">
                <SVG_close/>
            </div>
        </button>
    </div>
    {#if display_state == "open"}
    <div class="bg-slate-50">
        <slot/>
    </div>
    {/if}
</div>
{/if}

<svelte:window on:mouseup={onMouseUp} on:touchend={onMouseUp} on:mousemove={onMouseMove} on:touchmove={onTouchMove} />