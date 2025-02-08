import React, {useState} from 'react'

export default function Textform(props) {
    const handleUpClick =() =>{
        console.log("Uppercase was clicked");
        setText("You clicked on handleUp"); // button lai clicked gare paxi override gardixa
        let newText = text.toUpperCase();
        setText(newText);
    }

    const handleOnChange =(event) =>{
        console.log("Uppercase was clicked");
        setText(event.target.value);
    }
    const handleClearClick =() =>{
        let newText = '';
        setText(newText);
    }

    const handleExtraSpaces =() =>{
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
    }


    const[text, setText] = useState('Enter');
  return (
    <>
    <div>  
      <div className="mb-3 my-3">
        <label for="exampleFormControlInput1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
        </div>
        <div className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label"><b>{props.heading}</b></label>
        <textarea className="form-control"value={text} onChange={handleOnChange} id="exampleFormControlTextarea1" rows="10"></textarea>
    </div>
    <button className='btn btn-primary mx-3' onClick={handleUpClick}>Convert to Uppercase</button>
    <button className='btn btn-primary' onClick={handleClearClick}>Clear Text</button>
    <button className='btn btn-primary' onClick={handleExtraSpaces}>Remove Spaces</button>
    </div>
    <div className="mb-3 my-3">
        <h1>Your text summary</h1>
        <p>{text.split(" ").filter((element)=>{return element.length!=0}).length} words and {text.length} characters</p>
    </div>
    </>

  )
}
