import { app } from "$src/components/app";
import { inject } from '@vercel/analytics';

inject();
app.init();