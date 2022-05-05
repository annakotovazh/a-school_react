import "./addPost.css";
import Spinner from "../../components/helpercomponents/Spinner";

export default function AddPost() {
    const addPostImg = require('./../../images/' + 'girl-red-hair.jpg');
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    if (isLoading) {
        return <Spinner />
    } else {
        return (
            <div className="addPost">
                <img className="addPostImg" src={addPostImg} alt="girl reading book" />
                <form className="addPostForm">
                    <div className="addPostGroup">
                        <label htmlFor="fileInput">
                            <i className="addPostIcon fa-solid fa-plus"></i>
                        </label>
                        <input type="file" id="fileInput" style={{ display: "none" }} />
                        <input type="text" placeholder="Title" className="addPostInput" autoFocus={true} />
                    </div>
                    <div className="addPostGroup">
                        <textarea placeholder="Add description..." type="text"
                            className="addPostInput addText">
                      
                        </textarea>
                    </div>
                    <button className="addSubmit">Publish</button>
                </form>
            </div>
        )
    }
}
