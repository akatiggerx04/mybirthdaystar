<script>
    import Star from "$lib/components/Star.svelte";
    export let selected_star;
</script>

{#if selected_star && selected_star.spectral_group == "O"}
<Star fov="50" color="#A69FE5"/>
{:else if selected_star && selected_star.distance == 0.0 && selected_star.name == "Sol"}
<Star fov="50" color="#FB7900"/>
{:else if selected_star && selected_star.spectral_group == "B"}
<Star fov="60" color="#CBCFEC"/>
{:else if selected_star && selected_star.spectral_group == "A"}
<Star fov="70" color="#D9DBD6"/>
{:else if selected_star && selected_star.spectral_group == "F"}
<Star fov="90" color="#E9EBB9"/>
{:else if selected_star && selected_star.spectral_group == "G"}
<Star fov="100" color="#F4FF39"/>
{:else if selected_star && selected_star.spectral_group == "K"}
<Star fov="120" color="#F9375C"/>
{:else if selected_star && selected_star.spectral_group == "M"}
<Star fov="150" color="#C90002"/>
{:else}
<Star fov="50" color="#FB7900"/>
{/if}