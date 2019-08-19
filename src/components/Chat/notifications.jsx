export const NotificationRequested=()=>{
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }
      else{
        return Notification.requestPermission().then(function(result) {
          if(result === 'granted'){
            return true;
          }
          return false;
        });
      }
}

export const sendNotification=(mess)=>{
    let body = mess.message;
    return new Notification(mess.from, {body});
}