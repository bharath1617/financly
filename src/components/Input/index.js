import React from "react";
import './styles.css'

function Input({label, state, type, setState, placeholder}){
     return (
        <div className="input-warp">
            <p className="label">{label}</p>
            <input 
            onChange={(e)=> setState(e.target.value)} 
            value={state}
            type={type}
            placeholder={placeholder}
            className="custom-input"></input>
        </div>
     )
}

export default Input;