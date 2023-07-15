import Client from "@dagger.io/dagger";
import { withDevbox } from "https://deno.land/x/nix_installer_pipeline@v0.3.3/src/dagger/steps.ts";
import { Dagger } from "https://deno.land/x/android_pipeline@v0.2.3/mod.ts";

const { withAndroidSdk } = Dagger;

export const buildDebug = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);

  const baseCtr = withDevbox(
    withAndroidSdk(
      client
        .pipeline("buildDebug")
        .container()
        .from("alpine:latest")
        .withExec(["apk", "update"])
        .withExec([
          "apk",
          "add",
          "bash",
          "curl",
          "openjdk11",
          "wget",
          "unzip",
          "git",
          "libstdc++",
          "zlib",
          "gcompat",
        ]),
    ),
  );

  const ctr = baseCtr
    .withMountedCache("/nix", client.cacheVolume("nix"))
    .withMountedCache("/app/android/.gradle", client.cacheVolume("gradle"))
    .withMountedCache("/root/.gradle", client.cacheVolume("gradle-cache"))
    .withMountedCache("/app/android/app/build", client.cacheVolume("build"))
    .withMountedCache("/app/vendor", client.cacheVolume("vendor"))
    .withMountedCache("/app/node_modules", client.cacheVolume("node_modules"))
    .withMountedCache(
      "/root/android-sdk/platforms",
      client.cacheVolume("sdk-platforms"),
    )
    .withMountedCache(
      "/root/android-sdk/system-images",
      client.cacheVolume("sdk-system-images"),
    )
    .withMountedCache(
      "/root/android-sdk/build-tools",
      client.cacheVolume("sdk-build-tools"),
    )
    .withDirectory("/app", context, {
      exclude: [
        "node_modules",
        "build",
        ".gradle",
        "app/build",
        "vendor",
        "android/app/build",
        "android/.gradle",
        ".devbox",
      ],
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withEnvVariable("LC_ALL", "en_US.UTF-8")
    .withEnvVariable("LANG", "en_US.UTF-8")
    .withExec([
      "sh",
      "-c",
"eval $(devbox shell --print-env) && \
      bun install && \
      bundle install && \
      bundle exec fastlane android buildDebug",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const buildRelease = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);
  const baseCtr = withDevbox(
    withAndroidSdk(
      client
        .pipeline("buildRelease")
        .container()
        .from("alpine:latest")
        .withExec(["apk", "update"])
        .withExec([
          "apk",
          "add",
          "bash",
          "curl",
          "openjdk11",
          "wget",
          "unzip",
          "git",
          "libstdc++",
          "zlib",
          "gcompat",
        ]),
    ),
  );

  const ctr = baseCtr
    .withMountedCache("/nix", client.cacheVolume("nix"))
    .withMountedCache("/app/android/.gradle", client.cacheVolume("gradle"))
    .withMountedCache("/root/.gradle", client.cacheVolume("gradle-cache"))
    .withMountedCache("/app/android/app/build", client.cacheVolume("build"))
    .withMountedCache("/app/vendor", client.cacheVolume("vendor"))
    .withMountedCache("/app/node_modules", client.cacheVolume("node_modules"))
    .withMountedCache(
      "/root/android-sdk/platforms",
      client.cacheVolume("sdk-platforms"),
    )
    .withMountedCache(
      "/root/android-sdk/system-images",
      client.cacheVolume("sdk-system-images"),
    )
    .withMountedCache(
      "/root/android-sdk/build-tools",
      client.cacheVolume("sdk-build-tools"),
    )
    .withDirectory("/app", context, {
      exclude: [
        "node_modules",
        "build",
        ".gradle",
        "app/build",
        "vendor",
        "android/app/build",
        "android/.gradle",
        ".devbox",
      ],
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withEnvVariable("LC_ALL", "en_US.UTF-8")
    .withEnvVariable("LANG", "en_US.UTF-8")
    .withExec([
      "sh",
      "-c",
"eval $(devbox shell --print-env) && \
      bun install && \
      bundle install && \
      bundle exec fastlane android buildRelease",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const testDebug = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);

  const baseCtr = withDevbox(
    withAndroidSdk(
      client
        .pipeline("testDebug")
        .container()
        .from("alpine:latest")
        .withExec(["apk", "update"])
        .withExec([
          "apk",
          "add",
          "bash",
          "curl",
          "openjdk11",
          "wget",
          "unzip",
          "git",
          "libstdc++",
          "zlib",
          "gcompat",
        ]),
    ),
  );

  const ctr = baseCtr
    .withMountedCache("/nix", client.cacheVolume("nix"))
    .withMountedCache("/app/android/.gradle", client.cacheVolume("gradle"))
    .withMountedCache("/root/.gradle", client.cacheVolume("gradle-cache"))
    .withMountedCache("/app/android/app/build", client.cacheVolume("build"))
    .withMountedCache("/app/vendor", client.cacheVolume("vendor"))
    .withMountedCache("/app/node_modules", client.cacheVolume("node_modules"))
    .withMountedCache(
      "/root/android-sdk/platforms",
      client.cacheVolume("sdk-platforms"),
    )
    .withMountedCache(
      "/root/android-sdk/system-images",
      client.cacheVolume("sdk-system-images"),
    )
    .withMountedCache(
      "/root/android-sdk/build-tools",
      client.cacheVolume("sdk-build-tools"),
    )
    .withDirectory("/app", context, {
      exclude: [
        "node_modules",
        "build",
        ".gradle",
        "app/build",
        "vendor",
        "android/app/build",
        "android/.gradle",
        ".devbox",
      ],
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withEnvVariable("LC_ALL", "en_US.UTF-8")
    .withEnvVariable("LANG", "en_US.UTF-8")
    .withExec([
      "sh",
      "-c",
"eval $(devbox shell --print-env) && \
      bun install && \
      bundle install && \
      bundle exec fastlane android testDebug",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const publishInternal = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);

  const baseCtr = withDevbox(
    withAndroidSdk(
      client
        .pipeline("publishInternal")
        .container()
        .from("alpine:latest")
        .withExec(["apk", "update"])
        .withExec([
          "apk",
          "add",
          "bash",
          "curl",
          "openjdk11",
          "wget",
          "unzip",
          "git",
          "libstdc++",
          "zlib",
          "gcompat",
        ]),
    ),
  );

  const ctr = baseCtr
    .withMountedCache("/nix", client.cacheVolume("nix"))
    .withMountedCache("/app/android/.gradle", client.cacheVolume("gradle"))
    .withMountedCache("/root/.gradle", client.cacheVolume("gradle-cache"))
    .withMountedCache("/app/android/app/build", client.cacheVolume("build"))
    .withMountedCache("/app/vendor", client.cacheVolume("vendor"))
    .withMountedCache("/app/node_modules", client.cacheVolume("node_modules"))
    .withMountedCache(
      "/root/android-sdk/platforms",
      client.cacheVolume("sdk-platforms"),
    )
    .withMountedCache(
      "/root/android-sdk/system-images",
      client.cacheVolume("sdk-system-images"),
    )
    .withMountedCache(
      "/root/android-sdk/build-tools",
      client.cacheVolume("sdk-build-tools"),
    )
    .withDirectory("/app", context, {
      exclude: [
        "node_modules",
        "build",
        ".gradle",
        "app/build",
        "vendor",
        "android/app/build",
        "android/.gradle",
        ".devbox",
      ],
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withEnvVariable("LC_ALL", "en_US.UTF-8")
    .withEnvVariable("LANG", "en_US.UTF-8")
    .withExec([
      "sh",
      "-c",
"eval $(devbox shell --print-env) && \
      bun install && \
      bundle install && \
      bundle exec fastlane android publishInternal",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const promoteAlpha = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);

  const baseCtr = withDevbox(
    withAndroidSdk(
      client
        .pipeline("promoteAlpha")
        .container()
        .from("alpine:latest")
        .withExec(["apk", "update"])
        .withExec([
          "apk",
          "add",
          "bash",
          "curl",
          "openjdk11",
          "wget",
          "unzip",
          "git",
          "libstdc++",
          "zlib",
          "gcompat",
        ]),
    ),
  );

  const ctr = baseCtr
    .withMountedCache("/nix", client.cacheVolume("nix"))
    .withMountedCache("/app/android/.gradle", client.cacheVolume("gradle"))
    .withMountedCache("/root/.gradle", client.cacheVolume("gradle-cache"))
    .withMountedCache("/app/android/app/build", client.cacheVolume("build"))
    .withMountedCache("/app/vendor", client.cacheVolume("vendor"))
    .withMountedCache("/app/node_modules", client.cacheVolume("node_modules"))
    .withMountedCache(
      "/root/android-sdk/platforms",
      client.cacheVolume("sdk-platforms"),
    )
    .withMountedCache(
      "/root/android-sdk/system-images",
      client.cacheVolume("sdk-system-images"),
    )
    .withMountedCache(
      "/root/android-sdk/build-tools",
      client.cacheVolume("sdk-build-tools"),
    )
    .withDirectory("/app", context, {
      exclude: [
        "node_modules",
        "build",
        ".gradle",
        "app/build",
        "vendor",
        "android/app/build",
        "android/.gradle",
        ".devbox",
      ],
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withEnvVariable("LC_ALL", "en_US.UTF-8")
    .withEnvVariable("LANG", "en_US.UTF-8")
    .withExec([
      "sh",
      "-c",
"eval $(devbox shell --print-env) && \
      bun install && \
      bundle install && \
      bundle exec fastlane android promoteAlpha",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const promoteBeta = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);

  const baseCtr = withDevbox(
    withAndroidSdk(
      client
        .pipeline("promoteBeta")
        .container()
        .from("alpine:latest")
        .withExec(["apk", "update"])
        .withExec([
          "apk",
          "add",
          "bash",
          "curl",
          "openjdk11",
          "wget",
          "unzip",
          "git",
          "libstdc++",
          "zlib",
          "gcompat",
        ]),
    ),
  );

  const ctr = baseCtr
    .withMountedCache("/nix", client.cacheVolume("nix"))
    .withMountedCache("/app/android/.gradle", client.cacheVolume("gradle"))
    .withMountedCache("/root/.gradle", client.cacheVolume("gradle-cache"))
    .withMountedCache("/app/android/app/build", client.cacheVolume("build"))
    .withMountedCache("/app/vendor", client.cacheVolume("vendor"))
    .withMountedCache("/app/node_modules", client.cacheVolume("node_modules"))
    .withDirectory("/app", context, {
      exclude: [
        "node_modules",
        "build",
        ".gradle",
        "app/build",
        "vendor",
        "android/app/build",
        "android/.gradle",
        ".devbox",
      ],
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withEnvVariable("LC_ALL", "en_US.UTF-8")
    .withEnvVariable("LANG", "en_US.UTF-8")
    .withExec([
      "sh",
      "-c",
"eval $(devbox shell --print-env) && \
      bun install && \
      bundle install && \
      bundle exec fastlane android promoteBeta",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const promoteProduction = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);

  const baseCtr = withDevbox(
    withAndroidSdk(
      client
        .pipeline("debugTests")
        .container()
        .from("alpine:latest")
        .withExec(["apk", "update"])
        .withExec([
          "apk",
          "add",
          "bash",
          "curl",
          "openjdk11",
          "wget",
          "unzip",
          "git",
          "libstdc++",
          "zlib",
          "gcompat",
        ]),
    ),
  );

  const ctr = baseCtr
    .withMountedCache("/nix", client.cacheVolume("nix"))
    .withMountedCache("/app/android/.gradle", client.cacheVolume("gradle"))
    .withMountedCache("/root/.gradle", client.cacheVolume("gradle-cache"))
    .withMountedCache("/app/android/app/build", client.cacheVolume("build"))
    .withMountedCache("/app/vendor", client.cacheVolume("vendor"))
    .withMountedCache("/app/node_modules", client.cacheVolume("node_modules"))
    .withMountedCache(
      "/root/android-sdk/platforms",
      client.cacheVolume("sdk-platforms"),
    )
    .withMountedCache(
      "/root/android-sdk/system-images",
      client.cacheVolume("sdk-system-images"),
    )
    .withMountedCache(
      "/root/android-sdk/build-tools",
      client.cacheVolume("sdk-build-tools"),
    )
    .withDirectory("/app", context, {
      exclude: [
        "node_modules",
        "build",
        ".gradle",
        "app/build",
        "vendor",
        "android/app/build",
        "android/.gradle",
        ".devbox",
      ],
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withEnvVariable("LC_ALL", "en_US.UTF-8")
    .withEnvVariable("LANG", "en_US.UTF-8")
    .withExec([
      "sh",
      "-c",
"eval $(devbox shell --print-env) && \
      bun install && \
      bundle install && \
      bundle exec fastlane android promoteProduction",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};
