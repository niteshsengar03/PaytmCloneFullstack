import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";

export function Signup(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className=" flex flex-col justify-center ">
    <div className=" bg-white rounded-lg w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"}/>
        <SubHeading label ={"Enter your information to create an account"}/>
        <InputBox value = {firstName} onChange={(e) => {setFirstName(e.target.value)}} label={"First Name"} placeholder={"nitesh"}/>
        <InputBox value = {lastName} onChange={(e) =>{setLastName(e.target.value);}} label={"Last Name"} placeholder={"sengar"}/>
        <InputBox value = {username} onChange={(e) =>{setUsername(e.target.value)}} label={"Email"} placeholder={"nik@gmail.com"}/>
        <InputBox value = {password} onChange={(e) =>{setPassword(e.target.value);}} label={"Password"} placeholder={"123456"}/>
        <Button label={"Sign up"} onClick={async ()=>{
            try{
            const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                username,
                firstName,
                lastName,
                password
            })
            console.log(response);
            //pass key and value 
            // name the key whatever you want here i named it "token"
            localStorage.setItem("token",response.data.token);
            // localStorage.removeItem("token");
        }catch(e){
            console.error("Signup failed:", e);
        }
        }}/>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
 </div>
        </div>
    </div>
}