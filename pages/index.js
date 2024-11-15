// pages/index.js

import Head from 'next/head';
import { getPlugins } from '../lib/pluginManager';

export default function Home() {
    const plugins = getPlugins();

    return (
        <div>
            <Head>
                <title>CMS with Plugin Architecture</title>
            </Head>
            <h1>Welcome to the CMS</h1>
            {plugins.map((plugin, index) => {
                const PluginComponent = plugin.component;
                return <PluginComponent key={index} />;
            })}
        </div>
    );
}