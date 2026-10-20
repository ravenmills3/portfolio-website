// Pick the current locale's string from a translated data field.
import type { L10n } from "~~/data/experience";
import type { LocaleCode } from "~~/data/routes";

export function useText() {
  const { locale } = useI18n();
  return (text: L10n) => text[locale.value as LocaleCode];
}
