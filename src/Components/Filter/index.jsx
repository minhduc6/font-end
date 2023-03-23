import { useEffect, useState } from "react";
import { SoundFilled } from '@ant-design/icons';
import { Button } from 'antd';
import useDebounce from '../../Hook/useDebounce'
import useUpdateEffect from '../../Hook/useUpdateEffect';
import { Select } from 'antd';
import { DatePicker, Space } from 'antd';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Input } from 'antd';


export default function Filter({ filter, onFilter }) {
    const { Search } = Input
    const { RangePicker } = DatePicker;
    const [search, setSearch] = useState(filter?.name || '')
    const searchDebouce = useDebounce(search, 800)
    const handleSearch = (searchNow = true) => onFilter({ name: searchNow ? search : searchDebouce })
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [isListening, setIsListening] = useState(false);


    useUpdateEffect(() => {
        if (searchDebouce.length < 3) return
        handleSearch(false)
    }, [searchDebouce])

    useEffect(() => {
        setSearch(transcript)
    }, [transcript]);


    const options = [];

    for (let i = 10; i < 36; i++) {
        options.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }

    const handleListing = () => {
        setIsListening(true);
        SpeechRecognition.startListening({
            continuous: true,
        });
        setSearch("")
    };
    const stopHandle = () => {
        setIsListening(false);
        SpeechRecognition.stopListening();
    };

    const handleReset = () => {
        stopHandle();
        resetTranscript()
        setSearch("")
    };

    const onClickMicro = () => {
        if (isListening == true) {
            handleReset()
        } else if (isListening == false) {
            handleListing()
        }
    }


    return (
        <>
            <section class="wrapper" style={{ backgroundImage: `url("https://static.tkbcdn.com/site/global/content-v2/img/home-search-bg-03.jpg")`, objectFit: 'cover', height: '340px' }}>
                <div class="container py-12 py-md-16 text-center">
                    <div style={{ marginTop: '50px' }} >
                        <div class="col-lg-10 col-xxl-8 mx-auto">
                            <h1 class="display-3 mb-3" style={{ color: 'white', fontSize: '21px', lineHeight: '27px', fontWeight: 700, lineHeight: '2px 3px 6px rgb(0 0 0 / 50%)' }}>Thế Giới Sự Kiện Giải Trí</h1>
                        </div>
                        <div style={{ margin: 'auto', maxWidth: '750px', display: 'flex' }}>
                            <Search placeholder="Tìm Kiếm Sự Kiện"
                                size='large'
                                value={search}
                                onChange={(e) => setSearch((e.target).value)}
                                onKeyUp={(e) => e.key === 'Enter' && handleSearch()} />
                            <Button style={{ marginTop: '5px', backgroundColor: isListening ? '#4169E1' : 'gray' }} onClick={onClickMicro} type="primary" shape="circle" icon={<SoundFilled />} size='middle' />
                            <p>Microphone: {isListening ? 'on' : 'off'}</p>
                        </div>
                    </div>
                </div>
            </section>
            <div class="container  text-center " style={{ marginTop: '20px' }}>
                <div className='row'>
                    <div className='col-12 col-md-4'>
                        <Select
                            defaultValue="lucy"
                            size='large'
                            style={{ minWidth: '300px' }}
                            onChange={(value) => onFilter({ address: value === '' ? '' : value })}
                            options={[
                                { value: 'jack', label: 'Jack' },
                                { value: 'lucy', label: 'Lucy' },
                                { value: 'Yiminghe', label: 'yiminghe' },
                                { value: 'disabled', label: 'Disabled', disabled: true },
                            ]}
                        />
                    </div>
                    <div className='col-12 col-md-4 '>
                        <Select
                            mode="multiple"
                            size='large'
                            value={filter?.category}
                            placeholder="Please select"
                            onChange={(value) => onFilter({ category: value === '' ? '' : value })}
                            style={{ width: '100%' }}
                            options={options}
                        />
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
