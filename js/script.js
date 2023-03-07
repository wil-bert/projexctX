// A simple Chat server on port 1234
function chatServer() {
    var tcp = new Socket;

    // listen on port 1234
    writeln ("Chat server listening on port 1234");
    if (tcp.listen (1234)) {
        for (;;) {
            // poll for a new connection
            var connection = tcp.poll();
            if (connection != null) {
                writeln ("Connection from " + connection.host);

                // we have a new connection, so welcome and chat
                // until client terminates the session
                connection.writeln ("Welcome to a little chat!");
                chat (connection);
                connection.writeln ( "*** Goodbye ***");
                connection.close();
                delete connection;
                writeln ("Connection closed");
            }
        }
    }
}

function chatClient() {
    var connection = new Socket;

    // connect to sample server
    if (connection.open ("remote-pc.corp.adobe.com:1234")) {
        // then chat with server
        chat (connection);
        connection.close();
        delete connection;
    }
}

function chat (c) {
    // select a long timeout
    c.timeout=1000;

    while (true) {
        // get one line and echo it
        writeln (c.read());

        // stop if the connection is broken
        if (!c.connected)
            break;

        // read a line of text
        write ("chat: ");
        var text = readln();

        if (text == "bye")
            // stop conversation if the user entered "bye"
            break;
        else
            // otherwise transmit to server
            c.writeln (text);
    }
}




// /public/javascript.js

// Get the current username from the cookies
// var user = cookie.get('user');
// if (!user) {

//   // Ask for the username if there is none set already
//   user = prompt('Choose a username:');
//   if (!user) {
//     alert('We cannot work with you like that!');
//   } else {
//     // Store it in the cookies for future use
//     cookie.set('user', user);
//   }
// }

// Connect to the server-side websockets. But there's no server yet!
//  var socket = io();

// // The user count. Can change when someone joins/leaves
//  socket.on('count', function (data) {
//      $('.user-count').html(data);
//     });
  
//   // When we receive a message
//   // it will be like { user: 'username', message: 'text' }
//   socket.on('message', function (data) {
//     $('.chat').append('<p><strong>' + data.user + '</strong>: ' + data.message + '</p>');
//   });

//   // When the form is submitted
// $('form').submit(function (e) {
//     // Avoid submitting it through HTTP
//     e.preventDefault();
  
//     // Retrieve the message from the user
//     var message = $(e.target).find('input').val();
  
//     // Send the message to the server
//     socket.emit('message', {
//       user: cookie.get('user') || 'Anonymous',
//       message: message
//     });
  
//     // Clear the input and focus it for a new message
//     e.target.reset();
//     $(e.target).find('input').focus();
//   });