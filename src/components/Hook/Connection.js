import React from 'react'
import { Card, Button, Form, Input, Row, Col, Select } from 'antd'
const { Password } = Input

const Connection = ({ connect, disconnect, connectBtn }) => {
  const [form] = Form.useForm()
  const onFinish = (values) => {
    console.log({ values })
    const { schema, host, port, clientId, username, password } = values
    const url = `${schema}://${host}:${port}`
    console.log(url)
    const options = {
      keepalive: 20,
      clean: true,
      reconnectPeriod: 1000,
      useTLS: true,
      connectTimeout: 30 * 1000,
      clientId,
      username,
      password,
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
      },
      rejectUnauthorized: false
    }
    console.log({ options })
    connect(url, options)
  }

  const handleConnect = () => {
    form.submit()
  }

  const handleDisconnect = () => {
    disconnect()
  }

  const ConnectionForm = (
    <Form
      layout='vertical'
      name='basic'
      form={form}
      onFinish={onFinish}
    >
      <Row gutter={20}>
        <Col span={4}>
          <Form.Item label='Schema' name='schema'>
            <Select >
              <Select.Option value='ws'>ws</Select.Option>
              <Select.Option value='wss'>wss</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item label='Host' name='host'>
            <Input />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item label='Port' name='port'>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='Client ID' name='clientId'>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='Username' name='username'>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='Password' name='password'>
            <Password />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )

  return (
    <Card
      title='Connection'
      actions={[
        <Button type='primary' onClick={handleConnect}>
          {connectBtn}
        </Button>,
        <Button danger onClick={handleDisconnect}>
          Disconnect
        </Button>
      ]}
    >
      {ConnectionForm}
    </Card>
  )
}

export default Connection
