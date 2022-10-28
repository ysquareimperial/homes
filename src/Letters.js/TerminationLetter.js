import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#FFFF',
        fontSize: 14,
        marginTop: 150,
        fontFamily: 'Times-Roman'
        // margin:30
    },
    section: {
        margin: 20,
        paddingLeft: 30,
        flexGrow: 1,
        flexDirection: 'row'
    },
    section2: {
        margin: 20,
        paddingLeft: 30,
        flexGrow: 1,
        flexDirection: 'row',
    }
});


// Create Document Component
export const TerminationLetter = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View>
                <View style={styles.section}>
                    <View>
                        <Text>Abubakar Yakasai</Text>
                        <Text>Taludu</Text>
                        <Text>Kano</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 300 }}>
                        <View>
                            <Text>10th{' '}</Text>
                        </View>
                        <View>
                            <Text>January,{' '}</Text>
                        </View>
                        <View>
                            <Text>2022{' '}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ margin: 10, paddingLeft: 40, paddingRight: 40 }}>
                    <Text>Sir,
                    </Text>
                </View>
                <View style={{ margin: 10, textAlign: 'center', textDecoration: 'underline' }}>
                    <Text>
                        TERMINATION OF YOUR TENANCY CONTRACT/QUIT NOTICE
                    </Text>
                </View>
                <View style={{ textAlign: 'justify' }}>

                    <View style={{ margin: 10, paddingLeft: 40, paddingRight: 40 }}>
                        <Text>
                            It has become imperative to officially inform you that we will not longer renew your tenancy at the expiration of same.
                        </Text>
                    </View>
                    <View style={{ margin: 10, marginTop: 2, paddingLeft: 40, paddingRight: 40 }}>
                        <Text>
                            We write to officially inform you that your rent in the afore- stated property will expire on 10th february, 2022.
                        </Text>
                    </View>
                    <View style={{ margin: 10, marginTop: 2, paddingLeft: 40, paddingRight: 40, }}>
                        <Text>
                            Your tenancy will expire by the effluxion of time 28th August, 2022 and with the provision of the covenants stipulated in the tenancy agreement we are expecting you to handover the vacant possession of the property on or before the anniversary date of your tenancy.
                        </Text>
                    </View>
                    <View style={{ margin: 10, marginTop: 2, paddingLeft: 40, paddingRight: 40 }}>
                        <Text>
                            Kindly comply with our team on basis of conducting pre-vacation inspection in order to ascertain and ensure proper usage of the apartment.
                        </Text>
                    </View>
                    <View style={{ margin: 10, marginTop: 20, paddingLeft: 40, paddingRight: 40 }}>
                        <Text>
                            Kind regards
                        </Text>
                    </View>
                    <View style={{ marginLeft: 10, marginTop: 20, paddingLeft: 40, paddingRight: 40 }}>
                        <Text>
                            Abubakar Sadeek .U.

                        </Text>
                    </View>
                    <View style={{ marginLeft: 10, paddingLeft: 40, paddingRight: 40 }}>
                        <Text>
                            07032881997

                        </Text>
                    </View>

                </View>
            </View>

        </Page>
    </Document>
);