import { Table } from 'antd';
import { useCripto } from '../context/crypto-context';
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sortDirections: ['descend'],
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Price , $',
        dataIndex: 'price',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.amount - b.amount,
    },

];



export default function AssetTable() {
    const { assets } = useCripto()
    const data = assets.map(a => ({
        key: a.id,
        name: a.name,
        price: a.price,
        amount: a.amount,
    }))
    return (
        <Table
            pagination={false}
            columns={columns}
            dataSource={data}
        />
    )
}