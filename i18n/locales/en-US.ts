import messages from "./en-US.json";
import { pruneEmpty } from "./prune";

export default defineI18nLocale(() => pruneEmpty(messages));
