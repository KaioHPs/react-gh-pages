import React from 'react';

class Details extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {},
      repositories: [],
    }

    this.fetchUser = this.fetchUser.bind(this);
  }

  async componentDidMount() {
    await this.fetchUser(this.props);
  }

  async fetchUser(props) {
    const { id } = props.match.params;
    const currentUser = await fetch(`https://api.github.com/users/${ id }`)
      .then((r) => r.json());
    const repos = await fetch(`https://api.github.com/users/${ id }/repos?per_page=3`)
      .then((r) => r.json());
    this.setState(() => ({
      user: currentUser,
      repositories: repos,
    }));
  }

  render() {
    const { user, repositories } = this.state;

    return (
      <div>
        <div>
          <img key={user.id} src={user.avatar_url} alt="user" />
          <h2>{ `${ user.name } - ${user.login}` }</h2>
          <span>{`${user.followers} followers`}</span>
          <span>{`${user.following} following`}</span>
        </div>
        <h3>Principais Repositórios</h3>
        {repositories.map((rep) => (
        <div key={ rep.id }>
          <p>{ rep.name } <a href={ rep.html_url } target="_blank">+</a></p>
        </div>))}
      </div>
    )
  }
}

export default Details;
