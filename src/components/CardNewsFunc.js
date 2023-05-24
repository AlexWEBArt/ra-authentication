export default function CardNews(props) {
    const { title, image, content} = props;
    return (
        <div className="card">
            <img src={image} className="card-img-top" alt='card preview'/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{content}</p>
            </div>
        </div>
    )
}