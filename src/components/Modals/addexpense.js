import { Button, DatePicker, Form, Input, Modal, Select} from 'antd'
import React from 'react'

function AddExpense({ isEpenseModalVisible, handleExpenseCancel, onFinish }) {

    const [form] = Form.useForm();
    return (
        <div>
            <Modal visible={isEpenseModalVisible}
                onCancel={handleExpenseCancel}
                title="Add Expense"
                footer={null}
            >
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={(values) => {
                        onFinish(values, "expense");
                        form.resetFields();
                    }}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please Enter the input of the Transcation",
                            },
                         ]}>                       
                        <Input type='text' className='custom-input' />
                      </Form.Item>

                    <Form.Item
                        label="Amount"
                        name="amount"
                        rules={[
                            {
                                required: true,
                                message: "Please Enter the expense amount!"
                            },
                        ]}>
                      <Input type='number' className='custom-input' />
                      </Form.Item>
                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: "Please select the expense date!",
                            },
                        ]}>
                        <DatePicker className='custom-input' format="YYYY-MM-DD" />
                    </Form.Item>
                    <Form.Item
                        label="Tag"
                        name="tag"
                        rules={[
                            {
                                required: true,
                                message: "Please select a tag",
                            },
                        ]}>
                    <Select>
                        <Select.Option value="food">Food</Select.Option>
                        <Select.Option value="education">Education</Select.Option>
                        <Select.Option value="office">Office</Select.Option>
                    </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button className="btn btn-blue" type="primary" htmlType="submit">Add Expense</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>

    )
}

export default AddExpense
