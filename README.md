# Esprit et Vie Church - Web Application
Web application for the Esprit et Vie church.
## Front-end Configuration
### API Configuration
To configure the backend API URL, modify the `BASE_URL` constant in the file:
`lib/apiCaller.ts`
By default, the application is configured to use a local API:
```typescript
export const BASE_URL = “http://localhost:8002/api”;
```
For production, simply replace this URL with that of your backend server. For example:
```typescript
export const BASE_URL = “https://your-domaine-backend.com/api”;
```
### Environment variables
Create a `.env.local` file at the root of the project with the following variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The right variable are in the .env.example file
## Installation
1. Install dependencies:
```bash
npm install
# or
yarn install
```
2. Launch the application in development mode:
```bash
npm run dev
# or
yarn dev
```
The application will be available at: [http://localhost:3000](http://localhost:3000)
## Building for production
To create an optimized production version:
```bash
npm run build
# or
yarn build
```
Then to launch the production server:
```bash
npm start
# or
yarn start
```
## Technologies used
- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- Axios
## License
This project is licensed under MIT.
