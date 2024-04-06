import React, { useEffect, useState } from "react";
export function Products(){
      const [content,setContent]=useState(<ProductsList showForm={ShowForm}/>)
  
  //function to display products.
  function ShowList(){
      setContent(<ProductsList  showForm={ShowForm}/>)
  }
  //function to display form of products.
  function ShowForm(product){
    setContent(<ProductForm  product={product} showList={ShowList}/>)  
  }
      return(
            <div className="container my-5">
{/*
//instead of displaying all on the form, the useState hooks help us to navigate from them
<ProductsList/>
<ProductForm/>*/}

{content}
      </div>
      )
}
function ProductsList(props){
     


const[Products,setProducts]=useState([]);
//to fetch api uyou can use fetch or axios
function fetchProducts(){
fetch("http://localhost:3004/products")
.then((response)=>{
      if(!response.ok){
       throw Error("Unexpected Server Response");     
      }
      return response.json()


})
.then((data)=>{
    //  console.log(data);
      setProducts(data)
})
.catch((error)=>
 console.log("Error:"+error)     )
}


//useEffect hooks 
useEffect(()=>fetchProducts(),[]);

//delete
function deleteProduct(id) {
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      
      if (confirmDelete) {
        fetch("http://localhost:3004/products/" + id, {
          method: "DELETE"
        })
          .then((response) => response.json())
          .then((data) => fetchProducts())
          .catch((error) => console.log("Error:", error));
      }
    }
    

return(
      <>
      <h2 className="text-center mb-3">List Of Products</h2>
      <button onClick={()=>props.showForm({})} type="button" className="btn btn-primary me-2">Create.</button>
      <button onClick={()=>fetchProducts()} type="button" className="btn btn-outline-primary me-2">Refresh.</button>
      <table className="table">
           <thead>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Created At</th>
            <th>Action</th>

            </tr>
           </thead>
           <tbody>
            {
                  Products.map((product,index)=>{
                        return (
                    <tr key={index}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.brand}</td>
                        <td>{product.category}</td>
                        <td>{product.price}$</td>
                        <td>{product.createdAt}</td>
                        <td style={{width:"10px",whiteSpace:"nowrap"}}>
                              <button onClick={()=>{props.showForm(product)}} type="button" className="btn btn-primary btn-sm me-2">Edit</button>
                       <button onClick={()=>deleteProduct(product.id)} type="button" className="btn btn-danger btn-sm">Delete</button>
                        </td>
                       
                    </tr>
                        );
                  })
            }
           </tbody>
      </table>
      
      
      </>
      
            )
      }

      function ProductForm(props){
const[errorMsg,setErrorMsg]=useState("");

function handleSubmit(event){
      event.preventDefault();
      //read form data
      const formData=new FormData(event.target)
      //conevrt form to object
      const product=Object.fromEntries(formData.entries())
if(!product.name||!product.brand||!product.category||!product.price){
    
      setErrorMsg(
            <div class="alert alert-warning" role="alert">
            All Fields Are Required!!!
          </div>  
      )
    
      return ; 
}

if(props.product.id){
//update
fetch(`http://localhost:3004/products/${props.product.id}`, 
{
      method:"PATCH",
      headers:{
            "Content-Type":"application/json",

      },body: JSON.stringify(product)
}).then((response)=>{
      if(!response.ok){
            throw new Error("Network Response was not Ok!!")
      }
      return response.json();
}).then((data)=>
   props.showList())
   .catch((error)=>{
      alert("Error:"+error)
})

}
else{
//create new product
product.createdAt=new Date().toISOString().slice(0,10);
 
fetch("http://localhost:3004/products",
{
      method:"POST",
      headers:{
            "Content-Type":"application/json",

      },body: JSON.stringify(product)
}).then((response)=>{
      if(!response.ok){
            throw new Error("Network Response was not Ok!!")
      }
      return response.json();
}).then((data)=>
   props.showList())
   .catch((error)=>{
      alert("Error:"+error)
})
}
}

  return(
<>
<h2 className="text-center mb-3">{props.product.id ? "Edit Product":"Create New Product."}</h2>
<div className="row">
      <div className="col-lg-6 mx-auto">
           
           {errorMsg}
            <form onSubmit={(event)=>handleSubmit(event)}>
              
          { props.product.id && <div className="row mb-3">

<label className="col-sm-4 col-form-label">Id</label> 

<div className="col-sm-8">
<input readOnly className="form-container-plaintext" name="id" defaultValue={props.product.id}/>
</div>
</div>
}
              
              
              
              
                  <div className="row mb-3">

                          <label className="col-sm-4 col-form-label">Name</label> 
               
               <div className="col-sm-8">
                     <input className="form-container" name="name" defaultValue={props.product.name}/>
</div>
</div>

<div className="row mb-3">

          <label className="col-sm-4 col-form-label">Brand</label> 

<div className="col-sm-8">
            <input className="form-container" name="brand" defaultValue={props.product.brand}/>
</div>
</div>
                  
                    

                  <div className="row mb-3">
                         <label className="col-sm-4 col-formm-label">Category</label> 
                    <div className="col-sm-8">
                             <select className="form-select" name="category" defaultValue={props.product.category}>
                        <option value='Other'>Other</option>
                         <option value='Other'>Other</option>
                        <option value='Phones'>Phones</option>
                        <option value='Computers'>Computers</option>
                        <option value='Tvs'>Tvs</option>
                        <option value='Cameras'>Cameras</option>
                        <option value='Gps'>Gps</option>

                        </select> 

                  </div>
                  </div>  

                  <div className="row mb-3">
               <label className="col-sm-4 col-form-label">Price</label> 
               <div className="col-sm-8">
                  <input className="form-container" name="price" defaultValue={props.product.price}/>
                  </div>
                  </div> 
                  <div className="row mb-3">
               <label className="col-sm-4 col-form-label">Description</label> 
               <div className="col-sm-8">
                  <textarea className="form-container" name="description" defaultValue={props.product.description}/>
                  </div>
                  </div> 
                  <div className="row mb-3">
                        <div className="offset-sm-4 col-sm-4 d-grid">
                  <button className="btn btn-primary btn-sm me-3" type="submit" name="brand">Save</button>
                  </div>
                  <div className="col-sm-4 d-grid">
                  <button onClick={()=>props.showList()} type="button" className="btn btn-secondary me-2">Cancel?</button>

                  </div>
                  </div> 
            </form>
      </div>
</div>

</>

      )
}