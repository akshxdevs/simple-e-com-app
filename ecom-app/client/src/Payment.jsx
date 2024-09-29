export const Payment = () => {
    const handleMobilePayemnt = () => {
        navigate
    }
    const handleCardPayemnt = () => {
        
    }
    const handleOtherPayemnt = () => {
        
    }
    return(
        <div>
            <h1>Payment</h1>
            <h3>Your payment methord..</h3>
            <button onClick={handleMobilePayemnt}>Gpay/phonePay/paytm</button>
            <button onClick={handleCardPayemnt}>Credit/Debit Card</button>
            <button onClick={handleOtherPayemnt}>Internet Banking</button>
        </div>
    );
}