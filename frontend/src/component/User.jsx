import { useState } from "react"
import { Button } from "./Button"
import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";


export const Users = () => {
    
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter,setfilter]=useState("");
 
    useEffect(()=>{
       axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
       .then(response=>{setUsers(response.data.users)})
     },[filter])

    return <>
        <div className="font-bold mt-6 m-3 text-lg"> Users </div>
        <div className="my-2 m-3">
            <input type="text" onChange={(e)=>{setfilter(e.target.value)}} placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div className="m-3">
            {users.map(user => <User key={user._id} user={user} ></User>)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();
    // if(!user || !user.firstName ||!user.lastName){
    //     return null;
    // }
    console.log(user)

    return <div className="flex justify-between">
    <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
                {user.firstname[0]}
            </div>
        </div>
        <div className="flex flex-col justify-center h-ful font-black ">
            <div>
                {user.firstname} {user.lastname}
            </div>
        </div>
    </div>

    <div className="flex flex-col justify-center h-ful">
        <Button onClick={(e) => {
            navigate("/send?id=" + user._id + "&name=" + user.firstname);
        }} label={"Send Money"} />
    </div>
</div>
}