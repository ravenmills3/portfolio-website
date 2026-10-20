// Site-wide animation preference: follows the OS until the visitor chooses.
export type MotionPref = "system" | "on" | "off";

export function useMotionPref() {
  const pref = useState<MotionPref>("motion-pref", () => "system");
  const osReduced = useState("os-reduced-motion", () => false);

  onMounted(() => {
    try {
      const saved = localStorage.getItem("motion");
      if (saved === "on" || saved === "off") pref.value = saved;
    } catch {
      /* storage blocked: stay on system */
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    osReduced.value = mq.matches;
    mq.addEventListener("change", (e) => (osReduced.value = e.matches));
  });

  const enabled = computed(
    () => pref.value === "on" || (pref.value === "system" && !osReduced.value),
  );

  function setEnabled(on: boolean) {
    pref.value = on ? "on" : "off";
    document.documentElement.dataset.motion = pref.value;
    try {
      localStorage.setItem("motion", pref.value);
    } catch {
      /* ignore */
    }
  }

  return { pref, enabled, setEnabled };
}
