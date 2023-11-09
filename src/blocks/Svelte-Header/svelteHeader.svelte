<script>
  let logo = "Rehydrated";
  let menus = [
    {
      title: "Examples",
      children: [
        {
          title: "More examples",
          href: "/",
        },
      ],
    },
    {
      title: "Learn more",
      children: [
        {
          title: "Learning more",
          href: "/",
        },
        {
          title: "Perfect scores",
          href: "/",
        },
      ],
    },
    {
      title: "Why Rehydrated?",
      children: [
        {
          title: "Supports perfect hydration",
          href: "/",
        },
        {
          title: "CSS made simple",
          href: "/",
        },
        {
          title: "Bring your framework",
          href: "/",
        },
      ],
    },
  ];

  let showSubmenu = -1;
  let showMobileDrawer = false;

  function handleDropdownClick(i) {
    if (showSubmenu === i) {
      showSubmenu = -1;
    } else {
      showSubmenu = i;
    }
  }
</script>

<nav
  class="h-full max-w-[1200px] flex flex-row justify-between items-center m-auto relative"
>
  <div class="">
    <button
      class="md:hidden"
      on:click={() => {
        showMobileDrawer = !showMobileDrawer;
      }}>{showMobileDrawer ? "Close" : "Menu"}</button
    >
  </div>
  <div class="md:flex-1">
    <a href="/" class="text-lg md:text-2xl font-bold">{logo}</a>
  </div>

  <div
    class="hidden md:flex-row md:justify-between md:items-baseline md:flex relative"
  >
    {#each menus as menu, i}
      <div class="relative px-3">
        <button
          class="text-lg hover:text-blue-700"
          class:underline={i === showSubmenu}
          on:click={() => {
            handleDropdownClick(i);
          }}>{menu.title}</button
        >
        {#if showSubmenu === i}
          <ul
            class="absolute flex flex-col w-[200%] bg-slate-200 top-full z-10 right-0 border-black border"
          >
            {#each menu.children as submenu}
              <li class="py-3 px-5 text-center">
                <a href={submenu.href}>{submenu.title}</a>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    {/each}
  </div>
  <div
    class:hidden={!showMobileDrawer}
    class="md:hidden p-2 fixed top-[4rem] right-0 bg-white h-screen z-20 w-[100vw]"
  >
    {#each menus as menu, i}
      <div class="my-2">
        <button
          class="text-2xl"
          class:underline={i === showSubmenu}
          on:click={() => {
            handleDropdownClick(i);
          }}>{menu.title}</button
        >
        {#if showSubmenu === i}
          <ul
            class="flex flex-col bg-white top-full right-0 border-black border"
          >
            {#each menu.children as submenu}
              <li class="py-3 px-3">
                <a href={submenu.href}>{submenu.title}</a>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    {/each}
  </div>
</nav>
