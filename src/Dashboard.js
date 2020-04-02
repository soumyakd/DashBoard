import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'


class Dashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            users : [],
            posts : [],
            action : false
        }
    }

    componentDidMount(){
        const uid=  this.props.match.params.id
        axios.get(`http://jsonplaceholder.typicode.com/users/${uid}`)
        .then(response=>{
            const users = response.data
            this.setState({users})
        })
        .catch(err=>{
            console.log(err)
        })

        axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${uid}`)
        .then(response=>{
            const posts= response.data
            this.setState({posts})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    handleLogout = (e) => {
        localStorage.clear()
        this.setState ({ action : true })
    }

    render(){
        return(
            <div>
                <center>
                    <table border = '1'>
                        
                        {this.state.action && <Redirect to='/'/>}
                        <p> Name : {this.state.users.name} </p>
                        <p> Email : {this.state.users.email} </p>
                        <p> Phone : {this.state.users.phone} </p>
                        <p> Website : {this.state.users.website} </p> 
                        <hr/>
                        <h2>Posts made</h2>
                        <ul>
                            {this.state.posts.map((post, i)=>{
                                return(
                                    <li key={i}>{post.title}</li>
                                )
                            })}
                        </ul>
                    </table>
                    <br/>
                    <button onClick={this.handleLogout}>Logout</button>

                </center>
            </div>
        )
    }
}

export default Dashboard
