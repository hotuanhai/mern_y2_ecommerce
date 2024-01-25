import { Table } from 'antd';
import React, { useState } from 'react'
import Loading from '../LoadingComponent/Loading'
const TableComponent = (props) => {
  const {selectionType = 'checkbox', data=[], isLoading = false, columns=[],handleDeleteMany} = props
  const [rowSelectedKeys, setRowSelectedKeys] = useState([])
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys)
    },
    // getCheckboxProps: (record) => ({
    // disabled: record.name === 'Disabled User',
    // name: record.name,
    // }),
  };

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
  ];
  const handleDeleteAll = () =>{
    handleDeleteMany(rowSelectedKeys)
  }
  return (
    <Loading isPending={isLoading}>
        { rowSelectedKeys.length >0 &&(
          <div style={{
            background: '#1d1ddd', 
            color: '#fff',
            fontWeight: 'bold', 
            padding: '10px',
            cursor: 'pointer'}}   
            onClick={handleDeleteAll}
          > 
            Xóa tất cả
          </div>
        )}

        <Table
            rowSelection={{
            type: selectionType,
            ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
            {...props}
        />
    </Loading>

  )
}

export default TableComponent