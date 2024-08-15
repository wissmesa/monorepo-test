 
// import { useState } from 'react';
import { useEffect } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import Table from '../Table/Table';
import { useSelector, useDispatch } from 'react-redux'
import { selectedFileTest } from '../../Features/Files/file';
import { linesOfSelectedFile } from '../../Features/Files/fileDetailLines';

// import {  } from './Files/index'

function DynamicTabs() {
    // const [selectedFile, setSelectedFile] = useState(null)
    const dispatch = useDispatch()
    const FileList = useSelector((state) => state.filesList?.value)
    
    const handleTabSelect = async (eventKey) => {
        dispatch(selectedFileTest(eventKey))
        await fetch(`http://localhost:3000/api/v1/files/data?file=${eventKey}`)
        .then(response => response.json())
        .then(data =>  dispatch(linesOfSelectedFile(data)));
    };
    const fetchLinesForFile = async () => {
        await fetch(`http://localhost:3000/api/v1/files/data?file=${FileList[0].file}`)
        .then(response => response.json())
        .then(data =>     dispatch(linesOfSelectedFile(data)))
    }

    useEffect(() => {
        fetchLinesForFile()
    }, [])

    return (
    <>
        <Tab.Container   id="left-tabs-example" defaultActiveKey={FileList[0].file}>
            <Nav  variant="pills">
                {FileList.map((tab) => (
                    <Nav.Link key={tab.file} eventKey={tab.file}  onClick={() => handleTabSelect(tab.file)}>
                        {tab.file}
                    </Nav.Link>
                ))}
            </Nav>
             <Tab.Content>
                {FileList && FileList.map((tab) => (
                    <Tab.Pane className='border rounded-2 border-dark m-3'  key={tab.file} eventKey={tab.file}>
                        <Table FileList={FileList} />
                    </Tab.Pane>
                ))}
            </Tab.Content>
            
        </Tab.Container>
    </>
    );
}

export default DynamicTabs;
