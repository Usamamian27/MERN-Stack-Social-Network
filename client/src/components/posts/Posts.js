import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostForm from './PostForm';
//import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import { getposts } from '../../actions/postAction';
import PostFeed from'./PostFeed';

class Posts extends Component {
    componentDidMount() {
        this.props.getposts();
    }

    render() {


        const {posts , loading} = this.props.post;

        let postContent;

        if(posts === null || loading){
            postContent = <Spinner/>;

        }else{
            postContent = <PostFeed posts={posts} />
        }

        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <PostForm />
                            {postContent}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getposts })(Posts);
