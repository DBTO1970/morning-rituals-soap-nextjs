const Toast = ({msg, handleShow, bgColor, timeOut}) => {
    return(
        <div className={`toast show position-fixed text-light ${bgColor}`}
            style={{ top: '8%', right: '20%', zIndex: 9, minWidth: '50vw', minHeight: '5vh'}} >
            <div className={`toast-header ${bgColor} text-light`}>
                <strong className="mr-auto text-light">{msg.title}</strong>

                <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" style={{ outline: 'none', background: 'none', border: 'none', color: 'white' }} onClick={handleShow}>x</button>
            </div>

            <div className="toast-body">
                {msg.msg}
            </div>
        </div>
    )
}

export default Toast