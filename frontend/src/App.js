import React from 'react';

import {ChatBox} from './lib';
import './lib/style.css';
import './style.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            user: {
                name: 'UserName' + Date.now(),
                uid: 'user' + Date.now(),
                avatar: 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
            },
        };
        this.ws = new WebSocket("ws://localhost:8081")
        this.ws.addEventListener('open', function (event) {
            console.log("Connected");
        });

        this.ws.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
            let msg = JSON.parse(event.data)
            console.log(msg)
            this.setState({
                messages: [...this.state.messages, msg]
            })
        }.bind(this));

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {

    }

    onSubmit(msg) {
        let message = {
            text: msg,
            id: Date.now(),
            sender: this.state.user
        }
        this.setState({
            messages: [...this.state.messages, message]
        })
        this.ws.send(JSON.stringify(message));
    }

    render() {
        return (
            <div className='container' style={{maxWidth: '800px', paddingTop: '100px'}}>
                <div className='chat-header'>
                    <h5>React Chat Box Example</h5>
                </div>
                <ChatBox
                    messages={this.state.messages}
                    onSubmit={this.onSubmit}
                    user={this.state.user}
                />
            </div>
        )
    }
}

export default App;
