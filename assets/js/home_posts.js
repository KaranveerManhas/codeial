{
    let createPost = function() {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($('.delete-post-button'), newPost)
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            })
        });
    }

    // Method to create a post in DOM
    let newPostDom = function(post){
        return $(`
        <li id="post-${post._id}">
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post.id}">X</a>
            </small>
            ${post.content}
            <br>
            <small>
                ${post.user.username}
            </small>
            <div class="post-comments">
                <form action="/comment/create" method="post">
                    <input type="text" name="content" placeholder="Comment.." required>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form>
                <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">
                    </ul>
                </div>
            </div>
        </li>
        `);
    }

    // method to delete a post from DOM
    let deletePost = function(deleteLink) {
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                // get the value of the property of a tag(deleteLink)
                url: $(deleteLink).prop('href'),
                success: function(data) {
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error) {
                    console.log(error.responseText);
                }
            })
        });
    }


    createPost();
}