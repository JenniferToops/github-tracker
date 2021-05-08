
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

const contributors = ['MagicMarcos','jennifertoops','nicoolel', 'rudy35hernandez', 'wfarid']
const shuffledContributors = shuffle(contributors)
console.log(shuffledContributors);
let str="Contributors (Random Order): "
for (const name of shuffledContributors){
  str += `<a target="_blank" href=https://github.com/${name}>${name}</a>, `
}
str = str.substring(0, str.length - 2)
console.log(str)

document.getElementById('li-contributors').innerHTML = str