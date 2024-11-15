// components/Layout.js

import Link from 'next/link';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex' }}>
            <aside style={{ width: '200px', padding: '20px', background: '#f4f4f4' }}>
                <h2>CMS Navigation</h2>
                <nav>
                    <ul>
                        <li><Link href="/">Dashboard</Link></li>
                        <li><Link href="/create-post">Create Post</Link></li>
                        <li><Link href="/manage-posts">Manage Posts</Link></li>
                    </ul>
                </nav>
            </aside>
            <main style={{ flex: 1, padding: '20px' }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;