import React, {useState,useEffect} from 'react';
import axios from "axios";

const PostList = () => {

    const [posts,setPosts] = useState({});

    const fetchPosts =async () => {
        const response = await axios.get("http://localhost:4000/posts");
        setPosts(response.data);
        console.log(response);
    }

    useEffect(()=>{
        fetchPosts();
    }, [])

    const renderedPosts = Object.values(posts).map(post => {
        return <div className="ui card column" style={{width: '30%', margin: '0px 10px 20px 5px', backgroundColor: 'lavender'}} key={post.id}>
            <div className="content">
                <h3>{post.title}</h3>
            </div>
        </div>
    })
    return (
        <div className="ui equal width grid" >
            <div class="equal width row" >
            {renderedPosts}
            </div>
        </div>
    )
}

export default PostList
