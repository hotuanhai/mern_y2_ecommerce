import React, { useEffect, useState } from 'react'
import {  WrapperHeader,  WrapperUploadFile } from './style'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import { useDispatch } from 'react-redux'
import {  UploadOutlined} from '@ant-design/icons';
import { getBase64 } from '../../utils'
import { Button, Form, Modal } from 'antd'
import {PlusOutlined,DeleteOutlined,EditOutlined} from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import * as ProductService from '../../service/ProductService'
import { useMutationHooks } from '../../hooks/useMutationHook'

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [stateProduct, setStateProduct] = useState({
    name: '',
    price: '',
    description: '',
    rating: '',
    image: '',
    type: '',
    countInStock: '',
  })
  const mutation = useMutationHooks(
    (data) =>{
      const { name,
      price, 
      description,
      rating,
      image,
      type,
      countInStock } = data 
    const res = ProductService.createProduct({
      name, 
      price,
      description,
      rating,
      image,
      type,
      countInStock
    })
    return res
    }
  )  
  const { data, isPending, isSuccess, isError } = mutation
  console.log('data product',data)
  useEffect(() => {
    if(isSuccess && data?.message === 'The name of product is already'){
      message.error()
    }
    else if (isSuccess && data?.status === 'OK'){
       message.success() 
       handleCancel()
    }
    else if (isError) { 
      message.error()
    }
    }, [isSuccess,isError,data])

  const handleCancel = () => { 
    setIsModalOpen(false);
    setStateProduct({
      name: '',
      price: '',
      description: '',
      rating: '',
      image: '',
      type: '',
      countInStock: '',
    })

  };
  const onFinish =() => {
    mutation.mutate(stateProduct)
    console.log('finish',stateProduct)
  }
  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value
    })
  }
  const handleOnchangeAvatar= async ({fileList}) =>{
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview
    })
    console.log('aaaa',stateProduct)
  }

  return (
    <div style={{ width: '1270px', margin: '0 auto', height: '500px'}}>
      <WrapperHeader> Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: '10px'}}>
        <Button 
          style={{height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed'}}
          onClick={()=> setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: '60px'}} />
        </Button>
      </div>
      <div style={{ marginTop: '20px'}}>
         <TableComponent />
      </div>
      <Modal title="Tạo sản phẩm" open={isModalOpen} 
        onCancel={handleCancel} okButtonProps={{ hidden: true }} footer={null}
      >
        <Loading isPending={isPending}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
            autoComplete="off" 
            //form={form}
          >
            <Form.Item 
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent value={stateProduct.name} onChange={handleOnchange} name="name"/> 
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: 'Please input your type!' }]}
              >
              <InputComponent value={stateProduct.type} onChange={handleOnchange} name="type"/>
            </Form.Item>   
            <Form.Item
              label="count inStock"
              name="countInStock"
              rules={[{ required: true, message: 'Please input your count InStock!' }]}
              >
              <InputComponent value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock"/>
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Please input your price!' }]}
              >
              <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price"/>
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input your description!' }]}
              >
              <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description"/>
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[{ required: true, message: 'Please input your rating!' }]}
              >
              <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating"/>
            </Form.Item>
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: 'Please input your image!' }]}
              > 
              <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                <Button>Select File</Button> 
              
                {stateProduct?.image && (
                  <img src={stateProduct?.image} style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px'
                    }} 
                    alt="avatar" 
                  />
                )}
              </WrapperUploadFile>
             </Form.Item>

            <Form.Item 
              wrapperCol={{ offset: 20, span: 16 }}> 
              <Button type="primary" htmlType="submit">
                Submit 
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </Modal>


      
    </div>
  )
}

export default ProfilePage