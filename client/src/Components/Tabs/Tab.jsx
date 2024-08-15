import { useEffect } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectedFileTest } from '../../Features/Files/file';
import { linesOfSelectedFile } from '../../Features/Files/fileDetailLines';
import Table from '../Table/Table';
import { isLoadingTable } from '../../Features/Loader/showLoaderTable';
import Loader from '../Loader/Loader';
import "./style.css"
function DynamicTabs() {
    const dispatch = useDispatch();
    const FileList = useSelector((state) => state.filesList?.value);
    const isLoadingTableData = useSelector(
        (state) => state.showLoaderTable.value
    );

    const handleTabSelect = async (eventKey) => {
        dispatch(isLoadingTable(true));
        try {
            dispatch(selectedFileTest(eventKey));
            await fetch(
                `http://localhost:3000/api/v1/files/data?file=${eventKey}`
            )
                .then((response) => response.json())
                .then((data) => dispatch(linesOfSelectedFile(data)));
        } catch (error) {
            console.error(error);
        }
        dispatch(isLoadingTable(false));

    };
    const fetchLinesForFile = async () => {
        await fetch(
            `http://localhost:3000/api/v1/files/data?file=${FileList[0].file}`
        )
            .then((response) => response.json())
            .then((data) => dispatch(linesOfSelectedFile(data)));
    };

    useEffect(() => {
        fetchLinesForFile();
    }, []);

    return (
        <>
            <Tab.Container
                id="left-tabs-example"
                defaultActiveKey={FileList[0].file}
            >
                <Nav variant="pills">
                    {FileList.map((tab) => (
                        <Nav.Link
                            key={tab.file}
                            eventKey={tab.file}
                            onClick={() => handleTabSelect(tab.file)}
                        >
                            {tab.file}
                        </Nav.Link>
                    ))}
                </Nav>
                <Tab.Content>
                    {isLoadingTableData ? (
                        <div className='container-loader'>
                            {' '}
                            <Loader />
                        </div>
                    ) : (
                        <>
                            {FileList &&
                                FileList.map((tab) => (
                                    <Tab.Pane
                                        className="border rounded-2 border-dark m-3"
                                        key={tab.file}
                                        eventKey={tab.file}
                                    >
                                        {/* <Table  /> */}
                                        <Table />
                                    </Tab.Pane>
                                ))}
                        </>
                    )}
                </Tab.Content>
            </Tab.Container>
        </>
    );
}

export default DynamicTabs;
