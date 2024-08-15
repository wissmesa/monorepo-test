
import { useSelector } from "react-redux";

const Table = () => {
    const listOfLines = useSelector((state) => state.fileDetailLines.value)
    return (
        <>
            {listOfLines?.lines && listOfLines.lines.length > 0 ? (
                <div style={{ margin:"10px 15px" }}>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '40% 30% 10%'
                        }}
                    >
                        <span>hex</span>
                        <span>text</span>
                        <span>number</span>
                    </div>
                    {listOfLines?.lines.map((item, i) => (
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '40% 30% 10%'
                            }}
                            key={i}
                        >
                            <span>{item.hex}</span>
                            <span>{item.text}</span>
                            <span>{item.number}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div>no tiene elementos</div>
            )}
        </>
    );
};

export default Table;
