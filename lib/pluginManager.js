// lib/pluginManager.js

const plugins = [];

export const registerPlugin = (plugin) => {
    if (!plugin.name || !plugin.component) {
        throw new Error("Plugin must have a name and a component.");
    }
    plugins.push(plugin);
};

export const getPlugins = () => {
    return plugins;
};