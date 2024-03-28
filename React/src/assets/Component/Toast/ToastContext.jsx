const defaultValue ={
    roast: [],
    setToasts: () => {}

}

const ToastContext = createContext(defaultValue);

function ToastContextProvider({children}) {
    const [toasts, setToasts] = useState([]);

    return (
        <ToastContext.Provider value={{toasts, setToasts}}>
            {children}
        </ToastContext.Provider>
    )
}