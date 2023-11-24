{
    let updateFriendshipDom = function(){

            let friendDom = $('.friend-link');
            let profileId = friendDom.attr('data-user-id');

            if(profileId != undefined){
                $.ajax({
                    type: 'GET',
                    url: `/users/friend/${profileId}`,
                    success: function(data){
                        if(data.data.data == true){
                            var friendButton = deleteFriendButton(profileId);
                        }else{
                            var friendButton = addFriendButton(profileId);
                        }
                        friendDom.html(friendButton);
                        updateFriendship(friendButton);
                    },
                    error: function(error){
                        console.log(error.responseText);
                    }
                });
            }

        }

    let addFriendButton = function(profileId){
        return $(`
        <a href="/users/friend/add/${profileId}" class='friend-button'>Add to Friends</a>
        `);
    }

    let deleteFriendButton = function(profileId){
        return $(`
            <a href="/users/friend/remove/${profileId}" class='friend-button'>Remove from Friends</a>
        `);
    }

    let updateFriendship = function(friendButton){

            friendButton.click(function(e){
                e.preventDefault();
                let self = this;
                $.ajax({
                    type: 'POST',
                    url:  $(self).attr('href'),
                    success: function(data){
                        console.log(data);
                        updateFriendshipDom();
                    },
                    error: function(err){
                        console.log(err.responseText);
                    }
                });
            });
        
    }


    updateFriendshipDom();
}