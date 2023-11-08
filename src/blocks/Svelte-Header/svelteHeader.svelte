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

<nav class="w-full flex flex-row justify-between items-baseline">
  <div><a href="/" class="lg:text-4xl text-2xl">{logo}</a></div>
  <div>
    <button
      class="md:hidden"
      on:click={() => {
        showMobileDrawer = !showMobileDrawer;
      }}>Menu</button
    >
  </div>
  <div
    class="hidden md:flex-row md:justify-between lg:w-1/3 md:w-1/2 md:items-baseline md:flex relative"
  >
    {#each menus as menu, i}
      <div class="relative">
        <button
          class="text-2xl"
          class:underline={i === showSubmenu}
          on:click={() => {
            handleDropdownClick(i);
          }}>{menu.title}</button
        >
        {#if showSubmenu === i}
          <ul
            class="absolute flex flex-col w-[200%] bg-white top-full z-10 right-0 border-black border"
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
    class="md:hidden p-2 fixed top-100 right-0 bg-white h-screen z-20 w-[75vw]"
  >
    <button
      on:click={() => {
        showMobileDrawer = !showMobileDrawer;
      }}>close</button
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
