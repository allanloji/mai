<script>
  const pages = import.meta.glob('/src/routes/kb/**/+page.svx', {eager:true});
  const path = window.location.pathname.replace(/\/$/, '') || '/kb';
  const Page = pages[`/src/routes${path}/+page.svx`]?.default;
</script>
{#if Page}<Page />{:else}<h1>Page not found</h1><a href="/kb">Support knowledge base</a>{/if}
