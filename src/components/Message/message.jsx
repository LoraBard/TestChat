import React from "react";
import { Card} from 'react-bootstrap';

const Message = ({info, my}) => {
    const convertDate = ()=>{
        const date = new Date(info.time);
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        let hh = date.getHours() % 100;
        if (hh < 10) hh = '0' + hh;

        let mimi = date.getMinutes() % 100;
        if (mimi < 10) mimi = '0' + mimi;


  return dd + '.' + mm + '.' + yy + ' ' + hh + '.' + mimi;
    }
    if(my){
        return (
            <Card id='message' className="my" style={{ backgroundColor: "#9999ff" }}>
            <Card.Body>
                <div className='title'>
                    <Card.Title>
                        {info.from}
                    </Card.Title>
                    <Card.Text>{convertDate(info.time)}</Card.Text>
                </div>
                <Card.Text className='messageText'>{info.message}</Card.Text>
            </Card.Body>
        </Card>
        )
    } 
    return (
        <Card id='message' style={{ backgroundColor: "#f2f2f2" }}>
            <Card.Body>
                <div className='title'>
                    <Card.Title>
                        {info.from}
                    </Card.Title>
                    <Card.Text>{convertDate(info.time)}</Card.Text>
                </div>
                <Card.Text className='messageText'>{info.message}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Message;