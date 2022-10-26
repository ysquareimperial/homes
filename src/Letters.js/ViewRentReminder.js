import { PDFViewer } from '@react-pdf/renderer'
import React from 'react'
import { RentReminder } from './RentReminder'

export default function ViewRentReminder() {
    return (
        <div>
            <PDFViewer style={{ width: '100%', height: '100vh' }}>
                <RentReminder />
            </PDFViewer>
        </div>
    )
}
