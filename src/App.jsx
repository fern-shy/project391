import './App.css';
import { useState, useRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { HexColorPicker } from "react-colorful";
import styled from 'styled-components';

const styles = {
    border: '0.0625rem solid #9c9c9c',
    borderRadius: '0.25rem',
};

const D= styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
`

const Toolbox = styled.div`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  // You can also style child elements specifically
  button {
    cursor: pointer;
  }

  input {
    margin: 0 5px;
  }
`;

const App = () => {
    const [color, setColor] = useState("#aabbcc");
    const canvasRef = useRef(null); // Using useRef to reference the canvas
    const [eraseMode, setEraseMode] = useState(false);
    const [strokeWidth, setStrokeWidth] = useState(5);
    const [eraserWidth, setEraserWidth] = useState(10);

    const handleEraserClick = () => {
        setEraseMode(true);
        canvasRef.current.eraseMode(true);
    };

    const handlePenClick = () => {
        setEraseMode(false);
        canvasRef.current.eraseMode(false);
    };

    const handleStrokeWidthChange = (event) => {
        setStrokeWidth(event.target.value);
    };

    const handleEraserWidthChange = (event) => {
        setEraserWidth(event.target.value);
    };



    const downloadImage = () => {
        canvasRef.current.exportImage('jpeg')
            .then(data => {
                // Creating a link and setting the href to the data URL
                const link = document.createElement('a');
                link.download = 'frame.png';
                link.href = data;
                link.click(); // Simulating a click to automatically start the download
            })
            .catch(e => {
                console.error(e);
            });
    };

    const advanceFrame = () => {

    }
    const previousFrame = () => {

    }

    return (
        <D>
            <Toolbox>
                <HexColorPicker color={color} onChange={setColor}/>
                <button onClick={handlePenClick} disabled={!eraseMode}>Brush</button>
                <button onClick={handleEraserClick} disabled={eraseMode}>Eraser</button>

                <label>Stroke width</label>

                <input
                    type="number"
                    value={strokeWidth}
                    onChange={handleStrokeWidthChange}
                    disabled={eraseMode}
                />

                <label htmlFor="eraserWidth">Eraser width</label>

                <input
                    type="number"
                    value={eraserWidth}
                    onChange={handleEraserWidthChange}
                    disabled={!eraseMode}
                />
            </Toolbox>

            <ReactSketchCanvas
                ref={canvasRef}
                style={styles}
                width="400px"
                height="400px"
                strokeWidth={strokeWidth}
                eraserWidth={eraserWidth}
                strokeColor={color}
            />

            <button onClick={advanceFrame}> Next (not working)</button>

            <button onClick={previousFrame}> Previous (not working)</button>

            <button onClick={downloadImage}>Download Frame</button>
        </D>
    );
};

export default App;
