//node server which will handle socket io connection

const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

const users ={};

io.on('connection',socket=>{
    socket.on('new-user-jointed',name=>{
        users[socket.id]= name;
        socket.broadcast.emit('user-joined',name);
        
        console.log('new user :',name);

    })

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message , name:users[socket.id]})
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('left',users[socket.id])
    })

})

