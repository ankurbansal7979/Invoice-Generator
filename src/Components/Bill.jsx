import React from "react";

function Bill(props) {
  console.log(props);
  const { invoiceDetails, items, total, afterDiscount } = props.mainData;
  return (
    <div className="max-w-lg mx-auto border rounded-lg shadow-lg p-6 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">
          Invoice No: {invoiceDetails.invoiceNumber}
          </h1>
        </div>
        <div className="text-right">
          <p className="text-gray-600">Amount Due:</p>
          <p className="text-2xl font-bold text-blue-600">₹ {afterDiscount}</p>
        </div>
      </div>

      {/* Billing Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="text-gray-800 font-bold">Billed to:</h2>
          <p>{invoiceDetails.customerName}</p>
          {/* <p>jhbjhv</p>
          <p>bhj@gmail.com</p> */}
        </div>
        <div>
          <h2 className="text-gray-800 font-bold">Billed From:</h2>
          <p>{invoiceDetails.shopkeeperName}</p>
          {/* <p>ljj</p>
          <p>jvjyug@gmail.com</p> */}
        </div>
      </div>

      {/* Date of Issue */}
      <div className="mb-4">
        <h2 className="text-gray-800 font-bold">Date Of Issue:</h2>
        <p>{invoiceDetails.billDate}</p>
      </div>

      {/* Table */}
      <div className="border-t border-b border-gray-200">
        <div className="flex justify-between font-bold py-2">
          <p>QTY</p>
          <p>DESCRIPTION</p>
          <p>PRICE</p>
          <p>AMOUNT</p>
        </div>
        {items.map(({itemName ,price , quantity,amount}) => (
          <div className="flex justify-between text-gray-600 py-2">
            <p>{quantity}</p>
            <p>{itemName}</p>
            <p>{price}</p>
            <p>{amount}</p>
          </div>
        ))}
      </div>

      {/* Subtotal & Total */}
      <div className="text-right mt-4">
        <div className="flex justify-between mb-2">
          <p className="font-bold">SUBTOTAL</p>
          <p>₹ {total} </p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="font-bold">Discount</p>
          <p>{invoiceDetails.discount} %</p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold text-lg">TOTAL</p>
          <p className="text-lg">₹ {afterDiscount}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-6">
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700">
          Send Invoice
        </button>
        <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg shadow hover:bg-gray-200">
          Download Copy
        </button>
      </div>
    </div>
  );
}

export default Bill;
