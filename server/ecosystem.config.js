module.exports = {
  apps : [{
    name   : "app1",
    script : "./app.js",
	env: {
	NODE_ENV: "production",
	PORT: 80,
	DATABASE_URL: "postgresql://postgres:WVE4OHKKDYHDIOcZ@db.cdbttysrylvvsmvgjvfx.supabase.co:5432/postgres",
	JWT_SECRET: "testdulubro",
	}
  }]
}
