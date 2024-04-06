/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirname = path.dirname(fileName);

const nextConfig = {
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(dirname, 'src/');
        return config;
    }
};

export default nextConfig;
