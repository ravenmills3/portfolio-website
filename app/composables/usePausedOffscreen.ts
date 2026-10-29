// Sets data-paused on an element while it is scrolled out of view, so CSS can pause its loops.
import type { Ref } from "vue";

export function usePausedOffscreen(target: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | undefined;
  onMounted(() => {
    if (!target.value || !("IntersectionObserver" in window)) return;
    observer = new IntersectionObserver(([entry]) => {
      target.value?.toggleAttribute("data-paused", !entry?.isIntersecting);
    });
    observer.observe(target.value);
  });
  onBeforeUnmount(() => observer?.disconnect());
}
