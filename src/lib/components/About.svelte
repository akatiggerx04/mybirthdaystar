<script>
    export let about_box_visible;
</script>

<div class="fixed top-0 left-0 h-screen w-screen z-20 flex justify-center items-center">
    <div class="bg-[rgba(37,37,39,.8)] px-6 py-4 rounded backdrop-blur-sm relative mx-4 border-2 md:lg:border-none drop-shadow md:lg:drop-shadow-none">
        <button class="absolute top-6 right-6 hover:bg-gray-200 hover:text-black duration-200 rounded" on:click={() => {about_box_visible = false}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
        </button>
        <div class="flex items-center">
            <img src="/assets/img/icon.png" alt="My Birthday Star" class="w-10 opacity-90 mr-2">
            <p class="font-metro text-xl font-semibold opacity-90">MY BIRTHDAY STAR</p>
        </div>
        <p class="font-semibold text-xl mt-4">Credits:</p> 
        <p class="max-w-lg mt-2">The idea of Birthday Stars is of course not mine, i got inspired by Freeant's Birthday Star website.</p>
        <p class="max-w-lg mt-2">This UI design is heavily inspired from NASA Eyes, make sure to check it out it's very cool stuff.</p>
        <p class="font-semibold text-xl mt-4">Source Code:</p>
        <p class="max-w-lg mt-2">My Birthday Star is open source and available on github. click this <a href="https://github.com/akatiggerx04" target="_blank" class="underline">link</a> to my profile to check it out.</p> 
        <hr class="my-4 opacity-50">
        <p class="mb-2"><span class="font-semibold">Developed with 🤍 by</span> <a href="https://github.com/akatiggerx04" target="_blank">@akatiggerx04</a></p>

    </div>
</div>