import React from "react";

const Form = (props) => {
    return (
        <form onSubmit={props.weatherMethod}>
            <input type='text' name='city' placeholder='Город' className="input"/>
            <button className="btn">Получить погоду</button>
        </form>
    );
}

export default Form;