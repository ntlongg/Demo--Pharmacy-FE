import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import SummaryApi from '../common';
import {toast} from 'react-toastify'
import statusCategory from '../helpers/statusCategory';
import classifyCategory from '../helpers/classifyCategory';
import uploadImage from '../helpers/uploadImage';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DisplayImage from './DisplayImage';
import { motion } from "framer-motion";

const AdminEditProduct = ({
    onClose,
    productData,
    fetchdata
  }) => {

  const [data,setData] = useState({
    ...productData,
    productName : productData?.productName,
    brandName : productData?.brandName,
    category : productData?.category,
    productImage : productData?.productImage || [],
    description : productData?.description,
    price : productData?.price,
    sellingPrice : productData?.sellingPrice,
    status : productData?.status,
    classify:productData?.classify,
    
  })
  const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
  const [fullScreenImage,setFullScreenImage] = useState("")
  const handleUploadProduct = async(e) => {
    const file = e.target.files[0]
    const uploadImageCloudinary = await uploadImage(file)

    setData((preve)=>{
      return{
        ...preve,
        productImage : [ ...preve.productImage, uploadImageCloudinary.url]
      }
    })
  }

  const handleDeleteProductImage = async(index)=>{
    console.log("image index",index)
    
    const newProductImage = [...data.productImage]
    newProductImage.splice(index,1)

    setData((preve)=>{
      return{
        ...preve,
        productImage : [...newProductImage]
      }
    })
    
  }

  const handleOnChange = (e)=>{
      const { name, value} = e.target

      setData((preve)=>{
        return{
          ...preve,
          [name]  : value      
        }
      })
  }


  {/**upload product */}
  const handleSubmit = async(e) =>{
    e.preventDefault()
    
    const response = await fetch(SummaryApi.updateProduct.url,{
      method : SummaryApi.updateProduct.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })

    const responseData = await response.json()

    if(responseData.success){
        toast.success(responseData?.message)
        onClose()
        fetchdata()
    }

    if(responseData.error){
      toast.error(responseData?.message)
    }
  

  }

  return (
    <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
         <div className='flex justify-between items-center pb-3'>
             <h2 className='font-bold text-lg'>Chỉnh sửa sản phẩm</h2>
             <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                 <CgClose/>
             </div>
         </div>

       <form className='grid p-4 gap-2 overflow-y-scroll h-full' onSubmit={handleSubmit}>

         <label className='flex' htmlFor='productName'>Tên Thuốc :</label>
         <input 
           type='text' 
           id='productName' 
           placeholder='nhập tên thuốc' 
           name='productName'
           value={data.productName} 
           onChange={handleOnChange}
           className='p-2 bg-slate-100 border rounded '
           required
         />


         <label htmlFor='brandName' className='mt-3 flex'>Mã thuốc :</label>
         <input 
           type='text' 
           id='brandName' 
           placeholder='nhập mã thuốc' 
           value={data.brandName} 
           name='brandName'
           onChange={handleOnChange}
           className='p-2 bg-slate-100 border rounded'
           required
         />

          <label htmlFor='productImage' className='mt-3 flex'>Ảnh thuốc :</label>
           <label htmlFor='uploadImageInput'>
           <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                     <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                       <span className='text-4xl'><FaCloudUploadAlt/></span>
                       <p className='text-sm flex'>Tải ảnh sản phẩm</p>
                       <input type='file' id='uploadImageInput'  className='hidden' onChange={handleUploadProduct}/>
                     </div>
           </div>
           </label> 
           <div>
               {
                 data?.productImage[0] ? (
                     <div className='flex items-center gap-2'>
                         {
                           data.productImage.map((el,index)=>{
                             return(
                               <div className='relative group'>
                                   <img 
                                     src={el} 
                                     alt={el} 
                                     width={80} 
                                     height={80}  
                                     className='bg-slate-100 border cursor-pointer'  
                                     onClick={()=>{
                                       setOpenFullScreenImage(true)
                                       setFullScreenImage(el)
                                     }}/>

                                     <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                                       <MdDelete/>  
                                     </div>
                               </div>
                               
                             )
                           })
                         }
                     </div>
                 ) : (
                   <p className='text-red-600 text-xs'>*vui lòng tải ảnh sản phẩm lên</p>
                 )
               }
               
           </div>

           <label htmlFor='category' className='mt-3 flex'>Loại thuốc :</label>
           <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
               <option value={""}>Chọn loại thuốc</option>
               {
                 productCategory.map((el,index)=>{
                   return(
                     <option value={el.value} key={el.value+index}>{el.label}</option>
                   )
                 })
               }
           </select>

           <label htmlFor='status' className='mt-3 flex'>Trạng thái :</label>
           <select required value={data.status} name='status' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
               <option value={""}>Chọn trạng thái</option>
               {
                 statusCategory.map((el,index)=>{
                   return(
                     <option value={el.value} key={el.value+index}>{el.label}</option>
                   )
                 })
               }
           </select>

           <label htmlFor=' quantity' className='mt-3 flex'>Số lượng :</label>
                  <input 
                      type='number' 
                      id=' quantity' 
                      placeholder='enter selling price' 
                      value={data. quantity} 
                      name='quantity'
                      onChange={handleOnChange}
                      className='p-2 bg-slate-100 border rounded'                      
                  />

           <label htmlFor='price' className='mt-3 flex'>Giá tiền :</label>
           <input 
             type='number' 
             id='price' 
             placeholder='Nhập giá sản phẩm' 
             value={data.price} 
             name='price'
             onChange={handleOnChange}
             className='p-2 bg-slate-100 border rounded'
             required
           />


           <label htmlFor='sellingPrice' className='mt-3 flex'>Giá giảm :</label>
           <input 
             type='number' 
             id='sellingPrice' 
             placeholder='nhập giá giảm' 
             value={data.sellingPrice} 
             name='sellingPrice'
             onChange={handleOnChange}
             className='p-2 bg-slate-100 border rounded'
           />

            <label htmlFor='status' className='mt-3 flex'>Trạng thái :</label>
           <select required value={data.status} name='status' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
               <option value={""}>Chọn trạng thái</option>
               {
                 statusCategory.map((el,index)=>{
                   return(
                     <option value={el.value} key={el.value+index}>{el.label}</option>
                   )
                 })
               }
           </select>

           <label htmlFor='classify' className='mt-3 flex'>Phân loại :</label>
                  <select required value={data.classify} name='classify' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
                  <option value={""}>Chọn phân loại</option>
                  {
                    classifyCategory.map((el,index)=>{
                      return(
                        <option value={el.value} key={el.value+index}>{el.label}</option>
                      )
                    })
                  }
                  </select>

           <label htmlFor='description' className='mt-3 flex'>Mô tả :</label>
           <textarea 
             className='h-28 bg-slate-100 border resize-none p-1' 
             placeholder='Nhập mô tả' 
             rows={3} 
             onChange={handleOnChange} 
             name='description'
             value={data.description}
           >
           </textarea>
           <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Cập nhật sản phẩm</button>
       </form> 
      </motion.div>
 {/***display image full screen */}
 {
     openFullScreenImage && (
       <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
     )
    }

    </div>
  )
}

export default AdminEditProduct