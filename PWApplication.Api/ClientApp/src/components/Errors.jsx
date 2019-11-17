import React from 'react';

export default function Errors(props){
    return(
         <div>
             {props.errors.map((error, i) =>
                <p className="text-danger" key={'_' + i}>- {error}</p>)}
        </div>
    );
}