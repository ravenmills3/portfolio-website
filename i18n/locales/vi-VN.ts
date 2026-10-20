import messages from "./vi-VN.json";
import { pruneEmpty } from "./prune";

export default defineI18nLocale(() => pruneEmpty(messages));
