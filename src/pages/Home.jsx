import React, { useState } from 'react';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [marks, setMarks] = useState(Array(5).fill(''));
    const [submittedMarks, setSubmittedMarks] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (index, value) => {
        const newMarks = [...marks];
        newMarks[index] = value;
        setMarks(newMarks);
        setError('');
    };

    const handleSubmit = () => {
        let errorDialog = document.getElementById("error-div");
        let inputDiv = document.getElementById("input-container");
        if (marks.some(mark => mark === '')) {
            errorDialog.style.display = "block";
            inputDiv.style.display = "none";
            return;
        }

        setSubmittedMarks([...submittedMarks, marks]);
        setMarks(Array(5).fill(''));
    };

    const calculateTotal = (marks) => {
        return marks.reduce((total, mark) => total + (parseFloat(mark) || 0), 0);
    };

    function CloseDialog() {
        let errorDialog = document.getElementById("error-div");
        let inputDiv = document.getElementById("input-container");

        errorDialog.style.display = "none";
        inputDiv.style.display = "block";

        setMarks(Array(5).fill(''));
    }
    
    function signOut(){
        navigate('/SimpleReact/signIn');
        location.reload();
    }
    
    function clear(){
        setMarks(Array(5).fill(''));
        setSubmittedMarks([]);

        let errorDialog = document.getElementById("error-div");
        let inputDiv = document.getElementById("input-container");

        errorDialog.style.display = "none";
        inputDiv.style.display = "block";

        setMarks(Array(5).fill(''));
    }
    
    return (
        <div id='tot-container'>
            <button onClick={signOut}>SIGN OUT</button>
            <button onClick={clear} style={{marginLeft:"10px"}}>Clear Data</button>
            <div className='input-div'>
                <h2>Enter Marks for below subjects:</h2>
                {error && <p className="error">{error}</p>}
                <div className='input-container' id='input-container'>
                    {marks.map((mark, index) => (
                        <div key={index}>
                            <label>Subject {index + 1} :</label>
                            <input
                                type="number"
                                placeholder={`Mark ${index + 1}`}
                                max={100}
                                min={0}
                                value={mark}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                    <button onClick={handleSubmit} style={{width:"80px"}}>Submit</button>
                </div>
            </div>

            <div className='output-table'>
                <table>
                    <thead>
                        <tr>
                            <th>Serial No</th>
                            <th>Subject 1</th>
                            <th>Subject 2</th>
                            <th>Subject 3</th>
                            <th>Subject 4</th>
                            <th>Subject 5</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submittedMarks.map((marks, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                {marks.map((mark, markIndex) => (
                                    <td key={markIndex}>{mark}</td>
                                ))}
                                <td>{calculateTotal(marks)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div id='error-div'>
                <h1>ERROR</h1>
                <hr />
                <p>Input field cannot be empty/Marks must be in between 0-100</p>
                <button onClick={CloseDialog}>Close</button>
            </div>
        </div>
    );
}
