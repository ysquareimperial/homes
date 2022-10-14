import { PDFViewer } from '@react-pdf/renderer'
import React from 'react'
import { IntroductionLetter } from './IntroductionLetter'
import { RentReminder } from './RentReminder'
import { TerminationLetter } from './TerminationLetter'

export default function ViewRentReminder() {
    return (
        <div>
            <PDFViewer style={{ width: '100%', height: '100vh' }}>
                <RentReminder />
            </PDFViewer>
        </div>
    )
}
