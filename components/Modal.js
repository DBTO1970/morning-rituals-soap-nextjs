import { useContext } from "react"
import { DataContext } from "../store/GlobalState" 
import { deleteItem } from "../store/Actions"


const Modal = () => {
    const { state, dispatch } = useContext(DataContext)
    const { modal } = state

    const handleSubmit = () => {
        dispatch(deleteItem(modal.data, modal.id, 'ADD_CART'))
        dispatch({ type: 'ADD_CART', payload: {}})
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
                    Remove this item from your basket?
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