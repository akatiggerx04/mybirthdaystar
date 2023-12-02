<script>
    import { DatePicker } from 'date-picker-svelte';
    import { onMount } from "svelte";

    import RenderStar from "$lib/components/RenderStar.svelte";
    import Header from "$lib/components/Header.svelte";
    import About from "$lib/components/About.svelte";
    import Information from '$lib/components/InformationPopup.svelte';

    import { findClosestBirthdayStar } from "$lib/birthstar.js";
    import toast, { Toaster } from 'svelte-french-toast';

	let date = new Date();
    let pickdate = false;
    let selected_star;
    let virgin_state = true;
    let about_box_visible = false;
    let is_small_screen;

    let info_constellations = false;
    let info_magnitude = false;

    function formatDate(date) {
        const day = date.getDate();
        const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
        
        let dayWithSuffix;
        if (day >= 11 && day <= 13) {
            dayWithSuffix = `${day}th`;
        } else {
            const suffixes = { 1: 'st', 2: 'nd', 3: 'rd' };
            const suffix = suffixes[day % 10] || 'th';
            dayWithSuffix = `${day}${suffix}`;
        }
        const formattedDateWithSuffix = formattedDate.replace(/\d+/, dayWithSuffix);

        return formattedDateWithSuffix;
    }

    function findBirthDayStar() {
        selected_star = null;
        let star = findClosestBirthdayStar(date);
        if (star != null) {
            selected_star = star;
            window.postMessage({MovingThroughSpace: true});
        } else {
            selected_star = {notfound: true};
        }
        pickdate = false;
        virgin_state = false;
    }

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        } else {
        document.exitFullscreen();
        }
    }

    function Notify(message) {
        toast(message, {
            style: 'border: 1px solid #FFFFFF; padding: 16px; color: #FFFFFF; background-color: transparent;',
            icon: "⭐",
            iconTheme: {
                primary: '#FFFFFF',
                secondary: '#000000'
            }
        });
    }

    function Clear() {
        virgin_state = true;
        date = new Date();
        pickdate = false;
        selected_star = null;
    }

    function checkSmallScreen() {
        if (window.innerWidth <= 850) {
            is_small_screen = true;
        } else {
            is_small_screen = false;
        }
    }

    onMount(() => {
        checkSmallScreen();
        window.addEventListener('resize', () => {
            checkSmallScreen();
        });
    });
</script>

<!-- LOGO -->
<button on:click={Clear} class="z-30 ml-10 mt-5">
    <Header bind:selected_star={selected_star} />
</button>

<div class="info-bg fixed top-[60vh] md:lg:top-[20vh] ml-0 md:lg:ml-5 p-6 w-full md:lg:w-[450px] rounded h-2/4 md:lg:h-3/4 overflow-y-scroll custom-scroll z-10">
    <!-- VIRGIN STATE -->
    {#if virgin_state}
    <p class="font-semibold text-2xl">Birthday Stars</p>
    <p class="font-semibold text-sm opacity-50 mt-1">WHAT ARE THEY?</p>
    <div class="mt-4 text-gray-200">
        <p>The concept of the "Birthday Star" is simple yet captivating. It's entirely based on science, not astrology or horoscopes.</p>
        <p class="mt-2">Imagine a star located at a specific distance from Earth, where the light you witness today was emitted on the day you were born. In essence, the light particles (photons) you observe are as old as you are, having travelled through space for all that time.</p>
        <p class="mt-2">Discover your own Birthday Star here. You can also find one for your parents, children, loved one, or even a specific historical year. With a little luck, you might find a star whose light travelled to us just as the Declaration of Independence was signed, Rome was founded, or the Great Wall was built.</p>
    </div>
    {/if}
    <!-- END VIRGIN STATE -->

    <!-- A STAR IS SELECTED -->
    <!-- NO BIRTHDAY STAR YET MIN DISTANCE -->
    {#if selected_star && virgin_state == false && selected_star.distance == 0.0 && selected_star.name == "Sol"}
    <p class="font-semibold text-2xl">No Birthday Star Yet!</p>
    <p class="font-semibold text-sm opacity-50 mt-1">BUT WHY?</p>
    <div class="mt-4 text-gray-200">
        <p>Unfortunately, not everyone may have a birthday star due to astronomical circumstances. The closest star is currently Proxima Centauri, situated approximately 4 light years away. This means that the light emitted by Proxima Centauri would have taken 4 years to reach us, making it the nearest celestial neighbor.</p>
        <p class="mt-2">As a result, individuals whose ages align with this distance might not find a closer match. In the vast expanse of space, the search for a perfect birthday star can be influenced by the distances that separate us from these cosmic entities.</p>
    </div>
    <!-- NO BIRTHDAY STAR FOUND -->
    {:else if selected_star && selected_star.notfound == true}
    <p class="font-semibold text-2xl">No Birthday Star Found!</p>
    <p class="font-semibold text-sm opacity-50 mt-1">BUT WHY?</p>
    <div class="mt-4 text-gray-200">
        <p>Unfortunately, not everyone can have a birthday star, and this is due to the inherent vastness and dispersion of stars in the cosmos. Stars are not uniformly distributed and can be quite distant from one another. Our search for a birthday star is limited by these vast cosmic distances.</p>
        <p class="mt-2">Even though we've looked far and wide, the reality is that stars are scattered across immense expanses of space. The nearest stars might still be several light-years away from each other, making it challenging to find a celestial companion that perfectly aligns with an individual's age. This intricate dance of celestial bodies, each with its unique position and distance, contributes to the challenge of pinpointing a birthday star for everyone. In the vast cosmic tapestry, the nearest neighbors may not always be close enough to shine as a personalized celestial celebration.</p>
    </div>
    <!-- A STAR IS SELECTED AND IS VALID -->
    {:else if selected_star && virgin_state == false}
    {#if selected_star.name != ""}
    <!-- PROPER NAME -->
    <p class="font-semibold text-2xl">{selected_star.name}</p>
    {:else if selected_star.catalogs.hip != ""}
    <!-- HIP CATALOG ID -->
    <p class="font-semibold text-2xl">HIP {selected_star.catalogs.hip}</p>
    <p class="font-semibold text-2xl">{selected_star.name}</p>
    {:else if selected_star.catalogs.hd != ""}
    <!-- HD CATALOG ID -->
    <p class="font-semibold text-2xl">HD {selected_star.catalogs.hd}</p>
    {:else}
    <!-- UNKNOWN STAR -->
    <p class="font-semibold text-2xl">Star</p>
    {/if}
    <!-- SPECTRAL CLASS AND STAR TYPE -->
    <p class="font-semibold text-sm opacity-50 mt-1">Spectral Class {selected_star.spectral_group} - {selected_star.type}</p>
    <div class="mt-4 text-gray-200">
        {#if selected_star.distance}
        <!-- DISTANCE IN LIGHT YEARS -->
        <p><strong>Distance:</strong> {selected_star.distance.toFixed(2)} Light Years Away</p>
        {/if}
        {#if selected_star.name != ""}
        <p class="mt-2">As you admire {selected_star.name}, remember that its light didn't originate today. It began its journey across the cosmos on the day you were born, carrying a message across the vastness of space. Every twinkling photon you observe is a testament to the universe's grand timeline and your unique place within it.</p>
        {:else if selected_star.catalogs.hip != ""}
        <p class="mt-2">As you admire HIP {selected_star.catalogs.hip}, remember that its light didn't originate today. It began its journey across the cosmos on the day you were born, carrying a message across the vastness of space. Every twinkling photon you observe is a testament to the universe's grand timeline and your unique place within it.</p>
        {:else if selected_star.catalogs.hd != ""}
        <p class="mt-2">As you admire {selected_star.catalogs.hd}, remember that its light didn't originate today. It began its journey across the cosmos on the day you were born, carrying a message across the vastness of space. Every twinkling photon you observe is a testament to the universe's grand timeline and your unique place within it.</p>
        {:else}
        <p class="mt-2">As you admire this star, remember that its light didn't originate today. It began its journey across the cosmos on the day you were born, carrying a message across the vastness of space. Every twinkling photon you observe is a testament to the universe's grand timeline and your unique place within it.</p>
        {/if}
        <hr class="my-4 rounded opacity-20">
        {#if selected_star.constellation != ""}
        <!-- STAR CONSTELLATION -->
        <p class="my-2 flex items-center"><strong>Constellation:</strong> <button class="ml-1 flex items-center" on:click={() => {info_constellations = true;}} title="{selected_star.constellation} Constellation
Click here to learn about constellations.">{selected_star.constellation}<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="-ml-1 noPrint" viewBox="0 0 16 16"><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg></button></p>
        {/if}
        <!-- STAR MAGNITUDE -->
        <p class="my-2 flex items-center"><strong>Magnitude:</strong> <button class="ml-1 flex items-center" on:click={() => {info_magnitude = true;}} title="Magnitude: {selected_star.magnitude}.
Click here to learn about magnitudes.">{selected_star.magnitude}<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="-ml-1 noPrint" viewBox="0 0 16 16"><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg></button></p>
        {#if selected_star.predictions && selected_star.predictions.mass}
        <!-- STAR PEDICTED MASS -->
        <p class="my-2"><strong>Predicted Mass:</strong> {selected_star.predictions.mass[0]} - {selected_star.predictions.mass[1]} M☉</p>
        {/if}
        <!-- STAR TEMPRETURE -->
        {#if selected_star && selected_star.spectral_group == "O"}
        <p class="my-2"><strong>Surface Temprature:</strong> >30,000 C°</p>
        {:else if selected_star && selected_star.spectral_group == "B"}
        <p class="my-2"><strong>Surface Temprature:</strong> 9,700 - 30,000 C°</p>
        {:else if selected_star && selected_star.spectral_group == "A"}
        <p class="my-2"><strong>Surface Temprature:</strong> 7,200 - 9,700 C°</p>
        {:else if selected_star && selected_star.spectral_group == "F"}
        <p class="my-2"><strong>Surface Temprature:</strong> 5,700 - 7,200 C°</p>
        {:else if selected_star && selected_star.spectral_group == "G"}
        <p class="my-2"><strong>Surface Temprature:</strong> 4,900 - 5,700 C°</p>
        {:else if selected_star && selected_star.spectral_group == "K"}
        <p class="my-2"><strong>Surface Temprature:</strong> 3,400 - 4,900 C°</p>
        {:else if selected_star && selected_star.spectral_group == "M"}
        <p class="my-2"><strong>Surface Temprature:</strong> 2,100 - 3,400 C°</p>
        {/if}
    </div>
    {/if}
    <div class="py-12 md:lg:py-0"></div>
</div>

<!-- CONSTELLATIONS INFO -->
{#if info_constellations}
<Information title="CONSTALLETIONS" subtitle="WHAT ARE THEY?" bind:open={info_constellations}>
    <img src="/assets/img/constellations.jpg" alt="Constellations" class="w-full h-72 object-cover rounded my-4">
    <p class="max-w-xl">A constellation (Greek: συνάστερος, synastēros, "grouped together") is a group of stars that appear to form a pattern or outline when viewed from Earth. They were originally used by ancient astronomers to help them navigate the night sky. Constellations are not physically related to each other, as they are simply groups of stars that are close to each other in the sky from our perspective.</p>
    <div class="my-2">
        <a href="https://en.wikipedia.org/wiki/Constellation" class="underline flex items-center" target="_blank">Read More (Wikipedia) <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="ml-1" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/><path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/></svg></a>
    </div>
</Information>
{/if}

<!-- MAGNITUDE INFO -->
{#if info_magnitude}
<Information title="MAGNITUDE" subtitle="LEARN MORE" bind:open={info_magnitude}>
    <img src="/assets/img/magnitude.png" alt="Magnitudes" class="w-full h-80 object-cover rounded my-4">
    <p class="max-w-xl">In astronomy, magnitude is a measure of the brightness of a celestial object, such as a star, planet, or galaxy. The lower the magnitude number, the brighter the object. The magnitude scale is logarithmic, which means that a difference of one magnitude represents a change in brightness by a factor of 2.512. For example, a star with a magnitude of 1 is 2.512 times brighter than a star with a magnitude of 2.</p>
    <div class="my-2">
        <a href="https://en.wikipedia.org/wiki/Magnitude_(astronomy)" class="underline flex items-center" target="_blank">Read More (Wikipedia) <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="ml-1" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/><path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/></svg></a>
    </div>
</Information>
{/if}

<!-- STAR RENDERING FOR DIFFERENT SCREEN SIZES -->
{#if is_small_screen}
<div class="w-screen fixed flex md:lg:hidden justify-center h-[40vh]">
    <RenderStar bind:selected_star={selected_star} />
</div>
{:else}
<div class="w-center-full flex justify-center items-center h-screen bottom-3 fixed z-0">
    <RenderStar bind:selected_star={selected_star} />
</div>
{/if}

<!-- DATE PICKER -->
<div class="fixed bottom-[40vh] md:lg:bottom-0 flex flex-col justify-center items-center w-full pl-0 md:lg:pl-[450px] mb-4 md:lg:mb-10">
    {#if pickdate}
    <DatePicker bind:value={date} timePrecision={null} max={new Date()} min={new Date("1915")}/>
    <button on:click={findBirthDayStar} class="bg-[#161617] rounded-xl px-6 py-2 mb-2 mt-4 text-white md:lg:text-[#737374] hover:text-white duration-200">Confirm Birthday</button>
    {:else}
    <button on:click={() => {pickdate = true}} class="bg-[#161617] rounded-xl px-6 py-2 mb-2 mt-4 text-white md:lg:text-[#737374] hover:text-white duration-200 noPrint">Pick Birthday</button>
    {/if}
    <p class="font-exo text-xl">{formatDate(date)}</p>
</div>

<div class="fixed bottom-[42vh] md:lg:bottom-5 right-5 flex flex-col justify-center items-center noPrint">
    <button on:click={() => {about_box_visible = !about_box_visible}} class="bg-[#161617] p-1 text-[#737374] hover:text-white duration-200 rounded my-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg></button>
    <button on:click={() => {toggleFullScreen()}} class="bg-[#161617] p-1 text-[#737374] hover:text-white duration-200 rounded hidden md:lg:block"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z"></path></svg></button>
    {#if selected_star && virgin_state == false}
    <button on:click={() => {window.print()}} class="bg-[#161617] p-1 text-[#737374] hover:text-white duration-200 rounded my-2 hidden md:lg:block"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11 6.914V2.586L6.293 7.293l-3.774 3.774 3.841 3.201L11 18.135V13.9c8.146-.614 11 4.1 11 4.1 0-2.937-.242-5.985-2.551-8.293C16.765 7.022 12.878 6.832 11 6.914z"></path></svg></button>
    {:else}
    <button on:click={() => {Notify("Find a birthday star first.")}} class="bg-[#161617] p-1 text-[#737374] hover:text-white duration-200 rounded my-2 hidden md:lg:block"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11 6.914V2.586L6.293 7.293l-3.774 3.774 3.841 3.201L11 18.135V13.9c8.146-.614 11 4.1 11 4.1 0-2.937-.242-5.985-2.551-8.293C16.765 7.022 12.878 6.832 11 6.914z"></path></svg></button>
    {/if}
</div>

<!-- ABOUT POPUP -->
{#if about_box_visible}
    <About bind:about_box_visible={about_box_visible} />
{/if}

<Toaster />

<style>
    :global(body) {
        overflow: hidden;
    }
    
    .info-bg {
        background-image: linear-gradient(180deg,#272527,rgba(37,37,39,.8) 52.08%,rgba(0,0,0,1));
    }

    .w-center-full {
        padding-left: 450px;
        width: 100vw;
    }

    .custom-scroll {
        padding-bottom: 5vh;
    }

    .custom-scroll::-webkit-scrollbar {
        width: 0px;
    }

    .custom-scroll::-webkit-scrollbar-track {
        background-color: transparent;
    }

    .custom-scroll::-webkit-scrollbar-thumb {
        background-color: transparent;
    }

    :root {
        --date-picker-background: #000000;
        --date-picker-foreground: #f7f7f7;
    }

    :global(select) :global(option) {
        background-color: #000000;
        color: #fff;
    }
    
    :global(select::-webkit-scrollbar) {
        width: 7px;
    }

    :global(::-webkit-scrollbar-track) {
        background-color: #000000;
    }

    :global(::-webkit-scrollbar-thumb) {
        background-color: white;
        border-radius: 7px;
    }

    @media print {
        .noPrint {
            display:none;
        }
    }

    @media only screen and (max-width: 738px) {
        .w-center-full {
            width: 100vw;
        }
    }
</style>