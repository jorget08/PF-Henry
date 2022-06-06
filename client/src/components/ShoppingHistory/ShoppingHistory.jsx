import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getShoppingHistory } from "../../redux/actions";
import DataTable from 'react-data-table-component'

function ShoppingHistory() {
  const user = useSelector((state) => state.user);
  const x = useSelector((state) => state.ShoppingHistory);
  let id = user.idUser;
  let a=[]
  let finalpay=[]
  console.log(x);
  let pay = x.payments?.map((e) => e.paymentbooks);
  pay?.forEach(element => {
    a.push(element)
  })
 
  
  a.forEach((element,i) => {
    element.forEach((e,i)=>finalpay.push(e))
  }) 


  console.log(finalpay)

  finalpay.map(e=>e.createdAt=e.createdAt.split("T")[0])



  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getShoppingHistory(id));
  }, [dispatch]);


  const column = [
    {
        name : "Title",
        selector: "title",
        sortable: true
  
    },
    {
        name : "Author",
        selector: "author",
        sortable: true
  
    },
    {
      name : "Price",
      selector: "price",
      sortable: true

  },
  {
    name : "Quantity",
    selector: "cant",
    sortable: true

},
{
  name : "Date",
  selector: "createdAt",
  sortable: true

},

  
    
    ]

  return (
    <>
      <NavBar></NavBar>
      <div>
        <h1>Shopping History</h1>
        <br></br>
      <DataTable 
        columns={column}
        data={finalpay}
        tabla="Shopping History"
        pagination
      />
    </div>
     
    </>
  );
}

export default ShoppingHistory;
