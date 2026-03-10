import React, { useState } from "react";
import DashboardCard from "./UI/DashboardCard";
import TitleText from "./UI/TitleText";
import CustomModal from "./UI/CustomModal"; // import your reusable modal
import AppButton from "./UI/AppButton"; // import your reusable button

const orders = [
  {
    label: "$2400, Design changes",
    date: "22 DEC 7:20 PM",
    color: "text-green-500",
  },
  {
    label: "New order #1832412",
    date: "21 DEC 11 PM",
    color: "text-blue-500",
  },
  {
    label: "Server payments for April",
    date: "21 DEC 9:34 PM",
    color: "text-orange-500",
  },
];

const OrdersOverview = () => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen((prev) => !prev);

  return (
    <>
      <DashboardCard
        icon="📦"
        title="Orders Overview"
        footer="+30% this month"
        color="bg-gradient-to-tr from-pink-400 to-pink-600"
        footerColor="text-white"
      >
        <ul className="mt-4 space-y-4">
          {orders.map((order, index) => (
            <li key={index} className="flex justify-between items-start">
              <div className="flex flex-col">
                <TitleText variant="small" className={order.color}>
                  {order.label}
                </TitleText>
                <TitleText variant="small" className="text-gray-500">
                  {order.date}
                </TitleText>
              </div>
            </li>
          ))}
        </ul>

        {/* Button to open modal */}
        <div className="mt-4">
          <AppButton color="black" onClick={toggleModal}>
            View Details
          </AppButton>
        </div>
      </DashboardCard>

      {/* Custom modal */}
      <CustomModal
        open={open}
        handler={toggleModal}
        size="sm"
        header="Order Details"
        footer={
          <AppButton color="red" variant="text" onClick={toggleModal}>
            Close
          </AppButton>
        }
      >
        <p>Here you can display more details about the orders.</p>
      </CustomModal>
    </>
  );
};

export default OrdersOverview;
