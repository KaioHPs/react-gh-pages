import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import './Search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      users: [],
      loading: false,
    }

    this.fetchUsers = this.fetchUsers.bind(this);
  }

  async fetchUsers({target}) {
    const term = target.value;
    this.setState(() => ({
      loading: true,
    }), async () => {
      const currentUsers = await fetch(`https://api.github.com/search/users?q=${term}&per_page=5`)
        .then((result) => result.json());
      if (currentUsers && !currentUsers.message) {
        this.setState(() => ({
          users: currentUsers.items,
          loading: false,
        }));
      } else {
        this.setState(() => ({
          users: [],
          loading: false,
        }));
      }
    });
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <header className="header">
          <input type="text" onChange={this.fetchUsers} ></input>
        </header>
        <div className="container">
          {loading ? <Loader /> : 
            users.map((user) => <div className="user_cont">
              <img key={ user.id } src={ user.avatar_url } alt="user" />
              <div className="user_info">
                <h2>{ user.login }</h2>
                <Link to={`user/${user.login}`}>Ver detalhes</Link>
              </div>
            </div>) }
        </div>
      </div>
    )
  }
}

export default Search;
