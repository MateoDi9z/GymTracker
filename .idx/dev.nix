{pkgs}: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
  ];
  idx.extensions = [
    "vue.volar"
  ];
  idx.previews = {
    previews = {
      web = {
        command = [
          "pnpm"
          "run"
          "dev"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}