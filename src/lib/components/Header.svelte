<script>
    export let selected_star;
</script>

<div class="flex items-center z-20">
    <button class="hidden md:lg:flex items-center z-20">
        <img src="/assets/img/icon.png" alt="My Birthday Star" class="w-10 opacity-90 mr-2">
        {#if selected_star}
            {#if selected_star.name == "Sol"}
            <p class="font-metro text-xl font-semibold opacity-90">MY BIRTHDAY STAR<span class="ml-2 opacity-80">></span><span class="ml-2">No Birthday Star Yet!</span></p>
            {:else if selected_star.notfound == true}
            <p class="font-metro text-xl font-semibold opacity-90">MY BIRTHDAY STAR<span class="ml-2 opacity-80">></span><span class="ml-2">No Birthday Star Found!</span></p>
            {:else}
            {#if selected_star.name != ""}
                <p class="font-metro text-xl font-semibold opacity-90">MY BIRTHDAY STAR<span class="ml-2 opacity-80">></span><span class="ml-2">{selected_star.name}</span></p>
            {:else if selected_star.catalogs.hip != ""}
                <p class="font-metro text-xl font-semibold opacity-90">MY BIRTHDAY STAR<span class="ml-2 opacity-80">></span><span class="ml-2">HIP {selected_star.catalogs.hip}</span></p>
            {:else if selected_star.catalogs.hd != ""}
                <p class="font-metro text-xl font-semibold opacity-90">MY BIRTHDAY STAR<span class="ml-2 opacity-80">></span><span class="ml-2">HD {selected_star.catalogs.hd}</span></p>
            {:else}
                <p class="font-metro text-xl font-semibold opacity-90">MY BIRTHDAY STAR<span class="ml-2 opacity-80">></span><span class="ml-2">Star</span></p>
            {/if}
            {/if}
            {:else}
            <p class="font-metro text-xl font-semibold opacity-90">MY BIRTHDAY STAR</p>
        {/if}
    </button>
    <button class="flex items-center z-20 md:lg:hidden">
        <img src="/assets/img/icon.png" alt="My Birthday Star" class="w-10 opacity-90 mr-2">
        <p class="font-metro text-xl font-semibold opacity-90">MY BIRTHDAY STAR</p>
    </button>
</div>