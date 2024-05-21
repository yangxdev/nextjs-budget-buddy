"use client";
import React, { useEffect } from "react";
import { Button, Form, Modal, Space } from "antd";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "@/app/store/store";
import { setAddModal } from "@/app/features/addModal/addModalSlice";
import { FaPlus } from "react-icons/fa6";
import "@/app/css/AddModal.css";

export default function AddCryptoSection() {
    // const dispatch = useDispatch();
    // const addModal = useSelector((state: RootState) =>   state.addModal.value);
    const [showAddModal, setShowAddModal] = React.useState(false);

    useEffect(() => {
        console.log("showAddModal", showAddModal);
    }, [showAddModal]);

    const handleAddModalClose = () => {
        setShowAddModal(false);
    };

    const onReset = () => {
        // form.resetFields();
    };

    return (
        <>
            <div className="add-crypto">
                <Button
                    type="default"
                    className={`flex items-center w-fit bg-white `}
                    icon={<FaPlus />}
                    onClick={() => {
                        setShowAddModal(true);
                    }}
                >
                    Add crypto
                </Button>
            </div>
            <Modal key={showAddModal ? "addModal" : null} open={showAddModal} onOk={handleAddModalClose} onCancel={handleAddModalClose} footer="">
                <div className="p-4 w-full rounded-md bg-white">
                    <div className="font-semibold mb-4 text-left text-lg">Add Crypto</div>
                    <Form name="addOrder" style={{ maxWidth: "500px" }}>
                        <Form.Item className="text-right">
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                                <Button type="default" onClick={onReset}>
                                    Reset
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
}
