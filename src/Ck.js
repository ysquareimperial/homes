import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Col, Row } from 'reactstrap'
export default function Ck() {
    const [addData, setVal] = useState('')
    const handleChange = (e, editor) => {
        const data = editor.getData();
        setVal(data)
        console.log(e)
    }
    return (
        <div>
            <Row className='m-0 '>
                <Col md={3}></Col>
                <Col md={6}>
                    <div>
                        <CKEditor editor={ClassicEditor} data={addData} onChange={handleChange} />
                    </div>
                    <div>
                        <button onClick={handleChange}>Submit</button>
                    </div>
                </Col>
                <Col md={3}></Col>
            </Row>
        </div>
    )
}