// True at the md breakpoint and up, where the desktop header shows. False on the server.
export function useWideScreen() {
  const wide = useState("wide-screen", () => false);
  onMounted(() => {
    const mq = window.matchMedia("(min-width: 48rem)");
    wide.value = mq.matches;
    mq.addEventListener("change", (e) => (wide.value = e.matches));
  });
  return wide;
}
