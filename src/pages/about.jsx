import { Outlet } from "react-router" 


export default function About() {



    return (
        <div>
        <h1>This is going to be a Pokemon Application</h1>
        <Outlet /> 
    </div>
    )
}

// import { Outlet } from "react-router"   and   
// <Outlet /> 
// tells you this has a children that need to be rendered
//    http://localhost:5173/about/contact
