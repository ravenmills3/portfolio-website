import messages from "./fr-CA.json";
import { pruneEmpty } from "./prune";

export default defineI18nLocale(() => pruneEmpty(messages));
