import React from  'react';

const  AmountBox = ({text,type,amounts}) => {

    return (
        <div className="col">
            <div className="card">
                <div className={`card-header bg-${type} text-white`}>
                    {text}
                </div>
                <div className="card-body">
                    {amounts}
                </div>
            </div>
        </div>

    );
}
export  default AmountBox;