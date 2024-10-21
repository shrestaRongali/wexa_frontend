import { useEffect } from "react";
import "./errorPopUp.scss"

const containerStyle = {
    width: '100%',
    height: '100%',
  };  

const ErrorPopUp = (props: any) => {

    useEffect(() => {
        }, []);

    return(<div className="popup">
        <div className="popup-content px-11 p-4">
            <text>{props.error}</text>
        </div>
    </div>
    )
} 

export default ErrorPopUp
