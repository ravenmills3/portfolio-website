// Format YYYY-MM dates in the current locale.
export function useDates() {
  const { locale } = useI18n();
  const { t } = useI18n();
  const fmt = computed(
    () =>
      new Intl.DateTimeFormat(locale.value === "en" ? "en-US" : locale.value, {
        month: "short",
        year: "numeric",
      }),
  );
  return {
    month: (ym: string) => fmt.value.format(new Date(`${ym}-01T12:00:00`)),
    range: (
      start: string,
      end: string | null,
      present: string = t("common.present"),
    ) =>
      `${fmt.value.format(new Date(`${start}-01T12:00:00`))} – ${end ? fmt.value.format(new Date(`${end}-01T12:00:00`)) : present}`,
  };
}
