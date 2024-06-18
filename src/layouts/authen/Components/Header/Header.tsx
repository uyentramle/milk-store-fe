import React from 'react';

const Header: React.FC = () => {
    // const [pageTitle, setPageTitle] = useState(document.title);

    // useEffect(() => {
    //     const handleTitleChange = () => setPageTitle(document.title);

    //     // Listen for title changes
    //     window.addEventListener('titlechange', handleTitleChange);

    //     // Clean up event listener on component unmount
    //     return () => window.removeEventListener('titlechange', handleTitleChange);
    // }, []);

    return (
        <div className="flex items-center justify-between p-4 bg-white shadow-md fixed w-full top-0 z-50">

            <div className="flex items-center">
                <a href="/">
                    <img src="https://via.placeholder.com/50" alt="Logo" className="mr-4" />
                </a>
                <a href="/">
                    <span className="text-xl font-bold text-pink-500">MILK STORE</span>
                </a>
                {/* <span className="text-xl text-gray-800 mx-6"> {pageTitle}</span> */}
            </div>

        </div>
    );
};

export default Header;
