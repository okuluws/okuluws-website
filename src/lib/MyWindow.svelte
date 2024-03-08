<script lang="ts">
    import SVG_close from "$lib/svg/close-svgrepo-com (1).svelte";
    import SVG_minimize from "$lib/svg/minus-svgrepo-com.svelte";
    import SVG_normalize from "$lib/svg/plus-large-svgrepo-com.svelte";

    
    export let left: number = 100;
	export let top: number = 100;

    export let width: number = 0;
    export let height: number = 0;

    export let auto_width: boolean = false;
    export let auto_height: boolean = false;
	
	let moving: boolean = false;
	
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

    function onTouchEnd() {
        moving = false;
    }

    let is_focused: boolean = false;

    export let display_state: "open" | "minimized" | "closed" = "open";
    export let display_text: string = "Unnamed Window";

</script>

{#if display_state == "open" || display_state == "minimized"}
<button class="absolute border self-start cursor-auto select-text" style="left: {left}px; top: {top}px; z-index: {is_focused ? "1" : "0"};" on:focusin={() => is_focused = true} on:focusout={() => is_focused = false}>
    <div class="h-6 flex bg-gray-100">
        <button class="h-full px-1 hover:bg-slate-300 select-none text-left grow overflow-hidden" on:mousedown={onMouseDown} on:touchstart={onTouchStart}>
            {display_text}
        </button>
        <button class="h-full w-8 hover:bg-slate-300 flex justify-center items-center"  on:click={() => display_state = "minimized"}>
            <div class="w-5 h-5">
                <SVG_minimize/>
            </div>
        </button>
        <button class="h-full w-8 hover:bg-slate-300 flex justify-center items-center"  on:click={() => display_state = "open"}>
            <div class="w-5 h-5">
                <SVG_normalize/>
            </div>
        </button>
        <button class="h-full w-8 hover:bg-slate-300 flex justify-center items-center" on:click={() => display_state = "closed"}>
            <div class="w-4 h-4">
                <SVG_close/>
            </div>
        </button>
    </div>
    {#if display_state == "open"}
    <div class="bg-slate-50 text-start" style="width: {auto_width ? "" : `width: ${width}px`}; {auto_height ? "" : `height: ${height}px`}">
        <slot/>
    </div>
    {/if}
</button>
{/if}

<svelte:window on:mouseup={onMouseUp} on:touchend={onTouchEnd} on:mousemove={onMouseMove} on:touchmove={onTouchMove}/>