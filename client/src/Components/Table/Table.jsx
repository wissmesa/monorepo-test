import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';

function NewTable() {
    const listOfLines = useSelector((state) => state.fileDetailLines.value);

    return (
        <>
            {listOfLines?.lines && listOfLines.lines.length > 0 ? (
                <Table striped>
                    <thead>
                        <tr>
                            <th>Line</th>
                            <th>hex</th>
                            <th>Text</th>
                            <th>Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOfLines?.lines.map((item, i) => (
                            <tr key={i}>
                                <td>Line {i + 1 }</td>
                                <td>{item.hex}</td>
                                <td>{item.text}</td>
                                <td>{item.number}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : <div>no tiene elementos</div>}
        </>
    );
}

export default NewTable;
