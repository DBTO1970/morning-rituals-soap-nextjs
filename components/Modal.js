import { useContext } from "react"
import { DataContext } from "../store/GlobalState" 
import { deleteItem } from "../store/Actions"
import { deleteData } from "../utils/fetchData"


const Modal = () => {
    const { state, dispatch } = useContext(DataContext)
    const { modal } = state

    const handleSubmit = () => {
        if(modal.type === 'ADD_USER') {
            deleteData(`user/${modal.id}`, auth.token)
            .then(res => {
                if(res.err) return dispatch({type: 'NOTIFY', payload:{ error: res.err}})
                return dispatch({type: 'NOTIFY', payload:{ success: res.err}})
            })
        }
        dispatch(deleteItem(modal.data, modal.id, modal.type))
        dispatch({ type: 'ADD_MODAL', payload: {}})
    }


    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        {modal.title}
                    </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span >&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {modal.body}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleSubmit}>Yes</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" >Cancel</button>
                </div>
                </div>
            </div>
        </div>
    )

}

export default Modal