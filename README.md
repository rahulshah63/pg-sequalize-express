# ags-backend
Backend codebase for AGS project


## Basic setup
1. Copy and rename `.env.sample` as `.env.development.local` (for development) `.env.production.local` (for production)
2. Run the server
    development: `npm run dev`
    production: `npm run start`

## Using pm2
1. Copy and rename `.env.sample` as `.env.development.local` (for development) `.env.production.local` (for production)
2. Run the server:
    development: `npm run deploy:dev`
    production: `npm run deploy:prod`

## Using docker-compose
1. Update the `services.server.env_file` in `docker-compose.yml` for injecting environment variables from file as necessary
3. Update the `services.server.build.target` in `docker-compose.yml` for targeting image build as per environment
2. Run `docker-compose up -d --build`

