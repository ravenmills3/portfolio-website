export default defineEventHandler(async (event) => {
  const note = await getNote(
    getRouterParam(event, "locale") ?? "en",
    getRouterParam(event, "slug") ?? "",
  );
  if (!note)
    throw createError({ statusCode: 404, statusMessage: "Note not found" });
  return note;
});
