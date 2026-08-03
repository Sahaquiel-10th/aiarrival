module.exports = {
  apps: [
    {
      name: "aiarrival-website",
      cwd: "/opt/aiarrival-website/current",
      script: "/usr/bin/npm",
      args: "run start -- -p 3020 -H 127.0.0.1",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
