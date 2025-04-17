import { listen } from './src/app';
import { config } from 'dotenv';

config();

const port = process.env.PORT || 3000;

listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
