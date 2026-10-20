export default defineEventHandler((event) =>
  listNotes(getRouterParam(event, "locale") ?? "en"),
);
