import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { Link } from 'react-router-dom';

export function Users() {
  const [users, setUser] = useState([]);
  const [filter,setFilter] = useState("");
  console.log(users);

  // add debouncing here
  useEffect(()=>{
    async function fetchData(){
      const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
        setUser(response.data.user); 
    }
    fetchData();
  },[filter])

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          onChange={e=>{setFilter(e.target.value)}}
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </>
  );
}

function User({ user }) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Link to ={`/sendmoney?id=${user._id}&name=${user.firstName}`}>
        <Button label={"Send Money"} />
        </Link>
      </div>
    </div>
  );
}
