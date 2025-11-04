import './Error.css';

function Error( {message} ) {
    return (
        <div className="error card">
            <p>{message}</p>
        </div>
    )
}

export default Error;