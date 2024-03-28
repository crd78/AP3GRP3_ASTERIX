

function Avertissement() {
    const {pushToats} = useToasts()

    const onSubmit = () => {
        pushToats({
            title:    'success',
            content: 'Votre demande a été envoyée'
        })
    }


    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <button onClick={onSubmit}>Toast</button>
            </div>
        </>
        
    );
}

export default Avertissement