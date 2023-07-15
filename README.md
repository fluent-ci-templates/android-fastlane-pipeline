# Android Fastlane Pipeline

[![deno module](https://shield.deno.dev/x/android_fastlane_pipeline)](https://deno.land/x/android_fastlane_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/android-fastlane-pipeline)](https://codecov.io/gh/fluent-ci-templates/android-fastlane-pipeline)

A ready-to-use Fastlane pipeline and jobs for Android (React Native) projects.

## 🚀 Usage

Run the following command on your Android (React Native)
project:

```sh
dagger run deno run -A https://deno.land/x/android_fastlane_pipeline/ci.ts
```

Or, if you want to use the predefined jobs:

```ts
import Client, { connect } from "@dagger.io/dagger";
import { Dagger } from "https://deno.land/x/android_fastlane_pipeline/mod.ts";

const { buildRelease } = Dagger;

function pipeline(src = ".") {
  connect(async (client: Client) => {
    await buildRelease(client, src);
  });
}

pipeline();
```