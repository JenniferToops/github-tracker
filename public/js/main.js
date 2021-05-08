
// target the delete button and add an event listener to each
const deleteBtn = document.querySelectorAll('.del')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deletePost)
})   

// create a function that links to delete request
async function deletePost(){
  ////for some reason postId is returning as undefined, so the function runs but nothing is deleted/////
    // console.log(this.parentNode.parentNode.dataset.id)

    const postId = this.parentNode.parentNode.dataset.id
    console.log(postId)
    try{
        const response = await fetch('posts/deletePost', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'postIdFromJSFile': postId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }    
    catch(err){
        console.log(err)
    }
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle (arr) {
    var j, x, index;
    for (index = arr.length - 1; index > 0; index--) {
        j = Math.floor(Math.random() * (index + 1));
        x = arr[index];
        arr[index] = arr[j];
        arr[j] = x;
    }
    return arr;
}

const contributors = ['a','b','c']
const shuffledContributors = shuffle(contributors)
console.log(shuffledContributors);

document.getElementById('li-contributors').app