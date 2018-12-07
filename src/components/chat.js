import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {getAllMessages} from '../actions';
import {sendMessage} from '../actions';
import Input from './input';


class Chat extends Component {
    componentDidMount(){
        if(!localStorage.getItem('chat_name')){
            return this.props.history.push('/set-name');
        }
        this.dbRef = this.props.getAllMessages();
    }

    componenetWillUnmount(){
        if(this.dbRef){
            this.dbRef.off();
        }
    }

    handleSendMessage =  async({message}) => {
        await this.props.sendMessage(message);

        this.props.reset();
    }
    render(){
        const {handleSubmit, messages} = this.props;
        const messageElements = Object.keys(messages).map(key=>{
            const msg = messages[key];

            return (
                <li key={key} className="collection-item">
                    <b>{msg.name}:</b> {msg.message}
                </li>
            )
        });

        return (
            <div>
                <p className="right-align grey-text">Logged in as:{localStorage.getItem('chat_name')}</p>
                <h1 className="center">Chat Room</h1>
                <ul className="collection">
                    {messageElements}
                </ul>
                <form onSubmit = {handleSubmit(this.handleSendMessage)}>
                    <div className="row">
                        <Field name="message" label="Message" component={Input}/>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        messages: state.chat.messages
    }
}

const validate = ({message}) => message ? {} : {message: 'Please enter a message'};

export default reduxForm({
    form:'new-message',
    validate
})(connect(mapStateToProps,{
    getAllMessages,
    sendMessage
})(Chat));