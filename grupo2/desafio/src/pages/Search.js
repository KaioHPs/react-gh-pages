import React from 'react';
import { Link } from 'react-router-dom';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      users: [],
    }

    this.fetchUsers = this.fetchUsers.bind(this);
  }

  async fetchUsers({target}) {
    const term = target.value;
    const currentUsers = await fetch(`https://api.github.com/search/users?q=${term}&per_page=5`)
      .then((result) => result.json());
    if (currentUsers && !currentUsers.message) {
      this.setState(() => ({
        users: currentUsers.items,
      }));
    } else {
      this.setState(() => ({
        users: [],
      }));
    }
  }

  render() {
    const { users } = this.state;

    return (
      <div>
        <input type="text" onChange={this.fetchUsers} ></input>
        { users.map((user) => <div>
            <img key={user.id} src={user.avatar_url} alt="user" />
            <Link to={`user/${user.login}`}>Ver detalhes</Link>
          </div>)}
      </div>
    )
  }
}

export default Search;
