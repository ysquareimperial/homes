import { PDFViewer } from '@react-pdf/renderer'
import React from 'react'
import { IntroductionLetter } from './IntroductionLetter'

export default function ViewIntroductionLetter() {
    return (
        <div>
            <PDFViewer style={{ width: '100%', height: '100vh' }}>
                <IntroductionLetter />
            </PDFViewer>
        </div>
    )
}
