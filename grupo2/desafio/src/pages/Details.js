import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import './Details.css';

class Details extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {},
      repositories: [],
      loading: true,
    }

    this.fetchUser = this.fetchUser.bind(this);
  }

  async componentDidMount() {
    await this.fetchUser(this.props);
  }

  async fetchUser(props) {
    const { id } = props.match.params;
    this.setState(() => ({
      loading: true,
    }), async () => {
      const currentUser = await fetch(`https://api.github.com/users/${ id }`)
        .then((r) => r.json());
      const repos = await fetch(`https://api.github.com/users/${ id }/repos?per_page=3`)
        .then((r) => r.json());
      this.setState(() => ({
        loading: false,
        user: currentUser,
        repositories: repos,
      }));
    })
  }

  render() {
    const { user, repositories, loading } = this.state;

    return (
      <div>
        <header className="header">
        <Link to={`/`}>Voltar</Link>
        </header>
        {loading ? <Loader /> :
          <div className="info">
            <div className="user">
              <img key={user.id} src={user.avatar_url} alt="user" />
              <h2>{ `${ user.name } - ${user.login}` }</h2>
              <span>{`${user.followers} followers`}</span>
              <span>{`${user.following} following`}</span>
            </div>
            <div className="repos">
              <h3>Repositórios Públicos</h3>
              {repositories.map((rep) => (
              <div key={ rep.id }>
                <p>{ rep.name }</p>
                <a href={ rep.html_url } target="_blank" rel="noreferrer">Ver mais</a>
              </div>))}
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Details;
