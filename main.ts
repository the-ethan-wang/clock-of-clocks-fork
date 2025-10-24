import { app } from "$src/components/app";
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

injectSpeedInsights();
inject();
app.init();