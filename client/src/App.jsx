import { useEffect } from 'react';
import TabFiles from './Components/Tabs/Tab';
import { useSelector, useDispatch } from 'react-redux';
import { arrayAvailableFiles } from './Features/Files/fileList';
import BrandExample from './Components/Navbar/Navbar';
import './style.css';
import Loader from './Components/Loader/Loader';
import { isLoading } from './Features/Loader/showLoader';
function App() {
    const dispatch = useDispatch();
    const FileList = useSelector((state) => state.filesList.value);
    const isLoadingData = useSelector((state) => state.showLoader.value);
    const fetchDataFiles = async () => {
        dispatch(isLoading(true));
        try {
            const response = await fetch(
                'http://localhost:3000/api/v1/files/data'
            );
            const data = await response.json();
            dispatch(arrayAvailableFiles(data));
        } catch (error) {
            console.error(error);
        }
        dispatch(isLoading(false));

    };

    useEffect(() => {
        fetchDataFiles();
    }, []);

    return (
        <>
            <div className="container-page">
                <div>
                    <BrandExample />
                </div>
                {isLoadingData ? (
                    <div className='container-loader'>
                    <Loader />
                    </div>
                ) : (
                    <div className="container-table">
                        {FileList.length > 0 && (
                            <div style={{ width: '80vw' }}>
                                <TabFiles />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
