import Header from "./svelteHeader.svelte";

/**
 * @type {Svelte}
 */
export const header = new Header({ target: document.querySelector("header") });
