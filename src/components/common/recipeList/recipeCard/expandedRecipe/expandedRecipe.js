import EditRecipe from '../editRecipe.js/editRecipe'
import './expandedRecipe.css'
import 'react-toastify/dist/ReactToastify.css';

export default function ExpandedRecipe({auth, showEditReqSuccessToastMessage, showDeletedToastMessage,showAddSuccessToastMessage, showAddRejectionToastMessage, showEditSuccessToastMessage, showEditRejectionToastMessage, removeAllRecipe, removeSearchRecipe, removeAddRecipe, removeEditRecipe, org_id, _id, author, dish, ingredients, lastEdited, preparation, prepTime, veg, type, index}) {

    function accept() {
        if (type === "addRequest") {
            approveAddRecipe({ "_id": _id })
            removeAddRecipe(_id)
        }
        else {
            approveEditRequest({ "_id": org_id, "editId": _id })
            removeEditRecipe(_id)
        }
    }
    async function approveAddRecipe(req) {
        console.log("adding", req)
        let token = localStorage.getItem("token")
        const response = await fetch("https://recipe-finder24.herokuapp.com/api/admin/approve-add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': "Bearer " + token
            },
            body: JSON.stringify(req)
        })
        await response.json().then((data) => {
            console.log("approved", data)
            showAddSuccessToastMessage()
        })
    }
    async function approveEditRequest(req) {
        console.log("adding edit", req)
        let token = localStorage.getItem("token")
        const response = await fetch("https://recipe-finder24.herokuapp.com/api/admin/approve-edit", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': "Bearer " + token
            },
            body: JSON.stringify(req)
        })
        await response.json().then((data) => {
            console.log("approved edit", data)
            showEditSuccessToastMessage()
        })
    }
    function reject() {
        console.log("rejecting...")
        if (type === "addRequest") {
            rejectAddRequest({ "_id": _id })
            removeAddRecipe(_id)
        }
        else {
            rejectEditRequest({ "_id": org_id, "editId": _id })
            removeEditRecipe(_id)
        }
    }
    async function rejectAddRequest(req) {
        console.log("removing add", req)
        let token = localStorage.getItem("token")
        const response = await fetch("https://recipe-finder24.herokuapp.com/api/admin/reject-add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': "Bearer " + token
            },
            body: JSON.stringify(req)
        })
        await response.json().then((data) => {
            console.log("removed", data)
            showAddRejectionToastMessage()
        })
    }
    async function rejectEditRequest(req) {
        console.log("removing edit", req)
        let token=localStorage.getItem("token")
        const response = await fetch("https://recipe-finder24.herokuapp.com/api/admin/reject-edit", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': "Bearer "+token
            },
            body: JSON.stringify(req)
        })
        await response.json().then((data) => {
            console.log("removed", data)
            showEditRejectionToastMessage()
        })
    }
    function deleteHandler(_id){
        console.log("deleting",_id)
        deleteRecipe({_id:_id})
        if (type === "all"){
            console.log("removing all")
            removeAllRecipe(_id)
        }
        else if (type === "search"){
            console.log("removing search")
            removeSearchRecipe(_id)
        }
    }

    async function deleteRecipe(req){
        console.log("deleting async", req)
        let token = localStorage.getItem("token")
        const response = await fetch("https://recipe-finder24.herokuapp.com/api/admin/delete-recipe",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': "Bearer " + token
            },
            body: JSON.stringify(req)
        })
        await response.json().then((data)=>{
            showDeletedToastMessage()
        }).catch((err)=>{
            console.log(err)
        })
    }
    return (
        <>
            <div className="modal fade" id={"recipeModal" + _id} tabIndex="-1" role="dialog" aria-labelledby={"recipeModalLabel" + _id} aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 id={"recipeModalLabel" + _id} className="modal-title w-100">
                                <div className="title p-0">
                                    {dish}
                                    {veg ?
                                        <span className="badge ml-2" style={{ backgroundColor: "#3a8925" }}>Veg</span>
                                        : <span className="badge ml-2" style={{ backgroundColor: "#C7181B" }}>Non-Veg</span>}
                                </div>

                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="list-group list-group-flush">
                                    <div className="form-group list-group-item">
                                        <p className="text-muted">Ingredients:</p>
                                        <div className="row d-flex align-items-center">
                                            <div className="col">
                                                {!!ingredients && ingredients.length > 0 ?
                                                    ingredients.map((ingredient, i) => (
                                                        <span key={i} className="badge badge-warning darkgreen ml-1 text-wrap">{ingredient}</span>
                                                    ))
                                                    : "None specified"
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group list-group-item mt-1">
                                        <p className='text-muted'>Preparation Time:</p>
                                        <div>{prepTime}</div>
                                    </div>
                                    <div className="Preparation list-group-item mt-1">
                                        <p className='text-muted'>Preparation Procedure:</p>
                                        <div>{preparation}</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <span className='mr-auto text-muted'>
                                Last edited by
                                <span className='font-italic'> {author} </span>
                                on
                                <span className='font-italic'> {lastEdited} </span>
                            </span>
                            {(type === "all" || type === "search") && <div>
                                {(auth==="authorized")&&<button type="button" className="btn btn-dark darkgreen mr-2" style={{backgroundColor: "rgb(199, 24, 27)"}} data-dismiss="modal" onClick={()=>{deleteHandler(_id)}}>Delete</button>}
                                {(auth==="unauthorized")&&<button type="button" className="btn btn-warning text-dark" data-dismiss="modal" data-toggle="modal" data-target={"#editRecipeModal" + _id}>Suggest an Edit</button>}
                                {(auth==="authorized")&&<button type="button" className="btn btn-warning text-dark" data-dismiss="modal" data-toggle="modal" data-target={"#editRecipeModal" + _id}>Edit Recipe</button>}

                            </div>}
                            {(type === "addRequest" || type === "editsOnly") && <div>
                                <button type="button" className="btn btn-warning text-dark darkgreen mr-2" onClick={() => { accept() }} data-dismiss="modal">Accept</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => { reject() }}>Reject</button>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            <EditRecipe 
            showEditReqSuccessToastMessage={showEditReqSuccessToastMessage} 
            _id={_id} 
            author={author} 
            dish={dish} 
            ingredients={ingredients} 
            lastEdited={lastEdited} 
            preparation={preparation} 
            prepTime={prepTime} 
            veg={veg} 
            auth={auth} 
            index={index}/>
        </>
    )
}
