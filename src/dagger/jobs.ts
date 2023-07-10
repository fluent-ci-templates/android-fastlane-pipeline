import Client from "@dagger.io/dagger";

export const buildDebug = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);
  const ctr = client
    .pipeline("buildDebug")
    .container()
    .from("openjdk:11-jdk")
    .withDirectory("/app", context, { exclude: [".git", "build"] })
    .withExec(["bundle", "install"])
    .withExec(["bundle", "exec", "fastlane", "buildDebug"]);

  const result = await ctr.stdout();

  console.log(result);
};

export const buildRelease = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);
  const ctr = client
    .pipeline("buildRelease")
    .container()
    .from("openjdk:11-jdk")
    .withDirectory("/app", context, { exclude: [".git", "build"] })
    .withExec(["bundle", "install"])
    .withExec(["bundle", "exec", "fastlane", "buildRelease"]);

  const result = await ctr.stdout();

  console.log(result);
};

export const testDebug = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);
  const ctr = client
    .pipeline("testDebug")
    .container()
    .from("openjdk:11-jdk")
    .withDirectory("/app", context, { exclude: [".git", "build"] })
    .withExec(["bundle", "install"])
    .withExec(["bundle", "exec", "fastlane", "test"]);

  const result = await ctr.stdout();

  console.log(result);
};

export const publishInternal = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);
  const ctr = client
    .pipeline("publishInternal")
    .container()
    .from("openjdk:11-jdk")
    .withDirectory("/app", context, { exclude: [".git", "build"] })
    .withExec(["bundle", "install"])
    .withExec(["bundle", "exec", "fastlane", "internal"]);

  const result = await ctr.stdout();

  console.log(result);
};

export const promoteJob = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);
  const ctr = client
    .pipeline("promoteJob")
    .container()
    .from("openjdk:11-jdk")
    .withDirectory("/app", context, { exclude: [".git", "build"] });

  const result = await ctr.stdout();

  console.log(result);
};

export const promoteAlpha = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);
  const ctr = client
    .pipeline("promoteAlpha")
    .container()
    .from("openjdk:11-jdk")
    .withDirectory("/app", context, { exclude: [".git", "build"] })
    .withExec(["bundle", "install"])
    .withExec(["bundle", "exec", "fastlane", "promote_internal_to_alpha"]);

  const result = await ctr.stdout();

  console.log(result);
};

export const promoteBeta = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);
  const ctr = client
    .pipeline("promoteBeta")
    .container()
    .from("openjdk:11-jdk")
    .withDirectory("/app", context, { exclude: [".git", "build"] })
    .withExec(["bundle", "install"])
    .withExec(["bundle", "exec", "fastlane", "promote_alpha_to_beta"]);

  const result = await ctr.stdout();

  console.log(result);
};

export const promoteProduction = async (client: Client, src = ".") => {
  const context = await client.host().directory(src);
  const ctr = client
    .pipeline("promoteProduction")
    .container()
    .from("openjdk:11-jdk")
    .withDirectory("/app", context, { exclude: [".git", "build"] })
    .withExec(["bundle", "install"])
    .withExec(["bundle", "exec", "fastlane", "promote_beta_to_production"]);

  const result = await ctr.stdout();

  console.log(result);
};
