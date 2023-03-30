import { useEffect, useState } from "react";
import useDebounce from '../../Hook/useDebounce'
import useUpdateEffect from '../../Hook/useUpdateEffect';
import { DatePicker, Space } from 'antd';
import { Input } from 'antd';




export default function InvoiceFilter({ filter, onFilter }) {
    const { Search } = Input
    const { RangePicker } = DatePicker;
    const [search, setSearch] = useState(filter?.name || '')
    const searchDebouce = useDebounce(search, 800)
    const handleSearch = (searchNow = true) => onFilter({ name: searchNow ? search : searchDebouce })



    useUpdateEffect(() => {
        if (searchDebouce.length < 3) return
        handleSearch(false)
    }, [searchDebouce])



    return (
        <>
            <div class="container  text-center " style={{ marginTop: '20px' }}>
                <div className='row'>
                    <div className='col-12 col-md-4 '>
                        <Search placeholder="Tìm Kiếm Sự Kiện"
                            size='large'
                            value={search}
                            onChange={(e) => setSearch((e.target).value)}
                            onKeyUp={(e) => e.key === 'Enter' && handleSearch()} />
                    </div>
                    <div className='col-12 col-md-4'>
                        <Space direction="vertical">
                            <RangePicker
                                size='large'
                                placeholder={["Từ", "Đến"]}
                                onChange={(newValue) => onFilter({ date: newValue === '' ? '' : newValue })} />
                        </Space>
                    </div>
                </div>
            </div>
        </>
    )
}
