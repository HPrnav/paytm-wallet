export const Receipt=({from,to,amount,id} )=>{
    const date=new Date()
    return (
                 <div className="flex flex-col min-h-full min-w-full font-semibold p-4 w-96 h-72 rounded-lg justify-evenly bg-slate-50">
                    <h1 className="text-center text-blue-600 font-bold">PAYTM-LITE</h1>
                    <div >
                        <h2>Receipt No-:{Math.random().toFixed(0)}</h2>
                        <h3>Date  -:{date.toLocaleDateString()}</h3>
                         <hr />
                    </div>
                    <div>
                        <h2>From  -:{from}</h2>
                        <h2>To    -:{to}</h2>
                        <h2>Amount-:{amount}</h2>
                        <h2>Id    -:{id}</h2>
                    </div>

                </div>
      )


}