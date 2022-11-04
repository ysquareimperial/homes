import React from 'react'
import { Row, Col, Card } from 'reactstrap'
import { BsClockHistory, BsClock } from 'react-icons/bs'
import { MdMapsHomeWork } from 'react-icons/md'
import { ImUsers } from 'react-icons/im'
import '../Operator/Chart.css'
import DoughnutChart from '../Operator/Doughnut'
import BarChart from '../Operator/BarChart'
import TenantsByAccommodation from '../Operator/TenantsByAccommodation'
import { FaCalendar, FaUser } from 'react-icons/fa'
export default function OperatorDashboard() {
  return (
    <div className='mt-4'>
      <Row>
        <Col lg={3}>
          <Card className='dashboard_card p-3 shadow-sm'>
            <Row>
              <Col lg={3} md={3} sm={3} xs={3}>
                <div className='dashboard_icon_div1'>
                  <div>
                    <BsClockHistory size='2.5em' className='icon_div1' />
                  </div>
                </div>
              </Col>
              <Col lg={9} md={9} sm={9} xs={9}>
                <div className='dashboard_card_details'>
                  <div>
                    <p className='d_count'>12</p>
                    <p className='d_text'> Upcoming Rents</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col lg={3}>
          <Card className='dashboard_card p-3 shadow-sm'>
            <Row>
              <Col lg={3} md={3} sm={3} xs={3}>
                <div className='dashboard_icon_div2'>
                  <div>
                    <BsClock size='2.5em' className='icon_div2' />
                  </div>
                </div>
              </Col>
              <Col lg={9} md={9} sm={9} xs={9}>
                <div className='dashboard_card_details'>
                  <div>
                    <p className='d_count'>12</p>
                    <p className='d_text'> Rents Due</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col lg={3}>
          <Card className='dashboard_card p-3 shadow-sm'>
            <Row>
              <Col lg={3} md={3} sm={3} xs={3}>
                <div className='dashboard_icon_div3'>
                  <div>
                    <MdMapsHomeWork size='2.5em' className='icon_div3' />
                  </div>
                </div>
              </Col>
              <Col lg={9} md={9} sm={9} xs={9}>
                <div className='dashboard_card_details'>
                  <div>
                    <p className='d_count'>122</p>
                    <p className='d_text'>PM</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col lg={3}>
          <Card className='dashboard_card p-3 shadow-sm'>
            <Row>
              <Col lg={3} md={3} sm={3} xs={3}>
                <div className='dashboard_icon_div4'>
                  <div>
                    <ImUsers size='2.5em' className='icon_div4' />
                  </div>
                </div>
              </Col>
              <Col lg={9} md={9} sm={9} xs={9}>
                <p className='d_count'>412</p>
                <p className='d_text'>Tentants</p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card className='dashboard_card p-3 mt-4 shadow-sm' style={{ height: "20vh" }}>
            <p className='d_count'>Upcoming Rents</p>
            <marquee behavior="scroll" direction="up" onmouseover="stop();" onmouseout="start();" scrolldelay="200" height="200">
              <div style={{ marginBottom: 30 }} className="">
                <p className='marq_el' style={{ margin: 0, marginRight: 10, display: 'inline' }}><MdMapsHomeWork className='not_icon' size='1em' color='grey' />{' '}PM1</p>
                <p className='marq_el' style={{ margin: 0, marginRight: 10, display: 'inline' }}><FaUser className='not_icon' size='1em' color='grey' />{' '}Tenant: Habu Yakasai</p>
                <p className='marq_el' style={{ margin: 0, marginRight: 10, display: 'inline' }}><FaCalendar className='not_icon' size='1em' color='grey' />{' '}Date: 12/12/2022</p>
              </div>
              <div style={{ marginBottom: 30 }} className="">
                <p className='marq_el' style={{ margin: 0, marginRight: 10, display: 'inline' }}><MdMapsHomeWork className='not_icon' size='1em' color='grey' />{' '}PM1</p>
                <p className='marq_el' style={{ margin: 0, marginRight: 10, display: 'inline' }}><FaUser className='not_icon' size='1em' color='grey' />{' '}Tenant: Habu Yakasai</p>
                <p className='marq_el' style={{ margin: 0, marginRight: 10, display: 'inline' }}><FaCalendar className='not_icon' size='1em' color='grey' />{' '}Date: 12/12/2022</p>
              </div>
            </marquee>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={6} sm={12} xs={12}>
          <Card className='dashboard_card ch p-3 mt-4 shadow-sm'>
            <BarChart />
          </Card>
        </Col>
        <Col md={3}>
          <Card className='dashboard_card ch p-3 mt-4 shadow-sm'>
            <TenantsByAccommodation />
          </Card>
        </Col>
        <Col md={3}>
          <Card className='dashboard_card ch p-3 mt-4 shadow-sm'>
            <p className='d_text text-center'>Tentants by gender</p>
            <hr></hr>
            <Row>
              <Col lg={2} md={2} sm={2} xs={2}></Col>
              <Col lg={8} md={8} sm={8} xs={8}>
                {/* <Chart /> */}
                <DoughnutChart />
              </Col>
              <Col lg={2} md={2} sm={2} xs={2}></Col>
            </Row>
            <Row className='mt-2 text-center'>
              <Col lg={2} md={2} sm={2} xs={2}></Col>
              <Col lg={4} md={4} sm={4} xs={4}>
                <p className='d_text_m' style={{ color: 'white', backgroundColor: 'rgba(34, 64, 41, 0.5)', padding: 5, borderRadius: 5, fontSize: 13 }}>Male</p>
              </Col>
              <Col lg={5} md={5} sm={5} xs={5}>
                <p className='d_text_m' style={{ color: 'white', backgroundColor: 'rgba(186, 207, 68, 0.5)', padding: 5, borderRadius: 5, fontSize: 13 }}>Female</p>
              </Col>
              <Col lg={1} md={1} sm={1} xs={1}></Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
