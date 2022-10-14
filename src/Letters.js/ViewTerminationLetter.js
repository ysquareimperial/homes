import { PDFViewer } from '@react-pdf/renderer'
import React from 'react'
import { IntroductionLetter } from './IntroductionLetter'
import { TerminationLetter } from './TerminationLetter'

export default function ViewTerminationLetter() {
    return (
        <div>
            <PDFViewer style={{ width: '100%', height: '100vh' }}>
                <TerminationLetter />
            </PDFViewer>
        </div>
    )
}
