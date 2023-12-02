<script>
  import "../app.pcss";
  import StarsBg from "$lib/components/ThreeStarsBg.svelte";
</script>

<main class="text-white">
  <div class="h-full w-full -z-10 fixed top-0 bottom-0">
      <StarsBg />
  </div>
  <slot />
</main>