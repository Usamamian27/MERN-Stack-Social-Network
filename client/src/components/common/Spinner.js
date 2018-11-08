import React from 'react';
import Loadder  from './Loadder.gif';

export default () =>{
        return (
            <div>
                <img src={Loadder}
                     style={{width:'200px',margin:'auto',display:'block'}}
                     alt="Loading..."/>
            </div>
        );

}

