import React, { useState } from 'react';
import Tree from 'react-d3-tree';

const SiteTreeVisualizer = () => {
    const [url, setUrl] = useState('');
    const [treeData, setTreeData] = useState(null);

    const handleCrawl = async () => {
        const response = await fetch(`http://localhost:3001/crawl?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        setTreeData(data);
    };

    return (
        <div>
            <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="Enter website URL" />
            <button onClick={handleCrawl}>Crawl</button>

            {treeData && (
                <div style={{ width: '100%', height: '500px' }}>
                    <Tree data={treeData} />
                </div>
            )}
        </div>
    );
};

export default SiteTreeVisualizer;
