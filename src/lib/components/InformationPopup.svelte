<script>
    export let title, subtitle, open; 
</script>

<div class="fixed top-0 left-0 h-screen w-screen z-20 flex justify-center items-center">
    <div class="bg-[rgba(37,37,39,.8)] px-6 py-4 rounded backdrop-blur-sm relative mx-4 border-2 md:lg:border-none drop-shadow md:lg:drop-shadow-none">
        <button class="absolute top-6 right-6 hover:bg-gray-200 hover:text-black duration-200 rounded" on:click={() => {open = false;}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
        </button>
        <div class="flex items-center">
            <img src="/assets/img/icon.png" alt="My Birthday Star" class="w-10 opacity-90 mr-2">
            <div class="flex items-start flex-col">
                <p class="font-metro text-xl font-semibold opacity-90">{title}</p>
                {#if subtitle}
                <p class="font-semibold text-sm opacity-50">{subtitle}</p>
                {/if}
            </div>
        </div>
        <slot />
    </div>
</div>