////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Create a chat application using the utility methods we give you.
//
// Already done?
//
// - Create a filter that lets you filter messages in the chat by
//   sender and/or content
//
////////////////////////////////////////////////////////////////////////////////
var React = require('react');
var { login, sendMessage, subscribeToMessages } = require('./utils/ChatUtils');

// you need to npm install this!!!!!
var caf = require('cool-ascii-faces');

var ChatApp = React.createClass({
  getInitialState() {
    return {
      messages: []
    }
  },

  componentDidMount() {
    this.state.unsubscribe = this.subscribeToMessages(this.props.channel)
  },

  removeBadMessages(message) {
    return !(message.text.length < 2 || message.text.length > 200)
  },

  subscribeToMessages(channel) {
    if(this.state.unsubscribe) this.state.unsubscribe();

    return subscribeToMessages(channel, (messages) => {
      this.setState({
        messages: messages.filter(this.removeBadMessages)
      })
    })
  },

  componentWillReceiveProps(newProps) {
    if(newProps.channel !== this.props.channel) {
      if(this.state.unsubscribe) this.state.unsubscribe();
      this.state.unsubscribe = this.subscribeToMessages(newProps.channel);
    }
  },

  componentDidUpdate() {
    window.scrollTo(0, 999999);
  },

  postMessage() {
    var message = this.refs.message.value;
    if (message === '/copy') {
      var lastMessage = this.state.messages[this.state.messages.length - 1];
      sendMessage(this.props.channel, lastMessage.username, lastMessage.avatar, lastMessage.text)
      return;
    }

    if (message === '/face') {
      sendMessage(this.props.channel, 'cool-ascii-faces', 'http://usercontent2.hubimg.com/5821217_f260.jpg', caf());
      return;
    }

    var matches = /\/channel (.*)$/.exec(message);
    if (matches) {
      this.refs.message.value = ''
      this.props.onRequestChannelChange(matches[1]);
      return;
    }

    this.refs.message.value = ''
    var profilePic = this.props.auth.github.profileImageURL;
    sendMessage(this.props.channel, this.props.auth.github.displayName, profilePic, message)
  },

  handleKeyPress(evt) {
    if(evt.keyCode === 13) {
      this.postMessage()
      evt.preventDefault()
      return false
    }
  },

  render() {
    return (
      <div>
        <table>
          <tbody>
            {this.state.messages.slice(-15).map(function(message) {
              return <tr><td><img src={message.avatar} width={30} height={30} /></td><td>{message.text}</td></tr>
            })}
            <tr>
              <td><img src={this.props.auth.github.profileImageURL} width={30} height={30} /></td><td><textarea onKeyDown={this.handleKeyPress} cols={60} ref="message"></textarea><button onClick={this.postMessage}>Send message</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
});

var ChatChannelApp = React.createClass({
  getInitialState() {
    return {
      channel: 'general'
    }
  },

  changeChannel(newChannel) {
    this.setState({
      channel: newChannel
    })
  },

  render() {
    return (
      <div>
        <h1>Channel: {this.state.channel}</h1>
        <ChatApp auth={this.props.auth} channel={this.state.channel} onRequestChannelChange={this.changeChannel} />
      </div>
    )
  }
})

var Chat = React.createClass({

  getInitialState() {
    return {
      auth: null,
      channels: null
    };
  },

  componentDidMount() {
    login((error, auth) => {
      if (error) {
        console.log(error);
      } else {
        this.setState({ auth });
      }
    });
  },

  render() {
    var { auth } = this.state;

    if (auth == null)
      return <p>Logging in...</p>;

    //sendMessage('general', auth.github.displayName, auth.github.profileImageURL, 'I just logged in')

    return (
      <div className="chat">
        <ChatChannelApp auth={auth} />
      </div>
    );
  }

});

React.render(<Chat />, document.getElementById('app'));

/*

Here's how to use the ChatUtils:

login((error, auth) => {
  // hopefully the error is `null` and you have a github
  // `auth` object
});

sendMessage(
  'general', // the channel to post a message to, please post to "general" at first
  'ryanflorence', // the github user name
  'https://avatars.githubusercontent.com/u/100200?v=3', // the github avatar
  'hello, this is a message' // the actual message
);

var unsubscribe = subscribeToMessages('general', (messages) => {
  // here are your messages as an array, it will be called
  // every time the messages change
});
unsubscribe(); // stop listening for changes

The world is your oyster!

*/

