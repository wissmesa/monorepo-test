
import { useEffect } from 'react';
import TabFiles from './Components/Tabs/Tab';
import { useSelector, useDispatch } from 'react-redux'
import { arrayAvailableFiles } from './Features/Files/fileList';

function App() {
    const dispatch = useDispatch()
    const FileList = useSelector((state) => state.filesList.value)

    const fetchDataFiles = async () => {
        const response = await fetch('http://localhost:3000/api/v1/files/data');
        const data = await response.json();
        dispatch(arrayAvailableFiles(data))
    };

    useEffect(() => {
        fetchDataFiles();
    }, []);

    return (
        <>
            <div style={{border:"2px solid red",display:"flex", justifyContent:"center",height:"100vh",alignItems:"center"}}>
              {FileList.length > 0 && 
              <div style={{width:"80vw"}}>
                  <TabFiles/>
              </div>
              }
            </div>
        </>
    );
}

export default App;
