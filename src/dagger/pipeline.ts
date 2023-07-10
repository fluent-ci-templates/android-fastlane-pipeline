import Client, { connect } from "@dagger.io/dagger";
import { buildRelease, publishInternal, testDebug } from "./jobs.ts";

export default function pipeline(src = ".") {
  connect(async (client: Client) => {
    await testDebug(client, src);
    await buildRelease(client, src);
    await publishInternal(client, src);
  });
}
