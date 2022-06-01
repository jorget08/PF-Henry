import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UserProfile() {
    var user = useSelector(state => state.user)
    
    useEffect(() => {
      console.log(user)
    }, [])
    

  return (
    <div>
        <Link to='/home'>
            <button>Back to home</button>
        </Link>
        <img src={user.imgProfile} alt=""/>
        <h1>{user.name} {user.lastName}</h1>
        <h2>Mail: {user.email}</h2>
        <h3>Favourites List: </h3>
        {/* <ul>
            {user.favoritos.map(e=>{
                return <li key={e}>{e}</li>})}
        </ul> */}
        <button>Shoppin history</button>
        <button>Edit profile</button>
        <button>Change password</button>

    </div>
  )
}
