// components/PluginSystem.js

import React from 'react';

const PluginSystem = ({ plugins }) => {
    return (
        <div>
            {plugins.map((PluginComponent, index) => (
                <PluginComponent key={index} />
            ))}
        </div>
    );
};

export default PluginSystem;