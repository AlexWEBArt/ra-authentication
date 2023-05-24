import CardNews from "./CardNewsFunc";
import useJsonFetch from "../hooks/useJsonFetch";

export default function LoginPage(props) {
    const [data] = useJsonFetch(process.env.REACT_APP_NEWS_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + props.token
        }
    });

    return (
        <div className="login-component">
            {data && data.map(item => <CardNews key={item.id} {...item}/>)}
        </div>
    )
}