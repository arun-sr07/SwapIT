import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import categories from "./CategoriesList";
import API_URL from "../constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";

function EditProduct() {
    const p = useParams()
    const navigate = useNavigate();
    const [pname, setpname] = useState('');
    const [pdesc, setpdesc] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');
    const [pimage, setpimage] = useState('');
    const [pimage2, setpimage2] = useState('');
    const [poldimage, setpoldimage] = useState('');
    const [poldimage2, setpoldimage2] = useState('');

   
    // Check the full URL in the console
               
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])
    useEffect(() => {
        const url = API_URL + '/get-product/' + p.productId;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                   // setproduct(res.data.product)
                   let product=res.data.product;
                   setpname(product.pname)
                   setpdesc(product.pdesc)
                   setprice(product.price)
                   setcategory(product.category)
                   setpimage(product.pimage)
                   setpimage2(product.pimage2)
                   setpoldimage(product.poldimage)
                   setpoldimage2(product.poldimage2)
                   console.log("Image paths:", product.poldimage, product.poldimage2); // Debugging output
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }, [])

    const handleApi = () => {
       
       
            const formData = new FormData();
            formData.append('pId', p.productId)
            formData.append('pname', pname)
            formData.append('pdesc', pdesc)
            formData.append('price', price)
            formData.append('category', category)
            formData.append('pimage', pimage)
            formData.append('pimage2', pimage2)
            formData.append('poldimage', poldimage)
            formData.append('poldimage2', poldimage2)
            formData.append('userId', localStorage.getItem('userId'))

            const url =  API_URL + '/edit-product';
            axios.post(url, formData)
                .then((res) => {
                    if (res.data.message) {
                        toast.success('Product added successfully!', {
                            onClose: () => navigate('/') // Navigate when the toast closes
                        });
                    }
                })
                .catch((err) => {
                    toast.error('Server error!');
                })
        



    }

    return (
        
        <div>
            <Header />
            <ToastContainer />
            <div className="p-3">

                <h2> EDIT PRODUCT HERE : </h2>
                <label> Product Name </label>
                <input className="form-control" type="text" value={pname}
                    onChange={(e) => { setpname(e.target.value) }} />
                <label> Product Description </label>
                <input className="form-control" type="text" value={pdesc}
                    onChange={(e) => { setpdesc(e.target.value) }} />
                <label> Product Price</label>
                <input className="form-control" type="text" value={price}
                    onChange={(e) => { setprice(e.target.value) }} />
                <label> Product Category </label>
                <select className="form-control" value={category}
                    onChange={(e) => { setcategory(e.target.value) }}>
                    <option> Bikes </option>
                    <option> Mobiles </option>
                    <option> Cloth </option>
                    {
                        categories && categories.length > 0 &&
                        categories.map((item, index) => {
                            return (
                                <option key={'option' + index}> {item} </option>
                            )
                        })
                    }
                </select>
                <label> Product Image </label>
                <input style={{width:'50%'}} className="form-control" type="file"
                    onChange={(e) => {
                        setpimage(e.target.files[0])
                    }} />
               
                <img src={API_URL + '/' + poldimage} alt="Product" width={100} height={50}  /><br></br>
                
              
                <label> Product Second Image </label>
                <input style={{width:'50%'}} className="form-control" type="file"
                    onChange={(e) => {
                        setpimage2(e.target.files[0])
                    }} />
                    <img src={API_URL + '/'+poldimage2} alt="Product" width={100} height={50}  /><br></br>
                <button onClick={handleApi} className="btn btn-primary mt-3"> SUBMIT </button>
            </div>

        </div>
    )
}

export default EditProduct;