import React, { useState } from 'react';
import Tree from 'react-d3-tree';
import "./App.css"
import SiteTreeVisualizer from './components/visualizer';

const App = () => {
    const [url, setUrl] = useState('');
    const [treeData, setTreeData] = useState(null);

    const handleCrawl = async () => {
        if (!url) {
            return alert('Please enter a URL');
        };

        try {
            // Fetch the tree structure from the Node.js API
            const response = await fetch(`http://localhost:3001/crawl?url=${encodeURIComponent(url)}`);
            if (!response.ok) {
                throw new Error('Error fetching the site tree');
            }
            const data = await response.json();
            setTreeData([data]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Website Link Tree Visualizer</h1>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL"
                className='input'
                style={{ width: '300px', padding: '5px' }}
            />
            <button onClick={handleCrawl} style={{ marginLeft: '10px' }}>Crawl</button>

            {/* Tree Visualization */}
            {treeData && (
                <div style={{ width: '100%', height: '500px', marginTop: '20px' }}>
                    <Tree data={treeData} orientation="vertical" />
                </div>
            )}
        </div>
    );
};

export default App;