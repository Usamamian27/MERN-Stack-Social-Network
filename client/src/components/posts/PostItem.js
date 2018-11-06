import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import {deletePost ,addLike,removeLike} from "../../actions/postAction";


class PostItem extends Component {

    onDeleteClick(id) {
        this.props.deletePost(id);
    }

    onLikeClick(id) {
        this.props.addLike(id);
    }

    onUnlikeClick(id) {
        this.props.removeLike(id);
    }

    findUserLike(likes) {
        const { auth } = this.props;
        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }



    render() {

        const {auth, post} = this.props;

        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <Link to="/profile">
                            <img className="rounded-circle d-none d-md-block" src={post.avatar} alt="" />
                        </Link>
                        <br />
                        <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{post.text}</p>

                        {/* this is like button */}
                        <button onClick={this.onLikeClick.bind(this,post._id)} type="button" className="btn btn-light mr-1">


                            <i
                                className={classnames('fas fa-thumbs-up', {
                                    'text-primary': this.findUserLike(post.likes)
                                })}
                            />



                            <span className="badge badge-light">{post.likes.length}</span>
                        </button>



                        {/* this is unlike button */}
                        <button onClick={this.onUnlikeClick.bind(this,post._id)} type="button" className="btn btn-light mr-1">
                            <i className="text-secondary fas fa-thumbs-down"></i>
                        </button>


                        <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                            Comments
                        </Link>

                        {/*/ if it is logged in user's post show delete button
                        // otherwise not
                        */}


                        {post.user === auth.user.id ? (
                            <button
                                onClick={this.onDeleteClick.bind(this, post._id)}
                                type="button"
                                className="btn btn-danger mr-1"
                            >
                                <i className="fas fa-times" />
                            </button>
                        ) : null}

                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps=(state)=>({
    auth :state.auth
});

export default connect(mapStateToProps,{deletePost, addLike , removeLike})(PostItem);