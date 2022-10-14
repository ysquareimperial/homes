import { PDFViewer } from '@react-pdf/renderer'
import React from 'react'
import { IncrementLetter } from './IncrementLetter'

export default function ViewIncrementLetter() {
    return (
        <div>
            <PDFViewer style={{ width: '100%', height: '100vh' }}>
                <IncrementLetter />
            </PDFViewer>
        </div>
    )
}
