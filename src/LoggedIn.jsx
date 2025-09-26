import { useLoaderData } from "react-router-dom";

const jobLoader = async({params}) => {
    const data = await fetch(`http://localhost:8000/users/${params.id}`);
    const res = await data.json();
    return res;
}
const LoggedIn = () => {
  const user = useLoaderData();
  return (
    <div>{user.mail}</div>
  )
}
export {LoggedIn as default, jobLoader};